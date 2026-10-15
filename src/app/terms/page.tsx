import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for purchasing and using TradesWithAI software and screeners.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service · TradesWithAI",
    description: "Terms and conditions for purchasing and using TradesWithAI software and screeners.",
    url: "/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service · TradesWithAI",
    description: "Terms and conditions for purchasing and using TradesWithAI software and screeners.",
  },
};

export default function TermsPage() {
  return (
    <div>
      <PageHero
        eyebrow="LEGAL · POLICIES"
        title="Terms of Service"
        sub={`Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
      />

      <div className="mx-auto max-w-4xl px-6 py-14 space-y-10">
        <section className="card p-8 space-y-4">
          <h2 className="text-xl font-bold text-ink">1. Agreement to Terms</h2>
          <p className="text-sm leading-relaxed text-mist">
            By accessing or purchasing from {SITE.name}, you agree to be bound by these Terms of Service. If you disagree
            with any part of these terms, you may not purchase or use our products.
          </p>
        </section>

        <section className="card p-8 space-y-4">
          <h2 className="text-xl font-bold text-ink">2. Intellectual Property & License</h2>
          <p className="text-sm leading-relaxed text-mist">
            When you purchase a screener, you are granted a non-exclusive, perpetual single-user license to run, inspect,
            and modify the provided source code on your personal devices. You may not resell, redistribute, sub-license,
            or publicly share the raw codebase.
          </p>
        </section>

        <section className="card p-8 space-y-4">
          <h2 className="text-xl font-bold text-ink">3. Educational Use & No Financial Advice</h2>
          <p className="text-sm leading-relaxed text-mist">
            Our software and screeners are provided strictly for educational and analytical purposes. We are not a
            SEBI-registered investment adviser or financial broker. No content on this website constitutes financial,
            investment, or trading advice. Trading in equities, derivatives, and crypto assets carries significant risk of
            loss.
          </p>
        </section>
      </div>
    </div>
  );
}
