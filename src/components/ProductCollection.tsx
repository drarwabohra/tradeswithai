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
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-5">
        <div className="max-w-full overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <div className="inline-flex gap-2 p-1 rounded-lg border border-hairline bg-surface whitespace-nowrap" role="group" aria-label="Filter screeners by market">
            {([
              ["all", "All"],
              ["stocks", "Stocks"],
              ["crypto", "Crypto"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={market === value}
                onClick={() => setMarket(value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs min-h-[44px] whitespace-nowrap transition ${
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
        </div>
        <p className="font-mono text-xs text-dim shrink-0" role="status" aria-live="polite">
          Showing {counts[market]} {counts[market] === 1 ? "screener" : "screeners"}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}
