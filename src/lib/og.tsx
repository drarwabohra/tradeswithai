import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function createOgImage({
  title,
  highlightTitle,
  subtitle,
  badge = "STANDALONE PYTHON SCREENERS",
  kicker = "FLAT ₹5,000 ONE-TIME • NSE & US STOCKS • ZERO RECURRING FEES",
}: {
  title: string;
  highlightTitle?: string;
  subtitle: string;
  badge?: string;
  kicker?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          backgroundColor: "#051a23",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(65, 196, 225, 0.16) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(168, 225, 13, 0.12) 0%, transparent 55%)",
          color: "#e9f3f6",
        }}
      >
        {/* Top: Logo & Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #41c4e1 0%, #a8e10d 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 25px rgba(65, 196, 225, 0.5)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#06202b"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 17l5-6 4 3 8-9" />
                <path d="M15 5h5v5" />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "24px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              <span>TRADES</span>
              <span style={{ color: "#a8e10d" }}>WITH</span>
              <span>AI</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "1px solid rgba(168, 225, 13, 0.3)",
              background: "rgba(10, 43, 58, 0.6)",
              fontSize: "14px",
              color: "#a8e10d",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#a8e10d",
                boxShadow: "0 0 10px #a8e10d",
                display: "flex",
              }}
            />
            <span>{badge}</span>
          </div>
        </div>

        {/* Center: Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{title}</span>
            {highlightTitle && <span style={{ color: "#41c4e1" }}>{highlightTitle}</span>}
          </div>
          <div style={{ fontSize: "22px", color: "#9db7c2", lineHeight: 1.45, marginTop: "6px", display: "flex" }}>
            <span>{subtitle}</span>
          </div>
        </div>

        {/* Bottom Bar: Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            borderTop: "1px solid rgba(127, 180, 199, 0.15)",
            paddingTop: "24px",
            fontSize: "15px",
            color: "#82a5b5",
            fontFamily: "monospace",
          }}
        >
          <div style={{ color: "#a8e10d", fontWeight: 700, display: "flex" }}>{kicker}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
    }
  );
}
