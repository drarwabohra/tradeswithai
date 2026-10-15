import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import {
  Proof,
  ProductLine,
  TheFullShelf,
  StepByStep,
  FreeLibrary,
  Final,
} from "@/components/home/Chapters";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "TradesWithAI · Algorithmic Stock & Crypto Screeners",
  description:
    "Screen for breakouts, chart patterns, and momentum. Run the tools on your own computer. Full Python source code included. One-time payment.",
  openGraph: {
    title: "TradesWithAI · Algorithmic Stock & Crypto Screeners",
    description:
      "Screen for breakouts, chart patterns, and momentum. Run the tools on your own computer. Full Python source code included. One-time payment.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradesWithAI · Algorithmic Stock & Crypto Screeners",
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
      <TheFullShelf />
      <StepByStep />
      <FreeLibrary />
      <Final />
    </div>
  );
}
