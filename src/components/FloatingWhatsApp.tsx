"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { catalog } from "@/lib/catalog";

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
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 transition-transform group-hover:scale-110">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.383-.043c.108-.116.47-.548.596-.737.126-.188.253-.158.411-.101.159.058 1.001.472 1.174.559.173.087.289.13.332.202.043.073.043.423-.101.827zM11.99 2C6.471 2 2 6.484 2 12c0 1.846.53 3.57 1.46 5.05L2 22l5.13-1.39c1.45.86 3.11 1.34 4.86 1.34 5.518 0 9.99-4.484 9.99-9.95C21.98 6.484 17.508 2 11.99 2z" />
      </svg>
    </a>
  );
}
