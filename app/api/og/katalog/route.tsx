import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getBrand } from "@/lib/queries";
import { resolveSeoContext, type SeoContext } from "@/lib/seo";

/**
 * Dynamic product/category OG image — renders a 1200x630 PNG card whenever
 * /katalog is shared (WhatsApp/Telegram/IG preview). Always returns a brand
 * card, so share previews never go blank even while product photos are
 * still placeholders.
 *
 * Usage: /api/og/katalog?category=fishing&design=mn-001
 */
export const runtime = "edge";

const W = 1200;
const H = 630;

function glyph(c: string) {
  if (!c || c.length === 0) return "J";
  return c.charAt(0).toUpperCase();
}

function OgCard({
  seo,
  monogram,
  brand,
  accentWord,
  cta,
}: {
  seo: SeoContext;
  monogram: string;
  brand: string;
  accentWord: string;
  cta: string;
}) {
  const category = seo.category;
  const product = seo.product;

  return (
    <div
      style={{
        width: W,
        height: H,
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(60% 50% at 20% 10%, rgba(255,90,95,0.18), transparent 60%), radial-gradient(50% 50% at 85% 20%, rgba(124,58,237,0.20), transparent 60%), radial-gradient(60% 60% at 50% 100%, rgba(79,70,229,0.16), transparent 60%), #08080f",
        color: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        fontFamily: "sans-serif",
        padding: 48,
      }}
    >
      {/* Gradient ring avatar */}
      <div
        style={{
          width: 112,
          height: 112,
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
            fontSize: 44,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -1,
          }}
        >
          {glyph(monogram)}
        </div>
      </div>

      {/* Product name headline */}
      <div
        style={{
          fontSize: product ? 58 : 52,
          fontWeight: 700,
          letterSpacing: -2,
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.15,
        }}
      >
        {product
          ? `${product.name} — Jersey Custom ${category?.label ?? ""}`
          : category
            ? `Custom Jersey ${category.label}`
            : "Katalog Jersey Custom"}
      </div>

      {/* Brand name - accent word in gradient */}
      <div
        style={{
          display: "flex",
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: -1,
          marginTop: 4,
        }}
      >
        {brand.replace(` ${accentWord}`, "")}
        <span
          style={{
            marginLeft: 12,
            backgroundImage:
              "linear-gradient(135deg, #ff6b70, #ff3d9a, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {accentWord}
        </span>
      </div>

      {/* CTA hint */}
      <div
        style={{
          marginTop: 12,
          padding: "12px 28px",
          borderRadius: 999,
          backgroundImage: "linear-gradient(135deg, #ff6b70, #ff3d9a, #8b5cf6)",
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        {cta}
      </div>
    </div>
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const brand = await getBrand();
  const leading = brand.name.replace(` ${brand.accentWord}`, "");
  const seo = await resolveSeoContext(
    searchParams.get("category") ?? undefined,
    searchParams.get("design") ?? undefined
  );

  return new ImageResponse(
    <OgCard
      seo={seo}
      monogram={brand.monogram}
      brand={leading + " " + brand.accentWord}
      accentWord={brand.accentWord}
      cta="Mulai dari 85rb · Konsultasi gratis"
    />,
    { width: W, height: H }
  );
}