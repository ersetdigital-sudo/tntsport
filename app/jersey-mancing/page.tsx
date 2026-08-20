import type { Metadata } from "next";
import JerseyMancingLanding from "@/components/jersey-mancing/JerseyMancingLanding";
import { CATEGORY_LANDINGS } from "@/lib/category-landing";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { getBrand, getCatalogData } from "@/lib/queries";

export const revalidate = 3600;

const config = CATEGORY_LANDINGS.mancing;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  const ogImage = `${baseUrl}/api/og/katalog?category=${encodeURIComponent(config.catalogId)}`;
  const pageUrl = `${baseUrl}/${config.slug}`;

  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: [
      "jersey mancing custom",
      "jersey fishing custom",
      "jersey mancing hoodie",
      "jersey mancing premium",
      "jersey komunitas mancing",
      "jersey tim mancing",
      "jersey mancing full printing",
      "jersey mancing satuan",
      "jersey mancing murah",
      "jersey mancing dry fit",
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Jersey Fishing Hoodie Premium — TNT SPORT APPAREL" }],
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
  const pageUrl = `${brandUrl}/jersey-mancing`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Jersey Fishing Hoodie Premium Custom",
      description: "Jersey fishing hoodie premium custom nameset, logo, dan sponsor GRATIS. Bahan dry fit, ringan, adem. Rp135.000/jersey.",
      brand: { "@type": "Brand", name: brandName },
      category: "Pakaian Olahraga Custom",
      image: `${brandUrl}/logo.jpg`,
      url: pageUrl,
      offers: {
        "@type": "Offer",
        price: "135000",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: brandUrl },
        { "@type": "ListItem", position: 2, name: "Jersey Mancing", item: pageUrl },
      ],
    },
  ];
}

export default async function JerseyMancingPage() {
  const [brand, catalogData] = await Promise.all([getBrand(), getCatalogData()]);

  const category = catalogData?.find((c) => c.id === config.catalogId);
  const products = category?.products.length
    ? category.products
    : (CATALOG_PRODUCTS.find((c) => c.id === "fishing")?.products ?? []);

  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  const jsonLd = buildJsonLd(brand.name, baseUrl);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <JerseyMancingLanding products={products} waNumber={brand.whatsappNumber || "628115491117"} />
    </>
  );
}
