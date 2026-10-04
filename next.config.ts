import type { NextConfig } from "next";
import site from "./src/data/site.json";
if (process.env.NODE_ENV === "production") {
  if (new URL(site.url).protocol !== "https:") throw new Error("Use the HTTPS production site URL.");
}
const config: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "X-Frame-Options", value: "DENY" },
    ] }];
  },
};
export default config;
