"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import site from "@/data/site.json";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.brandName} home`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan to-lime shadow-[0_0_24px_-4px_rgb(65_196_225/0.7)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#06202b" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l5-6 4 3 8-9" />
          <path d="M15 5h5v5" />
        </svg>
      </span>
      <span className="text-[0.95rem] font-extrabold tracking-tight">
        TRADES <span className="text-lime">WITH</span> AI
      </span>
    </Link>
  );
}

export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setMobile(false);
  }, [path]);

  const navItems = [
    { label: "Screeners", href: "/products" },
    { label: "Free Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-hairline bg-abyss/85 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3.5 py-2 text-sm font-medium transition hover:text-ink ${
                path === item.href ? "text-ink font-semibold" : "text-mist"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi, I want to inquire about TradesWithAI screeners.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-4 !text-xs !font-bold"
          >
            Inquire on WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="p-2 md:hidden"
          aria-label="Menu"
          aria-expanded={mobile}
          onClick={() => setMobile((m) => !m)}
        >
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-4 bg-ink" />
        </button>
      </div>

      {mobile && (
        <div className="rise-in border-t border-hairline bg-abyss/95 px-6 pb-6 pt-2 backdrop-blur-xl md:hidden">
          {navItems.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={`block border-b border-hairline py-3.5 text-sm font-medium ${
                path === i.href ? "text-cyan" : "text-ink"
              }`}
            >
              {i.label}
            </Link>
          ))}
          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi, I want to inquire about TradesWithAI screeners.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
            >
              Inquire on WhatsApp
            </a>
            <Link href="/contact" className="btn-ghost w-full justify-center">
              Ask about setup
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
