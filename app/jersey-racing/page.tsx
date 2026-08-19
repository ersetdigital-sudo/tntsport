import type { Metadata } from "next";
import JerseyRacingLanding from "@/components/jersey-racing/JerseyRacingLanding";
import { CATEGORY_LANDINGS } from "@/lib/category-landing";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { getBrand, getCatalogData } from "@/lib/queries";

export const revalidate = 3600;

const config = CATEGORY_LANDINGS.racing;

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

function buildJsonLd(brandName: string, brandUrl: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Jersey Racing Custom Full Printing",
      description: "Jersey racing custom full printing. Atasan 95rb satuan, 85rb mulai 12 pcs. Langsung dari pabrik.",
      brand: { "@type": "Brand", name: brandName },
      category: "Pakaian Olahraga Custom",
      image: `${brandUrl}/logo.jpg`,
      url: `${brandUrl}/jersey-racing`,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "85000",
        highPrice: "145000",
        priceCurrency: "IDR",
        offerCount: "10",
        availability: "https://schema.org/InStock",
        url: `${brandUrl}/jersey-racing`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        reviewCount: "6",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faqs.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: brandUrl },
        { "@type": "ListItem", position: 2, name: "Jersey Racing", item: `${brandUrl}/jersey-racing` },
      ],
    },
  ];
}

export default async function JerseyRacingPage() {
  const [brand, catalogData] = await Promise.all([
    getBrand(),
    getCatalogData(),
  ]);

  const category = catalogData?.find((c) => c.id === config.catalogId);
  const products = category?.products.length
    ? category.products
    : (CATALOG_PRODUCTS.find((c) => c.id === "racing")?.products ?? []);

  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  const jsonLd = buildJsonLd(brand.name, baseUrl);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <JerseyRacingLanding products={products} />
    </>
  );
}
