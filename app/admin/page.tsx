import { createClient } from "@/lib/supabase/server";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Percent,
  Calendar,
  Download,
  ChevronDown,
} from "lucide-react";
import { MetricCard } from "@/components/admin/MetricCard";
import { SalesChart, RevenueBreakdown } from "@/components/admin/SalesChart";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";

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

  const totalContent =
    products + reviews + stats + ctaLinks + socialLinks + trustBadges + categories;

  return (
    <div className="flex flex-col gap-xl animate-fade-in-up">
      {/* Welcome + filter actions */}
      <div className="flex flex-wrap items-center justify-between gap-lg">
        <div>
          <h2 className="text-heading-lg text-ink font-bold">
            Selamat datang kembali, <span className="text-gradient-brand">Admin</span>
          </h2>
          <p className="text-body-sm text-stone mt-xs">
            Ringkasan performa TNT SPORT hari ini —{" "}
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <button
            type="button"
            className="inline-flex items-center gap-xs bg-surface text-charcoal text-body-sm rounded-md border border-hairline px-md py-sm hover:border-hairline-strong transition-colors duration-normal"
          >
            <Calendar size={14} />
            <span>Daily</span>
            <ChevronDown size={12} className="text-stone" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-xs bg-surface text-charcoal text-body-sm rounded-md border border-hairline px-md py-sm hover:border-hairline-strong transition-colors duration-normal"
          >
            <Calendar size={14} />
            <span className="hidden sm:inline">Pilih Tanggal</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-xs bg-surface-dark text-on-dark text-button-md rounded-md px-md py-sm hover:bg-surface-deep transition-colors duration-normal"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metric cards — real data from Supabase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-lg">
        <MetricCard
          label="Total Produk"
          value={String(products)}
          icon={DollarSign}
          accent="brand"
        />
        <MetricCard
          label="Total Konten"
          value={String(totalContent)}
          suffix="items"
          icon={ShoppingCart}
          accent="success"
        />
        <MetricCard
          label="Testimoni"
          value={String(reviews)}
          icon={Users}
          accent="info"
        />
        <MetricCard
          label="Kategori Produk"
          value={String(categories)}
          icon={Percent}
          accent="warning"
        />
      </div>

      {/* Charts row — empty state, no orders table yet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <SalesChart />
        <RevenueBreakdown />
      </div>

      {/* Recent orders — empty state */}
      <RecentOrdersTable />

      {/* Quick links footer */}
      <div className="bg-surface-card rounded-xl p-xl border border-hairline shadow-premium-md">
        <h3 className="text-heading-md text-ink mb-md">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
          <a href="/" className="text-body-sm text-secondary hover:underline">
            → Lihat landing page publik
          </a>
          <a href="/admin/brand" className="text-body-sm text-secondary hover:underline">
            → Edit identitas brand
          </a>
          <a href="/admin/reviews" className="text-body-sm text-secondary hover:underline">
            → Kelola testimoni pelanggan
          </a>
          <a href="/admin/products" className="text-body-sm text-secondary hover:underline">
            → Kelola katalog produk
          </a>
          <a href="/admin/stats" className="text-body-sm text-secondary hover:underline">
            → Update statistik landing
          </a>
          <a href="/admin/cta-links" className="text-body-sm text-secondary hover:underline">
            → Atur CTA links
          </a>
        </div>
      </div>
    </div>
  );
}
