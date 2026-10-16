import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "ChartNeural · Algorithmic Stock & Crypto Screeners";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    title: "Build your shortlist.",
    highlightTitle: "Then read the chart.",
    subtitle:
      "Stock and crypto screeners you run yourself. Complete source code, automated alerts, and setup guides included.",
    badge: "FIND THE SETUP. OWN THE CODE.",
  });
}
