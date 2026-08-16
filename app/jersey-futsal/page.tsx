import type { Metadata } from "next";
import { CategoryLanding } from "@/components/category-landing/CategoryLanding";
import { CATEGORY_LANDINGS, getCategoryLanding } from "@/lib/category-landing";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { getBrand, getCatalogData, getKatalogTestimonials } from "@/lib/queries";

export const revalidate = 3600;

const config = CATEGORY_LANDINGS.football;

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

export default async function JerseyFutsalPage() {
  const cfg = getCategoryLanding(config.slug)!;
  const [brand, catalogData, dbTestimonials] = await Promise.all([
    getBrand(),
    getCatalogData(),
    getKatalogTestimonials(),
  ]);

  const category = catalogData?.find((c) => c.id === cfg.catalogId);
  const products = category?.products.length
    ? category.products
    : (CATALOG_PRODUCTS.find((c) => c.id === cfg.catalogId)?.products ?? []);

  const heroImage = category?.products.find((p) => !p.image.includes("placeholder"))?.image ?? "/promo/promo-hero.png";

  const testimonials =
    dbTestimonials?.map((t) => ({
      quote: t.quote,
      name: t.name,
      team: t.team || "",
      city: t.city,
    })) ?? cfg.testimonials.fallback;

  return (
    <CategoryLanding
      config={cfg}
      products={products}
      testimonials={testimonials}
      heroImage={heroImage}
      waNumber={brand.whatsappNumber || "628115491117"}
      logoPath={brand.logoPath || ""}
    />
  );
}
