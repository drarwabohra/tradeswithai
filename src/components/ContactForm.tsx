"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

const PRODUCT_NAMES = [
  "Stock Breakout Screener",
  "Falling Wedge Screener",
  "Crypto Breakout Scanner",
  "Insider Transactions Dashboard",
  "Momentum & Valuation Screener",
] as const;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [os, setOs] = useState("Windows 10/11");
  const [screener, setScreener] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; message?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!message.trim()) {
      newErrors.message = "Please enter your question or setup note.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const screenerText = screener ? `regarding ${screener}` : "regarding your screeners";
    const formatted = `Hi, my name is ${name.trim()}. I'm on ${os || "PC/Mac"}. Question ${screenerText}: ${message.trim()}`;
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
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-mono text-mist mb-1.5">
          Your Name <span className="text-lime" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="e.g. Alex"
          className={`field min-h-[44px] ${errors.name ? "!border-orange" : ""}`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-orange font-mono" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="screener" className="block text-xs font-mono text-mist mb-1.5">
            Screener
          </label>
          <select
            id="screener"
            name="screener"
            autoComplete="off"
            value={screener}
            onChange={(e) => setScreener(e.target.value)}
            className="field min-h-[44px]"
          >
            <option value="">Choose a screener…</option>
            {PRODUCT_NAMES.map((prod) => (
              <option key={prod} value={prod}>
                {prod}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="os" className="block text-xs font-mono text-mist mb-1.5">
            Operating System
          </label>
          <select
            id="os"
            name="os"
            autoComplete="off"
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
          Your Question or Setup Note <span className="text-lime" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          rows={3}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          placeholder="Ask about installation, markets, or Python setup..."
          className={`field !min-h-[80px] ${errors.message ? "!border-orange" : ""}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-orange font-mono" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full justify-center min-h-[44px]">
        Send via WhatsApp →
      </button>
    </form>
  );
}
