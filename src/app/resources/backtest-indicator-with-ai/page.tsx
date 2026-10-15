import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowLeft, Bot } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Backtest any TradingView indicator using Claude AI · Master Prompt",
  description: "The exact 5-step prompt to turn any TradingView indicator into a fully backtested Python strategy with a self-contained HTML report with inline SVG charts.",
  alternates: { canonical: "/resources/backtest-indicator-with-ai" },
  openGraph: {
    title: "Backtest any TradingView indicator using Claude AI · Master Prompt",
    description: "The exact 5-step prompt to turn any TradingView indicator into a fully backtested Python strategy with a self-contained HTML report with inline SVG charts.",
    url: "/resources/backtest-indicator-with-ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backtest any TradingView indicator using Claude AI · Master Prompt",
    description: "The exact 5-step prompt to turn any TradingView indicator into a fully backtested Python strategy with a self-contained HTML report with inline SVG charts.",
  },
};

const promptText = `You are going to turn a TradingView INDICATOR into a fully backtested STRATEGY, and give me a professional report at the end. Work through the steps in order. Do not skip ahead.

THE INDICATOR: \`SuperTrend\`

STEP 1 — IDENTIFY IT. Before anything else, tell me in plain English: (a) what this indicator measures, and which family it belongs to — trend-following, momentum oscillator, volatility, volume, or support/resistance; (b) its standard formula and its DEFAULT parameter values as published on TradingView, and cite where that comes from; (c) every distinct SIGNAL EVENT it can produce — a flip, a cross, a threshold break, a band touch — each written as an exact, testable condition on CLOSED daily bars; (d) the market condition it was designed for, and the market condition it is known to perform worst in. If more than one common version of this indicator exists, list them and ask me which one I mean before continuing.

STEP 2 — SHOW ME THE GAP. An indicator is not a strategy. List every decision that has to be made before this indicator can actually be traded, tell me what you would choose for each and why, and number them. At minimum cover: (1) ENTRY — the exact trigger and the exact bar it fills on; (2) EXIT — does the same signal exit the position, or is a separate exit rule needed; (3) DIRECTION — long-only, long-or-flat, or long and short; (4) REGIME FILTER — what filter, if any, keeps this indicator out of the market condition you named in Step 1(d); (5) POSITION SIZE; (6) COSTS. Do not write any code yet. I want to correct your choices before you commit to them.

STEP 3 — ASK ME FOUR THINGS, then STOP and wait for my answers: 1. How many years of history should I test? 2. Which instrument — give me the exact ticker? 3. What position size, as a percentage of equity per trade? 4. What commission, as a percentage per side?

STEP 4 — ONLY AFTER I ANSWER, BUILD IT. Write the backtest in Python using yfinance and pandas. Write the loop yourself — no backtesting library — so I can read every line. Hard rules: every decision is made only on CLOSED bars; a signal on bar N fills at bar N+1's OPEN, never at the close that triggered it; commission is charged on both entry and exit; and no calculation may use data from the current bar or any future bar to make the current bar's decision. After it runs, state explicitly which lines you checked to confirm that last rule.

STEP 5 — REPORT. Produce these, and show the formula or source beside anything that isn't a raw count:
Headline: number of trades · win rate · average win · average loss · net return · CAGR · max drawdown · longest time underwater · percentage of total profit contributed by the top 5 trades
Quality: profit factor · expectancy per trade · average holding period in bars · time in market as a percentage · best and worst single trade · longest run of consecutive losses · number of raw signals vs number of trades actually taken, so I can see how many the regime filter removed
Benchmark: buy-and-hold on the same ticker, same start date, same starting balance — net return, CAGR, max drawdown and longest time underwater, side by side
Regime split: classify every bar as UP, SIDEWAYS or DOWN using the instrument's own 200-day moving average and its slope, then report the strategy's return, win rate and trade count separately in each. State the classification rule on the panel.
Cost sensitivity: the headline table re-run at zero commission, at my commission, and at double my commission
Charts (inline SVG only): equity curve vs buy-and-hold · underwater/drawdown curve · monthly returns heatmap · a bar chart of every individual trade's return

WHAT THIS MEANS — a written section, in plain English, answering: Is the edge in the entries or the exits? Is the result carried by a handful of trades? Would buying and holding have beaten it? In which market regime does this actually work — and in which does it lose? What single change would most likely break this result? Be blunt. If the strategy is unimpressive, say so.

OUTPUT CONTRACT — Render everything as ONE self-contained \`.html\` file called \`01_strategy_report.html\`. Tailwind via the Play CDN, all data inlined as a JS object so it opens offline with no server. Every chart is inline SVG you generate yourself — no chart library, no external images. Design for 1920 by 1080. Palette: ground \`#052232\`, panels \`#073446\` with \`#19C3DA\` borders at 25% opacity, positive \`#95EB45\`, labels and setup \`#19C3DA\`, negative and warnings \`#F2643C\`, body text \`#E6EDF0\`, secondary text \`#8B9BA5\`. No yellow anywhere. Layout: header bar, then a row of big-number KPI cards, then detail panels with colour-coded status pills — never a plain-text verdict. PLAIN ENGLISH: define every technical term in one muted line at first use, and open every panel with a one-sentence "WHAT THIS SHOWS". HONESTY RULES, which outrank the visual rules: show the source beside every figure; put an orange ASSUMPTION pill on every estimate or placeholder; include a LIMITATIONS panel that may not be left empty; and never start a chart axis anywhere but zero unless you label the truncation on the chart itself. You are forbidden from designing a weak result to look strong. If the finding is unimpressive, the report must read as unimpressive.`;

