export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tradeswithai.vercel.app"
).replace(/\/$/, "");

export const SITE = {
  name: "TradesWithAI",
  brandName: "TradesWithAI",
  url: SITE_URL,
  tagline: "Stock and crypto screening software you run yourself. Source code included.",
  whatsappNumber: "918529261547",
  deliveryHours: "12 hours",
};
