import type { Metadata } from "next";
import { catalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { ProductCollection } from "@/components/ProductCollection";
import { Code2, Check } from "lucide-react";
export const metadata: Metadata = { title: "Compare screeners", alternates: { canonical: "/products" } };
export default function ProductsPage() {
  const cryptoCount = catalog.filter(p => p.id === "crypto-breakout-scanner").length;
  return <div className="site-container page-section">
    <header className="page-heading"><p className="eyebrow"><span className="status-dot" /> THE TOOLKIT</p><h1>Find your next <span className="text-accent">setup.</span></h1><p>Choose the markets and filters that fit your research.<br className="hidden sm:block" /> Explore each demo and check the requirements before you buy.</p>
      <div className="hero-notes"><span><Code2 size={15} aria-hidden="true" /> Source code included</span><span><Check size={15} aria-hidden="true" /> Pay once, run locally</span></div>
    </header>
    {catalog.length ? <ProductCollection counts={{ all: catalog.length, stocks: catalog.length - cryptoCount, crypto: cryptoCount }}>{catalog.map(p => <ProductCard key={p.id} product={p} />)}</ProductCollection> : <p className="mt-10 text-muted">No screeners are available right now. Contact us for availability.</p>}
  </div>;
}
