import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#051a23",
          borderRadius: "36px",
        }}
      >
        <div
          style={{
            width: "128px",
            height: "128px",
            borderRadius: "28px",
            background: "linear-gradient(135deg, #41c4e1 0%, #a8e10d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 35px rgba(65, 196, 225, 0.6)",
          }}
        >
          <svg
            width="68"
            height="68"
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
      </div>
    ),
    {
      ...size,
    }
  );
}
