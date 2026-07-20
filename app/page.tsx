import { CTALinks } from "@/components/CTALinks";
import { FlashSaleBanner } from "@/components/FlashSaleBanner";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SocialLinks } from "@/components/SocialLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TrustBadges } from "@/components/TrustBadges";
import { getBrand, getCTALinks, getReviews, getSocialLinks, getStats, getTrustBadges } from "@/lib/queries";
import type { Brand, Review, SocialLink } from "@/lib/types";

export const revalidate = 3600;

function buildJsonLd(brand: Brand, socialLinks: SocialLink[], reviews: Review[]) {
  return [{ "@context": "https://schema.org", "@type": "Organization", name: brand.name, description: brand.description, url: brand.url, logo: `${brand.url}${brand.logoPath}`, sameAs: socialLinks.map((item) => item.href) }, { "@context": "https://schema.org", "@type": "Product", name: "Jersey Custom Full Printing", description: "Jersey custom full printing desain bebas.", offers: { "@type": "Offer", price: "65000", priceCurrency: "IDR", availability: "https://schema.org/InStock", url: brand.url } }, { "@context": "https://schema.org", "@type": "ItemList", itemListElement: reviews.map((review, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Review", reviewBody: review.quote, author: { "@type": "Person", name: review.name }, reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 } } })) }];
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
        <CTALinks items={ctaLinks} />
        <FlashSaleBanner whatsappNumber={brand.whatsappNumber} />
        <div className="rounded-2xl border border-black/[.06] bg-white px-3 py-5 shadow-premium-sm dark:border-white/10 dark:bg-surface-card sm:rounded-3xl sm:px-5 sm:py-6"><TrustBadges badges={trustBadges} /></div>
        <SocialLinks items={socialLinks} />
      </div>
      <Footer brand={brand} />
    </div>
  </main>;
}