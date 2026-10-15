"use client";

import Image from "next/image";
import Link from "next/link";
import { CountUp, Marquee, Pin, Reveal, useTyping } from "@/components/motion";
import { catalog } from "@/lib/catalog";
import { formatINR } from "@/lib/format";
import { SITE } from "@/lib/site";

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
      {sub && <p className="serif-sub max-w-[44ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ── 01 · Why it works: Stats + Marquee ──────────────────── */
export function Proof() {
  return (
    <section
      id="proof"
      className="relative overflow-hidden border-b border-hairline bg-[radial-gradient(circle_at_50%_60%,#0b3446_0%,var(--color-abyss)_62%)] py-24 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Head
            n="01"
            label="WHY IT WORKS"
            title={
              <>
                Every screener starts as <span className="text-cyan">one testable rule.</span>
              </>
            }
            sub="Then it becomes a Python data engine, interactive chart filters, clean documentation you own forever, and, on some screeners, Telegram alerts."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-4 min-h-[148px]">
          <Reveal delay={0} className="bg-deep p-7 min-h-[148px] flex flex-col justify-center">
            <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-ink font-mono flex items-baseline min-h-[1.2em]">
              <span>5</span>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-dim">Screeners</p>
          </Reveal>

          <Reveal delay={90} className="bg-deep p-7 min-h-[148px] flex flex-col justify-center">
            <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-ink font-mono flex items-baseline min-h-[1.2em]">
              <span>100%</span>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-dim">Full source code, yours to modify</p>
          </Reveal>

          {/* Static value ₹5,000 with no count-up */}
          <Reveal delay={180} className="bg-deep p-7 min-h-[148px] flex flex-col justify-center">
            <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-ink font-mono flex items-baseline min-h-[1.2em]">
              <span>₹5,000</span>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-dim">Flat One-Time Price</p>
          </Reveal>

          <Reveal delay={270} className="bg-deep p-7 min-h-[148px] flex flex-col justify-center">
            <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-ink font-mono flex items-baseline min-h-[1.2em]">
              <span>12h</span>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-dim">Code sent within 12h (usually &lt;1h)</p>
          </Reveal>
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

/* ── 02 · Screeners: Pinned Conveyor Line ─────────────────── */
export function ProductLine() {
  const line = catalog;

  return (
    <div id="conveyor" className="scroll-mt-20">
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-28">
        <Reveal>
          <Head
            n="02"
            label="SCREENERS"
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
                "Code sent within 12 hours (usually under 1 hour)",
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

      {/* Pinned horizontal conveyor belt (shortened scroll distance: 140vh) */}
      <Pin
        vh={140}
        stageClassName="bg-[radial-gradient(ellipse_80%_60%_at_50%_70%,#0d3a2c_0%,var(--color-abyss)_68%)]"
      >
        {(k) => (
          <div className="flex h-full flex-col justify-center">
            <div className="px-[max(1.5rem,6vw)]">
              <p className="eyebrow text-mist">
                <span className="text-lime font-bold">ASSEMBLY CONVEYOR</span>
              </p>
              <h3 className="mt-3 text-[clamp(1.8rem,3.4vw,3rem)] font-extrabold leading-none">
                Watch the tools roll off the line.
              </h3>
            </div>

            <div className="relative mt-10 max-[1024px]:overflow-x-auto">
              <div
                className="flex gap-5 px-[max(1.5rem,6vw)] will-change-transform max-[1024px]:!transform-none"
                style={{ transform: `translateX(calc(${(1 - k).toFixed(4)} * 45vw - ${k.toFixed(4)} * 75vw))` }}
              >
                {line.map((p, i) => {
                  const lit = k > 0.08 + i * 0.12;
                  return (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      onFocus={(e) => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })}
                      className={`card card-hover group w-72 sm:w-80 shrink-0 p-5 transition-all duration-300 min-h-[44px] ${
                        lit ? "border-cyan/40 opacity-100 shadow-xl" : "opacity-70"
                      }`}
                      style={{ ["--hc" as string]: "#41c4e1" }}
                    >
                      {/* Conveyor card shows ONLY image and name */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-hairline bg-surface">
                        <Image
                          src={p.thumbnail}
                          alt={p.name}
                          fill
                          sizes="(max-width: 768px) 90vw, 320px"
                          priority={false}
                          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-4 text-base font-bold leading-snug text-ink">{p.name}</p>
                    </Link>
                  );
                })}
              </div>
              <div className="belt mt-6 h-3.5 border-y border-hairline" />
            </div>

            <div className="mt-8 px-[max(1.5rem,6vw)] flex flex-wrap gap-4 items-center">
              <Link href="/products" className="btn-primary min-h-[44px]">
                Browse all screeners →
              </Link>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost min-h-[44px]"
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

/* ── 03 · All 5 Screeners: Store Shelf ───────────────────── */
export function TheFullShelf() {
  return (
    <section id="shelf" className="mx-auto max-w-6xl px-6 pb-28 pt-20 border-t border-hairline scroll-mt-20">
      <Reveal>
        <Head
          n="03"
          label="ALL 5 SCREENERS"
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
            <article
              className="card card-hover group flex h-full flex-col overflow-hidden p-5"
              style={{ ["--hc" as string]: "#41c4e1" }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-hairline bg-surface">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  priority={false}
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="chip !py-0.5 !text-xs text-lime border-lime/30 min-h-[28px]">
                      PYTHON 3.10+
                    </span>
                    <span className="font-mono text-base font-bold text-lime">{formatINR(product.price)}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-ink leading-snug">{product.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist line-clamp-3">{product.shortDescription}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4 gap-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-xs font-semibold text-cyan hover:underline min-h-[44px] flex items-center"
                  >
                    View Demo & Details →
                  </Link>
                  <a
                    href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Hi, I want to acquire ${product.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-1.5 !px-3.5 !text-xs min-h-[44px]"
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

/* ── 04 · How Buying Works: Pinned Steps & Checklist ─────── */
const SETUP_STAGES = [
  "Message us on WhatsApp",
  "Confirm your operating system & dependencies",
  "Complete verified one-time payment",
  "Receive Python code & video walkthrough",
  "Run the screener locally on your machine",
];

export function StepByStep() {
  return (
    <section id="setup" className="border-t border-hairline scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-28">
        <Reveal>
          <Head
            n="04"
            label="HOW BUYING WORKS"
            c="#f26419"
            title={
              <>
                From payment to setup, <br />
                <span className="text-tangerine">direct on WhatsApp.</span>
              </>
            }
            sub="No confusing payment gateways or opaque subscriptions. Direct human setup. Code sent within 12 hours of payment confirmation (usually under 1 hour)."
          />
        </Reveal>
      </div>

      {/* Shortened pinned scroll distance: 140vh */}
      <Pin
        vh={140}
        stageClassName="bg-[radial-gradient(ellipse_70%_60%_at_50%_60%,#2a1d10_0%,var(--color-abyss)_65%)]"
      >
        {(k) => {
          const cur = Math.min(SETUP_STAGES.length, Math.floor(k * (SETUP_STAGES.length + 1)));
          const done = cur >= SETUP_STAGES.length;

          return (
            <div className="mx-auto grid h-full max-w-6xl items-center gap-10 px-6 py-16 grid-cols-1 lg:grid-cols-[16rem_1fr_15rem]">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-lime font-bold">
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

              {/* Progress Card - full width below 1024px */}
              <div
                className={`relative w-full h-[25rem] min-h-[25rem] overflow-hidden rounded-xl border border-hairline-strong bg-[#061e29] transition-shadow duration-500 ${
                  done ? "package-glow shadow-2xl" : ""
                }`}
              >
                <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-mist/40" />
                  <span className="h-2 w-2 rounded-full bg-mist/40" />
                  <span className="ml-3 rounded bg-deep px-3 py-0.5 font-mono text-xs text-dim">
                    tradeswithai · order dispatch
                  </span>
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-ink">Order & Setup Verification</p>
                    <span className="chip !py-0.5 !text-xs text-lime border-lime/40 min-h-[28px] shrink-0 whitespace-nowrap">
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
                        <div className="flex justify-between font-mono text-xs text-mist">
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

              {/* Action Column with How To Pay line */}
              <div className="space-y-4">
                <span className="inline-block rounded-lg border border-dashed border-lime/50 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-lime min-h-[32px] flex items-center">
                  Code Sent Within 12h
                </span>
                <p className="text-sm leading-relaxed text-mist">
                  Chat directly with the developer. We answer questions, confirm your machine is ready, and send files directly.
                </p>

                {/* "How to pay" line */}
                <div className="rounded-lg border border-hairline bg-deep/80 p-3.5 text-xs text-mist font-mono leading-relaxed">
                  <p className="font-semibold text-ink mb-1">How to pay:</p>
                  <p className="text-ink">India: <span className="text-mist">UPI or bank transfer.</span></p>
                  <p className="text-ink">Outside India: <span className="text-mist">[FILL IN payment method].</span></p>
                </div>

                <a
                  href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center min-h-[44px]"
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

/* ── 05 · Free AI Guide: AI Backtesting ──────────────────── */
export function FreeLibrary() {
  return (
    <section
      id="resources"
      className="border-t border-hairline py-28 bg-[radial-gradient(circle_at_50%_40%,#092636_0%,var(--color-abyss)_65%)] scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Head
            n="05"
            label="FREE AI GUIDE"
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
                <span className="chip text-cyan border-cyan/40 min-h-[28px]">PROMPT TEMPLATE</span>
                <h3 className="mt-4 text-2xl font-extrabold text-ink">Master AI Backtesting Prompt</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  Turn any TradingView indicator into a rigorous backtest. Walks through regime filtering, slippage,
                  execution on next-bar open, and generates an honest SVG performance report.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-hairline pt-5">
                <span className="font-mono text-xs text-dim">100% Free Markdown</span>
                <Link href="/resources/backtest-indicator-with-ai" className="btn-primary min-h-[44px]">
                  Read & Copy Prompt →
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="card card-hover flex h-full flex-col justify-between p-8" style={{ ["--hc" as string]: "#a8e10d" }}>
              <div>
                <span className="chip text-lime border-lime/40 min-h-[28px]">SAMPLE DOWNLOAD</span>
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
                  download
                  className="btn-ghost min-h-[44px]"
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

/* ── Who Builds These Block ──────────────────────────────── */
export function BuilderInfo() {
  return (
    <section className="border-t border-hairline py-20 bg-abyss">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="card p-8 sm:p-10 border-hairline">
            <p className="eyebrow !text-cyan mb-2">BUILDER & MAINTAINER</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Who builds these
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="h-20 w-20 shrink-0 rounded-2xl border border-dashed border-hairline-strong bg-deep grid place-items-center text-xs font-mono text-dim text-center p-2">
                [FILL IN photo]
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-ink">[FILL IN name]</h3>
                <p className="text-sm text-mist leading-relaxed">
                  [FILL IN one-line bio]
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono">
                  <span className="text-mist">LinkedIn: <span className="text-cyan">[FILL IN LinkedIn]</span></span>
                  <span className="text-dim">•</span>
                  <span className="text-mist">Email: <span className="text-cyan">[FILL IN email]</span></span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Final Inquiry Section ───────────────────────────────── */
const FINAL_PHRASES = [
  "Stock Breakout Screener",
  "Falling Wedge Screener",
  "Crypto Breakout Scanner",
  "Insider Transactions Dashboard",
  "Momentum & Valuation Screener",
];

export function Final() {
  const text = useTyping(FINAL_PHRASES);

  return (
    <section id="custom" className="relative overflow-hidden border-t border-hairline py-32 text-center scroll-mt-20">
      <div className="hero-env pointer-events-none opacity-60" />
      <Reveal className="relative mx-auto max-w-3xl px-6">
        <p className="eyebrow">
          <b>YOUR TURN</b> · DIRECT SETUP
        </p>
        <h2
          className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight"
          aria-label="I want to run a screener on my own computer."
        >
          I want to run
          <br />
          <span className="text-lime">{text || "Stock Breakout Screener"}</span>
          <span className="cw-caret !h-[0.9em] !w-[4px] !bg-lime" />
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base text-mist leading-relaxed">
          Not sure your machine is ready? Message us on WhatsApp with the screener name and your operating system. We will verify before you buy.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <a
            href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-h-[44px]"
          >
            Inquire on WhatsApp →
          </a>
          <Link href="/contact" className="btn-ghost min-h-[44px]">
            Contact & Setup Questions
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
