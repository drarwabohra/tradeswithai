import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "./Header";

const COLS = [
  {
    h: "Screeners",
    links: [
      ["All Screeners", "/products"],
      ["Stock Breakout Screener", "/products/breakout-screener"],
      ["Falling Wedge Screener", "/products/falling-wedge-screener"],
      ["Crypto Breakout Scanner", "/products/crypto-breakout-scanner"],
      ["Insider Transactions Dashboard", "/products/insider-trading-screener"],
      ["Momentum & Valuation Screener", "/products/momentum-value-screener"],
    ],
  },
  {
    h: "Free Resources",
    links: [
      ["All Resources", "/resources"],
      ["Backtest with Claude AI", "/resources/backtest-indicator-with-ai"],
      ["Master Prompt", "/resources/backtest-indicator-with-ai#prompt"],
      ["Sample PDF Report", "/resources/super-trend-strategy-report.pdf"],
    ],
  },
  {
    h: "Support",
    links: [
      ["Contact & Setup", "/contact"],
      ["WhatsApp Inquiry", `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi, I have a question about TradesWithAI screeners.")}`],
    ],
  },
  {
    h: "Legal",
    links: [
      ["Terms of Service", "/terms"],
      ["Privacy Policy", "/privacy"],
      ["Refund Policy", "/refund-policy"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-deep">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
              Professional stock and crypto screening software you run yourself. Full Python source code, tests, and setup guide included.
            </p>
            <p className="mt-6 flex items-center gap-2 font-mono text-xs text-mist">
              <span className="live-dot" /> Code sent within 12 hours of payment confirmation (usually under 1 hour)
            </p>
          </div>

          {/* Link columns: 2 columns on mobile, 4 columns on tablet/desktop */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.h}>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-mist">
                  {c.h}
                </p>
                <ul className="mt-4 space-y-1">
                  {c.links.map(([l, h]) => {
                    const isPdf = h.endsWith(".pdf");
                    const isExternal = h.startsWith("http");

                    if (isPdf) {
                      return (
                        <li key={h}>
                          <a
                            href={h}
                            download
                            className="text-sm text-mist transition hover:text-ink min-h-[44px] flex items-center"
                          >
                            {l}
                          </a>
                        </li>
                      );
                    }

                    if (isExternal) {
                      return (
                        <li key={h}>
                          <a
                            href={h}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-mist transition hover:text-ink min-h-[44px] flex items-center"
                          >
                            {l}
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li key={h}>
                        <Link
                          href={h}
                          className="text-sm text-mist transition hover:text-ink min-h-[44px] flex items-center"
                        >
                          {l}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-hairline bg-abyss">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-6 font-mono text-[13px] leading-relaxed text-mist sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Software and education only. We are not a SEBI-registered adviser.</p>
          <p>Flat ₹5,000 one-time payment per screener. No recurring subscriptions.</p>
        </div>
      </div>
    </footer>
  );
}
