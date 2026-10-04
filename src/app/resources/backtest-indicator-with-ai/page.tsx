import Link from "next/link";
import { Copy, Download, ArrowLeft, Bot, CheckCircle2 } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";

export const metadata = {
  title: "Backtest any Indicator using Claude AI | TradesWithAI",
  description: "The exact prompt to turn any indicator into a fully backtested Python strategy.",
};

const promptText = `You are going to turn a TradingView INDICATOR into a fully backtested STRATEGY, and give me a professional report at the end. Work through the steps in order. Do not skip ahead.*

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
Cost sensitivity:** the headline table re-run at zero commission, at my commission, and at double my commission
Charts (inline SVG only):** equity curve vs buy-and-hold · underwater/drawdown curve · monthly returns heatmap · a bar chart of every individual trade's return*

WHAT THIS MEANS — a written section, in plain English, answering: Is the edge in the entries or the exits? Is the result carried by a handful of trades? Would buying and holding have beaten it? In which market regime does this actually work — and in which does it lose? What single change would most likely break this result? Be blunt. If the strategy is unimpressive, say so.

OUTPUT CONTRACT — Render everything as ONE self-contained \`.html\` file called \`01_strategy_report.html\`. Tailwind via the Play CDN, all data inlined as a JS object so it opens offline with no server. Every chart is inline SVG you generate yourself — no chart library, no external images. Design for 1920 by 1080. Palette: ground \`#052232\`, panels \`#073446\` with \`#19C3DA\` borders at 25% opacity, positive \`#95EB45\`, labels and setup \`#19C3DA\`, negative and warnings \`#F2643C\`, body text \`#E6EDF0\`, secondary text \`#8B9BA5\`. No yellow anywhere. Layout: header bar, then a row of big-number KPI cards, then detail panels with colour-coded status pills — never a plain-text verdict. PLAIN ENGLISH: define every technical term in one muted line at first use, and open every panel with a one-sentence "WHAT THIS SHOWS". HONESTY RULES, which outrank the visual rules: show the source beside every figure; put an orange ASSUMPTION pill on every estimate or placeholder; include a LIMITATIONS panel that may not be left empty; and never start a chart axis anywhere but zero unless you label the truncation on the chart itself. You are forbidden from designing a weak result to look strong. If the finding is unimpressive, the report must read as unimpressive.`;

export default function ArticlePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-20 max-w-4xl">
      <Link href="/resources" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 mb-10 transition-colors text-sm font-medium">
        <ArrowLeft size={16} /> Back to Resources
      </Link>
      
      <header className="mb-12 border-b border-line pb-12">
        <div className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400/90 mb-4">AI Prompt</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-zinc-50 leading-tight">
          Backtest any Trading Indicator using Claude AI
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed text-pretty">
          Turn any indicator (MACD, RSI, VWAP, Supertrend, etc.) into a professional strategy backtest with a beautiful HTML report. No Pine Script required.
        </p>
      </header>

      <div className="prose prose-invert prose-emerald max-w-none">
        
        <h2 className="text-2xl font-semibold text-zinc-50 mt-10 mb-4 tracking-tight">How it works</h2>
        <p className="text-zinc-400 leading-relaxed mb-6">
          Writing backtesting code from scratch takes hours. By leveraging Claude 3.5 Sonnet or ChatGPT, you can generate a complete Python backtesting engine using libraries like <code>vectorbt</code> or <code>backtrader</code> in seconds. 
        </p>
        <p className="text-zinc-400 leading-relaxed mb-8">
          The prompt below explicitly instructs the AI to fetch its own historical data from Yahoo Finance, simulate the strategy, and render an interactive HTML performance report so you can visually analyze the results.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-50 mt-10 mb-6 tracking-tight flex items-center gap-2">
          <Bot size={24} className="text-emerald-400" /> The Master Prompt
        </h2>
        
        <div className="relative group rounded-xl bg-ink-900 border border-line overflow-hidden mb-12">
          <div className="absolute right-3 top-3 z-10">
            <CopyButton value={promptText} label="Master Prompt" />
          </div>
          <pre className="p-6 overflow-x-auto text-sm text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed m-0 bg-transparent">
            {promptText}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold text-zinc-50 mt-12 mb-4 tracking-tight">What does the output look like?</h2>
        <p className="text-zinc-400 leading-relaxed mb-8">
          When you run the generated Python script, it will create a beautiful, interactive HTML dashboard containing your equity curve, drawdowns, and key metrics like CAGR and Sharpe Ratio. 
        </p>

        <div className="bg-linear-to-b from-white/[0.04] to-white/[0.01] border border-line shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)] rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div>
            <h3 className="text-xl font-semibold text-zinc-50 mb-2">Download Sample Report</h3>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              We used this exact prompt to backtest a <strong>Supertrend</strong> strategy. Download the generated PDF report to see the quality of the output.
            </p>
          </div>
          <a 
            href="/resources/super-trend-strategy-report.pdf" 
            target="_blank"
            download
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-ink-950 h-12 px-6 text-[15px] font-semibold shadow-[0_8px_24px_-6px_rgb(255_255_255/0.2)] hover:bg-zinc-200 active:scale-[0.98] transition-all"
          >
            <Download size={18} /> Download Sample PDF
          </a>
        </div>

      </div>
    </div>
  );
}
