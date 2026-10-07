import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Code2, SlidersHorizontal, Monitor, MessageCircle, Download, BookOpen } from "lucide-react";
import { catalog } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { ProductCollection } from "@/components/ProductCollection";
import { ScrollReveal } from "@/components/animations/Animations";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const preview = catalog.find(p => p.id === "breakout-screener") ?? catalog[0];
  const cryptoCount = catalog.filter(p => p.id === "crypto-breakout-scanner").length;
  const benefits = [
    { icon: Code2, title: "Make it your own", copy: "Source code with every tool" },
    { icon: Monitor, title: "Run it locally", copy: "Your computer. Your workflow." },
    { icon: SlidersHorizontal, title: "Focus your research", copy: "Purpose-built market filters" },
  ];
  return <div className="site-container">
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow hero-enter"><span className="status-dot" /> YOUR MARKET. YOUR EDGE.</p>
        <h1 id="hero-heading" className="hero-enter">Less noise.<br />More <span className="accent-word">signal.</span></h1>
        <p className="hero-description hero-enter">Build your shortlist. Then read the chart.</p>
        <p className="hero-support hero-enter">Purpose-built stock and crypto screeners. Find the setups that matter, with tools you run and customize yourself.</p>
        <div className="hero-actions hero-enter">
          <Link href="/products" className="button-primary">Explore screeners <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <Link href={preview ? `/products/${preview.id}#demo-heading` : "/products"} className="button-secondary">See a demo <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="hero-notes hero-enter"><span><Check size={14} aria-hidden="true" /> Source code included</span><span><Check size={14} aria-hidden="true" /> One-time payment</span></div>
      </div>
      {preview && <figure className="hero-visual hero-enter">
        <div className="visual-grid" aria-hidden="true" />
        <div className="terminal-label"><span className="status-dot" /> BUILT FOR YOUR WORKFLOW <span className="terminal-label-end">01 / 05</span></div>
        <Link href={`/products/${preview.id}#demo-heading`} className="hero-window" aria-label={`Watch the ${preview.name} demo`}>
          <div className="window-toolbar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>breakout / workspace</span><ArrowUpRight size={15} aria-hidden="true" /></div>
          <div className="hero-preview"><Image src={preview.gallery[1] ?? preview.thumbnail} alt={`${preview.name} interface preview`} fill preload sizes="(max-width: 639px) calc(100vw - 64px), (max-width: 1023px) 650px, 580px" className="object-contain" /></div>
          <div className="window-caption"><span><span className="status-dot" /> Stock Breakout Screener</span><span>Product preview</span></div>
        </Link>
        <figcaption className="visual-caption"><span><SlidersHorizontal size={15} aria-hidden="true" /> Scan. Filter. Review.</span><span>Built to fit your process.</span></figcaption>
      </figure>}
    </section>
    <div className="benefit-strip">
      {benefits.map(({ icon: Icon, title, copy }) => <div className="benefit-item" key={title}><Icon size={21} strokeWidth={1.5} aria-hidden="true" /><div><p>{title}</p><span>{copy}</span></div></div>)}
    </div>
    <section id="screeners" className="section-space" aria-labelledby="catalog-heading">
      <ScrollReveal><div className="section-heading"><div><p className="eyebrow">THE TOOLKIT</p><h2 id="catalog-heading">Find your next setup.</h2></div><p>Different markets. Different strategies.<br />One focused workflow.</p></div></ScrollReveal>
      <ProductCollection counts={{ all: catalog.length, stocks: catalog.length - cryptoCount, crypto: cryptoCount }}>{catalog.map(p => <ProductCard key={p.id} product={p} />)}</ProductCollection>
    </section>
    <ScrollReveal><section className="workflow-section section-space" aria-labelledby="purchase-heading">
      <div className="section-heading"><div><p className="eyebrow">A SIMPLE START</p><h2 id="purchase-heading">Your toolkit, in three steps.</h2></div><p>From choosing a screener<br />to making it your own.</p></div>
      <ol className="steps-grid">{[
        { n: "01", icon: MessageCircle, title: "Let’s find your fit.", copy: "Message us with your chosen screener and operating system. We’ll help you check the setup requirements." },
        { n: "02", icon: Check, title: "Pay once. Get the code.", copy: "We’ll share payment details on WhatsApp. Your purchase includes the source code and setup instructions." },
        { n: "03", icon: Download, title: "Set up. Start screening.", copy: "After payment verification, receive your files by email or WhatsApp and follow the guide to run your tool." },
      ].map(({ n, icon: Icon, title, copy }) => <li key={n}><div className="step-top"><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><span>{n}</span></div><h3>{title}</h3><p>{copy}</p></li>)}</ol>
    </section></ScrollReveal>
    <ScrollReveal><section className="resource-banner"><div className="resource-banner-icon"><BookOpen size={27} strokeWidth={1.5} aria-hidden="true" /></div><div><p className="eyebrow">LEARN & BUILD</p><h2>Better research starts with curiosity.</h2><p>Explore free AI prompts, strategy guides, and backtesting resources.</p></div><Link href="/resources" className="text-link">Explore the guides <ArrowUpRight size={18} aria-hidden="true" /></Link></section></ScrollReveal>
    <ScrollReveal><section className="contact-banner"><div><p className="eyebrow">LET’S TALK SETUP</p><h2>The right tool.<br /><span>For your workflow.</span></h2><p>Not sure where to start? Tell us what you trade<br className="hidden sm:block" /> and which computer you use.</p></div><Link href="/contact" className="button-primary">Ask before buying <ArrowUpRight size={18} aria-hidden="true" /></Link><div className="banner-decoration" aria-hidden="true"><span /><span /><span /><span /><span /></div></section></ScrollReveal>
  </div>;
}
