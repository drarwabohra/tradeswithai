"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { CopyButton } from "@/components/CopyButton";
import type { Product } from "@/lib/catalog";
import { formatINR } from "@/lib/format";
import { validateDetails, validateReceipt, type Details, type FieldErrors } from "@/lib/order-validation";
type Payment = { upiId: string; payeeName: string; supportEmail: string; whatsappNumber: string; deliveryHours: string };
type Order = { orderId: string; token: string; amount: number; payeeId: string };
type Step = "details" | "payment" | "receipt";
class ApiFailure extends Error {
  constructor(message: string, public fields: FieldErrors = {}) { super(message); }
}
async function request(payload: object) {
  const res = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(12000) });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiFailure(typeof result.error === "string" ? result.error : "We could not record this request. Please retry.", result.fields ?? {});
  return result;
}
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
function recover(storageKey: string) {
  const empty = { details: { name: "", email: "", whatsapp: "" }, requestId: crypto.randomUUID(), restored: false };
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
    if (saved && typeof saved.requestId === "string" && /^[a-f0-9-]{36}$/i.test(saved.requestId)) {
      const clean = validateDetails(saved.details ?? {});
      if (clean.valid) return { details: clean.details, requestId: saved.requestId as string, restored: true };
    }
  } catch { /* Storage can be unavailable. Checkout still works. */ }
  return empty;
}
export default function CheckoutFlow(props: { product: Product; payment: Payment }) {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  if (!ready) return <div className="mx-auto max-w-5xl px-5 py-10"><h1 className="text-3xl font-medium">Checkout</h1><p role="status" className="mt-4 text-muted">Preparing checkout…</p></div>;
  return <CheckoutForm key={props.product.id} {...props} />;
}
function CheckoutForm({ product, payment }: { product: Product; payment: Payment }) {
  const storageKey = `twa-order-v2:${product.id}`;
  const [recovery] = useState(() => recover(storageKey));
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<Details>(recovery.details);
  const [order, setOrder] = useState<Order | null>(null);
  const [utr, setUtr] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fields, setFields] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState(recovery.restored ? "Contact details restored. Continue to recover this checkout." : "");
  const requestId = useRef(recovery.requestId);
  const submitting = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const errorBox = useRef<HTMLDivElement>(null);
  const [attempted, setAttempted] = useState(recovery.restored);
  // Never restore a receipt/success state from browser storage or URL parameters.
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    if (step !== "details") heading.current?.scrollIntoView({ block: "start", behavior: "auto" });
  }, [step]);
  useEffect(() => { if (error || Object.keys(fields).length) errorBox.current?.focus(); }, [error, fields]);
  const amount = order?.amount ?? product.price;
  const upiParams = new URLSearchParams({ pa: order?.payeeId ?? payment.upiId,
    pn: payment.payeeName, am: amount.toFixed(2), cu: "INR", tn: order?.orderId ?? "" });
  const upiUrl = `upi://pay?${upiParams}`;
  const supportUrl = `https://wa.me/${payment.whatsappNumber}?${new URLSearchParams({ text:
    `I need help with ${product.name}. Order: ${order?.orderId ?? "not created"}. UPI reference: ${utr}. Delivery email: ${details.email}.` })}`;
  function fieldError(id: keyof FieldErrors) {
    return fields[id] ? <p id={`${id}-error`} className="mt-2 text-sm text-red-200">{fields[id]}</p> : null;
  }
  function editDetails() {
    if (busy) return;
    setOrder(null); setStep("details"); setError(""); setFields({});
    // Creating a new request is deliberate when changing details. Existing paid orders remain durable.
    requestId.current = crypto.randomUUID(); setAttempted(false);
    setStatus("You can edit your contact details. If you already paid, use the existing order ID when contacting support.");
  }
  async function submitDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const result = validateDetails(details);
    setFields(result.errors); setError("");
    if (!result.valid) return;
    setDetails(result.details);
    if (!requestId.current) requestId.current = crypto.randomUUID();
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ requestId: requestId.current, details: result.details }));
    } catch { setStatus("This browser cannot save the checkout. Keep this tab open until your reference is submitted."); }
    setAttempted(true);
    submitting.current = true; setBusy(true);
    try {
      const resultOrder = await request({ action: "create", productId: product.id, requestId: requestId.current, ...result.details });
      if (typeof resultOrder.orderId !== "string" || !/^[a-f0-9-]{36}$/i.test(resultOrder.orderId) ||
          typeof resultOrder.token !== "string" || !/^[a-f0-9]{64}$/.test(resultOrder.token) ||
          !Number.isSafeInteger(resultOrder.amount) || resultOrder.amount <= 0 || typeof resultOrder.payeeId !== "string") throw new Error("Invalid server response");
      setOrder(resultOrder); setStep("payment");
    } catch (cause) {
      setFields(cause instanceof ApiFailure ? cause.fields : {});
      setError(cause instanceof ApiFailure ? cause.message : "We could not create the order. Retry before paying.");
    } finally { submitting.current = false; setBusy(false); }
  }
  async function submitReceipt(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !order) return;
    const result = validateReceipt({ utr, agreed });
    setFields(result.errors); setError("");
    if (!result.valid) return;
    setUtr(result.utr); submitting.current = true; setBusy(true);
    try {
      const receipt = await request({ action: "submit", orderId: order.orderId, token: order.token, utr: result.utr, agreed });
      if (receipt.ok !== true || receipt.orderId !== order.orderId || receipt.status !== "PENDING_VERIFICATION") throw new Error("Invalid server receipt");
      setStep("receipt");
      try { sessionStorage.removeItem(storageKey); } catch { /* Receipt is stored on the server. */ }
    } catch (cause) {
      setFields(cause instanceof ApiFailure ? cause.fields : {});
      setError(cause instanceof ApiFailure ? cause.message : "We could not confirm that your reference was recorded. Retry with the same reference or contact us. Do not pay again.");
    } finally { submitting.current = false; setBusy(false); }
  }
  const labels = ["Contact", "Pay & submit", "Receipt"];
  const current = step === "details" ? 0 : step === "payment" ? 1 : 2;
  return <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6">
    <Link href={`/products/${product.id}`} className="inline-flex min-h-11 items-center text-sm text-muted">← Back to product</Link>
    <ol aria-label="Checkout progress" className="mt-5 grid grid-cols-3 gap-2 border-b border-line pb-6">
      {labels.map((label, index) => <li key={label} aria-current={index === current ? "step" : undefined} className={index === current ? "text-foreground" : "text-muted"}><span className="block font-mono text-xs">0{index + 1}</span><span className="mt-1 block text-xs sm:text-sm">{label}</span><span className="sr-only">{index < current ? "Completed" : index > current ? "Upcoming" : "Current step"}</span></li>)}
    </ol>
    <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        <h1 ref={heading} tabIndex={-1} className="scroll-mt-28 text-3xl font-medium tracking-tight focus:outline-none">{step === "details" ? "Where should we send the files?" : step === "payment" ? "Pay, then send the reference." : "Reference received."}</h1>
        <p role="status" className="mt-3 text-sm leading-6 text-muted">{status}</p>
        {(error || Object.keys(fields).length > 0) && <div ref={errorBox} tabIndex={-1} role="alert" className="my-5 rounded-md border border-red-300/50 p-4 text-sm leading-6">
          <p>{error || "Check the highlighted fields."}</p>
          {Object.entries(fields).map(([id, message]) => <a key={id} className="block min-h-11 py-2 underline underline-offset-4" href={`#${id}`}>{message}</a>)}
          {step === "payment" && <a href={supportUrl} className="button-secondary mt-3">Contact us with this reference</a>}
        </div>}
        {step === "details" && <form onSubmit={submitDetails} noValidate className="mt-6 space-y-5" aria-busy={busy}>
          {([ ["name", "Full name", "text", "name"], ["email", "Email for delivery", "email", "email"], ["whatsapp", "Indian WhatsApp number (optional)", "tel", "tel"] ] as const).map(([id, label, type, autoComplete]) => <div key={id}>
            <label htmlFor={id} className="mb-2 block text-sm">{label}</label>
            <input id={id} type={type} autoComplete={autoComplete} inputMode={id === "email" ? "email" : id === "whatsapp" ? "tel" : "text"}
              disabled={busy} maxLength={id === "name" ? 100 : id === "email" ? 254 : 30} required={id !== "whatsapp"}
              value={details[id]} aria-invalid={!!fields[id]} aria-describedby={fields[id] ? `${id}-error` : undefined}
              onChange={event => setDetails(value => ({ ...value, [id]: event.target.value }))} className="field" />{fieldError(id)}
          </div>)}
          <p className="text-sm leading-6 text-muted">We use these details to verify the order and deliver your files. Read our <Link href="/privacy" className="underline underline-offset-4">privacy policy</Link>.</p>
          <button type="submit" disabled={busy} className="button-primary w-full">{busy ? "Creating your order…" : "Continue to payment"}</button>
          {attempted && <button type="button" className="button-secondary w-full" disabled={busy} onClick={editDetails}>Start a new checkout attempt</button>}
        </form>}
        {step === "payment" && order && <form onSubmit={submitReceipt} noValidate className="mt-6 space-y-6" aria-busy={busy}>
          <p className="text-sm leading-7 text-muted">Pay <strong className="font-mono text-foreground">{formatINR(amount)}</strong> to {payment.payeeName}. Check the payee shown in your UPI app before authorizing payment. This page does not verify the bank transaction.</p>
          <p className="border-l-2 border-line pl-4 text-sm leading-6">Before paying: this product requires {product.setupRequirements}. Read the <Link href="/refund-policy" className="underline underline-offset-4">refund policy</Link>.</p>
          <div className="rounded-md border border-line bg-surface p-5">
            <a href={upiUrl} className="button-primary w-full sm:hidden">Open your UPI app</a>
            <details className="mt-3 sm:hidden"><summary className="flex min-h-12 items-center text-sm">Show QR for another device</summary><div className="inline-block bg-white p-3 text-black" role="img" aria-label={`Pay ${formatINR(amount)} to ${payment.payeeName} by UPI`}><QRCodeSVG value={upiUrl} size={180} level="M" marginSize={4} /></div></details>
            <div className="hidden sm:inline-block bg-white p-3 text-black" role="img" aria-label={`Pay ${formatINR(amount)} to ${payment.payeeName} by UPI`}><QRCodeSVG value={upiUrl} size={180} level="M" marginSize={4} /></div>
            <p className="mt-4 text-xs text-muted">UPI ID</p><p className="mt-1 break-all font-mono text-sm">{order.payeeId}</p>
            <div className="mt-2"><CopyButton value={order.payeeId} label="UPI ID" /></div>
            <p className="mt-3 text-xs leading-6 text-muted">App did not open? Pay to this UPI ID manually and keep the transaction reference.</p>
          </div>
          <div><label htmlFor="utr" className="mb-2 block text-sm">12-digit UPI reference</label><input id="utr" type="text" inputMode="numeric" autoComplete="off" required maxLength={64} disabled={busy}
            value={utr} onChange={event => setUtr(event.target.value)} className="field font-mono" aria-invalid={!!fields.utr} aria-describedby={fields.utr ? "utr-help utr-error" : "utr-help"} />
            <p id="utr-help" className="mt-2 text-xs leading-6 text-muted">Find it in your app’s transaction details. Pasted spaces are removed; digits are never truncated.</p>{fieldError("utr")}</div>
          <div><label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-md border border-line p-4 text-sm leading-6" htmlFor="agreed"><input id="agreed" type="checkbox" checked={agreed} disabled={busy} onChange={event => setAgreed(event.target.checked)} aria-invalid={!!fields.agreed} aria-describedby={fields.agreed ? "agreed-error" : undefined} className="mt-1 size-5 shrink-0 accent-accent" /><span>I have read the setup requirements ({product.setupRequirements}) and the refund policy.</span></label><Link href="/refund-policy" className="mt-2 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Read the refund policy</Link>{fieldError("agreed")}</div>
          <button type="submit" disabled={busy} className="button-primary w-full">{busy ? "Recording your reference…" : "Submit payment reference"}</button>
          <p className="text-xs leading-6 text-muted">Payment is checked manually. Submitting a reference does not confirm payment.</p>
          <a href={supportUrl} className="button-secondary">Need to change your delivery details?</a>
        </form>}
        {step === "receipt" && order && <div className="mt-6 space-y-6">
          <p className="leading-7 text-muted">We have recorded the reference for your order. Payment verification is pending. We will send the files to <strong className="break-all text-foreground">{details.email}</strong> after checking the transaction.</p>
          <dl className="space-y-4 border-y border-line py-5"><div><dt className="text-xs text-muted">Order ID — keep a copy</dt><dd className="mt-2 break-all font-mono text-sm">{order.orderId}</dd></div><div><dt className="text-xs text-muted">Payment reference</dt><dd className="mt-2 font-mono text-sm">{utr}</dd></div></dl>
          <CopyButton value={order.orderId} label="order ID" />
          <p className="text-sm leading-6 text-muted">Target delivery: within {payment.deliveryHours} of reference submission, after checking the transaction. Keep your bank receipt until the files arrive.</p>
          <a href={supportUrl} className="button-secondary">Contact us about this order</a>
          <Link href="/products" className="button-primary">Browse other screeners</Link>
        </div>}
      </div>
      <aside className="order-first rounded-md border border-line bg-surface p-5 lg:sticky lg:top-24 lg:order-last" aria-label="Order summary">
        <h2 className="text-base font-medium">Your order</h2><p className="mt-3 text-sm leading-6 text-muted">{product.name}</p><p className="mt-3 font-mono text-2xl">{formatINR(amount)}</p><p className="mt-3 text-xs leading-6 text-muted">One-time payment. {product.whatYouGet}</p>
        {order && <div className="mt-4 border-t border-line pt-4"><p className="text-xs text-muted">Order ID</p><p className="mt-2 break-all font-mono text-xs">{order.orderId}</p><div className="mt-3"><CopyButton value={order.orderId} label="order ID" /></div></div>}
      </aside>
    </div>
  </div>;
}
