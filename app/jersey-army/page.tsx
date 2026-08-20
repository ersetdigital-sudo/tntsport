import type { Metadata } from "next";
import JerseyArmyLanding from "@/components/jersey-army/JerseyArmyLanding";
import { CATEGORY_LANDINGS } from "@/lib/category-landing";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { getBrand, getCatalogData } from "@/lib/queries";

export const revalidate = 3600;

const config = CATEGORY_LANDINGS.army;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  const ogImage = `${baseUrl}/api/og/katalog?category=${encodeURIComponent(config.catalogId)}`;
  const pageUrl = `${baseUrl}/${config.slug}`;

  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: [
      "jersey army custom",
      "jersey military custom",
      "jersey tactical custom",
      "jersey army tim",
      "jersey komunitas army",
      "jersey instansi",
      "jersey army full printing",
      "jersey army satuan",
      "jersey army murah",
      "jersey army dry fit",
    ],
    authors: [{ name: brand.name || "TNT SPORT APPAREL" }],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      url: pageUrl,
      siteName: brand.name || "TNT SPORT APPAREL",
      type: "website",
      locale: "id_ID",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Jersey Army Collection — TNT SPORT APPAREL" }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

function buildJsonLd(brandName: string, brandUrl: string) {
  const pageUrl = `${brandUrl}/jersey-army`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Jersey Army Collection Custom",
      description: "Jersey army custom military & tactical. Full printing, nama, nomor, logo. Rp85.000/pcs satuan, Rp75.000/pcs lusin.",
      brand: { "@type": "Brand", name: brandName },
      category: "Pakaian Olahraga Custom",
      image: `${brandUrl}/logo.jpg`,
      url: pageUrl,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "75000",
        highPrice: "85000",
        priceCurrency: "IDR",
        offerCount: "20",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: brandUrl },
        { "@type": "ListItem", position: 2, name: "Jersey Army", item: pageUrl },
      ],
    },
  ];
}

export default async function JerseyArmyPage() {
  const [brand, catalogData] = await Promise.all([getBrand(), getCatalogData()]);

  const category = catalogData?.find((c) => c.id === config.catalogId);
  const products = category?.products.length
    ? category.products
    : (CATALOG_PRODUCTS.find((c) => c.id === "army")?.products ?? []);

  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  const jsonLd = buildJsonLd(brand.name, baseUrl);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <JerseyArmyLanding products={products} waNumber={brand.whatsappNumber || "628115491117"} />
    </>
  );
}
