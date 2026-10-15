import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy · TradesWithAI",
  description: "Our refund policy regarding digital software downloads and source code delivery.",
  alternates: { canonical: "/refund-policy" },
  openGraph: {
    title: "Cancellation & Refund Policy · TradesWithAI",
    description: "Our refund policy regarding digital software downloads and source code delivery.",
    url: "/refund-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancellation & Refund Policy · TradesWithAI",
    description: "Our refund policy regarding digital software downloads and source code delivery.",
  },
};

export default function RefundPage() {
  return (
    <div>
      <PageHero
        eyebrow="LEGAL · REFUNDS"
        title="Cancellation & Refund Policy"
        sub="Clear terms regarding digital goods and software source code delivery."
      />

      <div className="mx-auto max-w-4xl px-6 py-14 space-y-10">
        <section className="card p-8 space-y-4">
          <h2 className="text-xl font-bold text-ink">Digital Goods Policy</h2>
          <p className="text-sm leading-relaxed text-mist">
            Because our screeners are digital downloads containing proprietary Python source code, all sales are
            generally final once files have been dispatched. We do not offer unconditional refunds after code delivery.
          </p>
        </section>

        <section className="card p-8 space-y-4">
          <h2 className="text-xl font-bold text-ink">Full Refund Guarantee</h2>
          <p className="text-sm leading-relaxed text-mist">We will promptly issue a 100% full refund if:</p>
          <ul className="space-y-2.5 text-sm text-mist">
            <li className="flex items-start gap-2">
              <span className="text-lime font-bold">✓</span>
              <span>You accidentally submitted a duplicate payment for the same order.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime font-bold">✓</span>
              <span>You transferred an incorrect or excess amount.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime font-bold">✓</span>
              <span>We fail to dispatch your files within the promised timeframe ({SITE.deliveryHours}).</span>
            </li>
          </ul>
        </section>

        <section className="card p-8 space-y-4">
          <h2 className="text-xl font-bold text-ink">Technical Assistance</h2>
          <p className="text-sm leading-relaxed text-mist">
            If you encounter any difficulty running or installing dependencies on your machine, please visit our{" "}
            <Link href="/contact" className="text-cyan underline underline-offset-4 min-h-[44px]">
              contact page
            </Link>{" "}
            or message us directly on WhatsApp, and our team will guide you through setup until it is running smoothly.
          </p>
        </section>
      </div>
    </div>
  );
}
