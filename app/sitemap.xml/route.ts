import { CATEGORY_LANDINGS } from "@/lib/category-landing";
import { productDesignKey } from "@/lib/products";
import { getBrand } from "@/lib/queries";
import { resolveSeoCatalog } from "@/lib/seo";

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  const brand = await getBrand();
  if (!brand.url) {
    return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { "Content-Type": "application/xml" },
    });
  }

  const cleanUrl = brand.url.replace(/\/+$/, "");
  const today = new Date().toISOString();

  const { categories } = await resolveSeoCatalog();

  const entries: string[] = [];

  const addEntry = (url: string, lastmod: string, changefreq: string, priority: number) => {
    entries.push(
      `<url><loc>${xmlEscape(url)}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
    );
  };

  addEntry(cleanUrl, today, "monthly", 1);
  addEntry(`${cleanUrl}/katalog`, today, "weekly", 0.9);
  addEntry(`${cleanUrl}/promo-bulan-ini`, today, "weekly", 0.9);

  for (const landing of Object.values(CATEGORY_LANDINGS)) {
    addEntry(`${cleanUrl}/${landing.slug}`, today, "weekly", 0.8);
  }

  for (const category of categories) {
    addEntry(
      `${cleanUrl}/katalog?category=${encodeURIComponent(category.id)}`,
      today,
      "weekly",
      0.8
    );
    for (const product of category.products) {
      addEntry(
        `${cleanUrl}/katalog?category=${encodeURIComponent(category.id)}&design=${encodeURIComponent(
          productDesignKey({ catalogue: product.name, id: product.id })
        )}`,
        today,
        "monthly",
        0.7
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  });
}
