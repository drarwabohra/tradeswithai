"use client";

import { useEffect, useRef } from "react";

/** Content stays visible without JavaScript; motion is only an enhancement. */
export function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = container.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || motion.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        node.dataset.revealed = "true";
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} className={`scroll-reveal ${className}`}>{children}</div>;
}
