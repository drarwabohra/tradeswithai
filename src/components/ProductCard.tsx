import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatINR } from "@/lib/format";
import { SITE } from "@/lib/site";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const crypto = product.id === "crypto-breakout-scanner";
  return (
    <article className="product-card card card-hover flex flex-col justify-between" data-category={crypto ? "crypto" : "stocks"}>
      <Link href={`/products/${product.id}`} className="product-card-link block focus-visible:rounded-lg" aria-label={`View ${product.name}`}>
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
      </Link>
      <div className="product-card-bottom mt-auto flex items-center justify-between border-t border-hairline bg-deep/50 p-4">
        <span className="product-price font-mono text-base font-bold text-lime">
          {formatINR(product.price)}
          <span className="font-sans text-xs font-normal text-mist ml-1">/ one-time</span>
        </span>
        <div className="flex items-center gap-2">
          <Link
            href={`/products/${product.id}`}
            className="product-details inline-flex items-center gap-1 text-sm font-semibold text-cyan min-h-[44px] px-2 hover:underline"
          >
            Explore <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <a
            href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Hi, I want to buy the ${product.name}. My OS is: `)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !px-3 !py-1.5 !text-xs !font-bold min-h-[44px] flex items-center"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
          >
            Inquire
          </a>
        </div>
      </div>
    </article>
  );
}
