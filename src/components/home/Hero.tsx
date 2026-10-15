"use client";

import Link from "next/link";
import { Pin, useTyping } from "@/components/motion";
import { SITE } from "@/lib/site";

const PHRASES = [
  "Scan NSE & US stocks for volume breakouts at the open",
  "Detect falling wedge patterns with automated scoring",
  "Screen Hyperliquid perps using EMA alignment & VWAP",
  "Track insider purchases & promoter share pledges",
  "Backtest indicator strategies using Claude AI prompts",
];

const PATHS = [
  { n: "01", t: "Why it works", href: "#proof", c: "#41c4e1" },
  { n: "02", t: "Screeners", href: "#conveyor", c: "#a8e10d" },
  { n: "03", t: "All 5 screeners", href: "#shelf", c: "#41c4e1" },
  { n: "04", t: "How buying works", href: "#setup", c: "#f26419" },
  { n: "05", t: "Free AI guide", href: "#resources", c: "#a8e10d" },
];

function AppWindow({ text }: { text: string }) {
  return (
    <div className="cw-frame w-[min(44rem,88vw)]">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs text-dim">terminal · python 3.10+</span>
      </div>
      <div className="grid min-h-[17.5rem] grid-cols-[11.5rem_1fr] max-sm:grid-cols-1">
        <aside className="border-r border-hairline p-4 text-xs max-sm:hidden">
          <p className="mb-4 flex items-center gap-2 font-bold text-ink">
            <span className="h-4 w-4 rounded bg-gradient-to-br from-cyan to-lime" /> TWA Scanner
          </p>
          {["Live Watchlist", "Volume Breakout", "Pattern Engine", "Telegram Bot"].map((x, i) => (
            <p key={x} className={`mb-1 rounded-md px-2 py-1.5 text-xs ${i === 1 ? "bg-cyan/15 font-semibold text-cyan" : "text-mist"}`}>
              {x}
            </p>
          ))}
          <p className="mb-2 mt-4 px-2 font-mono text-xs tracking-[0.16em] text-dim">MARKETS</p>
          {["NSE & NIFTY 500", "US Stocks (S&P 500)", "Hyperliquid Crypto"].map((x, i) => (
            <p key={x} className="flex items-center gap-2 px-2 py-1 text-xs text-mist">
              <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-lime" : i === 2 ? "bg-cyan" : "bg-mist/40"}`} />
              {x}
            </p>
          ))}
        </aside>
        <div className="flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-5 w-5 rounded-md bg-gradient-to-br from-cyan to-lime shadow-[0_0_18px_-2px_rgb(65_196_225/0.7)]" />
              <span className="font-mono text-xs font-semibold text-lime">TRADES WITH AI STUDIO</span>
            </div>
            <p className="mb-4 mt-3 text-lg font-bold">
              Run market scans on your machine. <span className="font-normal text-mist">Zero recurring API fees.</span>
            </p>
            <div className="rounded-xl border border-cyan/40 bg-[#04141c]/80 p-3.5 text-left shadow-[0_0_0_3px_rgb(65_196_225/0.1)]">
              <p className="min-h-[2.8em] font-mono text-xs leading-relaxed text-ink">
                <span className="text-lime">$</span> python scan.py --target &quot;{text}&quot;
                <span className="cw-caret" />
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-hairline pt-2.5">
                <span className="chip !py-0.5 !text-xs text-lime border-lime/30 min-h-[32px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Local Engine
                </span>
                <span className="chip !py-0.5 !text-xs min-h-[32px]">Telegram Alerts</span>
                <span className="chip !py-0.5 !text-xs min-h-[32px]">Source Code</span>
                <span className="ml-auto flex items-center gap-1 font-mono text-xs text-cyan">
                  <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_rgb(65_196_225/0.8)]" /> READY
                </span>
              </div>
            </div>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs text-dim">
            {["Yahoo Finance & public feeds", "No brokerage connection needed", "Clean standalone scripts"].map((c) => (
              <li key={c} className="rounded-full border border-hairline px-2.5 py-1 text-mist">
                ✓ {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const text = useTyping(PHRASES);

  return (
    <Pin vh={220} className="border-b border-hairline" stageClassName="grid">
      {(k) => {
        const w = Math.min(1, k / 0.5);
        const winStyle = {
          transform: `translate(calc(${w} * 22vw), calc(${w} * 2vh)) scale(${1.08 - w * 0.28})`,
          opacity: 1 - Math.max(0, (k - 0.85) / 0.15) * 0.35,
        };

        // Text subtle fade that starts fully visible at 1.0 on first load
        const textOpacity = Math.max(0.2, 1 - Math.max(0, (k - 0.6) / 0.4) * 0.7);

        // Chips visible threshold
        const chipsVisible = k >= 0.15;

        return (
          <>
            <div className="hero-env pointer-events-none" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_56%_45%,transparent_30%,rgb(5_18_25/0.75)_100%)]" />

            {/* App Window */}
            <div className="absolute inset-0 grid place-items-center max-[1024px]:static max-[1024px]:order-2 max-[1024px]:pb-16 max-[1024px]:px-6">
              <div className="will-change-transform max-[1024px]:!transform-none" style={winStyle}>
                <AppWindow text={text} />
              </div>
            </div>

            {/* Copy Content - visible on first load at every screen width */}
            <div
              className="relative z-10 flex h-full flex-col justify-center px-[clamp(1.5rem,6vw,7rem)] pt-16 max-[1024px]:order-1 max-[1024px]:pt-28"
              style={{ textShadow: "var(--tshadow)" }}
            >
              <p className="eyebrow flex items-center gap-2.5 !text-cyan" style={{ opacity: textOpacity }}>
                <span className="live-dot" /> {SITE.name} · Stock & crypto screeners you run yourself
              </p>

              <h1
                className="mt-4 max-w-[13ch] text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink"
                style={{ opacity: textOpacity }}
              >
                Build your <span className="text-cyan">shortlist.</span> Then read the <span className="text-lime">chart.</span>
              </h1>

              <div style={{ opacity: textOpacity }}>
                <p className="mt-5 max-w-[46ch] text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed text-mist">
                  Screen for breakouts, chart patterns, and momentum. Run the tools on your own computer. Full Python
                  source code and setup guide included. Flat ₹5,000 one-time payment.
                </p>

                {/* Buttons: WhatsApp is primary (filled lime), Compare screeners is secondary */}
                <div className="mt-7 flex flex-wrap gap-3.5">
                  <a
                    href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary min-h-[44px]"
                    style={{ textShadow: "none" }}
                  >
                    Inquire on WhatsApp
                  </a>
                  <a href="#conveyor" className="btn-ghost min-h-[44px]" style={{ textShadow: "none" }}>
                    Compare screeners →
                  </a>
                  <Link href="/resources" className="btn-ghost min-h-[44px]" style={{ textShadow: "none" }}>
                    Free AI resources
                  </Link>
                </div>
              </div>

              {/* Hero chips: renamed and not focusable while invisible */}
              <div className="mt-10 flex flex-wrap gap-2.5 max-w-[36rem]">
                {PATHS.map((p, i) => {
                  const cardVisible = chipsVisible;
                  return (
                    <a
                      key={p.n}
                      href={p.href}
                      tabIndex={cardVisible ? 0 : -1}
                      aria-hidden={!cardVisible}
                      className={`card card-hover flex items-center gap-2 px-3.5 py-2 transition-all min-h-[44px] max-[1024px]:!opacity-100 max-[1024px]:!pointer-events-auto ${
                        cardVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                      }`}
                      style={{
                        ["--hc" as string]: p.c,
                        textShadow: "none",
                      }}
                    >
                      <span className="font-mono text-xs font-bold" style={{ color: p.c }}>
                        {p.n}
                      </span>
                      <span className="text-xs font-bold text-ink">{p.t}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Scroll indicator cue */}
            <p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.25em] text-dim max-[860px]:hidden"
              style={{ opacity: k > 0.05 ? 0 : 1, transition: "opacity .4s" }}
            >
              SCROLL TO EXPLORE ↓
            </p>
          </>
        );
      }}
    </Pin>
  );
}
