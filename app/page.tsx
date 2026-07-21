import { ClosingCTA } from "@/components/ClosingCTA";
import { CTALinks } from "@/components/CTALinks";
import { FAQ_SCHEMA_ITEMS } from "@/components/FAQ";
import { FlashSaleBanner } from "@/components/FlashSaleBanner";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Reviews } from "@/components/Reviews";
import { SocialLinks } from "@/components/SocialLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TrustBadges } from "@/components/TrustBadges";
import { getBrand, getCTALinks, getReviews, getSocialLinks, getStats, getTrustBadges } from "@/lib/queries";
import type { Brand, Review, SocialLink } from "@/lib/types";

export const revalidate = 3600;

function buildJsonLd(brand: Brand, socialLinks: SocialLink[], reviews: Review[]) {
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return [
    // 1. Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: brand.name,
      description: brand.description,
      url: brand.url,
      logo: `${brand.url}${brand.logoPath}`,
      sameAs: socialLinks.map((item) => item.href),
    },
    // 2. WebSite with SearchAction
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: brand.name,
      url: brand.url,
      inLanguage: "id-ID",
    },
    // 3. Product with AggregateRating
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Jersey Custom Full Printing",
      description: "Jersey custom full printing dengan desain bebas, bahan premium dry-fit, harga pabrik langsung. Cocok untuk tim futsal, sepak bola, komunitas, dan event.",
      brand: { "@type": "Brand", name: brand.name },
      category: "Pakaian Olahraga Custom",
      image: `${brand.url}${brand.logoPath}`,
      url: brand.url,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "65000",
        highPrice: "250000",
        priceCurrency: "IDR",
        offerCount: "10",
        availability: "https://schema.org/InStock",
        url: brand.url,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        bestRating: "5",
        reviewCount: String(reviews.length || 3),
      },
    },
    // 4. ItemList of Reviews
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: reviews.map((review, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Review",
          reviewBody: review.quote,
          author: { "@type": "Person", name: review.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating,
            bestRating: 5,
          },
        },
      })),
    },
    // 5. FAQPage
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_SCHEMA_ITEMS,
    },
  ];
}

export default async function Page() {
  const [brand, stats, trustBadges, ctaLinks, reviews, socialLinks] = await Promise.all([getBrand(), getStats(), getTrustBadges(), getCTALinks(), getReviews(), getSocialLinks()]);
  const jsonLd = buildJsonLd(brand, socialLinks, reviews);

  return <main className="min-h-screen px-3 py-5 sm:px-6 sm:py-8">
    {jsonLd.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    <div className="flex justify-end pr-1 sm:pr-2">
      <ThemeToggle />
    </div>
    <div className="bio-page mx-auto max-w-[760px] overflow-hidden rounded-[32px] bg-white shadow-premium-xl dark:bg-surface-deep sm:rounded-[44px]">
      <HeroSection brand={brand} stats={stats} />
      <div className="space-y-5 px-5 pb-10 pt-5 sm:space-y-6 sm:px-8 sm:pb-12 sm:pt-7">
        {/* Trust indicator */}
        <div className="rounded-2xl border border-black/[.06] bg-white px-3 py-5 shadow-premium-sm dark:border-white/10 dark:bg-surface-card sm:rounded-3xl sm:px-5 sm:py-6"><TrustBadges badges={trustBadges} /></div>
        {/* CTA katalog */}
        <CTALinks items={ctaLinks} />
        {/* Promo */}
        <FlashSaleBanner whatsappNumber={brand.whatsappNumber} />
        {/* Testimoni */}
        <Reviews items={reviews} />
        {/* CTA penutup */}
        <ClosingCTA brand={brand} />
        {/* Social */}
        <SocialLinks items={socialLinks} />
      </div>
      <Footer brand={brand} />
    </div>
  </main>;
}
