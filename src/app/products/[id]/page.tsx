import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import { catalog, findProduct } from "@/lib/catalog";
import { formatINR } from "@/lib/format";
import { BuyBar } from "@/components/BuyBar";
type Props = { params: Promise<{ id: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return catalog.map(p => ({ id: p.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = findProduct((await params).id);
  if (!product) notFound();
  return {
    title: `${product.name} — source code & setup guide`, description: product.shortDescription,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: { type: "website", title: product.name, description: product.shortDescription,
      url: `/products/${product.id}`, images: [{ url: product.thumbnail, alt: product.name }] },
    twitter: { card: "summary_large_image", title: product.name, description: product.shortDescription,
      images: [product.thumbnail] },
  };
}
export default async function ProductPage({ params }: Props) {
  const product = findProduct((await params).id);
  if (!product) notFound();
  const schema = {
    "@context": "https://schema.org", "@type": "Product", name: product.name,
    description: product.shortDescription, image: product.thumbnail ? new URL(product.thumbnail, site.url).href : undefined,
    offers: { "@type": "Offer", price: product.price, priceCurrency: "INR",
      url: new URL(`/products/${product.id}`, site.url).href },
  };
  return <div className="product-page site-container py-10 sm:py-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Link href="/products" className="inline-flex min-h-11 items-center text-sm text-muted">← All screeners</Link>
    <div className="mt-5 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <h1 className="text-3xl font-medium tracking-tight sm:text-5xl">{product.name}</h1>
        <p className="mt-5 text-base leading-7 text-muted">{product.shortDescription}</p>
        <section className="mt-8 border-y border-line py-5 lg:hidden" aria-label="Purchase summary">
          <p className="font-mono text-2xl">{formatINR(product.price)} <span className="font-sans text-sm text-muted">one-time payment</span></p>
          <p className="mt-3 text-sm leading-6 text-muted">{product.whatYouGet}</p>
          <p className="mt-3 text-sm leading-6">Requires {product.setupRequirements}.</p>
          <a className="button-primary mt-4" href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent('Hi, I want to acquire ' + product.name + '.')}`}>Inquire on WhatsApp</a>
        </section>
        <section className="mt-10" aria-labelledby="demo-heading">
          <h2 id="demo-heading" className="text-2xl font-medium">See it in use.</h2>
          <div className="mt-5 aspect-[4/3] overflow-hidden rounded-md border border-line bg-surface">
            <video src={product.video} controls playsInline preload="none" poster={`${product.video.slice(0, product.video.lastIndexOf("/"))}/poster.webp`}
              aria-label={`${product.name} demonstration`} className="h-full w-full object-contain">
              <a href={product.video}>Download the demo video</a>
            </video>
          </div>
          <p className="mt-3 text-sm text-muted">Product demonstration. Review the filters and interface before buying.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {product.gallery.map((src, index) => <a href={src} key={src} target="_blank" rel="noreferrer"
              className="relative block aspect-[4/3] overflow-hidden rounded-md border border-line bg-surface" aria-label={`Open ${product.name} screenshot ${index + 1} in a new tab`}>
              <Image src={src} alt={`${product.name} screenshot ${index + 1}`} fill sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc((100vw - 64px) / 2), 374px" className="object-contain p-2" />
            </a>)}
          </div>
        </section>
        <section className="mt-12 border-t border-line pt-8"><h2 className="text-2xl font-medium">What it does.</h2><ul className="mt-5 space-y-3">{product.features.map(feature => <li key={feature} className="border-b border-line pb-3 text-sm leading-6 text-muted">{feature}</li>)}</ul></section>
        <section className="mt-12 border-t border-line pt-8"><h2 className="text-2xl font-medium">Before you buy.</h2><p className="mt-4 leading-7">{product.setupRequirements}</p><p className="mt-4 text-sm leading-6 text-muted">This is software you install and run yourself. It does not place trades. Review the <Link href="/refund-policy" className="underline underline-offset-4">refund policy</Link> and ask us about setup if anything is unclear.</p></section>
        <section className="mt-12 border-t border-line pt-8"><h2 className="text-2xl font-medium">What you receive.</h2><p className="mt-4 leading-7 text-muted">{product.whatYouGet}</p><p className="mt-4 text-sm leading-6 text-muted">Message us on WhatsApp to get payment details. We verify the payment manually, then instantly send the files to you via WhatsApp or Email.</p></section>
        <section className="mt-12 border-t border-line pt-8"><h2 className="text-2xl font-medium">Questions before purchase.</h2><div className="mt-4 divide-y divide-line">{product.faqs.map(faq => <details key={faq.question} className="py-2"><summary className="flex min-h-12 items-center font-medium">{faq.question}</summary><p className="pb-4 text-sm leading-7 text-muted">{faq.answer}</p></details>)}<details className="py-2"><summary className="flex min-h-12 items-center font-medium">My files have not arrived. What should I do?</summary><p className="pb-4 text-sm leading-7 text-muted">Contact us directly on WhatsApp and we will send them to you instantly.</p></details></div></section>
      </div>
      <aside className="sticky top-24 hidden rounded-md border border-line bg-surface p-6 lg:block" aria-label="Purchase summary">
        <p className="text-sm text-muted">One-time payment</p><p className="mt-3 font-mono text-4xl">{formatINR(product.price)}</p>
        <p className="mt-5 text-sm leading-6 text-muted">{product.whatYouGet}</p>
        <p className="mt-5 border-t border-line pt-5 text-sm leading-6">Requires {product.setupRequirements}.</p>
        <a href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent('Hi, I want to acquire ' + product.name + '.')}`} className="button-primary mt-6 w-full">Inquire on WhatsApp</a>
        <p className="mt-4 text-xs leading-6 text-muted">Direct WhatsApp payment verification. Instant delivery.</p>
        <Link href="/contact" className="mt-3 flex min-h-11 items-center text-sm underline underline-offset-4">Ask about setup</Link>
      </aside>
    </div><BuyBar price={product.price} name={product.name} />
  </div>;
}
