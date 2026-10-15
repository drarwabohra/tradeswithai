import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contact & Setup Verification · TradesWithAI";

export default function Image() {
  return createOgImage({
    title: "Contact & Setup",
    highlightTitle: "Direct WhatsApp Support",
    subtitle: "Ask about operating system requirements, Python dependencies, and screener functionality before buying.",
    badge: "DIRECT HUMAN SUPPORT",
    kicker: "WHATSAPP: +91 8529261547 • SETUP VERIFICATION • CODE DISPATCH",
  });
}
