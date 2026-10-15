import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatINR } from "@/lib/format";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const crypto = product.id === "crypto-breakout-scanner";
  return (
    <article className="product-card card card-hover" data-category={crypto ? "crypto" : "stocks"}>
      <Link href={`/products/${product.id}`} className="product-card-link min-h-[44px]" aria-label={`View ${product.name}`}>
        <div className="product-media relative aspect-[4/3] w-full overflow-hidden border-b border-hairline bg-surface">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 90vw, 400px"
            priority={priority}
            className="object-contain p-2"
          />
          <span className="media-arrow absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded border border-hairline bg-surface text-cyan">
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
        <div className="product-copy p-5">
          <div className="product-category flex items-center gap-1.5 font-mono text-xs text-mist">
            <span className="live-dot" />
            {crypto ? "Crypto · Hyperliquid" : "Stocks · India & US"}
          </div>
          <h3 className="mt-2.5 text-lg font-bold text-ink">{product.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist line-clamp-2">{product.shortDescription}</p>
          <span className="source-included mt-4 flex items-center gap-1.5 text-xs text-lime">
            <Check size={14} aria-hidden="true" /> Source code & setup guide
          </span>
        </div>
        <div className="product-card-bottom flex items-center justify-between border-t border-hairline bg-deep/50 p-4">
          <span className="product-price font-mono text-base font-bold text-lime">
            {formatINR(product.price)}
            <span className="font-sans text-xs font-normal text-mist ml-1">/ one-time</span>
          </span>
          <span className="product-details inline-flex items-center gap-1 text-sm font-semibold text-cyan min-h-[44px]">
            Explore <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
