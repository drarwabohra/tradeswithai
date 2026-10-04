import type { Metadata } from "next";
import { catalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
export const metadata: Metadata = { title: "Compare screeners", alternates: { canonical: "/products" } };
export default function ProductsPage() {
  return <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
    <h1 className="text-4xl font-medium tracking-tight">Choose what to scan.</h1>
    <p className="mt-4 max-w-xl leading-7 text-muted">Compare markets, filters, and setup requirements before you buy.</p>
    {catalog.length ? <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{catalog.map(p => <ProductCard key={p.id} product={p} />)}</div> : <p className="mt-10 text-muted">No screeners are available right now. Contact us for availability.</p>}
  </div>;
}
