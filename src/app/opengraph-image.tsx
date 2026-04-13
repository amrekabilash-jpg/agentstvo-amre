import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Агентство — Цифровое агентство в Алматы";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            width: "80px",
            height: "6px",
            background: "#A855F7",
            borderRadius: "3px",
          }}
        />

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Агентство
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#6B7280",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Цифровое агентство в Алматы
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            {["SEO / GEO", "Дизайн", "AI-автоматизация"].map((tag) => (
              <div
                key={tag}
                style={{
                  background: "#F3F4F6",
                  color: "#374151",
                  fontSize: "18px",
                  fontWeight: 600,
                  padding: "8px 20px",
                  borderRadius: "8px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "20px", color: "#9CA3AF" }}>geoaeo.pro</div>
          <div
            style={{
              background: "#A855F7",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 600,
              padding: "12px 28px",
              borderRadius: "10px",
            }}
          >
            Первая консультация бесплатно
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
