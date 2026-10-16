import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import {
  Proof,
  ProductLine,
  StepByStep,
  FreeLibrary,
  Final,
} from "@/components/home/Chapters";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "ChartNeural · Algorithmic Stock & Crypto Screeners" },
  description:
    "Screen for breakouts, chart patterns, and momentum. Run the tools on your own computer. Full Python source code included. One-time payment.",
  openGraph: {
    title: "ChartNeural · Algorithmic Stock & Crypto Screeners",
    description:
      "Screen for breakouts, chart patterns, and momentum. Run the tools on your own computer. Full Python source code included. One-time payment.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChartNeural · Algorithmic Stock & Crypto Screeners",
    description:
      "Screen for breakouts, chart patterns, and momentum. Run the tools on your own computer. Full Python source code included. One-time payment.",
  },
};

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <Proof />
      <ProductLine />
      <StepByStep />
      <FreeLibrary />
      <Final />
    </div>
  );
}
