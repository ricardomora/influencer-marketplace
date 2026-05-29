import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const alt = BRAND.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0f172a 0%, #312e81 50%, #4c1d95 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            opacity: 0.85,
            marginBottom: 16,
          }}
        >
          LATAM · IA-native · Influencer marketing
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>
          {BRAND.name}
        </div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.9, maxWidth: 800 }}>
          Discover · Analyze · Campaign · Propose
        </div>
      </div>
    ),
    { ...size },
  );
}
