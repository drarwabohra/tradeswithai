import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] flex items-center justify-center px-6 py-24 text-center overflow-hidden">
      <div className="hero-env pointer-events-none opacity-50" />
      <div className="relative z-10 max-w-xl mx-auto">
        <p className="eyebrow !text-cyan mb-3">404 · NOT FOUND</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-4 text-base text-mist leading-relaxed">
          The link you followed may be outdated, or the screener has been moved. Explore our catalog of Python trading tools or message us directly on WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/products" className="btn-primary min-h-[44px]">
            See all screeners
          </Link>
          <a
            href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
              "Hi, I have a question about TradesWithAI screeners."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !border-lime/40 text-lime hover:!border-lime min-h-[44px]"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
