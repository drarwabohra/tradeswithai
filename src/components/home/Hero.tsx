"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Pin, span, useTyping } from "@/components/motion";
import ParticleField from "./ParticleField";
import { SITE } from "@/lib/site";

const PHRASES = [
  "Scan NSE & US stocks for volume breakouts at the open",
  "Detect falling wedge patterns with automated scoring",
  "Screen Hyperliquid perps using EMA alignment & VWAP",
  "Track insider purchases & promoter share pledges",
  "Backtest indicator strategies using Claude AI prompts",
];

const HEADLINE = ["Build", "your", "shortlist.", "Then", "read", "the", "chart."];

const PATHS = [
  { n: "01", t: "Why it works", s: "Stats & stack", href: "#proof", c: "#41c4e1" },
  { n: "02", t: "Screeners", s: "Watch them roll off", href: "#conveyor", c: "#a8e10d" },
  { n: "03", t: "All 5 screeners", s: "Prices & demos", href: "#shelf", c: "#41c4e1" },
  { n: "04", t: "How buying works", s: "Direct on WhatsApp", href: "#setup", c: "#f26419" },
  { n: "05", t: "Free AI guide", s: "Backtest prompt", href: "#resources", c: "#a8e10d" },
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

/* Short "stamp" words that land one after another before the headline. Each uses a different motion. */
const STAMPS = [
  { word: "Scan.", mode: "scatter", a: 0.2, colour: "text-cyan" },
  { word: "Filter.", mode: "snap", a: 0.32, colour: "text-ink" },
  { word: "Shortlist.", mode: "settle", a: 0.44, colour: "text-lime" },
] as const;
const STAMP_LEN = 0.12; // each stamp's share of the scroll

// Deterministic pseudo-random offsets so server and client render the same thing.
const jitter = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x) - 0.5;
};

