"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { catalog } from "@/lib/catalog";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);

  // Check if on /products/[slug]
  const isProductPage = path.startsWith("/products/") && path !== "/products";
  const slug = isProductPage ? path.split("/")[2] : null;
  const currentProduct = slug ? catalog.find((p) => p.id === slug) : null;

  const prefill = currentProduct
    ? `Hi, I want to buy the ${currentProduct.name}. My OS is: `
    : "Hi, I have a question about ChartNeural screeners.";

  const whatsappUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(prefill)}`;

  // Hide while the footer, the mobile buy bar or another WhatsApp button is on screen.
  // An IntersectionObserver reports these without measuring layout on every scroll.
  useEffect(() => {
    const onScreen = new Set<Element>();
    const decide = () =>
      setHidden(
        Array.from(onScreen).some((el) => {
          const s = window.getComputedStyle(el);
          return s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0";
        }),
      );
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target);
        else onScreen.delete(e.target);
      }
      decide();
    });
    const watch = () => {
      io.disconnect();
      onScreen.clear();
      document
        .querySelectorAll('[data-buybar], footer, a[href*="wa.me"]:not([data-floating-wa])')
        .forEach((el) => io.observe(el));
    };
    watch();
    const late = setTimeout(watch, 1500); // pick up anything rendered after hydration
    return () => {
      clearTimeout(late);
      io.disconnect();
    };
  }, [path]);

  return (
    <a
      data-floating-wa
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-float group ${
        hidden ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 translate-y-0"
      } transition-all duration-300`}
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip on hover */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-panel border border-hairline px-3 py-1.5 font-mono text-xs font-semibold text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 shadow-2xl">
        Chat on WhatsApp
      </span>
      <WhatsAppIcon className="h-7 w-7 transition-transform group-hover:scale-110" />
    </a>
  );
}
