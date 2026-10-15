"use client";

import { useLayoutEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import { formatINR } from "@/lib/format";

export function BuyBar({ price, name }: { price: number; name: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!bar.current) return;
    const node = bar.current;
    const measure = () => {
      const height = `${node.getBoundingClientRect().height}px`;
      document.documentElement.style.setProperty("--buybar-height", height);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--buybar-height");
    };
  }, []);

  const message = `Hi, I want to acquire ${name}.`;

  return (
    <div
      data-buybar
      ref={bar}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-abyss/95 backdrop-blur-md px-6 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden shadow-2xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <p className="font-mono text-lg font-bold text-lime">
          {formatINR(price)}{" "}
          <span className="block font-sans text-xs font-normal text-mist">One-time payment</span>
        </p>
        <a
          href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary min-h-[44px] !px-4 !text-xs !font-bold"
        >
          Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}