export default function ArticlePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <Link
        href="/resources"
        className="inline-flex min-h-[44px] items-center gap-2 text-mist hover:text-ink mb-8 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Resources
      </Link>

      <header className="mb-12 border-b border-hairline pb-12">
        <p className="eyebrow mb-3">
          <b>AI WORKFLOW</b> · PROMPT TEMPLATE
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-ink leading-tight">
          Backtest any TradingView indicator using Claude AI
        </h1>
        <p className="text-lg text-mist leading-relaxed text-pretty">
          Turn any indicator (MACD, RSI, VWAP, Supertrend, etc.) into a professional strategy backtest with a self-contained HTML report with inline SVG charts. No Pine Script or paid platform required.
        </p>
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-ink mb-4">How it works</h2>
          <p className="text-mist leading-relaxed mb-4">
            Writing backtesting code from scratch takes hours. By leveraging Claude or ChatGPT, you can generate
            a complete, leak-free Python backtesting engine using public Yahoo Finance data in seconds.
          </p>
          <p className="text-mist leading-relaxed">
            The prompt below explicitly instructs the AI to enforce realistic execution (signal on bar N fills on bar N+1&apos;s
            open), test across regimes (bull, sideways, bear), apply commissions, and render a self-contained HTML report with inline SVG charts.
          </p>
        </section>

        <section id="prompt">
          <h2 className="text-2xl font-bold text-ink mb-4 flex items-center gap-2">
            <Bot size={24} className="text-cyan" /> The Master Prompt
          </h2>

          <div className="card overflow-hidden shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-deep px-5 py-3">
              <span className="font-mono text-xs text-mist">COPY THE PROMPT INTO CLAUDE OR CHATGPT</span>
              <CopyButton value={promptText} label="Master Prompt" />
            </div>
            <pre className="p-5 sm:p-6 overflow-x-auto text-xs sm:text-sm text-ink font-mono whitespace-pre-wrap wrap-anywhere leading-relaxed bg-abyss/60">
              {promptText}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink mb-4">What does the output look like?</h2>
          <p className="text-mist leading-relaxed mb-6">
            When you run the generated Python script, it creates a self-contained HTML report with inline SVG charts,
            drawdown metrics, and regime-segmented return analysis.
          </p>

          <div className="card p-8 flex flex-col md:flex-row items-center gap-6 justify-between border-cyan/30">
            <div>
              <h3 className="text-xl font-bold text-ink mb-2">Download Sample SuperTrend Report</h3>
              <p className="text-mist text-sm max-w-md leading-relaxed">
                We ran this exact prompt against a <strong>SuperTrend</strong> indicator on daily candles. Download the full
                sample PDF report to inspect the structure and depth.
              </p>
            </div>
            <a
              href="/resources/super-trend-strategy-report.pdf"
              target="_blank"
              download
              className="btn-primary shrink-0 min-h-[44px] flex items-center gap-2"
            >
              <Download size={18} /> Download Sample PDF
            </a>
          </div>
        </section>

        {/* 39. CTA block */}
        <section className="card p-8 sm:p-10 text-center border-lime/30 bg-deep/50">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Prefer a ready-made tool? See the 5 screeners
          </h2>
          <p className="mt-3 text-sm text-mist max-w-lg mx-auto leading-relaxed">
            Skip coding from scratch. Run verified Python scanners for breakouts, wedges, momentum, and insider filings on your machine.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <Link href="/products" className="btn-primary min-h-[44px]">
              Compare screeners →
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi, I want to acquire a trading screener.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !border-lime/40 text-lime hover:!border-lime min-h-[44px]"
            >
              Inquire on WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
