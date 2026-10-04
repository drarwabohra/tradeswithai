import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import { catalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  const preview = catalog.find(p => p.id === "breakout-screener") ?? catalog[0];
  return <div className="mx-auto max-w-6xl px-5 sm:px-6">
    <section className="grid gap-10 pt-12 pb-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:items-center">
      <div>
        <p className="mb-5 text-sm text-muted">Stock & crypto screening software</p>
        <h1 className="max-w-2xl text-4xl leading-[1.08] font-medium tracking-[-0.035em] sm:text-5xl lg:text-6xl">Build your shortlist.<br />Then read the chart.</h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-muted">Screen for breakouts, chart patterns, and momentum. Run the tools on your own computer. Source code included. One-time payment.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/products" className="button-primary">Compare screeners</Link><Link href="/contact" className="button-secondary">Ask about setup</Link></div>
      </div>
      {preview && <figure className="min-w-0">
        <Link href={`/products/${preview.id}`} className="relative block aspect-[4/3] rounded-md border border-line bg-surface" aria-label={`See ${preview.name}`}>
          <Image src={preview.gallery[0] ?? preview.thumbnail} alt={`${preview.name}: product interface`} fill preload
            sizes="(max-width: 1023px) calc(100vw - 40px), 530px" className="object-contain p-2" />
        </Link>
        <figcaption className="mt-3 text-xs text-muted">{preview.name}. See the product page for the full demo.</figcaption>
      </figure>}
    </section>
    <section aria-labelledby="catalog-heading" className="border-t border-line py-14">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3"><h2 id="catalog-heading" className="text-3xl font-medium tracking-tight">Choose what to scan.</h2><p className="text-sm text-muted">Five tools. Different jobs.</p></div>
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">{catalog.map(p => <ProductCard key={p.id} product={p} />)}</div>
    </section>
    <section aria-labelledby="purchase-heading" className="border-t border-line py-14">
      <h2 id="purchase-heading" className="text-3xl font-medium tracking-tight">From payment to setup.</h2>
      <ol className="mt-8 grid gap-8 md:grid-cols-3">
        {[ ["01", "Message us on WhatsApp", "Click the glowing WhatsApp icon or 'Buy screener' button to send us a message."],
           ["02", "Complete Payment", "We will guide you through the setup requirements and provide our direct payment details."],
           ["03", "Receive the files", `Once payment is confirmed, we instantly send the code and setup guide to your email or WhatsApp.`]
        ].map(([n, title, copy]) => <li key={n} className="border-t border-line pt-5"><span className="font-mono text-sm text-muted">{n}</span><h3 className="mt-3 text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{copy}</p></li>)}
      </ol>
    </section>
    <section className="flex flex-wrap items-center justify-between gap-6 border-t border-line py-10"><div><h2 className="text-xl font-medium">Not sure your computer is ready?</h2><p className="mt-2 text-sm text-muted">Send us the product name and your operating system.</p></div><Link href="/contact" className="button-secondary">Ask before buying</Link></section>
  </div>;
}
