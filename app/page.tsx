import { CTALinks } from "@/components/CTALinks";
import { FlashSaleBanner } from "@/components/FlashSaleBanner";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Reviews } from "@/components/Reviews";
import { SocialLinks } from "@/components/SocialLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TrustBadges } from "@/components/TrustBadges";
import { getBrand, getCTALinks, getReviews, getSocialLinks, getStats, getTrustBadges } from "@/lib/queries";
import type { Brand, SocialLink, Review } from "@/lib/types";

export const revalidate = 3600;

function buildJsonLd(brand: Brand, socialLinks: SocialLink[], reviews: Review[]) {
  return [{ "@context": "https://schema.org", "@type": "Organization", name: brand.name, description: brand.description, url: brand.url, logo: `${brand.url}${brand.logoPath}`, sameAs: socialLinks.map((item) => item.href) }, { "@context": "https://schema.org", "@type": "Product", name: "Jersey Custom Full Printing", description: "Jersey custom full printing desain bebas.", brand: { "@type": "Brand", name: brand.name }, offers: { "@type": "Offer", price: "65000", priceCurrency: "IDR", availability: "https://schema.org/InStock", url: brand.url } }, { "@context": "https://schema.org", "@type": "ItemList", itemListElement: reviews.map((review, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Review", reviewBody: review.quote, author: { "@type": "Person", name: review.name }, reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 }, itemReviewed: { "@type": "Organization", name: brand.name } } })) }];
}

export default async function Page() {
  const [brand, stats, trustBadges, ctaLinks, reviews, socialLinks] = await Promise.all([getBrand(), getStats(), getTrustBadges(), getCTALinks(), getReviews(), getSocialLinks()]);
  const jsonLd = buildJsonLd(brand, socialLinks, reviews);

  return <>
    {jsonLd.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    <ThemeToggle />
    <main className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-10">
      <HeroSection brand={brand} stats={stats} />
      <div className="mx-auto mt-10 max-w-6xl space-y-12 sm:mt-14 sm:space-y-16 lg:mt-20">
        <section className="text-center"><p className="section-kicker">Dipercaya komunitas & tim</p><div className="mt-4"><TrustBadges badges={trustBadges} /></div></section>
        <section id="koleksi" className="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:gap-10"><div className="lg:pt-4"><p className="section-kicker">Pilih caramu</p><h2 className="mt-3 text-display-lg text-ink">Mulai dari ide.<br /><span className="text-gradient-brand">Berakhir jadi kebanggaan.</span></h2><p className="mt-4 max-w-sm text-body-md text-charcoal">Tim kami siap membantu dari konsultasi desain hingga jersey tiba di tanganmu.</p></div><CTALinks items={ctaLinks} /></section>
        <section aria-label="Penawaran terbatas"><FlashSaleBanner whatsappNumber={brand.whatsappNumber} /></section>
        <Reviews items={reviews} />
        <SocialLinks items={socialLinks} />
      </div>
    </main>
    <Footer brand={brand} />
  </>;
}
