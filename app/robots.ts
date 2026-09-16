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
  const siteUrl = brand.url ? brand.url.replace(/\/+$/, "") : "";
  if (siteUrl) {
    base.sitemap = `${siteUrl}/sitemap.xml`;
    base.host = siteUrl.replace(/^https?:\/\//i, "");
  }
  return base;
}
