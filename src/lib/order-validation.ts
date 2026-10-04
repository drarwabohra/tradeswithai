export type FieldErrors = Partial<Record<"name" | "email" | "whatsapp" | "utr" | "agreed", string>>;
export type Details = { name: string; email: string; whatsapp: string };
const str = (v: unknown) => typeof v === "string" ? v : "";
// Normalize presentation characters; never extract a plausible substring from bad input.
export const normalizeName = (v: unknown) => str(v).normalize("NFKC").replace(/\s+/gu, " ").trim();
export const normalizeEmail = (v: unknown) => str(v).trim();
export const normalizeUtr = (v: unknown) => str(v).replace(/\s+/gu, "");
export function normalizePhone(v: unknown) {
  let value = str(v).replace(/[\s().-]/g, "");
  if (/^(?:\+91|0091)[6-9]\d{9}$/.test(value)) value = value.replace(/^(?:\+91|0091)/, "");
  else if (/^91[6-9]\d{9}$/.test(value)) value = value.slice(2);
  return value;
}
export function validateDetails(input: Record<string, unknown>) {
  const details: Details = {
    name: normalizeName(input.name), email: normalizeEmail(input.email),
    whatsapp: normalizePhone(input.whatsapp),
  };
  const errors: FieldErrors = {};
  if (details.name.length < 2 || details.name.length > 100 ||
      /[\p{Cc}\p{Cf}<>]/u.test(details.name) || !/\p{L}/u.test(details.name)) {
    errors.name = "Enter a name between 2 and 100 characters.";
  }
  const [local, domain, extra] = details.email.split("@");
  const validLocal = !!local && local.length <= 64 && !local.startsWith(".") && !local.endsWith(".") &&
    !local.includes("..") && /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local);
  const validDomain = !!domain && domain.length <= 253 && domain.includes(".") &&
    domain.split(".").every(label => /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(label));
  if (extra !== undefined || details.email.length > 254 || !validLocal || !validDomain) {
    errors.email = "Enter an email address we can send the files to.";
  }
  if ((input.whatsapp !== undefined && typeof input.whatsapp !== "string") ||
      (details.whatsapp && !/^[6-9]\d{9}$/.test(details.whatsapp))) {
    errors.whatsapp = "Enter a 10-digit Indian mobile number, or leave this blank.";
  }
  return { details, errors, valid: Object.keys(errors).length === 0 };
}
export function validateReceipt(input: Record<string, unknown>) {
  const utr = normalizeUtr(input.utr);
  const errors: FieldErrors = {};
  if (!/^\d{12}$/.test(utr)) errors.utr = "Enter the full 12-digit UPI reference. Spaces are allowed.";
  if (input.agreed !== true) errors.agreed = "Confirm that you have read the setup requirements and refund policy.";
  return { utr, errors, valid: Object.keys(errors).length === 0 };
}
