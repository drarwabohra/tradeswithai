import Link from "next/link";
import { ArrowRight, BookOpen, FileText } from "lucide-react";

export const metadata = {
  title: "Free Resources | TradesWithAI",
  description: "Free trading strategy guides, AI prompts, and backtesting resources.",
};

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-6xl">
      <header className="mb-16 max-w-3xl">
        <div className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400/90 mb-4">Learn &amp; Build</div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-zinc-50 text-balance">
          Free Resources &amp; Guides
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl text-pretty">
          Level up your systematic trading with our free AI prompts, strategy teardowns, and backtesting reports.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Resource 1 */}
        <Link 
          href="/resources/backtest-indicator-with-ai"
          className="group relative flex flex-col overflow-hidden rounded-2xl bg-linear-to-b from-white/[0.04] to-white/[0.01] border border-line shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)] transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] p-8"
        >
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-zinc-50 mb-3 tracking-tight">
            Backtest any Indicator using Claude AI
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8 flex-1">
            Get the exact prompt to turn any indicator into a fully backtested Python strategy with a professional HTML report — zero coding required.
          </p>
          <div className="flex items-center text-sm font-medium text-zinc-300 group-hover:text-emerald-400 transition-colors">
            Read the guide <ArrowRight size={16} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </Link>

      </div>
    </div>
  );
}
