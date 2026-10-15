import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Terms of Service · TradesWithAI";

export default function Image() {
  return createOgImage({
    title: "Terms of Service",
    highlightTitle: "Software & Source Code License",
    subtitle: "Clear terms on source code ownership, private use, personal installation, and educational nature.",
    badge: "LEGAL TERMS",
    kicker: "ONE-TIME PAYMENT • LIFETIME USAGE • NON-REDISTRIBUTION",
  });
}
