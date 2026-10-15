import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import site from "@/data/site.json";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500", "600"] });
const serif = Source_Serif_4({ variable: "--font-serif-accent", subsets: ["latin"], style: ["normal", "italic"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#051a23",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Trading Screeners with Source Code | TradesWithAI", template: "%s · TradesWithAI" },
  description: "Stock and crypto screeners you run yourself. Compare features, watch real demos, and acquire full source code with a one-time payment.",
  openGraph: { type: "website", siteName: site.brandName, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable} ${serif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-abyss text-ink font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-lime focus:p-3 focus:font-bold focus:text-abyss"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />

        {/* Floating WhatsApp Action Button with Live Pulse */}
        <a
          href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float group"
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75"></span>
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-lime"></span>
          </span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 transition-transform group-hover:scale-110">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.383-.043c.108-.116.47-.548.596-.737.126-.188.253-.158.411-.101.159.058 1.001.472 1.174.559.173.087.289.13.332.202.043.073.043.423-.101.827zM11.99 2C6.471 2 2 6.484 2 12c0 1.846.53 3.57 1.46 5.05L2 22l5.13-1.39c1.45.86 3.11 1.34 4.86 1.34 5.518 0 9.99-4.484 9.99-9.95C21.98 6.484 17.508 2 11.99 2z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
