import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { ShieldCheck } from "lucide-react";
import { ProductSearchGrid } from "@/components/admin/ProductSearchGrid";

export const dynamic = "force-dynamic";

function ErrorState({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-xxl px-xl text-center">
      <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center mb-lg">
        <ShieldCheck size={28} className="text-warning" />
      </div>
      <h2 className="text-heading-md text-ink mb-sm">{title}</h2>
      <p className="text-body-sm text-charcoal max-w-md">{desc}</p>
    </div>
  );
}

export default async function ProductsAdminPage() {
  try {
    if (!supabaseConfigured()) {
      return <ErrorState title="Supabase Belum Dikonfigurasi" desc="Set environment variables di .env.local" />;
    }

    let supabase;
    try {
      supabase = await createClient();
    } catch (err) {
      console.error("[products] createClient failed:", err);
      return <ErrorState title="Gagal Terhubung ke Database" desc="Cek server logs." />;
    }

    const [{ data: categories, error: catErr }, { data: products, error: prodErr }] = await Promise.all([
      supabase.from("product_categories").select("id, name, slug").order("sort_order"),
      supabase
        .from("products")
        .select("id, name, slug, category_id, sort_order, product_images(url, sort_order)")
        .order("sort_order"),
    ]);

    if (catErr) return <ErrorState title="Gagal Memuat Kategori" desc={catErr.message} />;
    if (prodErr) return <ErrorState title="Gagal Memuat Produk" desc={prodErr.message} />;

    const grouped = (categories ?? []).map((cat) => ({
      id: cat.id,
      name: cat.name,
      products: (products ?? [])
        .filter((p) => p.category_id === cat.id)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          thumb: (p as any).product_images?.[0]?.url,
        })),
    }));

    const uncategorized = (products ?? [])
      .filter((p) => !p.category_id)
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        thumb: (p as any).product_images?.[0]?.url,
      }));

    return <ProductSearchGrid grouped={grouped} uncategorized={uncategorized} />;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[products] unexpected error:", msg);
    return <ErrorState title="Terjadi Kesalahan" desc="Gagal memuat halaman. Cek server logs." />;
  }
}
