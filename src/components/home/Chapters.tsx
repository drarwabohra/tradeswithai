"use client";

import Image from "next/image";
import Link from "next/link";
import { Marquee, Pin, Reveal, span, useScrollProgress, useTyping } from "@/components/motion";
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

/* ── 01 · Why it works: pinned orbit ─────────────────────────
   Rings draw themselves as you scroll, then each screener lights up around a
   "Your PC" core — every tool runs locally. Stats sit top-right, ticker below. */
const ORBIT_ANGLES = [205, 270, 335, 30, 150]; // degrees, SVG coords (0 = right, 90 = down)
const STATS = [
  ["5", "Screeners"],
  ["₹5,000", "Flat one-time price"],
  ["12h", "Code sent within 12h (usually <1h)"],
  ["100%", "Full source code, yours to modify"],
] as const;
const TICKER = [
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
];

export function Proof() {
  const nodes = catalog.slice(0, ORBIT_ANGLES.length).map((p, i) => {
    const a = (ORBIT_ANGLES[i] * Math.PI) / 180;
    return { p, x: 50 + 46 * Math.cos(a), y: 50 + 46 * Math.sin(a) };
  });

  return (
    <section id="proof" className="scroll-mt-20">
      <Pin vh={320} stageClassName="bg-[radial-gradient(circle_at_50%_60%,#0b3446_0%,var(--color-abyss)_62%)]">
        {(k) => {
          // Beat 1 (0–0.3): heading + stats while the rings start drawing small.
          // Beat 2 (0.3–1): heading + stats lift away, the orbit zooms in and screeners light up.
          const intro = 1 - span(k, 0.24, 0.34);
          const zoom = 0.72 + span(k, 0.2, 0.45) * 0.3;
          const orbitO = 0.45 + 0.55 * span(k, 0.15, 0.35);
          return (
            <div className="relative h-full max-[1024px]:px-6 max-[1024px]:py-24">
              {/* Heading */}
              <p
                className="eyebrow absolute left-[max(1.5rem,6vw)] top-[6.25rem] max-[1024px]:hidden"
                style={{ ["--c" as string]: "#41c4e1", opacity: 1 - intro }}
                aria-hidden="true"
              >
                <b>01</b> · WHY IT WORKS · EVERY SCREENER RUNS ON YOUR PC
              </p>
              <div
                className="z-10 max-w-[34rem] max-[1024px]:!transform-none max-[1024px]:!opacity-100 min-[1025px]:absolute min-[1025px]:left-[max(1.5rem,6vw)] min-[1025px]:top-[6.25rem]"
                style={{ opacity: intro, transform: `translateY(${((1 - intro) * -30).toFixed(1)}px)`, pointerEvents: intro > 0.5 ? "auto" : "none" }}
              >
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
              </div>

              {/* Stats */}
              <ul
                className="z-10 grid gap-3 max-[1024px]:mt-10 max-[1024px]:grid-cols-2 max-[1024px]:!transform-none max-[1024px]:!opacity-100 min-[1025px]:absolute min-[1025px]:right-[max(1.5rem,6vw)] min-[1025px]:top-[6.25rem] min-[1025px]:text-right"
                style={{ opacity: intro, transform: `translateY(${((1 - intro) * -30).toFixed(1)}px)` }}
              >
                {STATS.map(([v, l], i) => {
                  const t = span(k, 0.08 + i * 0.05, 0.16 + i * 0.05);
                  return (
                    <li
                      key={l}
                      className="max-[1024px]:!opacity-100 max-[1024px]:!transform-none"
                      style={{ opacity: t, transform: `translateY(${((1 - t) * 14).toFixed(1)}px)` }}
                    >
                      <p className="font-mono text-[1.6rem] font-extrabold leading-tight text-ink">{v}</p>
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-dim">{l}</p>
                    </li>
                  );
                })}
              </ul>

              {/* Orbit */}
              <div
                className="relative aspect-square w-[min(70vw,64svh)] max-[1024px]:mx-auto max-[1024px]:mt-10 max-[1024px]:w-[min(100%,30rem)] max-[1024px]:!transform-none max-[1024px]:!opacity-100 min-[1025px]:absolute min-[1025px]:left-1/2 min-[1025px]:top-[56%]"
                style={{ transform: `translate(-50%, -50%) scale(${zoom.toFixed(4)})`, opacity: orbitO }}
                data-orbit
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                  <defs>
                    <radialGradient id="orbit-core">
                      <stop offset="0%" stopColor="#a8e10d" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#a8e10d" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {[46, 33, 20].map((r, i) => (
                    <circle
                      key={r}
                      cx="50"
                      cy="50"
                      r={r}
                      pathLength={1}
                      fill="none"
                      stroke={i === 0 ? "#41c4e1" : i === 1 ? "rgba(65,196,225,.45)" : "rgba(168,225,13,.5)"}
                      strokeWidth={i === 0 ? 0.35 : 0.25}
                      strokeDasharray="1"
                      strokeDashoffset={(1 - span(k, 0.04 + i * 0.08, 0.36 + i * 0.08)).toFixed(4)}
                      transform={`rotate(${-90 + k * 40 * (i % 2 ? -1 : 1)} 50 50)`}
                    />
                  ))}
                  {nodes.map((n, i) => {
                    const lit = span(k, 0.4 + i * 0.07, 0.48 + i * 0.07);
                    return (
                      <g key={n.p.id} style={{ opacity: 0.15 + lit * 0.85 }}>
                        <line x1="50" y1="50" x2={n.x} y2={n.y} stroke="#41c4e1" strokeWidth="0.2" strokeDasharray="0.8 1.4" />
                        <circle cx={n.x} cy={n.y} r={1.1 + lit * 0.5} fill={lit > 0.5 ? "#a8e10d" : "#0a2b3a"} stroke="#a8e10d" strokeWidth="0.3" />
                      </g>
                    );
                  })}
                  <circle cx="50" cy="50" r={9 + span(k, 0.2, 0.5) * 3} fill="url(#orbit-core)" />
                  <circle cx="50" cy="50" r="5.5" fill="#061e29" stroke="#a8e10d" strokeWidth="0.35" />
                </svg>

                {/* Core label */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="font-mono text-xs font-bold tracking-[0.18em] text-lime">YOUR PC</p>
                  <p className="font-mono text-xs text-mist">runs locally</p>
                </div>

                {/* Screener labels (desktop) */}
                {nodes.map((n, i) => {
                  const lit = span(k, 0.4 + i * 0.07, 0.48 + i * 0.07);
                  const left = n.x < 50;
                  return (
                    <Link
                      key={n.p.id}
                      href={`/products/${n.p.id}`}
                      tabIndex={lit > 0.5 ? 0 : -1}
                      className="card card-hover absolute w-max max-w-[15rem] !rounded-xl px-3.5 py-2 backdrop-blur-md max-[1024px]:hidden"
                      style={{
                        left: `${n.x}%`,
                        top: `${n.y}%`,
                        transform: `translate(${left ? "calc(-100% - 1rem)" : "1rem"}, -50%) translateX(${((1 - lit) * (left ? -16 : 16)).toFixed(1)}px)`,
                        opacity: lit,
                        pointerEvents: lit > 0.5 ? "auto" : "none",
                        ["--hc" as string]: "#a8e10d",
                      }}
                    >
                      <span className="block font-mono text-xs tracking-[0.14em] text-lime">0{i + 1} · {formatINR(n.p.price)}</span>
                      <span className="block text-sm font-extrabold text-ink">{n.p.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Screener list (tablet & mobile) */}
              <ul className="mt-8 grid gap-2 sm:grid-cols-2 min-[1025px]:hidden">
                {catalog.map((p) => (
                  <li key={p.id}>
                    <Link href={`/products/${p.id}`} className="card card-hover flex min-h-[44px] items-center justify-between gap-3 px-4 py-3">
                      <span className="text-sm font-bold text-ink">{p.name}</span>
                      <span className="font-mono text-xs text-lime">{formatINR(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Ticker */}
              <div className="border-y border-hairline bg-abyss/50 max-[1024px]:mt-12 min-[1025px]:absolute min-[1025px]:inset-x-0 min-[1025px]:bottom-0">
                <Marquee items={TICKER} />
              </div>
            </div>
          );
        }}
      </Pin>
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

      {/* Pinned horizontal conveyor belt */}
      <Pin
        vh={260}
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
                      className={`card card-hover group w-72 sm:w-80 shrink-0 p-5 transition-[opacity,border-color,box-shadow] duration-500 min-h-[44px] ${
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

      <Pin
        vh={260}
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
                    chartneural · order dispatch
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
                            className="h-full rounded-full"
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
                  <p className="text-mist">Choose your screener, then message us on WhatsApp or email {""}
                    <span className="text-ink">hkausar2910@gmail.com</span>. We share payment details directly.</p>
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

/* ── 05 · Free AI Guide: glowing trunk timeline ──────────────
   A vertical line fills with light as you scroll; each resource lights up as you reach it. */
const PROMPT_LINES = [
  "Role: rigorous quant researcher",
  "Input: any TradingView indicator",
  "Rules: next-bar execution, slippage, costs",
  "Test: bull / sideways / bear regimes",
  "Output: HTML report with inline SVG charts",
];

function PromptVisual({ on }: { on: number }) {
  return (
    <div className="cw-frame h-full p-5 font-mono text-xs">
      <p className="mb-4 flex items-center gap-2 text-dim">
        <span className="h-2 w-2 rounded-full bg-cyan" /> master-prompt.md
      </p>
      {PROMPT_LINES.map((l, i) => {
        const t = span(on, i * 0.14, i * 0.14 + 0.3);
        return (
          <p key={l} className="mb-2.5 text-mist" style={{ opacity: t, transform: `translateX(${((1 - t) * 12).toFixed(1)}px)` }}>
            <span className="text-lime">›</span> {l}
          </p>
        );
      })}
      <span className="cw-caret" />
    </div>
  );
}

function ReportVisual({ on }: { on: number }) {
  const curve = "M0 70 L12 64 L22 67 L34 52 L45 56 L57 40 L66 45 L78 28 L88 33 L100 16";
  return (
    <div className="cw-frame flex h-full flex-col p-5">
      <p className="flex items-center justify-between font-mono text-xs text-dim">
        <span>supertrend-report.pdf</span>
        <span className="text-lime">equity curve</span>
      </p>
      <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="mt-4 h-full w-full flex-1" aria-hidden="true">
        {[20, 40, 60].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(127,180,199,.12)" strokeWidth="0.4" />
        ))}
        <path d={`${curve} L100 80 L0 80 Z`} fill="rgba(168,225,13,.08)" style={{ opacity: on }} />
        <path
          d={curve}
          fill="none"
          stroke="#a8e10d"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={(1 - on).toFixed(4)}
        />
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-xs text-mist" style={{ opacity: span(on, 0.6, 1) }}>
        <span>Win rate by regime</span>
        <span>Max drawdown</span>
        <span>Cost sensitivity</span>
      </div>
    </div>
  );
}

export function FreeLibrary() {
  const [ref, p] = useScrollProgress<HTMLDivElement>((r, vh) => (vh * 0.62 - r.top) / r.height);
  const rows = [
    {
      label: "PROMPT TEMPLATE",
      title: "Master AI Backtesting Prompt",
      body: "Turn any TradingView indicator into a rigorous backtest. Walks through regime filtering, slippage, execution on next-bar open, and generates an honest HTML report with inline SVG charts.",
      cta: (
        <Link href="/resources/backtest-indicator-with-ai" className="btn-primary min-h-[44px]">
          Read & Copy Prompt →
        </Link>
      ),
      Visual: PromptVisual,
    },
    {
      label: "SAMPLE DOWNLOAD",
      title: "SuperTrend Strategy Report",
      body: "Inspect what Claude outputs when given the Master Prompt. Includes drawdown curves, benchmark comparisons, win rate by market regime (bull, sideways, bear), and cost sensitivity.",
      cta: (
        <a href="/resources/super-trend-strategy-report.pdf" download className="btn-ghost min-h-[44px]">
          Download Sample PDF ↓
        </a>
      ),
      Visual: ReportVisual,
    },
  ];

  return (
    <section
      id="resources"
      className="scroll-mt-20 border-t border-hairline bg-[radial-gradient(circle_at_50%_40%,#092636_0%,var(--color-abyss)_65%)] px-6 pb-24 pt-28"
    >
      <div className="mx-auto max-w-6xl">
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

        <div ref={ref} className="relative mt-20 grid gap-[clamp(4rem,12vh,8rem)] pl-12 max-[760px]:pl-8">
          {/* trunk */}
          <div className="absolute bottom-0 left-2 top-0 w-0.5 bg-hairline max-[760px]:left-1.5">
            <i
              className="absolute left-0 top-0 block w-full bg-cyan shadow-[0_0_10px_#41c4e1,0_0_26px_#41c4e1]"
              style={{ height: `${(p * 100).toFixed(2)}%` }}
            />
          </div>

          {rows.map((row, i) => {
            const on = span(p, i * 0.45, i * 0.45 + 0.35);
            const lit = on > 0.05;
            return (
              <div key={row.title} className="relative grid items-center gap-[clamp(1.5rem,4vw,4rem)] md:grid-cols-[5fr_7fr]">
                <span
                  className={`absolute -left-12 top-1/2 h-3.5 w-3.5 -translate-x-[3px] -translate-y-1/2 rounded-full border-2 transition-all duration-500 max-[760px]:-left-8 max-[760px]:top-2 max-[760px]:translate-y-0 ${
                    lit ? "border-cyan bg-cyan shadow-[0_0_12px_#41c4e1]" : "border-hairline-strong bg-abyss"
                  }`}
                  aria-hidden="true"
                />
                <div className="grid justify-items-start gap-3">
                  <p className="font-mono text-xs tracking-[0.14em] text-cyan">{row.label}</p>
                  <h3 className="text-[clamp(1.4rem,2.3vw,1.9rem)] font-extrabold leading-tight text-ink">{row.title}</h3>
                  <p className="max-w-[44ch] leading-relaxed text-mist">{row.body}</p>
                  <div className="mt-2">{row.cta}</div>
                </div>
                <div className="h-[clamp(16rem,40vh,21rem)]">
                  <row.Visual on={on} />
                </div>
              </div>
            );
          })}
        </div>
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
  // A glowing line draws itself down into the final call to action as it scrolls into view.
  const [lineRef, draw] = useScrollProgress<HTMLDivElement>((r, vh) => (vh - r.top) / (vh * 0.75));

  return (
    <section id="custom" className="relative overflow-hidden border-t border-hairline pb-32 text-center scroll-mt-20">
      <div className="hero-env pointer-events-none opacity-60" />
      <div ref={lineRef} className="relative mx-auto h-[24vh] w-10" aria-hidden="true">
        <svg viewBox="0 0 40 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <path
            d="M20 0 C20 40, 8 55, 20 75 S20 95, 20 100"
            fill="none"
            stroke="#41c4e1"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={(1 - draw).toFixed(4)}
            style={{ filter: "drop-shadow(0 0 6px #41c4e1)" }}
          />
        </svg>
        <span
          className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan shadow-[0_0_14px_#41c4e1]"
          style={{ opacity: draw > 0.97 ? 1 : 0, transition: "opacity .3s" }}
        />
      </div>
      <Reveal className="relative mx-auto mt-10 max-w-3xl px-6">
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
