import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle, Monitor, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SITE } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Setup Verification",
  description: "Have questions about a screener, Python dependencies, or custom scanning logic? Get in touch directly.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Setup Verification · TradesWithAI",
    description: "Have questions about a screener, Python dependencies, or custom scanning logic? Get in touch directly.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Setup Verification · TradesWithAI",
    description: "Have questions about a screener, Python dependencies, or custom scanning logic? Get in touch directly.",
  },
};

export default function ContactPage() {
  const message = new URLSearchParams({
    text: "Hi, I have a question about a screener and its setup requirements.",
  });

  return (
    <div>
      <PageHero
        eyebrow="LET’S TALK · SETUP & SUPPORT"
        title={
          <>
            A little clarity. <br />
            <span className="text-cyan">Before you start.</span>
          </>
        }
        sub="Need help choosing a screener or verifying your computer is ready? Message us directly. We will answer all your questions before you buy."
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column: Quick WhatsApp + Form */}
          <div className="space-y-6">
            <a
              className="card card-hover flex flex-col justify-between p-6 border-lime/30 min-h-[44px] group"
              href={`https://wa.me/${SITE.whatsappNumber}?${message}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ["--hc" as string]: "#a8e10d" }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="chip text-lime border-lime/40 min-h-[28px]">FASTEST RESPONSE</span>
                  <MessageCircle size={24} className="text-lime" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-ink">Chat with us on WhatsApp</h2>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  Ask about features, setup requirements, operating systems, or code delivery.
                </p>
              </div>
              <span className="btn-primary mt-6 min-h-[44px] justify-between">
                <span>Open WhatsApp Chat</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </a>

            <div className="card p-6">
              <h2 className="text-lg font-bold text-ink mb-1">Send a Message</h2>
              <p className="text-xs text-mist mb-5">
                Fill out the quick form below to prepare your inquiry.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Right Column: Setup checklist & guidelines */}
          <aside className="card p-8 h-fit space-y-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan/15 text-cyan">
                <Monitor size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink">Helpful to include</h2>
                <p className="text-xs text-mist">Speeds up verification</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-mist border-t border-hairline pt-5">
              <li className="flex items-start gap-2.5">
                <Check size={16} className="text-lime shrink-0 mt-0.5" aria-hidden="true" />
                <span>The specific screener (Stock Breakout Screener, Falling Wedge Screener, etc.)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check size={16} className="text-lime shrink-0 mt-0.5" aria-hidden="true" />
                <span>Your operating system (Windows, macOS, or Linux)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check size={16} className="text-lime shrink-0 mt-0.5" aria-hidden="true" />
                <span>Whether you already have Python installed (3.10 or higher recommended)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check size={16} className="text-lime shrink-0 mt-0.5" aria-hidden="true" />
                <span>Any custom scanning filters or markets you need</span>
              </li>
            </ul>

            <div className="rounded-lg border border-hairline bg-abyss/60 p-4 text-xs text-dim leading-relaxed font-mono">
              <p className="text-mist font-semibold mb-1">Target Response Time</p>
              Code sent within 12 hours of payment confirmation (usually under 1 hour).
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
