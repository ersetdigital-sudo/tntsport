import type { Metadata } from "next";
import { CorporateCollectionLanding } from "@/components/corporate-collection/CorporateCollectionLanding";
import { CATEGORY_LANDINGS, getCategoryLanding } from "@/lib/category-landing";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { getBrand, getCatalogData } from "@/lib/queries";

export const revalidate = 3600;

const config = CATEGORY_LANDINGS.corporate;

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: config.eyebrow }],
    },
  };
}

export default async function CorporateCollectionPage() {
  const [brand, catalogData] = await Promise.all([getBrand(), getCatalogData()]);

  const category = catalogData?.find((c) => c.id === config.catalogId);
  const products = category?.products.length
    ? category.products
    : CATALOG_PRODUCTS.find((c) => c.id === "instansi-corporate")?.products ?? [];

  return <CorporateCollectionLanding products={products} waNumber={brand?.whatsappNumber ?? "6285179733737"} />;
}
