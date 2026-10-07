import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Code2 } from "lucide-react";
export const metadata: Metadata = {
  title: "Free resources", description: "Free trading strategy guides, AI prompts, and backtesting resources.",
  alternates: { canonical: "/resources" },
};
export default function ResourcesPage() {
  return <div className="site-container page-section">
    <header className="page-heading"><p className="eyebrow"><span className="status-dot" /> LEARN & BUILD</p><h1>Curiosity is an <span className="text-accent">edge.</span></h1><p>Go deeper into systematic trading with free AI prompts,<br className="hidden sm:block" /> strategy guides, and backtesting reports.</p></header>
    <div className="resources-grid"><Link href="/resources/backtest-indicator-with-ai" className="guide-card">
      <div className="guide-art" aria-hidden="true"><BookOpen size={52} strokeWidth={1} /><span>IDEA → STRATEGY → REPORT</span><Code2 size={30} strokeWidth={1} /></div>
      <div className="guide-copy"><p className="eyebrow">AI WORKFLOW · FREE GUIDE</p><h2>Backtest any indicator<br className="hidden sm:block" /> using Claude AI.</h2><p>Use a structured prompt to turn an indicator into a Python strategy and explore its results in an HTML report.</p><span className="text-link">Read the guide <ArrowUpRight size={18} aria-hidden="true" /></span></div>
    </Link></div>
  </div>;
}
