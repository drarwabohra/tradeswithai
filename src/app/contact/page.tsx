import type { Metadata } from "next";
import site from "@/data/site.json";
export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };
export default function ContactPage() {
  const message = new URLSearchParams({ text: "Hi, I have a question about a screener and its setup requirements." });
  return <div className="mx-auto max-w-3xl px-5 py-14">
    <h1 className="text-4xl font-medium tracking-tight">Ask before buying.</h1>
    <p className="mt-5 leading-7 text-muted">Tell us which screener you want to run and which operating system you use. For an existing order, include the order ID and UPI reference.</p>
    <div className="mt-8 flex flex-wrap gap-3"><a className="button-primary" href={`mailto:${site.supportEmail}`}>Email us</a><a className="button-secondary" href={`https://wa.me/${site.whatsappNumber}?${message}`}>Contact on WhatsApp</a></div>
  </div>;
}
