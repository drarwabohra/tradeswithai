"use client";

import { useState } from "react";

type Market = "all" | "stocks" | "crypto";

export function ProductCollection({
  children,
  counts,
}: {
  children: React.ReactNode;
  counts: Record<Market, number>;
}) {
  const [market, setMarket] = useState<Market>("all");

  return (
    <div className="product-collection" data-market={market}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-5">
        <div className="flex gap-2 p-1 rounded-lg border border-hairline bg-surface" role="group" aria-label="Filter screeners by market">
          {([
            ["all", "All Screeners"],
            ["stocks", "Stocks"],
            ["crypto", "Crypto"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={market === value}
              onClick={() => setMarket(value)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs min-h-[44px] transition ${
                market === value
                  ? "bg-lime text-[#06202b] font-bold shadow-[0_0_15px_rgba(168,225,13,0.3)]"
                  : "text-mist hover:text-ink hover:bg-raised"
              }`}
            >
              <span>{label}</span>
              <span className="opacity-70">({counts[value]})</span>
            </button>
          ))}
        </div>
        <p className="font-mono text-xs text-dim" role="status" aria-live="polite">
          Showing {counts[market]} {counts[market] === 1 ? "screener" : "screeners"}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}
