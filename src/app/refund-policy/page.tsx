import siteData from "@/data/site.json";

export const metadata = { title: "Cancellation & Refund Policy" };

export default function RefundPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
      <h1 className="text-3xl font-bold mb-8">Cancellation & Refund Policy</h1>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Digital Goods Policy</h2>
      <p className="text-zinc-400 mb-4">Because our products are digital downloads containing proprietary source code, all sales are final. We do not offer refunds once the software or access link has been delivered.</p>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Exceptions</h2>
      <p className="text-zinc-400 mb-4">We will issue a full refund if:</p>
      <ul className="list-disc list-inside text-zinc-400 mb-4 space-y-2">
        <li>You accidentally made a duplicate payment for the same order.</li>
        <li>You paid the incorrect amount.</li>
        <li>We fail to deliver the product within the promised timeframe ({siteData.deliveryHours}).</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Contact</h2>
      <p className="text-zinc-400 mb-4">If you experience technical issues setting up the tools, please contact us at {siteData.supportEmail} or WhatsApp us, and we will assist you.</p>
    </div>
  );
}
