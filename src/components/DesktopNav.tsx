"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export function DesktopNav() {
  const pathname = usePathname();
  return <nav aria-label="Main navigation" className="desktop-nav">
    {[["/products", "Screeners"], ["/resources", "Free resources"]].map(([href, label]) =>
      <Link href={href} key={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}
    <Link href="/contact" className="nav-contact" aria-current={pathname === "/contact" ? "page" : undefined}>Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Link>
  </nav>;
}
