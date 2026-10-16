import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Free Resources · ChartNeural";

export default function Image() {
  return createOgImage({
    title: "Free Resources",
    highlightTitle: "AI Strategy Guides & Prompts",
    subtitle: "Turn TradingView indicators into backtested Python strategies using Claude AI. Zero paywalls.",
    badge: "100% FREE",
    kicker: "CLAUDE 3.5 SONNET • TRADINGVIEW • ZERO EMAIL GATES",
  });
}
