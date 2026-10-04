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
    <a href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent('Hi, I want to acquire ')}`} 
       className="animate-pulse-glow fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 active:scale-95 sm:bottom-10 sm:right-10" 
       aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.383-.043c.108-.116.47-.548.596-.737.126-.188.253-.158.411-.101.159.058 1.001.472 1.174.559.173.087.289.13.332.202.043.073.043.423-.101.827zM11.99 2C6.471 2 2 6.484 2 12c0 1.846.53 3.57 1.46 5.05L2 22l5.13-1.39c1.45.86 3.11 1.34 4.86 1.34 5.518 0 9.99-4.484 9.99-9.95C21.98 6.484 17.508 2 11.99 2z"/>
      </svg>
    </a>
  </body></html>;
}
