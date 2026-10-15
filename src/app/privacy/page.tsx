import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TradesWithAI handles and protects customer information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy · TradesWithAI",
    description: "How TradesWithAI handles and protects customer information.",
    url: "/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy · TradesWithAI",
    description: "How TradesWithAI handles and protects customer information.",
  },
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        eyebrow="LEGAL · DATA PRIVACY"
        title="Privacy Policy"
        sub={`Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
      />

      <div className="mx-auto max-w-4xl px-6 py-14 space-y-10">
        <section className="card p-8 space-y-4">
          <h2 className="text-xl font-bold text-ink">Information We Collect</h2>
          <p className="text-sm leading-relaxed text-mist">
            We collect only the essential information needed to fulfill your order and provide direct setup support. This
            includes your name, WhatsApp number, and email address when you contact us or inquire about a purchase.
          </p>
        </section>

        <section className="card p-8 space-y-4">
          <h2 className="text-xl font-bold text-ink">How We Use Your Information</h2>
          <p className="text-sm leading-relaxed text-mist">
            Your contact details are used strictly to send software download links, verify payment confirmations, and
            provide direct setup walkthroughs. We never sell, rent, or share customer contact details with third-party
            marketers or data brokers.
          </p>
        </section>

        <section className="card p-8 space-y-4">
          <h2 className="text-xl font-bold text-ink">Payment Data Security</h2>
          <p className="text-sm leading-relaxed text-mist">
            We do not collect or store credit card numbers, CVVs, or banking passwords. Payments are conducted directly
            through your official banking or UPI applications.
          </p>
        </section>
      </div>
    </div>
  );
}
