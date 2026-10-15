"use client";

import Image from "next/image";
import Link from "next/link";
import { CountUp, Marquee, Pin, Reveal, useTyping } from "@/components/motion";
import { catalog } from "@/lib/catalog";
import { formatINR } from "@/lib/format";
import site from "@/data/site.json";

function Head({
  n,
  label,
  title,
  sub,
  c = "#41c4e1",
}: {
  n: string;
  label: string;
  title: React.ReactNode;
  sub?: string;
  c?: string;
}) {
  return (
    <div className="grid gap-3.5" style={{ ["--c" as string]: c }}>
      <p className="eyebrow">
        <b>{n}</b> · {label}
      </p>
      <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.02em] [text-wrap:balance]">
        {title}
      </h2>
      {sub && <p className="serif-sub max-w-[42ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ── 01 · Proof: Stats + Marquee ─────────────────────────── */
export function Proof() {
  const stats = [
    { v: 5, d: 0, s: "", l: "Screeners Shipped" },
    { v: 100, d: 0, s: "%", l: "Source Code Ownership" },
    { v: 5000, d: 0, s: "₹", l: "Flat One-Time Price" },
    { v: 12, d: 0, s: "h", l: "Max Target Delivery" },
  ];

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-[radial-gradient(circle_at_50%_60%,#0b3446_0%,var(--color-abyss)_62%)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Head
            n="01"
            label="BUILT FOR TRADERS"
            title={
              <>
                Every screener starts as <span className="text-cyan">one testable rule.</span>
              </>
            }
            sub="Then it becomes a Python data engine, interactive chart filters, Telegram bot alerts, and clean documentation you own forever."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 90} className="bg-deep p-7">
              <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-ink font-mono">
                {s.s === "₹" ? "₹" : null}
                <CountUp to={s.v} decimals={s.d} suffix={s.s === "₹" ? "" : s.s} />
              </p>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-dim">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16 border-y border-hairline bg-abyss/40">
        <Marquee
          items={[
            "PYTHON 3.10+",
            "FASTAPI",
            "NIFTY 500",
            "S&P 500",
            "HYPERLIQUID",
            "TELEGRAM BOT",
            "PANDAS",
            "CLAUDE CODE",
            "TRADINGVIEW",
            "NO RECURRING APIS",
          ]}
        />
      </div>
    </section>
  );
}

/* ── 02 · Store: Pinned Conveyor Line ────────────────────── */
export function ProductLine() {
  const line = catalog;

  return (
    <div id="conveyor">
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-28">
        <Reveal>
          <Head
            n="02"
            label="THE CONVEYOR LINE"
            c="#a8e10d"
            title={
              <>
                Skip months of coding. <br />
                <span className="text-lime">Take it home finished.</span>
              </>
            }
            sub="Each screener is a working tool you run locally. You receive the full Python source code, dependencies, and step-by-step setup walkthrough."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            [
              "What's inside",
              [
                "Complete Python source code",
                "Full frontend (where applicable)",
                "Pre-configured filters & logic",
                "One-time payment, no monthly fee",
              ],
            ],
            [
              "Who it's for",
              [
                "Traders wanting high-speed shortlists",
                "Builders wanting a solid head start",
                "Anyone tired of manual chart scrolling",
                "Those who value owning their tools",
              ],
            ],
            [
              "How you get it",
              [
                "Pick your screener",
                "Inquire directly via WhatsApp",
                "Instant code delivery & setup guide",
                "Free guidance if you get stuck",
              ],
            ],
          ].map(([h, list], i) => (
            <Reveal key={h as string} delay={i * 100} className="card p-6">
              <p className="eyebrow !text-lime">{h as string}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-mist">
                {(list as string[]).map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <span className="text-lime font-bold">✓</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pinned horizontal conveyor belt */}
      <Pin
        vh={280}
        stageClassName="bg-[radial-gradient(ellipse_80%_60%_at_50%_70%,#0d3a2c_0%,var(--color-abyss)_68%)]"
      >
        {(k) => (
          <div className="flex h-full flex-col justify-center">
            <div className="px-[max(1.5rem,6vw)]">
              <p className="eyebrow">
                <b className="!text-lime">02</b> · ASSEMBLY CONVEYOR
              </p>
              <h3 className="mt-3 text-[clamp(1.8rem,3.4vw,3rem)] font-extrabold leading-none">
                Watch the tools roll off the line.
              </h3>
            </div>

            <div className="relative mt-10 max-[860px]:overflow-x-auto">
              <div
                className="flex gap-5 px-[max(1.5rem,6vw)] will-change-transform max-[860px]:!transform-none"
                style={{ transform: `translateX(calc(${(1 - k).toFixed(4)} * 45vw - ${k.toFixed(4)} * 75vw))` }}
              >
                {line.map((p, i) => {
                  const lit = k > 0.08 + i * 0.12;
                  return (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      className={`card card-hover group w-80 shrink-0 p-5 transition-all duration-500 ${
                        lit ? "border-cyan/40 shadow-xl" : "opacity-40 grayscale"
                      }`}
                      style={{ ["--hc" as string]: "#41c4e1" }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.62rem] tracking-[0.16em] text-cyan font-semibold">
                          PYTHON SOURCE CODE
                        </span>
                        <span
                          className={`h-2.5 w-2.5 rounded-full transition-all ${
                            lit ? "bg-lime shadow-[0_0_12px_#a8e10d]" : "bg-dim"
                          }`}
                        />
                      </div>

                      <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border border-hairline bg-surface">
                        <Image
                          src={p.thumbnail}
                          alt={p.name}
                          fill
                          sizes="320px"
                          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <p className="mt-4 text-base font-bold leading-snug text-ink">{p.name}</p>
                      <p className="mt-2 text-xs leading-relaxed text-mist line-clamp-2">{p.shortDescription}</p>

                      <div className="mt-5 flex items-center justify-between border-t border-hairline pt-3 font-mono">
                        <span className="text-lime font-bold text-base">{formatINR(p.price)}</span>
                        <span className="text-xs text-cyan group-hover:translate-x-1 transition-transform">
                          Details →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="belt mt-6 h-3.5 border-y border-hairline" />
            </div>

            <div className="mt-8 px-[max(1.5rem,6vw)] flex flex-wrap gap-4 items-center">
              <Link href="/products" className="btn-primary">
                Browse all screeners →
              </Link>
              <a
                href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        )}
      </Pin>
    </div>
  );
}

/* ── 03 · How It Works: Pinned Steps & Checklist ─────────── */
const SETUP_STAGES = [
  "Message us on WhatsApp",
  "Confirm your operating system & dependencies",
  "Complete verified one-time payment",
  "Receive Python code & video walkthrough",
  "Run the screener locally on your machine",
];

export function StepByStep() {
  return (
    <section id="setup" className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-28">
        <Reveal>
          <Head
            n="03"
            label="VERIFIED ORDER & SETUP"
            c="#f26419"
            title={
              <>
                From payment to setup, <br />
                <span className="text-tangerine">direct on WhatsApp.</span>
              </>
            }
            sub="No confusing payment gateways or opaque subscriptions. Direct human setup and instant file delivery."
          />
        </Reveal>
      </div>

      <Pin
        vh={270}
        stageClassName="bg-[radial-gradient(ellipse_70%_60%_at_50%_60%,#2a1d10_0%,var(--color-abyss)_65%)]"
      >
        {(k) => {
          const cur = Math.min(SETUP_STAGES.length, Math.floor(k * (SETUP_STAGES.length + 1)));
          const done = cur >= SETUP_STAGES.length;

          return (
            <div className="mx-auto grid h-full max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[16rem_1fr_15rem]">
              <div>
                <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-lime font-bold">
                  Step {Math.min(cur + 1, SETUP_STAGES.length)} / {SETUP_STAGES.length}
                </p>
                <ol className="grid gap-3 font-mono text-xs text-dim">
                  {SETUP_STAGES.map((s, i) => (
                    <li
                      key={s}
                      className={`stage-li flex items-center gap-2.5 transition-colors ${
                        i < cur ? "is-done text-mist" : i === cur ? "is-cur text-ink font-semibold" : ""
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Progress Card */}
              <div
                className={`relative h-[25rem] overflow-hidden rounded-xl border border-hairline-strong bg-[#061e29] transition-shadow duration-500 ${
                  done ? "package-glow shadow-2xl" : ""
                }`}
              >
                <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-mist/40" />
                  <span className="h-2 w-2 rounded-full bg-mist/40" />
                  <span className="ml-3 rounded bg-deep px-3 py-0.5 font-mono text-[0.62rem] text-dim">
                    tradeswithai.com · order dispatch
                  </span>
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-ink">Order & Setup Verification</p>
                    <span className="chip !py-0.5 text-[0.6rem] text-lime border-lime/40">
                      {done ? "READY FOR DOWNLOAD" : "PROCESSING"}
                    </span>
                  </div>

                  {[
                    ["WhatsApp order confirmation", 1.0, "#a8e10d"],
                    ["Python 3.10+ environment check", 0.9, "#41c4e1"],
                    ["Source code packaging & tests", 0.85, "#f26419"],
                    ["Telegram bot setup instructions", 0.75, "#a8e10d"],
                  ].map(([l, v, c], i) => {
                    const fill = Math.max(0, Math.min(1, (k - 0.1 - i * 0.15) / 0.2));
                    return (
                      <div key={l as string}>
                        <div className="flex justify-between font-mono text-[0.68rem] text-mist">
                          <span>{l as string}</span>
                          <span>{Math.round((v as number) * 100 * fill)}%</span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-deep">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{ width: `${(v as number) * 100 * fill}%`, background: c as string }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <p
                    className="pt-3 text-xs leading-relaxed text-mist font-mono border-t border-hairline"
                    style={{ opacity: done ? 1 : 0.25, transition: "opacity .6s" }}
                  >
                    ✓ Package confirmed. Source code zip, installation script, and API configuration notes ready for dispatch.
                  </p>
                </div>
              </div>

              {/* Action Column */}
              <div className="space-y-4">
                <span className="inline-block rounded-lg border border-dashed border-lime/50 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-lime">
                  Manual Delivery
                </span>
                <p className="text-sm leading-relaxed text-mist">
                  Chat directly with the developer. We answer questions, confirm your machine is ready, and send files directly.
                </p>
                <a
                  href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  Start on WhatsApp →
                </a>
              </div>
            </div>
          );
        }}
      </Pin>
    </section>
  );
}

/* ── 04 · Store Shelf (All 5 products) ───────────────────── */
export function TheFullShelf() {
  return (
    <section id="shelf" className="mx-auto max-w-6xl px-6 pb-28 pt-20 border-t border-hairline">
      <Reveal>
        <Head
          n="04"
          label="THE FULL SHELF"
          c="#41c4e1"
          title={
            <>
              Explore every <span className="text-cyan">screener build.</span>
            </>
          }
          sub="Run each tool on your own machine. Full Python source code, clean installation guide, and WhatsApp support included."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((product, i) => (
          <Reveal key={product.id} delay={i * 80}>
            <article className="card card-hover group flex h-full flex-col overflow-hidden p-5" style={{ ["--hc" as string]: "#41c4e1" }}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-hairline bg-surface">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="chip !py-0.5 !text-[0.6rem] text-lime border-lime/30">PYTHON 3.10+</span>
                    <span className="font-mono text-base font-bold text-lime">{formatINR(product.price)}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-ink leading-snug">{product.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist line-clamp-3">{product.shortDescription}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                  <Link href={`/products/${product.id}`} className="text-xs font-semibold text-cyan hover:underline">
                    View Demo & Details →
                  </Link>
                  <a
                    href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(`Hi, I want to acquire ${product.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-1.5 !px-3 !text-xs"
                  >
                    Inquire
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── 05 · Free Library: AI Backtesting ───────────────────── */
export function FreeLibrary() {
  return (
    <section id="free" className="border-t border-hairline py-28 bg-[radial-gradient(circle_at_50%_40%,#092636_0%,var(--color-abyss)_65%)]">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Head
            n="05"
            label="FREE RESOURCES"
            title={
              <>
                Backtest any indicator with AI. <span className="text-cyan">Free forever.</span>
              </>
            }
            sub="No paywall, no email gate. Turn TradingView indicators into fully backtested Python strategies using Claude AI."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal delay={100}>
            <div className="card card-hover flex h-full flex-col justify-between p-8" style={{ ["--hc" as string]: "#41c4e1" }}>
              <div>
                <span className="chip text-cyan border-cyan/40">PROMPT TEMPLATE</span>
                <h3 className="mt-4 text-2xl font-extrabold text-ink">Master AI Backtesting Prompt</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  Turn any TradingView indicator into a rigorous backtest. Walks through regime filtering, slippage,
                  execution on next-bar open, and generates an honest SVG performance report.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-hairline pt-5">
                <span className="font-mono text-xs text-dim">100% Free Markdown</span>
                <Link href="/resources/backtest-indicator-with-ai" className="btn-primary">
                  Read & Copy Prompt →
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="card card-hover flex h-full flex-col justify-between p-8" style={{ ["--hc" as string]: "#a8e10d" }}>
              <div>
                <span className="chip text-lime border-lime/40">SAMPLE DOWNLOAD</span>
                <h3 className="mt-4 text-2xl font-extrabold text-ink">SuperTrend Strategy Report</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  Inspect what Claude outputs when given the Master Prompt. Includes drawdown curves, benchmark comparisons,
                  win rate by market regime (bull, sideways, bear), and cost sensitivity.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-hairline pt-5">
                <span className="font-mono text-xs text-dim">Full PDF Artifact</span>
                <a
                  href="/resources/super-trend-strategy-report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Download Sample PDF ↓
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 06 · Final Inquiry Section ──────────────────────────── */
export function Final() {
  const text = useTyping([
    "a breakout scanner for NIFTY 500",
    "a crypto momentum tool for Hyperliquid",
    "an insider transaction tracker",
    "custom alert rules for my watchlist",
  ]);

  return (
    <section className="relative overflow-hidden border-t border-hairline py-32 text-center">
      <div className="hero-env pointer-events-none opacity-60" />
      <Reveal className="relative mx-auto max-w-3xl px-6">
        <p className="eyebrow">
          <b>YOUR TURN</b> · DIRECT SETUP
        </p>
        <h2 className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight">
          I want to run
          <br />
          <span className="text-lime">{text}</span>
          <span className="cw-caret !h-[0.9em] !w-[4px] !bg-lime" />
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base text-mist leading-relaxed">
          Not sure your machine is ready? Message us on WhatsApp with the screener name and your operating system. We will verify before you buy.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <a
            href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Inquire on WhatsApp →
          </a>
          <Link href="/contact" className="btn-ghost">
            Contact & Setup Questions
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
