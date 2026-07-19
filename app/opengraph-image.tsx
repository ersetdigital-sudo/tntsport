import { ImageResponse } from "next/og";
import { getBrand } from "@/lib/queries";

/**
 * opengraph-image - generated dynamically at /opengraph-image
 * (App Router convention). Renders a 1200x630 OG card with the TNT SPORT
 * brand on a dark premium canvas with the brand gradient mesh.
 *
 * Runtime: edge - ImageResponse works without Node APIs.
 */
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "TNT SPORT - Open Graph image";

export default async function OpengraphImage() {
  const brand = await getBrand();
  const leading = brand.name.replace(` ${brand.accentWord}`, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(60% 50% at 20% 10%, rgba(255,90,95,0.18), transparent 60%), radial-gradient(50% 50% at 85% 20%, rgba(124,58,237,0.20), transparent 60%), radial-gradient(60% 60% at 50% 100%, rgba(79,70,229,0.16), transparent 60%), #08080f",
          color: "#ffffff",
          fontFamily: "sans-serif",
          gap: 32,
        }}
      >
        {/* Gradient ring avatar */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "conic-gradient(from 180deg, #ff6b70, #ff3d9a, #8b5cf6, #ff6b70)",
            padding: 4,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 999,
              background: "#11111c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -1,
            }}
          >
            {brand.monogram}
          </div>
        </div>

        {/* Brand name - accent word in gradient */}
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          {leading}
          <span
            style={{
              marginLeft: 16,
              backgroundImage:
                "linear-gradient(135deg, #ff6b70, #ff3d9a, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {brand.accentWord}
          </span>
        </div>

        {/* Tagline (first line only) */}
        <div
          style={{
            fontSize: 28,
            color: "#b9b9c9",
            maxWidth: 800,
            textAlign: "center",
          }}
        >
          {brand.tagline.split("\n")[0]}
        </div>

        {/* CTA hint */}
        <div
          style={{
            marginTop: 16,
            padding: "12px 28px",
            borderRadius: 999,
            backgroundImage: "linear-gradient(135deg, #ff6b70, #ff3d9a, #8b5cf6)",
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Mulai dari 65rb · Konsultasi gratis
        </div>
      </div>
    ),
    size
  );
}
