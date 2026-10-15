import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, SITE } from "@/lib/site";
import { catalog, findProduct } from "@/lib/catalog";
import { formatINR } from "@/lib/format";
import { BuyBar } from "@/components/BuyBar";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return catalog.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = findProduct((await params).id);
  if (!product) notFound();
  const canonicalUrl = `${SITE_URL}/products/${product.id}`;
  return {
    title: `${product.name} · Source Code & Setup Guide`,
    description: product.shortDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      title: `${product.name} · Source Code & Setup Guide`,
      description: product.shortDescription,
      url: canonicalUrl,
      images: [
        {
          url: `${SITE_URL}/products/${product.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} · Source Code & Setup Guide`,
      description: product.shortDescription,
      images: [`${SITE_URL}/products/${product.id}/opengraph-image`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = findProduct((await params).id);
  if (!product) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.thumbnail ? `${SITE_URL}${product.thumbnail}` : undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      url: `${SITE_URL}/products/${product.id}`,
    },
  };

  return (
    <div className="product-page mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Link href="/products" className="inline-flex min-h-[44px] items-center text-sm text-mist hover:text-ink">
        ← All screeners
      </Link>
      <div className="mt-5 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-ink">{product.name}</h1>
          <p className="mt-5 text-base leading-7 text-mist">{product.shortDescription}</p>

          <section className="mt-8 border-y border-hairline py-5 lg:hidden" aria-label="Purchase summary">
            <p className="font-mono text-2xl font-bold text-lime">
              {formatINR(product.price)} <span className="font-sans text-sm text-mist">one-time payment</span>
            </p>
            <p className="mt-3 text-sm leading-6 text-mist">{product.whatYouGet}</p>
            <p className="mt-3 text-sm leading-6 text-ink">Requires {product.setupRequirements}.</p>
            <a
              className="btn-primary mt-4 w-full justify-center min-h-[44px]"
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
                "Hi, I want to buy the " + product.name + ". My OS is: "
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inquire on WhatsApp
            </a>
          </section>

          <section className="mt-10" aria-labelledby="demo-heading">
            <h2 id="demo-heading" className="text-2xl font-bold text-ink">
              See it in use.
            </h2>
            <div className="mt-5 aspect-[4/3] overflow-hidden rounded-xl border border-hairline bg-surface">
              <video
                src={product.video}
                controls
                playsInline
                preload="none"
                poster={`${product.video.slice(0, product.video.lastIndexOf("/"))}/poster.webp`}
                aria-label={`${product.name} demonstration`}
                className="h-full w-full object-contain"
              >
                <a href={product.video}>Download the demo video</a>
              </video>
            </div>
            <p className="mt-3 text-sm text-mist">
              Product demonstration. Review the filters and interface before buying.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {product.gallery.map((src, index) => (
                <a
                  href={src}
                  key={src}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block aspect-[4/3] overflow-hidden rounded-xl border border-hairline bg-surface min-h-[44px]"
                  aria-label={`Open ${product.name} screenshot ${index + 1} in a new tab`}
                >
                  <Image
                    src={src}
                    alt={`${product.name} screenshot ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    priority={index === 0}
                    className="object-contain p-2"
                  />
                </a>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-hairline pt-8">
            <h2 className="text-2xl font-bold text-ink">What it does.</h2>
            <ul className="mt-5 space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="border-b border-hairline pb-3 text-sm leading-6 text-mist flex items-start gap-2">
                  <span className="text-lime font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 border-t border-hairline pt-8">
            <h2 className="text-2xl font-bold text-ink">Before you buy.</h2>
            <p className="mt-4 leading-7 text-mist">{product.setupRequirements}</p>
            <p className="mt-4 text-sm leading-6 text-dim">
              This is software you install and run yourself. It does not place automated trades. Review our{" "}
              <Link href="/refund-policy" className="text-cyan underline underline-offset-4">
                refund policy
              </Link>{" "}
              and ask us about setup if anything is unclear.
            </p>
          </section>

          <section className="mt-12 border-t border-hairline pt-8">
            <h2 className="text-2xl font-bold text-ink">What you receive.</h2>
            <p className="mt-4 leading-7 text-mist">{product.whatYouGet}</p>
            <p className="mt-4 text-sm leading-6 text-mist">
              Message us on WhatsApp to confirm your setup and get payment details. We verify the payment manually. Code sent within 12 hours of payment confirmation (usually under 1 hour).
            </p>
          </section>

          <section className="mt-12 border-t border-hairline pt-8">
            <h2 className="text-2xl font-bold text-ink">Questions before purchase.</h2>
            <div className="mt-4 divide-y divide-hairline">
              {product.faqs.map((faq) => (
                <details key={faq.question} className="py-2.5">
                  <summary className="flex min-h-[44px] items-center justify-between font-medium cursor-pointer text-ink">
                    <span>{faq.question}</span>
                  </summary>
                  <p className="pb-4 text-sm leading-7 text-mist">{faq.answer}</p>
                </details>
              ))}
              <details className="py-2.5">
                <summary className="flex min-h-[44px] items-center justify-between font-medium cursor-pointer text-ink">
                  <span>My files have not arrived. What should I do?</span>
                </summary>
                <p className="pb-4 text-sm leading-7 text-mist">
                  Contact us directly on WhatsApp or via our{" "}
                  <Link href="/contact" className="text-cyan underline">
                    contact page
                  </Link>
                  , and we will verify your payment and send your files right away.
                </p>
              </details>
            </div>
          </section>
        </div>

        <aside
          className="sticky top-24 hidden rounded-xl border border-hairline bg-surface p-6 lg:block shadow-xl"
          aria-label="Purchase summary"
        >
          <p className="text-sm text-dim font-mono uppercase tracking-wider">One-time payment</p>
          <p className="mt-3 font-mono text-4xl font-bold text-lime">{formatINR(product.price)}</p>
          <p className="mt-5 text-sm leading-6 text-mist">{product.whatYouGet}</p>
          <p className="mt-5 border-t border-hairline pt-5 text-sm leading-6 text-ink">
            Requires {product.setupRequirements}.
          </p>
          <a
            href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
              "Hi, I want to buy the " + product.name + ". My OS is: "
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 w-full justify-center min-h-[44px]"
          >
            Inquire on WhatsApp
          </a>
          <p className="mt-4 text-xs leading-6 text-mist font-mono">
            Code sent within 12 hours of payment confirmation (usually under 1 hour).
          </p>
          <Link
            href="/contact"
            className="mt-3 flex min-h-[44px] items-center text-sm text-cyan hover:underline underline-offset-4"
          >
            Ask about setup →
          </Link>
        </aside>
      </div>
      <BuyBar price={product.price} name={product.name} />
    </div>
  );
}
