"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/format";
export function BuyBar({ id, price }: { id: string; price: number }) {
  const bar = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!bar.current) return;
    const footer = document.getElementById("site-footer");
    const node = bar.current;
    const measure = () => {
      const height = `${node.getBoundingClientRect().height}px`;
      document.documentElement.style.setProperty("--buybar-height", height);
      if (footer) footer.style.paddingBottom = height;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => { observer.disconnect(); document.documentElement.style.removeProperty("--buybar-height"); if (footer) footer.style.removeProperty("padding-bottom"); };
  }, []);
  return <div data-buybar ref={bar} className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
      <p className="font-mono text-lg">{formatINR(price)} <span className="block font-sans text-xs text-muted">One-time payment</span></p>
      <Link href={`/checkout/${id}`} className="button-primary">Buy screener</Link>
    </div>
  </div>;
}
