import type { MetadataRoute } from "next";
import { getBrand } from "@/lib/queries";

/**
 * sitemap.xml — generated at /sitemap.xml by the App Router.
 *
 * Single URL for now (one-page landing). When the /katalog pages land
 * in Phase 7, product URLs will be appended here. Update lastModified
 * automatically via `new Date()`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brand = await getBrand();
  if (!brand.url) return [];
  return [
    {
      url: brand.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
