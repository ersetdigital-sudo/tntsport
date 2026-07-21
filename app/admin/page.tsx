import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

/**
 * /admin — dashboard overview.
 *
 * Shows quick counts (products, reviews, stats, CTA links, trust badges)
 * and links into each management section. Read-only; all mutations live
 * in the dedicated section pages.
 */
export const dynamic = "force-dynamic";

async function getCount(table: string): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error || count === null) return 0;
  return count;
}

export default async function AdminDashboard() {
  const [products, reviews, stats, ctaLinks, socialLinks, trustBadges, categories] =
    await Promise.all([
      getCount("products"),
      getCount("reviews"),
      getCount("stats"),
      getCount("cta_links"),
      getCount("social_links"),
      getCount("trust_badges"),
      getCount("product_categories"),
    ]);

  const cards = [
    { label: "Produk", count: products, href: "/admin/products" },
    { label: "Kategori", count: categories, href: "/admin/categories" },
    { label: "Reviews", count: reviews, href: "/admin/reviews" },
    { label: "Stats", count: stats, href: "/admin/stats" },
    { label: "CTA Links", count: ctaLinks, href: "/admin/cta-links" },
    { label: "Social Links", count: socialLinks, href: "/admin/social-links" },
    { label: "Trust Badges", count: trustBadges, href: "/admin/trust-badges" },
  ];

  return (
    <div className="flex flex-col gap-xl">
      <p className="text-body-md text-on-dark-mute">
        Selamat datang di panel admin TNT SPORT. Kelola konten landing page
        dan katalog produk dari sini — ubah teks, gambar, link, testimoni,
        stats, dan social media langsung tanpa perlu coding.
      </p>

      <div className="grid grid-cols-2 gap-lg md:grid-cols-3 md:gap-xl">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="bg-surface-card text-on-dark rounded-md p-xl border border-hairline hover:bg-secondary hover:border-secondary hover:text-on-primary transition-colors duration-normal"
          >
            <div className="text-display-lg text-ink group-hover:text-on-primary">
              {c.count}
            </div>
            <div className="text-button-sm text-on-dark-mute uppercase tracking-wider mt-sm">
              {c.label}
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-surface-card rounded-md p-xl border border-hairline">
        <h2 className="text-heading-md text-ink mb-md">Quick Links</h2>
        <ul className="flex flex-col gap-sm text-body-md">
          <li>
            <Link href="/" className="text-secondary hover:underline">
              → Lihat landing page publik
            </Link>
          </li>
          <li>
            <Link
              href="/admin/brand"
              className="text-secondary hover:underline"
            >
              → Edit identitas brand
            </Link>
          </li>
          <li>
            <Link
              href="/admin/reviews"
              className="text-secondary hover:underline"
            >
              → Kelola testimoni pelanggan
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}