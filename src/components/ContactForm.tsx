"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [os, setOs] = useState("");
  const [screener, setScreener] = useState("Stock Breakout Screener");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hi, my name is ${name}. I'm on ${os || "PC/Mac"}. Question regarding ${screener}: ${message}`;
    const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(formatted)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-lime/30 bg-lime/10 p-5 text-sm text-lime">
        <p className="font-bold">Opening WhatsApp...</p>
        <p className="mt-1 text-xs text-mist">
          If your WhatsApp chat did not open automatically,{" "}
          <a
            href={`https://wa.me/${SITE.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan underline"
          >
            click here to start the chat directly
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-mono text-mist mb-1.5">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex"
          className="field min-h-[44px]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="screener" className="block text-xs font-mono text-mist mb-1.5">
            Screener
          </label>
          <select
            id="screener"
            value={screener}
            onChange={(e) => setScreener(e.target.value)}
            className="field min-h-[44px]"
          >
            <option value="Stock Breakout Screener">Stock Breakout Screener</option>
            <option value="Falling Wedge Screener">Falling Wedge Screener</option>
            <option value="Crypto Breakout Scanner">Crypto Breakout Scanner</option>
            <option value="Insider Transactions Dashboard">Insider Transactions Dashboard</option>
            <option value="Momentum & Valuation Screener">Momentum & Valuation Screener</option>
            <option value="General Question">General Question</option>
          </select>
        </div>

        <div>
          <label htmlFor="os" className="block text-xs font-mono text-mist mb-1.5">
            Operating System
          </label>
          <select
            id="os"
            value={os}
            onChange={(e) => setOs(e.target.value)}
            className="field min-h-[44px]"
          >
            <option value="Windows 10/11">Windows</option>
            <option value="macOS">macOS</option>
            <option value="Linux / Ubuntu">Linux</option>
            <option value="Other / Cloud">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-mono text-mist mb-1.5">
          Your Question or Setup Note
        </label>
        <textarea
          id="message"
          rows={3}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about installation, markets, or Python setup..."
          className="field !min-h-[80px]"
        />
      </div>

      <button type="submit" className="btn-primary w-full justify-center min-h-[44px]">
        Send via WhatsApp →
      </button>
    </form>
  );
}
