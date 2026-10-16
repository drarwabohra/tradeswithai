import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: { default: "ChartNeural · Algorithmic Stock & Crypto Screeners", template: "%s · ChartNeural" },
  description: "Stock and crypto screeners you run yourself. Compare features, watch real demos, and acquire full source code with a one-time payment.",
  openGraph: {
    type: "website",
    siteName: "ChartNeural",
    title: "ChartNeural · Algorithmic Stock & Crypto Screeners",
    description: "Stock and crypto screeners you run yourself. Compare features, watch real demos, and acquire full source code with a one-time payment.",
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChartNeural · Algorithmic Stock & Crypto Screeners",
    description: "Stock and crypto screeners you run yourself. Compare features, watch real demos, and acquire full source code with a one-time payment.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable} ${serif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-abyss text-ink font-sans pb-24 md:pb-0">
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
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
