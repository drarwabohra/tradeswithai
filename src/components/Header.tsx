"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { catalog } from "@/lib/catalog";
import { BrandMark } from "./BrandMark";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 min-h-[44px]" aria-label={`${SITE.name} home`}>
      <BrandMark size={32} />
      <span className="text-[1.1rem] font-extrabold tracking-[-0.02em]">
        Chart<span className="text-lime">Neural</span>
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

  // Close on route change
  useEffect(() => {
    setMobile(false);
  }, [path]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock page scroll while open
  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  // Product specific WhatsApp prefill on /products/[slug]
  const isProductPage = path.startsWith("/products/") && path !== "/products";
  const slug = isProductPage ? path.split("/")[2] : null;
  const currentProduct = slug ? catalog.find((p) => p.id === slug) : null;

  const whatsappMessage = currentProduct
    ? `Hi, I want to buy the ${currentProduct.name}. My OS is: `
    : "Hi, I have a question about ChartNeural screeners.";

  const whatsappUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const navItems = [
    { label: "Screeners", href: "/products" },
    { label: "Free Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || mobile ? "border-b border-hairline bg-abyss/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3.5 py-2 text-sm font-medium transition hover:text-ink min-h-[44px] flex items-center ${
                  path === item.href ? "text-ink font-semibold" : "text-mist"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-2 !px-4 !text-xs !font-bold min-h-[44px]"
            >
              Inquire on WhatsApp
            </a>
          </div>

          <button
            type="button"
            className="p-2 md:hidden min-h-[44px] min-w-[44px] flex flex-col justify-center items-center text-ink"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="16" y2="17" />
              </svg>
            )}
          </button>
        </div>

        {mobile && (
          <div
            id="mobile-nav-panel"
            className="rise-in border-t border-hairline bg-abyss/98 px-6 pb-6 pt-2 backdrop-blur-2xl md:hidden relative z-50"
          >
            {navItems.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setMobile(false)}
                className={`block border-b border-hairline py-3.5 text-sm font-medium min-h-[44px] flex items-center ${
                  path === i.href ? "text-cyan" : "text-ink"
                }`}
              >
                {i.label}
              </Link>
            ))}
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobile(false)}
                className="btn-primary w-full justify-center min-h-[44px]"
              >
                Inquire on WhatsApp
              </a>
              <Link
                href="/contact"
                onClick={() => setMobile(false)}
                className="btn-ghost w-full justify-center min-h-[44px]"
              >
                Ask about setup
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Dimmed backdrop */}
      {mobile && (
        <div
          aria-hidden="true"
          onClick={() => setMobile(false)}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm transition-opacity md:hidden"
        />
      )}
    </>
  );
}
