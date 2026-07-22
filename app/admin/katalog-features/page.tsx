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

export default async function KatalogFeaturesAdminPage() {
  try {
    if (!supabaseConfigured()) {
      return <ErrorState title="Supabase Belum Dikonfigurasi" desc="Set environment variables di .env.local" />;
    }

    let supabase;
    try {
      supabase = await createClient();
    } catch (err) {
      console.error("[katalog-features] createClient failed:", err);
      return <ErrorState title="Gagal Terhubung ke Database" desc="Cek server logs." />;
    }

    let items: Record<string, any>[] = [];
    let queryError: string | null = null;

    try {
      const { data, error } = await supabase
        .from("katalog_features")
        .select("*")
        .order("section")
        .order("sort_order", { ascending: true });

      if (error) {
        queryError = `${error.code ?? "?"}: ${error.message}`;
        console.error("[katalog-features] query error:", queryError);
      } else {
        items = data ?? [];
      }
    } catch (err) {
      queryError = err instanceof Error ? err.message : String(err);
      console.error("[katalog-features] query exception:", queryError);
    }

    if (queryError) {
      return <ErrorState title="Gagal Memuat Data" desc={queryError} />;
    }

    const featureCards = items.filter((item) => item.section === "feature");
    const infoCards = items.filter((item) => item.section === "info");

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-md text-ink">Keunggulan TNT Sport</h2>
            <p className="text-body-sm text-charcoal mt-1">
              Kelola kartu keunggulan di section &quot;Kenapa TNT Sport?&quot;
            </p>
          </div>
          <Link
            href="/admin/katalog-features/new"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong"
          >
            + Tambah Item
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <h3 className="text-sm font-bold text-ink mb-3">Feature Cards (4 kartu utama)</h3>
          {featureCards.length === 0 ? (
            <p className="text-xs text-mute">Belum ada feature cards.</p>
          ) : (
            <div className="space-y-2">
              {featureCards.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/katalog-features/${item.id}`}
                  className="flex items-center gap-4 rounded-xl border border-hairline p-3 transition hover:border-primary"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-card">
                    {item.icon?.startsWith("http") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.icon} alt="" className="h-6 w-6 object-contain" />
                    ) : (
                      <span className="text-xs text-mute">{item.icon?.substring(0, 3) ?? "?"}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-ink truncate">{item.title}</p>
                    <p className="text-xs text-mute truncate">{item.description?.substring(0, 50)}</p>
                  </div>
                  <span className="text-xs text-stone">Edit →</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <h3 className="text-sm font-bold text-ink mb-3">Info Cards (3 kartu bawah)</h3>
          {infoCards.length === 0 ? (
            <p className="text-xs text-mute">Belum ada info cards.</p>
          ) : (
            <div className="space-y-2">
              {infoCards.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/katalog-features/${item.id}`}
                  className="flex items-center gap-4 rounded-xl border border-hairline p-3 transition hover:border-primary"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-card">
                    {item.icon?.startsWith("http") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.icon} alt="" className="h-6 w-6 object-contain" />
                    ) : (
                      <span className="text-xs text-mute">{item.icon?.substring(0, 3) ?? "?"}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-ink truncate">{item.title}</p>
                    <p className="text-xs text-mute truncate">{item.description?.substring(0, 50)}</p>
                  </div>
                  <span className="text-xs text-stone">Edit →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[katalog-features] unexpected error:", msg);
    return <ErrorState title="Terjadi Kesalahan" desc="Gagal memuat halaman. Cek server logs." />;
  }
}
