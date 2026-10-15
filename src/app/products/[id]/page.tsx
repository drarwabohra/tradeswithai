import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, SITE } from "@/lib/site";
import { catalog, findProduct, type Product } from "@/lib/catalog";
import { formatINR } from "@/lib/format";
import { BuyBar } from "@/components/BuyBar";
import { GalleryLightbox } from "@/components/GalleryLightbox";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return catalog.map((p) => ({ id: p.id }));
}

const VIDEO_DURATIONS: Record<string, string> = {
  "breakout-screener": "1:04",
  "falling-wedge-screener": "1:07",
  "crypto-breakout-scanner": "0:41",
  "insider-trading-screener": "1:07",
  "momentum-value-screener": "0:53",
};

function getProductSpecs(product: Product) {
  let dataSource = "[FILL IN]";
  if (product.id === "crypto-breakout-scanner") {
    dataSource = "Hyperliquid public API ([FILL IN delay])";
  } else if (product.id === "insider-trading-screener") {
    dataSource = "Official disclosure filings ([FILL IN sources], not real-time)";
  } else if (product.id === "momentum-value-screener") {
    dataSource = "Yahoo Finance (delayed market data)";
  }

  let extraTools = "[FILL IN]";
  if (product.id === "breakout-screener" || product.id === "crypto-breakout-scanner") {
    extraTools = "Telegram Bot Token (optional)";
  } else if (product.id === "falling-wedge-screener") {
    extraTools = "FastAPI, Node.js (for frontend)";
  } else if (product.id === "insider-trading-screener" || product.id === "momentum-value-screener") {
    extraTools = "Node.js (for frontend)";
  }

  return [
    { label: "Data source and delay", value: dataSource },
    { label: "Tested on (OS)", value: "[FILL IN]" },
    { label: "Python version", value: "Python 3.10+" },
    { label: "Extra tools needed", value: extraTools },
    { label: "What you get", value: product.whatYouGet },
    { label: "Updates", value: "[FILL IN]" },
    { label: "Support", value: "Free setup help via WhatsApp ([FILL IN])" },
    { label: "Licence", value: "Personal single-user license (run and modify locally; no redistribution)" },
  ];
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

  const specs = getProductSpecs(product);

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
            <Link
              href="/contact"
              className="mt-3 flex min-h-[44px] items-center text-sm text-cyan hover:underline underline-offset-4"
              aria-label="Ask about setup on our contact page"
            >
              Ask about setup →
            </Link>

            {/* 29. How buying works mini-list */}
            <div className="mt-5 border-t border-hairline pt-4">
              <p className="font-mono text-xs uppercase tracking-wider text-ink font-semibold mb-2.5">How buying works</p>
              <ol className="space-y-1.5 text-xs text-mist list-decimal list-inside leading-relaxed">
                <li>Message on WhatsApp</li>
                <li>We check your PC setup</li>
                <li>Pay ([FILL IN payment methods])</li>
                <li>Code + setup guide within 12 hours</li>
                <li>Free setup help</li>
              </ol>
            </div>

            {/* 30. Disclaimer repeated under price card */}
            <p className="mt-4 text-[13px] leading-relaxed text-mist border-t border-hairline pt-3">
              Software for education and analysis only. Not investment advice. We are not a SEBI-registered adviser.
            </p>
          </section>

          <section className="mt-10" aria-labelledby="demo-heading">
            <div className="flex items-center gap-3">
              <h2 id="demo-heading" className="text-2xl font-bold text-ink">
                See it in use.
              </h2>
              <span className="rounded border border-hairline bg-surface px-2.5 py-1 font-mono text-xs text-cyan">
                {VIDEO_DURATIONS[product.id] || "1:00"}
              </span>
            </div>
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
                <track kind="captions" src="" label="English" />
                <a href={product.video}>Download the demo video</a>
              </video>
            </div>
            <p className="mt-3 text-sm text-mist">
              Product demonstration. Review the filters and interface before buying.
            </p>
            <GalleryLightbox images={product.gallery} productName={product.name} />
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

          {/* 28. Specs box above What you receive */}
          <section className="mt-12 border-t border-hairline pt-8" aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="text-2xl font-bold text-ink">
              Specs.
            </h2>
            <div className="mt-5 overflow-hidden rounded-xl border border-hairline bg-surface">
              <dl className="divide-y divide-hairline">
                {specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-1 sm:grid-cols-[13rem_1fr] p-4 text-sm gap-1 sm:gap-4">
                    <dt className="font-mono text-xs uppercase tracking-wider text-dim">{spec.label}</dt>
                    <dd className="text-ink font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
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
                  <Link href="/contact" className="text-cyan underline" aria-label="Contact page">
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
            aria-label="Ask about setup on our contact page"
          >
            Ask about setup →
          </Link>

          {/* 29. How buying works mini-list */}
          <div className="mt-6 border-t border-hairline pt-5">
            <p className="font-mono text-xs uppercase tracking-wider text-ink font-semibold mb-3">How buying works</p>
            <ol className="space-y-2 text-xs text-mist list-decimal list-inside leading-relaxed">
              <li>Message on WhatsApp</li>
              <li>We check your PC setup</li>
              <li>Pay ([FILL IN payment methods])</li>
              <li>Code + setup guide within 12 hours</li>
              <li>Free setup help</li>
            </ol>
          </div>

          {/* 30. Disclaimer repeated under price card */}
          <p className="mt-4 text-[13px] leading-relaxed text-mist border-t border-hairline pt-4">
            Software for education and analysis only. Not investment advice. We are not a SEBI-registered adviser.
          </p>
        </aside>
      </div>
      <BuyBar price={product.price} name={product.name} />
    </div>
  );
}
