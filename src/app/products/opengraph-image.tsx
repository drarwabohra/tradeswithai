import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Compare Screeners · TradesWithAI";

export default function Image() {
  return createOgImage({
    title: "Compare Screeners",
    highlightTitle: "Stock & Crypto Algorithms",
    subtitle: "Screen for breakouts, chart patterns, and momentum. Run tools locally with complete Python source code.",
    badge: "5 READY BUILDS",
    kicker: "FLAT ₹5,000 ONE-TIME • PYTHON 3.10+ • LOCAL EXECUTION",
  });
}
