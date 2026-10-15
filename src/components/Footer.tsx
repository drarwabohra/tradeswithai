import Link from "next/link";
import site from "@/data/site.json";
import { Logo } from "./Header";

const COLS = [
  {
    h: "Screeners",
    links: [
      ["All Screeners", "/products"],
      ["Stock Breakout", "/products/breakout-screener"],
      ["Falling Wedge", "/products/falling-wedge-screener"],
      ["Crypto Breakout", "/products/crypto-breakout-scanner"],
      ["Insider Transactions", "/products/insider-trading-screener"],
      ["Momentum & Valuation", "/products/momentum-value-screener"],
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
      ["WhatsApp Inquiry", `https://wa.me/${site.whatsappNumber}`],
      ["Email Support", `mailto:${site.supportEmail}`],
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
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            Professional stock and crypto screening software you run yourself. Full Python source code, tests, and setup guide included.
          </p>
          <p className="mt-6 flex items-center gap-2 font-mono text-[0.7rem] text-dim">
            <span className="live-dot" /> Manual WhatsApp verification · Instant delivery
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.h}>
            <p className="eyebrow">{c.h}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="text-sm text-mist transition hover:text-ink">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-hairline bg-abyss">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-6 font-mono text-[0.68rem] leading-relaxed text-dim sm:flex-row">
          <p>© {new Date().getFullYear()} {site.brandName}. Software and education only. We are not a SEBI-registered adviser.</p>
          <p>Flat ₹5,000 one-time payment per screener. No recurring subscriptions.</p>
        </div>
      </div>
    </footer>
  );
}
