import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

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
      ...cat,
      products: (products ?? [])
        .filter((p) => p.category_id === cat.id)
        .sort((a, b) => a.sort_order - b.sort_order),
    }));

    // Products without category
    const uncategorized = (products ?? []).filter((p) => !p.category_id);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-md text-ink">Produk</h2>
            <p className="text-body-sm text-charcoal mt-1">
              Kelola produk jersey per kategori. Upload foto dan atur kode katalog.
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong"
          >
            + Tambah Produk
          </Link>
        </div>

        {grouped.length === 0 && uncategorized.length === 0 && (
          <div className="rounded-2xl border border-hairline bg-surface p-8 text-center">
            <p className="text-charcoal">Belum ada produk. Klik &quot;Tambah Produk&quot; untuk mulai.</p>
          </div>
        )}

        {grouped.map((cat) => (
          <div key={cat.id} className="rounded-2xl border border-hairline bg-surface p-5">
            <h3 className="text-sm font-bold text-ink mb-3">{cat.name}</h3>
            {cat.products.length === 0 ? (
              <p className="text-xs text-mute">Belum ada produk di kategori ini.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {cat.products.map((p) => {
                  const thumb = (p as any).product_images?.[0]?.url;
                  return (
                    <Link
                      key={p.id}
                      href={`/admin/products/${p.id}`}
                      className="group overflow-hidden rounded-xl border border-hairline transition hover:border-primary hover:shadow-sm"
                    >
                      <div className="aspect-[4/5] bg-background">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb} alt={p.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-mute text-xs">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-bold text-ink truncate">{p.name}</p>
                        <p className="text-[10px] text-mute">{p.slug}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {uncategorized.length > 0 && (
          <div className="rounded-2xl border border-hairline bg-surface p-5">
            <h3 className="text-sm font-bold text-ink mb-3">Tanpa Kategori</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {uncategorized.map((p) => {
                const thumb = (p as any).product_images?.[0]?.url;
                return (
                  <Link
                    key={p.id}
                    href={`/admin/products/${p.id}`}
                    className="group overflow-hidden rounded-xl border border-hairline transition hover:border-primary hover:shadow-sm"
                  >
                    <div className="aspect-[4/5] bg-background">
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={thumb} alt={p.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-mute text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-bold text-ink truncate">{p.name}</p>
                      <p className="text-[10px] text-mute">{p.slug}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[products] unexpected error:", msg);
    return <ErrorState title="Terjadi Kesalahan" desc="Gagal memuat halaman. Cek server logs." />;
  }
}
