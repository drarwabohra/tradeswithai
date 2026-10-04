import { NextResponse } from "next/server";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import site from "@/data/site.json";
import { findProduct } from "@/lib/catalog";
import { db } from "@/lib/db";
import { validateDetails, validateReceipt } from "@/lib/order-validation";
export const runtime = "nodejs";
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const POLICY_VERSION = "2026-10-04"; // Change whenever the displayed policy/acknowledgment changes.
function reply(data: object, status = 200, headers: Record<string, string> = {}) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store", ...headers } });
}
function tokenFor(id: string) {
  const secret = process.env.ORDER_TOKEN_SECRET;
  if (!secret || secret.length < 32) throw new Error("ORDER_TOKEN_SECRET must contain at least 32 characters");
  return createHmac("sha256", secret).update(`order:${id}`).digest("hex");
}
function validToken(id: string, token: unknown) {
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) return false;
  return timingSafeEqual(Buffer.from(token, "hex"), Buffer.from(tokenFor(id), "hex"));
}
class InputError extends Error {}
async function readJson(req: Request): Promise<Record<string, unknown>> {
  // Bound bytes actually read, not just the user-controlled Content-Length header.
  const reader = req.body?.getReader();
  if (!reader) throw new InputError("Missing request body.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 8192) { await reader.cancel(); throw new InputError("Request is too large."); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const joined = Buffer.concat(chunks);
  let result: unknown;
  try { result = JSON.parse(joined.toString("utf8")); } catch { throw new InputError("Invalid JSON."); }
  if (!result || typeof result !== "object" || Array.isArray(result)) throw new InputError("Expected a JSON object.");
  return result as Record<string, unknown>;
}
export async function POST(req: Request) {
  try {
    const allowed = process.env.APP_ORIGIN;
    if (!allowed) return reply({ error: "Checkout is not configured. Contact support before paying." }, 503);
    if (req.headers.get("origin") !== new URL(allowed).origin) return reply({ error: "Request origin is not allowed." }, 403);
    if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return reply({ error: "Expected application/json." }, 415);
    if (!process.env.ORDER_TOKEN_SECRET || process.env.ORDER_TOKEN_SECRET.length < 32 ||
        !process.env.DATABASE_URL || !process.env.ORDER_WEBHOOK_URL || !process.env.ORDER_WEBHOOK_SECRET ||
        !process.env.CRON_SECRET || process.env.CRON_SECRET.length < 32 || /example|xxxx/i.test(site.upiId) ||
        !/^[^\s@]+@[^\s@]+$/.test(site.upiId) || new URL(process.env.ORDER_WEBHOOK_URL).protocol !== "https:") {
      return reply({ error: "Checkout is unavailable. Contact support before paying." }, 503);
    }
    const body = await readJson(req);
    // Configure only a header that your deployment proxy overwrites and clients cannot forge.
    // Without one, use a shared limit. Never silently trust arbitrary X-Forwarded-For.
    const ipHeader = process.env.TRUSTED_CLIENT_IP_HEADER;
    const ip = ipHeader ? req.headers.get(ipHeader)?.slice(0, 200) ?? "unknown" : "shared";
    const key = createHmac("sha256", process.env.ORDER_TOKEN_SECRET).update(`rate:${ip}`).digest("hex");
    const bucket = Math.floor(Date.now() / 600000);
    const limit = ipHeader ? 30 : 300;
    const rate = await db().query<{ count: number }>(`
      INSERT INTO twa_rate_limits(key,bucket,count) VALUES($1,$2,1)
      ON CONFLICT(key,bucket) DO UPDATE SET count=twa_rate_limits.count+1 RETURNING count`, [key, bucket]);
    if (rate.rows[0].count > limit) return reply({ error: "Too many attempts. Wait a few minutes, or contact support." }, 429, { "Retry-After": "600" });
    if (body.action === "create") {
      if (typeof body.requestId !== "string" || !uuid.test(body.requestId)) return reply({ error: "Invalid checkout request." }, 400);
      const product = typeof body.productId === "string" ? findProduct(body.productId) : undefined;
      if (!product) return reply({ error: "This product is unavailable." }, 400);
      const result = validateDetails(body);
      if (!result.valid) return reply({ error: "Check your contact details.", fields: result.errors }, 422);
      const { name, email, whatsapp } = result.details;
      const id = randomUUID();
      const created = await db().query<{ id: string; product_id: string; amount: number; payee_id: string; name: string; email: string; whatsapp: string }>(`
        INSERT INTO twa_orders(id,request_id,product_id,product_name,amount,currency,payee_id,name,email,whatsapp)
        VALUES($1,$2,$3,$4,$5,'INR',$6,$7,$8,$9)
        ON CONFLICT(request_id) DO UPDATE SET request_id=EXCLUDED.request_id
        RETURNING id,product_id,amount,payee_id,name,email,whatsapp`,
        [id, body.requestId, product.id, product.name, product.price, site.upiId, name, email, whatsapp]);
      const order = created.rows[0];
      if (order.product_id !== product.id || order.name !== name || order.email !== email || order.whatsapp !== whatsapp) {
        return reply({ error: "This checkout attempt already has different details. Start a new checkout." }, 409);
      }
      return reply({ orderId: order.id, token: tokenFor(order.id), amount: order.amount, payeeId: order.payee_id }, 201);
    }
    if (body.action !== "submit" || typeof body.orderId !== "string" || !uuid.test(body.orderId) || !validToken(body.orderId, body.token)) {
      return reply({ error: "Invalid order credentials. Contact support with your payment reference." }, 400);
    }
    const receipt = validateReceipt(body);
    if (!receipt.valid) return reply({ error: "Check the payment reference and acknowledgment.", fields: receipt.errors }, 422);
    const connection = await db().connect();
    try {
      await connection.query("BEGIN");
      const existing = await connection.query<{ utr: string | null }>("SELECT utr FROM twa_orders WHERE id=$1 FOR UPDATE", [body.orderId]);
      if (!existing.rowCount) { await connection.query("ROLLBACK"); return reply({ error: "Order not found. Contact support." }, 404); }
      if (existing.rows[0].utr && existing.rows[0].utr !== receipt.utr) {
        await connection.query("ROLLBACK"); return reply({ error: "This order already has a different reference. Contact support to correct it." }, 409);
      }
      if (!existing.rows[0].utr) {
        await connection.query(`UPDATE twa_orders SET utr=$2,status='PENDING_VERIFICATION',
          policy_version=$3,acknowledged_at=now(),submitted_at=now() WHERE id=$1`, [body.orderId, receipt.utr, POLICY_VERSION]);
        await connection.query("INSERT INTO twa_outbox(order_id) VALUES($1) ON CONFLICT DO NOTHING", [body.orderId]);
      }
      await connection.query("COMMIT");
      return reply({ ok: true, orderId: body.orderId, status: "PENDING_VERIFICATION" });
    } catch (error) {
      await connection.query("ROLLBACK");
      if ((error as { code?: string }).code === "23505") return reply({ error: "That payment reference has already been submitted. Contact support if you need help." }, 409);
      throw error;
    } finally { connection.release(); }
  } catch (error) {
    if (error instanceof InputError) return reply({ error: error.message }, 400);
    // Never log names, email addresses, tokens, UTRs, or webhook response bodies.
    console.error("order_submission_failed", { code: (error as { code?: string }).code ?? "unknown" });
    return reply({ error: "We could not record this request. If you already paid, retry with the same reference or contact support. Do not pay again." }, 503);
  }
}
