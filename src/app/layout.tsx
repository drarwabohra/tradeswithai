import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ArrowUpRight, ChartNoAxesCombined, MessageCircle } from "lucide-react";
import site from "@/data/site.json";
import { MobileNav } from "@/components/MobileNav";
import { DesktopNav } from "@/components/DesktopNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#131722" };
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Trading screeners with source code | TradesWithAI", template: "%s | TradesWithAI" },
  description: "Stock and crypto screeners you run yourself. Compare features, watch a demo, and buy the source code with a one-time payment.",
  openGraph: { type: "website", siteName: site.brandName, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
    <head><script id="theme-init" dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem("tradeswithai-theme")==="light"?"light":"dark"}catch{}` }} /></head>
    <body className={`${inter.variable} flex min-h-screen flex-col font-sans antialiased`}>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" aria-label="TradesWithAI home" className="brand"><span className="brand-icon"><ChartNoAxesCombined size={21} strokeWidth={2} aria-hidden="true" /></span><span>trades<span className="brand-muted">with</span>ai<span className="text-accent">.</span></span></Link>
        <div className="header-actions"><DesktopNav /><ThemeToggle /><MobileNav /></div>
      </div>
    </header>
    <main id="main-content" className="flex-1">{children}</main>
    <footer id="site-footer" className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div><Link href="/" className="brand"><span className="brand-icon"><ChartNoAxesCombined size={21} aria-hidden="true" /></span><span>trades<span className="brand-muted">with</span>ai<span className="text-accent">.</span></span></Link><p className="footer-description">Less noise. More signal.<br />Market research tools you can make your own.</p><span className="footer-tag"><span className="status-dot" /> Built for independent traders</span></div>
          <nav aria-label="Explore"><p className="footer-label">EXPLORE</p><Link href="/products">Screeners</Link><Link href="/resources">Free resources</Link><Link href="/contact">Contact & setup</Link></nav>
          <nav aria-label="Legal"><p className="footer-label">THE DETAILS</p><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/refund-policy">Refund policy</Link></nav>
          <div className="footer-contact"><p className="footer-label">LET’S CONNECT</p><a href={`https://wa.me/${site.whatsappNumber}`} className="text-link">Chat on WhatsApp <ArrowUpRight size={15} aria-hidden="true" /></a><a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a><p className="footer-risk">Software for market analysis. We are not a SEBI-registered investment adviser. Trading involves risk.</p></div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} {site.brandName}. All rights reserved.</p><p>Source code included. One-time payment.</p></div>
      </div>
    </footer>
    <a href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi, I have a question about your screeners.")}`}
      className="whatsapp-float" aria-label="Chat on WhatsApp"><MessageCircle size={24} aria-hidden="true" /><span>Let’s chat</span></a>
  </body></html>;
}
