import type { Metadata } from "next";
import { catalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { ProductCollection } from "@/components/ProductCollection";
import { Code2, Check } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Compare Screeners",
  description:
    "Explore our full catalog of Python stock and crypto screeners. Inspect features, demos, and acquire full source code with a flat one-time payment.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Compare Screeners · TradesWithAI",
    description:
      "Explore our full catalog of Python stock and crypto screeners. Inspect features, demos, and acquire full source code with a flat one-time payment.",
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Screeners · TradesWithAI",
    description:
      "Explore our full catalog of Python stock and crypto screeners. Inspect features, demos, and acquire full source code with a flat one-time payment.",
  },
};

export default function ProductsPage() {
  const cryptoCount = catalog.filter((p) => p.id === "crypto-breakout-scanner").length;

  return (
    <div>
      <PageHero
        eyebrow="THE TOOLKIT · 5 READY BUILDS"
        title={
          <>
            Find your next <span className="text-lime">setup.</span>
          </>
        }
        sub="Choose the markets and filters that fit your research. Explore each demo, run the code on your computer, and pay once."
      >
        <div className="flex flex-wrap gap-4 text-xs font-mono text-mist">
          <span className="flex items-center gap-1.5">
            <Code2 size={16} className="text-cyan" aria-hidden="true" /> Full source code included
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={16} className="text-lime" aria-hidden="true" /> Pay once, run locally forever
          </span>
        </div>
      </PageHero>

      <div className="mx-auto max-w-6xl px-6 py-14">
        {catalog.length ? (
          <ProductCollection
            counts={{ all: catalog.length, stocks: catalog.length - cryptoCount, crypto: cryptoCount }}
          >
            {catalog.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} />
            ))}
          </ProductCollection>
        ) : (
          <p className="mt-10 text-mist">No screeners are available right now. Contact us for availability.</p>
        )}
      </div>
    </div>
  );
}
