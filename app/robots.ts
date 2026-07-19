import type { MetadataRoute } from "next";
import { getBrand } from "@/lib/queries";

/**
 * robots.txt — generated at /robots.txt by the App Router.
 *
 * Allow everything; point crawlers at the sitemap.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const brand = await getBrand();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${brand.url}/sitemap.xml`,
    host: brand.url,
  };
}
