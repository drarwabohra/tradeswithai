import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalog, findProduct } from "@/lib/catalog";
import site from "@/data/site.json";
import CheckoutFlow from "./CheckoutFlow";
export const dynamicParams = false;
export function generateStaticParams() { return catalog.map(p => ({ id: p.id })); }
export const metadata: Metadata = { title: "Checkout", robots: { index: false, follow: true } };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const product = findProduct((await params).id);
  if (!product) notFound();
  // Pass only public payment/contact fields; never pass environment secrets to a Client Component.
  return <CheckoutFlow product={product} payment={{ upiId: site.upiId, payeeName: site.payeeName,
    supportEmail: site.supportEmail, whatsappNumber: site.whatsappNumber, deliveryHours: site.deliveryHours }} />;
}
