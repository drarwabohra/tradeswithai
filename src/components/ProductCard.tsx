import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { formatINR } from "@/lib/format";
// Entire replacement: the original component was not included in the text export.
export function ProductCard({ product }: { product: Product }) {
  return <article className="min-w-0 border-b border-line pb-8">
    <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}
      className="group block rounded-md">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-surface">
        <Image src={product.thumbnail} alt="" fill
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc((100vw - 72px) / 2), 363px"
          className="object-contain p-2 transition-opacity group-hover:opacity-90" />
      </div>
      <h3 className="mt-5 text-xl font-medium tracking-tight">{product.name}</h3>
    </Link>
    <p className="mt-3 text-sm leading-6 text-muted">{product.shortDescription}</p>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <p className="font-mono text-base">{formatINR(product.price)} <span className="font-sans text-sm text-muted">once</span></p>
      <Link href={`/products/${product.id}`} className="button-secondary" aria-label={`View details for ${product.name}`}>View details</Link>
    </div>
  </article>;
}
