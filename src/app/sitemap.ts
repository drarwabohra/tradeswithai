import type { MetadataRoute } from "next";
import site from "@/data/site.json";
import { catalog } from "@/lib/catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/products", "/contact", ...catalog.map(p => `/products/${p.id}`)]
    .map(path => ({ url: new URL(path, site.url).href }));
  // No fabricated lastModified timestamps; add real content revision dates if tracked.
}
