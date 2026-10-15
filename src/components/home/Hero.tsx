"use client";

import Link from "next/link";
import { Pin, useTyping } from "@/components/motion";
import site from "@/data/site.json";

const PHRASES = [
  "Scan NSE & US stocks for volume breakouts at the open",
  "Detect falling wedge patterns with automated scoring",
  "Screen Hyperliquid perps using EMA alignment & VWAP",
  "Track insider purchases & promoter share pledges",
  "Backtest indicator strategies using Claude AI prompts",
];

const HEADLINE = ["Build", "your", "shortlist.", "Then", "read", "the", "chart."];

const PATHS = [
  { n: "01", t: "Screeners", s: "5 ready-to-run builds", href: "#shelf", c: "#a8e10d" },
  { n: "02", t: "Conveyor", s: "Watch them roll off", href: "#conveyor", c: "#41c4e1" },
  { n: "03", t: "How it works", s: "Direct WhatsApp setup", href: "#setup", c: "#f26419" },
  { n: "04", t: "Free library", s: "AI backtest master prompt", href: "/resources", c: "#a8e10d" },
  { n: "05", t: "Custom check", s: "Ask before you buy", href: "/contact", c: "#41c4e1" },
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
        <span className="font-mono text-[0.65rem] text-dim">terminal · python 3.10+</span>
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
          <p className="mb-2 mt-4 px-2 font-mono text-[0.55rem] tracking-[0.16em] text-dim">MARKETS</p>
          {["NSE & NIFTY 500", "US Stocks (S&P 500)", "Hyperliquid Crypto"].map((x, i) => (
            <p key={x} className="flex items-center gap-2 px-2 py-1 text-[0.72rem] text-mist">
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
                <span className="chip !py-0.5 !text-[0.62rem] text-lime border-lime/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Local Engine
                </span>
                <span className="chip !py-0.5 !text-[0.62rem]">Telegram Alerts</span>
                <span className="chip !py-0.5 !text-[0.62rem]">Source Code</span>
                <span className="ml-auto flex items-center gap-1 font-mono text-[0.65rem] text-cyan">
                  <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_rgb(65_196_225/0.8)]" /> READY
                </span>
              </div>
            </div>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 text-[0.65rem] text-dim">
            {["Yahoo Finance & public feeds", "No brokerage connection needed", "Clean standalone scripts"].map((c) => (
              <li key={c} className="rounded-full border border-hairline px-2.5 py-0.5 text-mist">
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
    <Pin vh={420} className="border-b border-hairline" stageClassName="grid">
      {(k) => {
        // App window starts centered and prominent, then moves right and scales down
        const w = Math.min(1, k / 0.35);
        const winStyle = {
          transform: `translate(calc(${w} * 22vw), calc(${w} * 2vh)) scale(${1.08 - w * 0.28})`,
          opacity: 1 - Math.max(0, (k - 0.9) / 0.1) * 0.3,
        };

        return (
          <>
            <div className="hero-env pointer-events-none" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_56%_45%,transparent_30%,rgb(5_18_25/0.75)_100%)]" />

            {/* App Window */}
            <div className="absolute inset-0 grid place-items-center max-[860px]:static max-[860px]:order-2 max-[860px]:pb-16 max-[860px]:px-6">
              <div className="will-change-transform max-[860px]:!transform-none" style={winStyle}>
                <AppWindow text={text} />
              </div>
            </div>

            {/* Copy Content */}
            <div
              className="relative z-10 flex h-full flex-col justify-center px-[clamp(1.5rem,6vw,7rem)] pt-16 max-[860px]:order-1 max-[860px]:pt-28"
              style={{ textShadow: "var(--tshadow)" }}
            >
              <p
                className="eyebrow flex items-center gap-2.5 !text-cyan"
                style={{ opacity: k < 0.05 ? 0 : 1, transition: "opacity .5s" }}
              >
                <span className="live-dot" /> {site.brandName} · Stock & crypto screeners you run yourself
              </p>
              <h1 className="mt-4 max-w-[13ch] text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em]">
                {HEADLINE.map((wd, i) => (
                  <span
                    key={i}
                    className={`hero-word ${wd === "shortlist." ? "em" : wd === "chart." ? "!text-lime" : ""}`}
                    style={{ ["--th" as string]: 0.06 + i * 0.035 }}
                  >
                    {wd}{" "}
                  </span>
                ))}
              </h1>

              <div className="seg" style={{ ["--a" as string]: 0.38, ["--b" as string]: 0.5 }}>
                <p
                  className="mt-5 max-w-[46ch] text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed text-mist"
                  style={{ opacity: "var(--t)", transform: "translateY(calc((1 - var(--t)) * 16px))" }}
                >
                  Screen for breakouts, chart patterns, and momentum. Run the tools on your own computer. Full Python
                  source code and setup guide included. Flat ₹5,000 one-time payment.
                </p>
                <div
                  className="mt-7 flex flex-wrap gap-3.5"
                  style={{ opacity: "var(--t)", transform: "translateY(calc((1 - var(--t)) * 16px))" }}
                >
                  <a href="#conveyor" className="btn-primary" style={{ textShadow: "none" }}>
                    Compare screeners →
                  </a>
                  <Link href="/resources" className="btn-ghost" style={{ textShadow: "none" }}>
                    Free AI resources
                  </Link>
                  <a
                    href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost !border-lime/40 text-lime hover:!border-lime"
                    style={{ textShadow: "none" }}
                  >
                    Inquire on WhatsApp
                  </a>
                </div>
              </div>

              {/* Quick links to sections */}
              <div className="mt-10 grid max-w-[36rem] grid-cols-2 gap-2.5 sm:grid-cols-3">
                {PATHS.map((p, i) => (
                  <a
                    key={p.n}
                    href={p.href}
                    className="seg card card-hover block p-3.5 transition-all"
                    style={{
                      ["--a" as string]: 0.55 + i * 0.06,
                      ["--b" as string]: 0.65 + i * 0.06,
                      ["--hc" as string]: p.c,
                      opacity: "var(--t)",
                      transform: "translateY(calc((1 - var(--t)) * 24px))",
                      textShadow: "none",
                    }}
                  >
                    <span className="font-mono text-[0.62rem] font-bold" style={{ color: p.c }}>
                      {p.n}
                    </span>
                    <b className="block text-sm font-bold text-ink">{p.t}</b>
                    <span className="font-mono text-[0.65rem] text-mist">{p.s}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Scroll indicator cue */}
            <p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.68rem] tracking-[0.25em] text-dim max-[860px]:hidden"
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
