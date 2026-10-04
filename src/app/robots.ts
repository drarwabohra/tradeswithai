import type { MetadataRoute } from "next";
import site from "@/data/site.json";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: new URL("/sitemap.xml", site.url).href };
  // Checkout is omitted from sitemap, but crawlable so its noindex directive can be read.
}
