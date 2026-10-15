import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Backtest Any Indicator With AI · Master Prompt";

export default function Image() {
  return createOgImage({
    title: "Master AI Backtest Prompt",
    highlightTitle: "Turn TradingView into Python Code",
    subtitle: "5-step prompt for Claude to generate leak-free backtest engines with regime filters and SVG reports.",
    badge: "FREE PROMPT & GUIDE",
    kicker: "NEXT-BAR OPEN EXECUTION • COST SENSITIVITY • REGIME FILTERS",
  });
}
