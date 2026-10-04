import { NextResponse } from "next/server";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
export const runtime = "nodejs";
export const maxDuration = 60;
function response(data: object, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const supplied = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret ?? ""}`;
  const suppliedBytes = Buffer.from(supplied);
  const expectedBytes = Buffer.from(expected);
  if (!secret || secret.length < 32 || suppliedBytes.length !== expectedBytes.length ||
      !timingSafeEqual(suppliedBytes, expectedBytes)) return response({ error: "Unauthorized" }, 401);
  const webhook = process.env.ORDER_WEBHOOK_URL;
  const signingSecret = process.env.ORDER_WEBHOOK_SECRET;
  try {
    if (!webhook || !signingSecret || new URL(webhook).protocol !== "https:") return response({ error: "Webhook is not configured." }, 503);
    const lease = randomUUID();
    const jobs = await db().query<{ order_id: string; attempts: number }>(`
      WITH due AS (
        SELECT order_id FROM twa_outbox WHERE delivered_at IS NULL AND failed_at IS NULL
        AND next_attempt_at<=now() AND (locked_until IS NULL OR locked_until<now())
        ORDER BY next_attempt_at FOR UPDATE SKIP LOCKED LIMIT 3
      ) UPDATE twa_outbox o SET locked_until=now()+interval '2 minutes',lock_id=$1,attempts=attempts+1
      FROM due WHERE o.order_id=due.order_id RETURNING o.order_id,o.attempts`, [lease]);
    let delivered = 0;
    for (const job of jobs.rows) {
      try {
        const order = await db().query(`SELECT id AS "orderId",product_id AS "productId",product_name AS "productName",
          amount,currency,name,email,whatsapp,utr,status,submitted_at AS "submittedAt" FROM twa_orders WHERE id=$1`, [job.order_id]);
        if (!order.rows[0]) throw new Error("missing_order");
        const payload = JSON.stringify(order.rows[0]);
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const signature = createHmac("sha256", signingSecret).update(`${timestamp}.${payload}`).digest("hex");
        const result = await fetch(webhook, { method: "POST", redirect: "error",
          headers: { "Content-Type": "application/json", "Idempotency-Key": job.order_id,
            "X-TWA-Timestamp": timestamp, "X-TWA-Signature": signature },
          body: payload, signal: AbortSignal.timeout(5000) });
        // Receiver must return 2xx only after durable acceptance and deduplicate orderId.
        if (!result.ok) { await result.body?.cancel(); throw new Error("delivery_failed"); }
        await result.body?.cancel();
        await db().query("UPDATE twa_outbox SET delivered_at=now(),locked_until=NULL,lock_id=NULL WHERE order_id=$1 AND lock_id=$2", [job.order_id, lease]);
        delivered++;
      } catch {
        const delay = Math.min(3600, 30 * 2 ** Math.min(job.attempts, 7));
        await db().query(`UPDATE twa_outbox SET locked_until=NULL,lock_id=NULL,
          next_attempt_at=now()+$3::integer*interval '1 second',
          failed_at=CASE WHEN attempts>=12 THEN now() ELSE NULL END WHERE order_id=$1 AND lock_id=$2`, [job.order_id, lease, delay]);
      }
    }
    await db().query("DELETE FROM twa_rate_limits WHERE bucket<$1", [Math.floor(Date.now() / 600000) - 144]);
    return response({ attempted: jobs.rowCount, delivered });
  } catch {
    console.error("order_outbox_failed");
    return response({ error: "Outbox processing failed." }, 503);
  }
}
