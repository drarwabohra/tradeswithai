import siteData from "@/data/site.json";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <p className="text-zinc-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
      <p className="text-zinc-400 mb-4">By accessing {siteData.brandName}, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our products.</p>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">2. Intellectual Property</h2>
      <p className="text-zinc-400 mb-4">You are granted a single-user license for the tools purchased. You may not resell, redistribute, or reverse engineer the tools or their source code.</p>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">3. No Financial Advice</h2>
      <p className="text-zinc-400 mb-4">Our tools are provided for educational and analytical purposes only. We are not SEBI-registered investment advisers. Trading involves risk, and you are solely responsible for your decisions.</p>
    </div>
  );
}
