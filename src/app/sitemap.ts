import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { catalog } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/resources",
    "/resources/backtest-indicator-with-ai",
    "/contact",
    "/terms",
    "/privacy",
    "/refund-policy",
  ];

  const productRoutes = catalog.map((p) => `/products/${p.id}`);

  const allRoutes = [...staticRoutes, ...productRoutes];

  return allRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/products") ? 0.8 : 0.6,
  }));
}
