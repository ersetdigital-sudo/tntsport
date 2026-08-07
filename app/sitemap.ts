import type { MetadataRoute } from "next";
import { productDesignKey } from "@/lib/products";
import { getBrand } from "@/lib/queries";
import { resolveSeoCatalog } from "@/lib/seo";

/**
 * sitemap.xml — generated at /sitemap.xml by the App Router.
 *
 * Includes the landing page, the /katalog page, every category
 * (`/katalog?category=…`) and every product deep link
 * (`/katalog?category=…&design=…`). lastModified is refreshed
 * automatically via `new Date()`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brand = await getBrand();
  if (!brand.url) return [];

  const cleanUrl = brand.url.replace(/\/+$/, "");
  const today = new Date();

  const { categories } = await resolveSeoCatalog();
  const entries: MetadataRoute.Sitemap = [
    {
      url: cleanUrl,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${cleanUrl}/katalog`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${cleanUrl}/promo-bulan-ini`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  for (const category of categories) {
    entries.push({
      url: `${cleanUrl}/katalog?category=${encodeURIComponent(category.id)}`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const product of category.products) {
      entries.push({
        url: `${cleanUrl}/katalog?category=${encodeURIComponent(category.id)}&design=${encodeURIComponent(
          productDesignKey({ catalogue: product.name, id: product.id })
        )}`,
        lastModified: today,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
