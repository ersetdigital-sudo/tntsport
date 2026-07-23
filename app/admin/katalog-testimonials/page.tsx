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

export default async function KatalogTestimonialsAdminPage() {
  try {
    if (!supabaseConfigured()) {
      return <ErrorState title="Supabase Belum Dikonfigurasi" desc="Set environment variables di .env.local" />;
    }

    let supabase;
    try {
      supabase = await createClient();
    } catch (err) {
      console.error("[katalog-testimonials] createClient failed:", err);
      return <ErrorState title="Gagal Terhubung ke Database" desc="Cek server logs." />;
    }

    let items: Record<string, any>[] = [];
    let queryError: string | null = null;

    try {
      const { data, error } = await supabase
        .from("katalog_testimonials")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        queryError = `${error.code ?? "?"}: ${error.message}`;
        console.error("[katalog-testimonials] query error:", queryError);
      } else {
        items = data ?? [];
      }
    } catch (err) {
      queryError = err instanceof Error ? err.message : String(err);
      console.error("[katalog-testimonials] query exception:", queryError);
    }

    if (queryError) {
      return <ErrorState title="Gagal Memuat Data" desc={queryError} />;
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-md text-ink">Testimoni Pelanggan</h2>
            <p className="text-body-sm text-charcoal mt-1">
              Kelola testimoni yang tampil di halaman katalog.
            </p>
          </div>
          <Link
            href="/admin/katalog-testimonials/new"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong"
          >
            + Tambah Testimoni
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-hairline bg-surface p-8 text-center">
            <p className="text-charcoal">Belum ada testimoni. Klik &quot;Tambah Testimoni&quot; untuk mulai.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/admin/katalog-testimonials/${item.id}`}
                className="flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-4 transition hover:border-primary hover:shadow-sm"
              >
                {/* Avatar */}
                {item.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image_url} alt={item.name} className="h-12 w-12 shrink-0 rounded-full object-cover" />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-black text-white">
                    {item.name?.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold text-ink">{item.name}</strong>
                    <span className="text-[10px] text-mute">{item.city} — {item.team}</span>
                  </div>
                  <p className="mt-1 text-xs text-charcoal truncate italic">&ldquo;{item.quote}&rdquo;</p>
                </div>

                {/* Rating */}
                <div className="shrink-0 text-right">
                  <span className="text-xs text-[#f59e0b]">{"★".repeat(item.rating ?? 5)}</span>
                  <p className="text-[10px] text-stone mt-1">Edit →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[katalog-testimonials] unexpected error:", msg);
    return <ErrorState title="Terjadi Kesalahan" desc="Gagal memuat halaman. Cek server logs." />;
  }
}
