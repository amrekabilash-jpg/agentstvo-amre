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
          background: "#0F0A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Background glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Top row: logo + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "10px 22px",
              borderRadius: "100px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                background: "#A855F7",
                borderRadius: "50%",
              }}
            />
            <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: 600 }}>
              Агентство
            </span>
          </div>

          {/* Domain */}
          <span
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "0.04em",
            }}
          >
            geoaeo.pro
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "3px",
                background: "linear-gradient(90deg, #A855F7, #EC4899)",
                borderRadius: "2px",
              }}
            />
            <span
              style={{
                color: "#A855F7",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Цифровое агентство · Алматы, Казахстан
            </span>
          </div>

          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
            }}
          >
            SEO. Дизайн.
          </div>
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #A855F7 0%, #EC4899 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AI-автоматизация.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* Tagline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <span
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px" }}
            >
              Возвращаем вам 6 часов каждый день.
            </span>
            <span
              style={{ color: "rgba(255,255,255,0.3)", fontSize: "15px" }}
            >
              Первая консультация — бесплатно
            </span>
          </div>

          {/* CTA button */}
          <div
            style={{
              background: "linear-gradient(135deg, #A855F7, #EC4899)",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: 700,
              padding: "16px 36px",
              borderRadius: "12px",
              letterSpacing: "-0.01em",
            }}
          >
            Обсудить проект →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
