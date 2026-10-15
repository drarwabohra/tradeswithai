import { findProduct, catalog } from "@/lib/catalog";
import { createOgImage, ogSize, ogContentType } from "@/lib/og";
import { notFound } from "next/navigation";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return catalog.map((p) => ({ id: p.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  return createOgImage({
    title: product.name,
    highlightTitle: "Python Source Code & Setup Guide",
    subtitle: product.shortDescription,
    badge: "FLAT ₹5,000 ONE-TIME",
    kicker: "PYTHON 3.10+ • FULL LOCAL ACCESS • 12H CODE DELIVERY",
  });
}
