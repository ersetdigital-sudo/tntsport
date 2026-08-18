import type { Metadata } from "next";
import { CategoryLandingLight } from "@/components/category-landing/CategoryLandingLight";
import { CATEGORY_LANDINGS, getCategoryLanding } from "@/lib/category-landing";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { getBrand, getCatalogData, getKatalogTestimonials } from "@/lib/queries";

export const revalidate = 3600;

const config = CATEGORY_LANDINGS.volley;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  const ogImage = `${baseUrl}/api/og/katalog?category=${encodeURIComponent(config.catalogId)}`;
  return {
    title: config.seo.title,
    description: config.seo.description,
    alternates: { canonical: `/${config.slug}` },
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      url: `${baseUrl}/${config.slug}`,
      type: "website",
      locale: "id_ID",
      images: [{ url: ogImage, width: 1200, height: 630, alt: config.eyebrow }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
      images: [ogImage],
    },
  };
}

function buildJsonLd(brandName: string, brandUrl: string, reviews: { quote: string; name: string; rating?: number }[], faqs: { q: string; a: string }[]) {
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + (r.rating ?? 5), 0) / reviews.length).toFixed(1)
    : "5.0";

  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Jersey Voli Custom Full Printing",
      description: "Jersey voli custom nama, nomor, dan logo tim sendiri. Bahan Dry Fit ringan & elastis, full printing rapi, bisa order satuan.",
      brand: { "@type": "Brand", name: brandName },
      category: "Pakaian Olahraga Custom",
      image: `${brandUrl}/logo.jpg`,
      url: `${brandUrl}/jersey-voli`,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "85000",
        highPrice: "145000",
        priceCurrency: "IDR",
        offerCount: "10",
        availability: "https://schema.org/InStock",
        url: `${brandUrl}/jersey-voli`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        bestRating: "5",
        reviewCount: String(reviews.length || 3),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: reviews.slice(0, 5).map((review, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Review",
          reviewBody: review.quote,
          author: { "@type": "Person", name: review.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating ?? 5,
            bestRating: 5,
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: brandUrl },
        { "@type": "ListItem", position: 2, name: "Jersey Voli", item: `${brandUrl}/jersey-voli` },
      ],
    },
  ];
}

export default async function JerseyVoliPage() {
  const cfg = getCategoryLanding(config.slug)!;
  const [brand, catalogData, dbTestimonials] = await Promise.all([
    getBrand(),
    getCatalogData(),
    getKatalogTestimonials(),
  ]);

  const category = catalogData?.find((c) => c.id === cfg.catalogId);
  const products = category?.products.length
    ? category.products
    : (CATALOG_PRODUCTS.find((c) => c.id === "volley")?.products ?? []);

  const testimonials =
    dbTestimonials?.map((t) => ({
      quote: t.quote,
      name: t.name,
      team: t.team || "",
      city: t.city,
      imageUrl: t.imageUrl ?? null,
      rating: t.rating ?? 5,
    })) ?? cfg.testimonials.fallback;

  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  const jsonLd = buildJsonLd(brand.name, baseUrl, testimonials, cfg.faqs.items);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CategoryLandingLight
        config={cfg}
        products={products}
        testimonials={testimonials}
        waNumber={brand.whatsappNumber || "628115491117"}
      />
    </>
  );
}
