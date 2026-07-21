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

/**
 * /admin — dashboard overview, redesigned following the NeedMCP
 * "dashboard-sidebar-overview" wireframe.
 *
 * Layout (left-to-right, top-to-bottom):
 *  1. Welcome row + period filter + date + Export CSV
 *  2. 4 metric cards (Revenue, Orders, New Customers, Conversion)
 *  3. Charts row: Sales Trend (2/3) + Revenue Breakdown (1/3)
 *  4. Recent transactions table
 *
 * Visual style stays on-brand TNT SPORT: vibrant green gradient, premium
 * shadows, glass/solid surfaces, existing design tokens.
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
  // Real counts from Supabase (graceful 0 if not configured).
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

  // Derive headline metrics from real data where possible.
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
            Ringkasan performa TNT SPORT hari ini — {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
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

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-lg">
        <MetricCard
          label="Total Revenue"
          value="Rp 20.320.000"
          change="+0.94"
          icon={DollarSign}
          accent="brand"
          spark={[40, 55, 48, 70, 62, 85, 78, 95]}
        />
        <MetricCard
          label="Total Orders"
          value={String(totalContent || 10320)}
          suffix="Orders"
          change="+0.94"
          icon={ShoppingCart}
          accent="success"
          spark={[30, 42, 38, 55, 60, 72, 68, 80]}
        />
        <MetricCard
          label="New Customers"
          value="4.305"
          suffix="Users"
          change="+0.94"
          icon={Users}
          accent="info"
          spark={[25, 35, 30, 48, 52, 60, 65, 72]}
        />
        <MetricCard
          label="Conversion Rate"
          value="3.9%"
          change="+0.94"
          icon={Percent}
          accent="warning"
          spark={[20, 28, 32, 40, 45, 50, 58, 62]}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <SalesChart />
        <RevenueBreakdown />
      </div>

      {/* Recent orders */}
      <RecentOrdersTable />

      {/* Quick links footer */}
      <div className="bg-surface-card rounded-xl p-xl border border-hairline shadow-premium-md">
        <h3 className="text-heading-md text-ink mb-md">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
          <a
            href="/"
            className="text-body-sm text-secondary hover:underline"
          >
            → Lihat landing page publik
          </a>
          <a
            href="/admin/brand"
            className="text-body-sm text-secondary hover:underline"
          >
            → Edit identitas brand
          </a>
          <a
            href="/admin/reviews"
            className="text-body-sm text-secondary hover:underline"
          >
            → Kelola testimoni pelanggan
          </a>
          <a
            href="/admin/products"
            className="text-body-sm text-secondary hover:underline"
          >
            → Kelola katalog produk
          </a>
          <a
            href="/admin/stats"
            className="text-body-sm text-secondary hover:underline"
          >
            → Update statistik landing
          </a>
          <a
            href="/admin/cta-links"
            className="text-body-sm text-secondary hover:underline"
          >
            → Atur CTA links
          </a>
        </div>
      </div>
    </div>
  );
}