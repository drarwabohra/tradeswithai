import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Cancellation & Refund Policy · TradesWithAI";

export default function Image() {
  return createOgImage({
    title: "Cancellation & Refund Policy",
    highlightTitle: "Digital Software & Source Code",
    subtitle: "Clear policies on pre-delivery cancellations, technical setup issues, and digital goods delivery.",
    badge: "REFUND POLICY",
    kicker: "VERIFIED MANUAL SETUP • TECHNICAL ASSISTANCE • TRANSPARENT TERMS",
  });
}
