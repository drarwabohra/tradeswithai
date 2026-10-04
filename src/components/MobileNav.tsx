"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function MobileNav() {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const open = expandedPath === pathname;
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setExpandedPath(null); trigger.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setExpandedPath(null);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return <div ref={root} className="relative md:hidden" onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setExpandedPath(null);
  }}>
    <button ref={trigger} type="button" className="button-secondary" aria-expanded={open}
      aria-controls="mobile-links" onClick={() => setExpandedPath(open ? null : pathname)}>Menu</button>
    <nav id="mobile-links" aria-label="Mobile navigation" hidden={!open}
      className="absolute right-0 top-full mt-2 w-56 rounded-md border border-line bg-background p-2">
      <Link onClick={() => setExpandedPath(null)} className="flex min-h-12 items-center px-3 hover:bg-surface" href="/products">Screeners</Link>
      <Link onClick={() => setExpandedPath(null)} className="flex min-h-12 items-center px-3 hover:bg-surface" href="/resources">Free Resources</Link>
      <Link onClick={() => setExpandedPath(null)} className="flex min-h-12 items-center px-3 hover:bg-surface" href="/contact">Contact</Link>
    </nav>
  </div>;
}
