import { ImageResponse } from "next/og";
import { BrandIcon } from "@/components/BrandMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<BrandIcon size={180} />, { ...size });
}
