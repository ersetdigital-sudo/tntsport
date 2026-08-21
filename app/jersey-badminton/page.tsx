import type { Metadata } from "next";
import { JerseyBadmintonLanding } from "@/components/jersey-badminton/JerseyBadmintonLanding";
import { CATEGORY_LANDINGS, getCategoryLanding } from "@/lib/category-landing";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { getBrand, getCatalogData } from "@/lib/queries";

export const revalidate = 3600;

const config = CATEGORY_LANDINGS.badminton;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const baseUrl = "https://www.tntsportapparel.id";
  const ogImage = `${baseUrl}/api/og/katalog?category=${encodeURIComponent(config.catalogId)}`;
  return {
    title: config.seo.title,
    description: config.seo.description,
    alternates: { canonical: `${baseUrl}/${config.slug}` },
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      url: `${baseUrl}/${config.slug}`,
      type: "website",
      locale: "id_ID",
      siteName: "TNT SPORT APPAREL",
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
      name: "Jersey Badminton Custom Full Printing",
      description:
        "Jersey badminton custom untuk tim yang siap tampil kompetitif. Dry-fit adem, full printing, jahitan kuat, free custom nameset dan logo.",
      brand: { "@type": "Brand", name: brandName },
      category: "Pakaian Olahraga Custom",
      image: `${brandUrl}/logo.jpg`,
      url: `${brandUrl}/jersey-badminton`,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "85000",
        highPrice: "95000",
        priceCurrency: "IDR",
        offerCount: "20",
        availability: "https://schema.org/InStock",
        url: `${brandUrl}/jersey-badminton`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: brandUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Jersey Badminton",
          item: `${brandUrl}/jersey-badminton`,
        },
      ],
    },
  ];
}

export default async function JerseyBadmintonPage() {
  const cfg = getCategoryLanding(config.slug)!;
  const [brand, catalogData] = await Promise.all([getBrand(), getCatalogData()]);

  const category = catalogData?.find((c) => c.id === cfg.catalogId);
  const products = category?.products.length
    ? category.products
    : CATALOG_PRODUCTS.find((c) => c.id === "badminton")?.products ?? [];

  const baseUrl = "https://www.tntsportapparel.id";
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
      <JerseyBadmintonLanding
        products={products}
        waNumber={brand.whatsappNumber || "628115491117"}
      />
    </>
  );
}
