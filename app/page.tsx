import { CTALinks } from "@/components/CTALinks";
import { FlashSaleBanner } from "@/components/FlashSaleBanner";
import { Footer } from "@/components/Footer";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Reviews } from "@/components/Reviews";
import { SocialLinks } from "@/components/SocialLinks";
import { StatsGrid } from "@/components/StatsGrid";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TrustBadges } from "@/components/TrustBadges";
import {
  getBrand,
  getCTALinks,
  getReviews,
  getSocialLinks,
  getStats,
  getTrustBadges,
} from "@/lib/queries";
import type { Brand, CTALink, Review, SocialLink, StatItem, TrustBadge } from "@/lib/types";

/**
 * Landing page — Server Component.
 *
 * Fetches content from Supabase via lib/queries.ts (with graceful
 * fallback to lib/data.ts when the database is unreachable). Revalidated
 * every hour (ISR) so admin edits appear on the public site within ~1h
 * — or immediately when an admin save calls `revalidatePath('/')`.
 *
 * Only `ThemeToggle` and `CountdownTimer` are client components.
 */

// Refresh the static page at most once per hour.
export const revalidate = 3600;

function buildJsonLd(
  brand: Brand,
  socialLinks: SocialLink[],
  reviews: Review[]
) {
  const logoUrl = `${brand.url}${brand.logoPath}`;

  // Organization schema. NOTE: aggregateRating is intentionally omitted
  // — the 4.9 / 350K+ figures shown in the UI are not verifiable third-
  // party data, so we do not expose them as structured data (per user
  // guidance: avoid schema fabrication).
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    description: brand.description,
    url: brand.url,
    logo: logoUrl,
    image: logoUrl,
    telephone: `+${brand.whatsappNumber}`,
    areaServed: { "@type": "Country", name: "Indonesia" },
    sameAs: socialLinks.map((s) => s.href),
  };

  // Product + Offer — the headline product with its starting price.
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Jersey Custom Full Printing",
    description:
      "Jersey custom full printing desain bebas. Harga pabrik, kirim se-Indonesia.",
    brand: { "@type": "Brand", name: brand.name },
    manufacturer: { "@type": "Organization", name: brand.name },
    offers: {
      "@type": "Offer",
      price: "65000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: brand.url,
      seller: { "@type": "Organization", name: brand.name },
    },
  };

  // Review schema — one entry per testimonial shown in the UI.
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: reviews.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        reviewBody: r.quote,
        author: { "@type": "Person", name: r.name },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
        itemReviewed: { "@type": "Organization", name: brand.name },
      },
    })),
  };

  return [organization, product, reviewSchema];
}

// Tiny indirection so server-side revalidation helpers can live in one
// file without circular imports through lib/queries.ts.
async function loadData() {
  const [brand, stats, trustBadges, ctaLinks, reviews, socialLinks] =
    await Promise.all([
      getBrand(),
      getStats(),
      getTrustBadges(),
      getCTALinks(),
      getReviews(),
      getSocialLinks(),
    ]);
  return { brand, stats, trustBadges, ctaLinks, reviews, socialLinks };
}

export default async function Page() {
  const { brand, stats, trustBadges, ctaLinks, reviews, socialLinks } =
    await loadData();
  const jsonLd = buildJsonLd(brand, socialLinks, reviews);

  // Hand the resolved content to section components via props so they
  // stay pure (no async fetches inside them) and are easy to test.
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ThemeToggle />

      <main className="mx-auto max-w-[1440px] px-lg py-section md:px-xxl md:py-band">
        <div className="mx-auto flex max-w-2xl flex-col items-stretch gap-xxxl">
          <ProfileHeader brand={brand} />
          <TrustBadges badges={trustBadges} />
          <StatsGrid stats={stats} />

          <section aria-label="Flash sale" className="w-full">
            <FlashSaleBanner whatsappNumber={brand.whatsappNumber} />
          </section>

          <CTALinks items={ctaLinks} />
          <Reviews items={reviews} />
          <SocialLinks items={socialLinks} />
        </div>
      </main>

      <Footer brand={brand} />
    </>
  );
}
