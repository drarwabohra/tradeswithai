"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
    <button ref={trigger} type="button" className="icon-button border border-line" aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-controls="mobile-links" onClick={() => setExpandedPath(open ? null : pathname)}>{open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button>
    <nav id="mobile-links" aria-label="Mobile navigation" hidden={!open}
      className="mobile-menu">
      {[["/products", "Screeners"], ["/resources", "Free resources"], ["/contact", "Contact & setup"]].map(([href, label]) => <Link key={href} onClick={() => setExpandedPath(null)} aria-current={pathname.startsWith(href) ? "page" : undefined} href={href}>{label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}
    </nav>
  </div>;
}
