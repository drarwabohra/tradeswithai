import siteData from "@/data/site.json";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-zinc-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
      <p className="text-zinc-400 mb-4">We collect information you provide directly to us, such as your name, email address, and WhatsApp number when you make a purchase.</p>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
      <p className="text-zinc-400 mb-4">We use your information solely to deliver the digital products you have purchased, verify your payments, and provide customer support.</p>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Data Security</h2>
      <p className="text-zinc-400 mb-4">We do not collect or store your payment details or credit card information. All payments are handled directly by your banking app.</p>
    </div>
  );
}
