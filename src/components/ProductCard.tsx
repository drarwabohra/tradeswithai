import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatINR } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const crypto = product.id === "crypto-breakout-scanner";
  return <article className="product-card" data-category={crypto ? "crypto" : "stocks"}>
    <Link href={`/products/${product.id}`} className="product-card-link" aria-label={`View ${product.name}`}>
      <div className="product-media">
        <Image src={product.thumbnail} alt="" fill
          sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc((100vw - 72px) / 2), (max-width: 1279px) calc((100vw - 96px) / 3), 384px"
          className="object-contain" />
        <span className="media-arrow"><ArrowUpRight size={18} aria-hidden="true" /></span>
      </div>
      <div className="product-copy">
        <div className="product-category"><span className="status-dot" />{crypto ? "Crypto · Hyperliquid" : "Stocks · India & US"}</div>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <span className="source-included"><Check size={13} aria-hidden="true" /> Source code & setup guide</span>
      </div>
      <div className="product-card-bottom">
        <span className="product-price">{formatINR(product.price)}<span> / one-time</span></span>
        <span className="product-details">Explore <ArrowUpRight size={16} aria-hidden="true" /></span>
      </div>
    </Link>
  </article>;
}
