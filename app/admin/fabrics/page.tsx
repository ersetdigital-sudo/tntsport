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

const GROUP_LABELS: Record<string, string> = {
  jacquard: "3 Jacquard Kain",
  base: "Base Kain",
  embossed: "Embossed Kain",
};

export default async function FabricsAdminPage() {
  try {
    if (!supabaseConfigured()) {
      return <ErrorState title="Supabase Belum Dikonfigurasi" desc="Set environment variables di .env.local" />;
    }

    let supabase;
    try {
      supabase = await createClient();
    } catch (err) {
      console.error("[fabrics] createClient failed:", err);
      return <ErrorState title="Gagal Terhubung ke Database" desc="Cek server logs." />;
    }

    let items: Record<string, any>[] = [];
    let queryError: string | null = null;

    try {
      const { data, error } = await supabase
        .from("fabrics")
        .select("*")
        .order("fabric_group")
        .order("sort_order", { ascending: true });

      if (error) {
        queryError = `${error.code ?? "?"}: ${error.message}`;
        console.error("[fabrics] query error:", queryError);
      } else {
        items = data ?? [];
      }
    } catch (err) {
      queryError = err instanceof Error ? err.message : String(err);
      console.error("[fabrics] query exception:", queryError);
    }

    if (queryError) {
      return <ErrorState title="Gagal Memuat Data" desc={queryError} />;
    }

    const groups = ["jacquard", "base", "embossed"].map((g) => ({
      id: g,
      label: GROUP_LABELS[g] ?? g,
      items: items.filter((item) => item.fabric_group === g),
    }));

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-md text-ink">Bahan Kain</h2>
            <p className="text-body-sm text-charcoal mt-1">
              Kelola pilihan bahan di section &quot;Pilih bahannya&quot; pada halaman katalog
            </p>
          </div>
          <Link
            href="/admin/fabrics/new"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong"
          >
            + Tambah Bahan
          </Link>
        </div>

        {groups.map((group) => (
          <div key={group.id} className="rounded-2xl border border-hairline bg-surface p-5">
            <h3 className="text-sm font-bold text-ink mb-3">{group.label}</h3>
            {group.items.length === 0 ? (
              <p className="text-xs text-mute">Belum ada bahan di kelompok ini.</p>
            ) : (
              <div className="space-y-2">
                {group.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/admin/fabrics/${item.id}`}
                    className="flex items-center gap-4 rounded-xl border border-hairline p-3 transition hover:border-primary"
                  >
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-surface-card">
                      {item.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image_url} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-xs text-mute">
                          {item.code?.substring(0, 3) ?? "?"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-ink truncate">
                        {item.code}_{item.name}
                      </p>
                      <p className="text-xs text-mute truncate">
                        {item.description?.substring(0, 60) ?? "Tanpa deskripsi"}
                      </p>
                    </div>
                    <span className="text-xs text-stone">Edit →</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[fabrics] unexpected error:", msg);
    return <ErrorState title="Terjadi Kesalahan" desc="Gagal memuat halaman. Cek server logs." />;
  }
}
