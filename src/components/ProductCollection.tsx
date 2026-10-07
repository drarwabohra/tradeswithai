"use client";

import { useState } from "react";

type Market = "all" | "stocks" | "crypto";

export function ProductCollection({ children, counts }: {
  children: React.ReactNode;
  counts: Record<Market, number>;
}) {
  const [market, setMarket] = useState<Market>("all");
  return <div className="product-collection" data-market={market}>
    <div className="catalog-toolbar">
      <div className="filter-group" role="group" aria-label="Filter screeners by market">
        {([["all", "All screeners"], ["stocks", "Stocks"], ["crypto", "Crypto"]] as const).map(([value, label]) =>
          <button key={value} type="button" aria-pressed={market === value} onClick={() => setMarket(value)}>
            {label}<span>{counts[value]}</span>
          </button>)}
      </div>
      <p className="catalog-count" role="status" aria-live="polite">{counts[market]} {counts[market] === 1 ? "tool" : "tools"} to explore</p>
    </div>
    <div className="product-grid">{children}</div>
  </div>;
}