function Stamp({ word, mode, t, colour }: { word: string; mode: string; t: number; colour: string }) {
  // t: 0 → 0.45 fly in, 0.45 → 0.75 hold, 0.75 → 1 leave
  const inP = span(t, 0, 0.45);
  const out = span(t, 0.75, 1);
  if (t <= 0 || t >= 1) return null;
  return (
    <p
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(3.2rem,min(8vw,13vh),7.5rem)] font-extrabold leading-none tracking-[-0.035em] ${colour}`}
      style={{ opacity: 1 - out, transform: `translateY(calc(-50% - ${(out * 40).toFixed(1)}px))`, filter: `blur(${(out * 8).toFixed(1)}px)` }}
    >
      {[...word].map((ch, i) => {
        const e = 1 - Math.pow(1 - span(inP, i * 0.06, i * 0.06 + 0.55), 3);
        let tr = "";
        if (mode === "scatter") {
          tr = `translate(${((1 - e) * jitter(i, 1) * 260).toFixed(1)}px, ${((1 - e) * jitter(i, 2) * 220).toFixed(1)}px) rotate(${((1 - e) * jitter(i, 3) * 70).toFixed(1)}deg)`;
        } else if (mode === "snap") {
          tr = `translateX(${((1 - e) * (i % 2 ? 1 : -1) * 120).toFixed(1)}px)`;
        } else {
          tr = `translateY(${((1 - e) * 60).toFixed(1)}px)`;
        }
        return (
          <span key={i} className="inline-block" style={{ opacity: e, transform: tr }}>
            {ch}
          </span>
        );
      })}
    </p>
  );
}

export default function Hero() {
  const text = useTyping(PHRASES);
  const copyRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  // Where the window settles: measured so it always sits in the free space right of the copy.
  const [fit, setFit] = useState({ dx: 0, s: 0.8 });

  useEffect(() => {
    const measure = () => {
      const copy = copyRef.current;
      const win = winRef.current;
      if (!copy || !win || window.innerWidth <= 1024) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const copyRight = copy.getBoundingClientRect().right;
      const gap = Math.max(32, vw * 0.03);
      const availW = vw - copyRight - gap * 2;
      const availH = vh - 140;
      const s = Math.max(0.45, Math.min(0.85, availW / win.offsetWidth, availH / win.offsetHeight));
      const centre = copyRight + gap + availW / 2;
      setFit({ dx: centre - vw / 2, s });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (copyRef.current) ro.observe(copyRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <Pin vh={520} className="border-b border-hairline" stageClassName="grid">
      {(k) => {
        /* Scroll script (k = 0 → 1):
           0.00–0.20  window glides from centre stage to the right
           0.20–0.56  three stamp words land and leave: Scan. → Filter. → Shortlist.
           0.56–0.84  headline, sub-copy, buttons and section pills settle in
           0.86–1.00  an orange glow dives out of the window and carries you to the next chapter */
        const ease = 1 - Math.pow(1 - span(k, 0, 0.2), 3);
        const start = 1.04;
        const dive = span(k, 0.86, 1);
        const winStyle = {
          transform: `translate(${(ease * fit.dx).toFixed(1)}px, 2vh) scale(${(start + (fit.s - start) * ease + dive * 0.12).toFixed(4)})`,
          opacity: 1 - dive * 0.85,
        };
        const head = span(k, 0.56, 0.66);
        const ctaT = span(k, 0.64, 0.72);
        const ctaOn = ctaT > 0.6 && dive < 0.5;
        const chipsOn = k > 0.78 && dive < 0.5;
        const copyFade = 1 - span(dive, 0, 0.6);
        const glowO = dive < 0.5 ? dive * 1.7 : (1 - dive) * 1.7;

        return (
          <>
            <div className="hero-env pointer-events-none" />
            <div className="absolute inset-0" style={{ opacity: 0.5 + 0.5 * span(k, 0, 0.25) }}>
              <ParticleField boost={dive} />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_56%_45%,transparent_30%,rgb(5_18_25/0.75)_100%)]" />

            {/* App window */}
            <div className="absolute inset-0 grid place-items-center max-[1024px]:static max-[1024px]:order-2 max-[1024px]:px-6 max-[1024px]:pb-16">
              <div ref={winRef} className="will-change-transform max-[1024px]:!transform-none max-[1024px]:!opacity-100" style={winStyle}>
                <AppWindow text={text} />
              </div>
            </div>

            {/* Dive glow: blooms from the window and fades into the next chapter */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 aspect-square w-[22rem] rounded-full max-[1024px]:hidden"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,214,186,.95), rgba(242,100,25,.7) 32%, rgba(242,100,25,.18) 64%, transparent)",
                transform: `translate(calc(-50% + ${(fit.dx * (1 - dive * 0.6)).toFixed(1)}px), -50%) scale(${(0.2 + dive * 7).toFixed(3)})`,
                opacity: glowO,
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 bg-abyss max-[1024px]:hidden"
              style={{ opacity: span(dive, 0.55, 1) }}
            />

            {/* Copy */}
            <div
              className="relative z-10 flex h-full flex-col justify-center px-[clamp(1.5rem,6vw,7rem)] pb-6 pt-20 max-[1024px]:order-1 max-[1024px]:pt-28"
              style={{ textShadow: "var(--tshadow)", opacity: copyFade }}
            >
              <div ref={copyRef} className="relative w-full max-w-[min(38rem,44vw)] max-[1024px]:max-w-[40rem]">
                {/* Stamp words (desktop only) */}
                <div className="max-[1024px]:hidden">
                  {STAMPS.map((s) => (
                    <Stamp key={s.word} word={s.word} mode={s.mode} colour={s.colour} t={span(k, s.a, s.a + STAMP_LEN)} />
                  ))}
                </div>

                <div style={{ opacity: head }} className="max-[1024px]:!opacity-100">
                  <p className="eyebrow flex items-center gap-2.5 !text-cyan">
                    <span className="live-dot" /> {SITE.name} · Stock & crypto screeners you run yourself
                  </p>
                  <h1 className="mt-4 max-w-[13ch] text-[clamp(2.2rem,min(4.6vw,7.6vh),4.4rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink max-[1024px]:text-[clamp(2.2rem,7vw,3.6rem)]">
                    {HEADLINE.map((wd, i) => (
                      <span
                        key={i}
                        className={`hero-word ${wd === "shortlist." ? "em" : wd === "chart." ? "!text-lime" : ""}`}
                        style={{ ["--th" as string]: 0.56 + i * 0.012 }}
                      >
                        {wd}{" "}
                      </span>
                    ))}
                  </h1>
                </div>

                <div className="max-[1024px]:!opacity-100 max-[1024px]:!transform-none" style={{ opacity: ctaT, transform: `translateY(${((1 - ctaT) * 16).toFixed(1)}px)` }}>
                  <p className="mt-[min(1.25rem,2vh)] max-w-[46ch] text-[clamp(0.95rem,1.15vw,1.1rem)] leading-relaxed text-mist">
                    Screen for breakouts, chart patterns, and momentum. Run the tools on your own computer. Full Python
                    source code and setup guide included. Flat ₹5,000 one-time payment.
                  </p>
                  <div className="mt-[min(1.75rem,3vh)] flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={ctaOn ? 0 : -1}
                      className="btn-primary min-h-[44px] max-[1024px]:!pointer-events-auto"
                      style={{ textShadow: "none", pointerEvents: ctaOn ? "auto" : "none" }}
                    >
                      Inquire on WhatsApp
                    </a>
                    <a
                      href="#conveyor"
                      tabIndex={ctaOn ? 0 : -1}
                      className="btn-ghost min-h-[44px] max-[1024px]:!pointer-events-auto"
                      style={{ textShadow: "none", pointerEvents: ctaOn ? "auto" : "none" }}
                    >
                      Compare screeners →
                    </a>
                    <Link
                      href="/resources"
                      tabIndex={ctaOn ? 0 : -1}
                      className="btn-ghost min-h-[44px] max-[1024px]:!pointer-events-auto"
                      style={{ textShadow: "none", pointerEvents: ctaOn ? "auto" : "none" }}
                    >
                      Free AI resources
                    </Link>
                  </div>
                </div>

                {/* Quick links to sections 01–05: compact pills */}
                <div className="mt-[min(2rem,3.5vh)] flex flex-wrap gap-2">
                  {PATHS.map((p, i) => {
                    const t = span(k, 0.72 + i * 0.02, 0.78 + i * 0.02);
                    return (
                      <a
                        key={p.n}
                        href={p.href}
                        tabIndex={chipsOn ? 0 : -1}
                        title={p.s}
                        className="card card-hover flex min-h-[44px] items-center gap-2 !rounded-full px-3.5 py-2 max-[1024px]:!pointer-events-auto max-[1024px]:!opacity-100 max-[1024px]:!transform-none"
                        style={{
                          ["--hc" as string]: p.c,
                          opacity: t,
                          transform: `translateY(${((1 - t) * 18).toFixed(1)}px)`,
                          textShadow: "none",
                          pointerEvents: chipsOn ? "auto" : "none",
                        }}
                      >
                        <span className="font-mono text-xs font-bold" style={{ color: p.c }}>
                          {p.n}
                        </span>
                        <span className="text-sm font-bold text-ink">{p.t}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scroll cue: visible until the reveal starts */}
            <div
              className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs tracking-[0.25em] text-mist max-[1024px]:hidden"
              style={{ opacity: k > 0.04 ? 0 : 1, transition: "opacity .4s" }}
              aria-hidden="true"
            >
              SCROLL TO EXPLORE
              <span className="scroll-cue-line" />
            </div>
          </>
        );
      }}
    </Pin>
  );
}
