import { createOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Privacy Policy · ChartNeural";

export default function Image() {
  return createOgImage({
    title: "Privacy Policy",
    highlightTitle: "Data Protection & Privacy",
    subtitle: "We do not sell personal data, store brokerage passwords, or inject telemetry into local code.",
    badge: "PRIVACY FIRST",
    kicker: "NO TRACKERS • NO TELEMETRY • OFFLINE CODE EXECUTION",
  });
}
