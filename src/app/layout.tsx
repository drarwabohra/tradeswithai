import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import site from "@/data/site.json";
import { MobileNav } from "@/components/MobileNav";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#101113" };
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Trading screeners with source code | TradesWithAI", template: "%s | TradesWithAI" },
  description: "Stock and crypto screeners you run yourself. Compare features, watch a demo, and buy the source code with a one-time payment.",
  openGraph: { type: "website", siteName: site.brandName, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${inter.variable} ${mono.variable} flex min-h-screen flex-col font-sans antialiased`}>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-foreground focus:p-3 focus:text-background">Skip to content</a>
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <div className="mx-auto flex min-h-18 max-w-6xl items-center justify-between gap-3 px-5 sm:px-6">
        <Link href="/" aria-label="TradesWithAI home" className="flex min-h-12 items-center text-base font-semibold tracking-tight sm:text-lg">TRADES WITH AI<span className="ml-1 text-accent">.</span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          <Link href="/products" className="flex min-h-12 items-center text-sm text-muted hover:text-foreground">Screeners</Link>
          <Link href="/resources" className="flex min-h-12 items-center text-sm text-muted hover:text-foreground">Free Resources</Link>
          <Link href="/contact" className="button-secondary">Contact</Link>
        </nav>
        <MobileNav />
      </div>
    </header>
    <main id="main-content" className="flex-1">{children}</main>
    <footer id="site-footer" className="mt-20 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-3">
        <div><p className="font-semibold">TradesWithAI</p><p className="mt-3 max-w-sm text-sm leading-6 text-muted">Trading screeners you run yourself. Source code and setup instructions included.</p></div>
        <nav aria-label="Footer links" className="flex flex-col items-start text-sm">
          <Link className="flex min-h-11 items-center" href="/products">Screeners</Link>
          <Link className="flex min-h-11 items-center" href="/resources">Free Resources</Link>
          <Link className="flex min-h-11 items-center" href="/terms">Terms</Link>
          <Link className="flex min-h-11 items-center" href="/privacy">Privacy</Link>
          <Link className="flex min-h-11 items-center" href="/refund-policy">Refund policy</Link>
        </nav>
        <div className="text-sm">
          <a className="flex min-h-11 items-center break-all" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
          <a className="flex min-h-11 items-center" href={`https://wa.me/${site.whatsappNumber}`}>Contact on WhatsApp</a>
          <p className="mt-4 text-xs leading-6 text-muted">Software for market analysis. We are not a SEBI-registered investment adviser. Trading involves risk.</p>
        </div>
        <p className="text-xs text-muted md:col-span-3">© {new Date().getFullYear()} {site.brandName}</p>
      </div>
    </footer>
  </body></html>;
}
