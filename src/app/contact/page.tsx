import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle, Monitor, Check } from "lucide-react";
import site from "@/data/site.json";
export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };
export default function ContactPage() {
  const message = new URLSearchParams({ text: "Hi, I have a question about a screener and its setup requirements." });
  return <div className="site-container page-section">
    <header className="page-heading"><p className="eyebrow"><span className="status-dot" /> LET’S TALK</p><h1>A little clarity.<br /><span className="text-accent">Before you start.</span></h1><p>Need help choosing a screener or checking your setup?<br className="hidden sm:block" /> Tell us what you want to scan. We’ll take it from there.</p></header>
    <div className="contact-grid">
      <a className="contact-option" href={`https://wa.me/${site.whatsappNumber}?${message}`}><MessageCircle size={28} strokeWidth={1.5} aria-hidden="true" /><h2>Start a conversation.</h2><p>Ask about features, setup requirements, or an existing purchase on WhatsApp.</p><span className="text-link">Chat on WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></span></a>
      <a className="contact-option" href={`mailto:${site.supportEmail}`}><Mail size={28} strokeWidth={1.5} aria-hidden="true" /><h2>Put it in an email.</h2><p>Share your questions or order details, and we’ll help you with the next step.</p><span className="text-link break-all">{site.supportEmail} <ArrowUpRight size={18} className="shrink-0" aria-hidden="true" /></span></a>
      <aside className="setup-checklist"><Monitor size={24} strokeWidth={1.5} aria-hidden="true" /><h2>Helpful to include</h2><ul><li><Check size={15} aria-hidden="true" /> The screener you’re interested in</li><li><Check size={15} aria-hidden="true" /> Your operating system</li><li><Check size={15} aria-hidden="true" /> Your question or setup issue</li></ul><p>For an existing purchase, include your payment reference so we can find it.</p></aside>
    </div>
  </div>;
}
