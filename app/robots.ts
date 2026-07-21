import type { MetadataRoute } from "next";
import { getBrand } from "@/lib/queries";

/**
 * robots.txt — generated at /robots.txt by the App Router.
 *
 * Allow everything; point crawlers at the sitemap.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const brand = await getBrand();
  const base: MetadataRoute.Robots = {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
  if (brand.url) {
    base.sitemap = `${brand.url}/sitemap.xml`;
    base.host = brand.url;
  }
  return base;
}
