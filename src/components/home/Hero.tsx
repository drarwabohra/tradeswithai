"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Pin, span, useTyping } from "@/components/motion";
import ParticleField from "./ParticleField";
import Dissolve, { type Box } from "./Dissolve";
import RobotHead, { ROBOT_FRAMES } from "./RobotHead";
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
  { n: "03", t: "How buying works", s: "Direct on WhatsApp", href: "#setup", c: "#f26419" },
  { n: "04", t: "Free AI guide", s: "Backtest prompt", href: "#resources", c: "#a8e10d" },
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
            <span className="h-4 w-4 rounded bg-gradient-to-br from-cyan to-lime" /> ChartNeural Scanner
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
              <span className="font-mono text-xs font-semibold text-lime">CHARTNEURAL STUDIO</span>
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
  { word: "Scan.", mode: "scatter", a: 0.34, colour: "text-cyan" },
  { word: "Filter.", mode: "snap", a: 0.43, colour: "text-ink" },
  { word: "Shortlist.", mode: "settle", a: 0.52, colour: "text-lime" },
] as const;
const STAMP_LEN = 0.1; // each stamp's share of the scroll

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
      className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap will-change-[transform,opacity,filter] text-[clamp(3.2rem,min(8vw,13vh),7.5rem)] font-extrabold leading-none tracking-[-0.035em] ${colour}`}
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
          <span key={i} className={`inline-block ${e < 1 ? "will-change-[transform,opacity]" : ""}`} style={{ opacity: e, transform: tr }}>
            {ch}
          </span>
        );
      })}
    </p>
  );
}

// The particles assemble into the front-facing frame; the dive zooms into its eye.
const ROBOT = { src: ROBOT_FRAMES.src(ROBOT_FRAMES.front), ratio: ROBOT_FRAMES.ratio, eye: ROBOT_FRAMES.eye };
const WIN_SCALE = 1.04;

export default function Hero() {
  const text = useTyping(PHRASES);
  const copyRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  // Window box (where the shards start) and robot box (where they land), in stage pixels.
  const [layout, setLayout] = useState<{ win: Box; robot: Box } | null>(null);
  // Phones, tablets and reduced motion get the finished hero without the scroll journey.
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px), (prefers-reduced-motion: reduce)");
    const measure = () => {
      setStill(mq.matches);
      const copy = copyRef.current;
      const win = winRef.current;
      if (!copy || !win || mq.matches) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const ww = win.offsetWidth * WIN_SCALE;
      const wh = win.offsetHeight * WIN_SCALE;
      // The robot stands on the bottom edge, its eye centred in the free space right of the copy.
      // It may run past the right edge (the stage clips it) but never back over the copy.
      const copyRight = copy.getBoundingClientRect().right;
      const gap = Math.max(32, vw * 0.03);
      const free = vw - copyRight - gap;
      const rw = Math.min(vh * 0.84 * ROBOT.ratio, free * 1.15);
      const rh = rw / ROBOT.ratio;
      const left = Math.max(copyRight + gap * 0.5, copyRight + gap + free / 2 - ROBOT.eye.x * rw);
      setLayout({
        win: { x: (vw - ww) / 2, y: vh * 0.52 - wh / 2, w: ww, h: wh },
        robot: { x: left, y: vh - rh, w: rw, h: rh },
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (copyRef.current) ro.observe(copyRef.current);
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, []);

  return (
    <Pin vh={600} className="border-b border-hairline" stageClassName="grid">
      {(pinK) => {
        /* Scroll script (k = 0 → 1):
           0.00–0.07  the scanner window types at centre stage
           0.05–0.20  it flashes, blurs and shatters into glowing shards
           0.07–0.34  shards burst outward and drift into clusters around the right side
           0.18–0.42  shards fly onto the robot and take its colours; the robot fades in under them
           0.34–0.62  three stamp words land and leave: Scan. → Filter. → Shortlist.
           0.62–0.86  headline, sub-copy, buttons and section pills settle in
           0.87–1.00  the camera dives into the robot's eye and carries you to the next chapter */
        const k = still ? 0.86 : pinK;
        const flash = still ? 0 : Math.sin(Math.PI * span(k, 0.05, 0.17));
        const win = still ? 1 : 1 - span(k, 0.09, 0.2);
        const burst = span(k, 0.07, 0.34);
        const assemble = span(k, 0.18, 0.42);
        const robotIn = span(assemble, 0.45, 0.95);
        const dive = span(k, 0.87, 1);
        const zoom = 1 + Math.pow(dive, 3) * 5;
        const head = span(k, 0.62, 0.7);
        const ctaT = span(k, 0.68, 0.76);
        const ctaOn = ctaT > 0.6 && dive < 0.5;
        const chipsOn = k > 0.8 && dive < 0.5;
        const copyFade = 1 - span(dive, 0, 0.4);
        const glow = span(dive, 0.25, 0.7);
        const r = layout?.robot;
        const eye = r ? { x: r.x + r.w * ROBOT.eye.x, y: r.y + r.h * ROBOT.eye.y } : null;

        return (
          <>
            <div className="hero-env pointer-events-none" />
            <div className="absolute inset-0 will-change-[opacity]" style={{ opacity: 0.5 + 0.5 * span(k, 0, 0.25) }}>
              <ParticleField boost={dive} />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_56%_45%,transparent_30%,rgb(5_18_25/0.75)_100%)]" />

            {/* App window: types at centre, then flashes and shatters */}
            <div className="absolute inset-0 grid place-items-center max-[1024px]:static max-[1024px]:order-2 max-[1024px]:px-6 max-[1024px]:pb-16">
              <div
                ref={winRef}
                className="relative will-change-transform max-[1024px]:!visible max-[1024px]:!transform-none max-[1024px]:!opacity-100 max-[1024px]:![filter:none]"
                style={{
                  transform: `translateY(2vh) scale(${(WIN_SCALE * (0.94 + 0.06 * win)).toFixed(4)})`,
                  opacity: win,
                  filter: win < 1 || flash > 0 ? `blur(${((1 - win) * 14).toFixed(1)}px) brightness(${(1 + flash * 0.6).toFixed(3)})` : "none",
                  visibility: win < 0.01 ? "hidden" : "visible",
                }}
              >
                <AppWindow text={text} />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[14px] bg-[radial-gradient(closest-side,rgb(217_247_255/0.85),rgb(65_196_225/0.25)_70%,transparent)] will-change-[opacity] max-[1024px]:hidden"
                  style={{ opacity: flash * 0.7 }}
                />
              </div>
            </div>

            {/* Shards → robot (desktop) */}
            <div className="absolute inset-0 max-[1024px]:hidden">
              {r && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute will-change-transform"
                  style={{
                    left: r.x,
                    top: r.y,
                    width: r.w,
                    height: r.h,
                    opacity: robotIn,
                    transform: `scale(${(0.97 + 0.03 * robotIn) * zoom})`,
                    transformOrigin: `${ROBOT.eye.x * 100}% ${ROBOT.eye.y * 100}%`,
                    visibility: robotIn < 0.01 ? "hidden" : "visible",
                  }}
                >
                  <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgb(65_196_225/0.22),transparent)]" />
                  {/* Faces forward while it assembles and during the dive; follows the cursor in between. */}
                  <div className="relative h-full w-full">
                    <RobotHead lock={robotIn < 0.95 || dive > 0} />
                  </div>
                </div>
              )}
              {r && <Dissolve burst={burst} assemble={assemble} from={layout?.win ?? null} to={r} src={ROBOT.src} />}
            </div>

            {/* Dive glow: blooms out of the robot's eye and fades into the next chapter */}
            {eye && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute z-20 aspect-square w-[22rem] rounded-full will-change-[transform,opacity] max-[1024px]:hidden"
                style={{
                  left: eye.x,
                  top: eye.y,
                  background:
                    "radial-gradient(closest-side, rgba(255,214,186,.95), rgba(242,100,25,.7) 32%, rgba(242,100,25,.18) 64%, transparent)",
                  transform: `translate(-50%, -50%) scale(${(0.2 + glow * 7).toFixed(3)})`,
                  opacity: glow > 0 ? Math.min(1, glow * 2) : 0,
                }}
              />
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 bg-abyss will-change-[opacity] max-[1024px]:hidden"
              style={{ opacity: span(dive, 0.55, 1) }}
            />

            {/* Copy */}
            <div
              className="relative z-10 flex h-full flex-col justify-center px-[clamp(1.5rem,6vw,7rem)] pb-6 pt-20 max-[1024px]:order-1 max-[1024px]:pt-28"
              style={{ textShadow: "var(--tshadow)", opacity: copyFade, willChange: copyFade < 1 ? "opacity" : undefined }}
            >
              <div ref={copyRef} className="relative w-full max-w-[min(38rem,44vw)] max-[1024px]:max-w-[40rem]">
                {/* Stamp words (desktop only) */}
                <div className="max-[1024px]:hidden">
                  {STAMPS.map((s) => (
                    <Stamp key={s.word} word={s.word} mode={s.mode} colour={s.colour} t={span(k, s.a, s.a + STAMP_LEN)} />
                  ))}
                </div>

                <div style={{ opacity: head, willChange: head > 0 && head < 1 ? "opacity" : undefined }} className="max-[1024px]:!opacity-100">
                  <p className="eyebrow flex items-center gap-2.5 !text-cyan">
                    <span className="live-dot" /> {SITE.name} · Stock & crypto screeners you run yourself
                  </p>
                  <h1 className="mt-4 max-w-[13ch] text-[clamp(2.2rem,min(4.6vw,7.6vh),4.4rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink max-[1024px]:text-[clamp(2.2rem,7vw,3.6rem)]">
                    {HEADLINE.map((wd, i) => {
                      // Words rise in one after another (opacity + transform only: cheap to animate).
                      const w = span(k, 0.62 + i * 0.012, 0.62 + i * 0.012 + 1 / 6);
                      return (
                        <span
                          key={i}
                          className={`hero-word ${w > 0 && w < 1 ? "will-change-[transform,opacity]" : ""} ${wd === "shortlist." ? "em" : wd === "chart." ? "!text-lime" : ""}`}
                          style={{ opacity: w, transform: w < 1 ? `translateY(${((1 - w) * 28).toFixed(1)}px)` : undefined }}
                        >
                          {wd}{" "}
                        </span>
                      );
                    })}
                  </h1>
                </div>

                <div
                  className="max-[1024px]:!opacity-100 max-[1024px]:!transform-none"
                  style={{ opacity: ctaT, transform: `translateY(${((1 - ctaT) * 16).toFixed(1)}px)`, willChange: ctaT > 0 && ctaT < 1 ? "transform, opacity" : undefined }}
                >
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
                    const t = span(k, 0.76 + i * 0.02, 0.82 + i * 0.02);
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
                          willChange: t > 0 && t < 1 ? "transform, opacity" : undefined,
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
