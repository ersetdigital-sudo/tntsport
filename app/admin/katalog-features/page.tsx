import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { ShieldCheck } from "lucide-react";

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

    const { CrudManager } = await import("@/components/admin/CrudManager");

    const fields = [
      {
        name: "section",
        label: "Tipe Section",
        type: "select" as const,
        required: true,
        default: "feature",
        options: [
          { value: "feature", label: "Feature Card (4 kartu utama)" },
          { value: "info", label: "Info Card (3 kartu bawah)" },
        ],
      },
      { name: "icon", label: "Icon", type: "icon" as const },
      { name: "title", label: "Judul", type: "text" as const, required: true, placeholder: "Adem & Nyaman" },
      { name: "description", label: "Deskripsi", type: "textarea" as const, required: true, placeholder: "Bahan ringan, menyerap keringat..." },
      { name: "sort_order", label: "Urutan", type: "number" as const, default: 1 },
    ];

    const augmented = items.map((item) => ({
      ...item,
      _title: `[${item.section === "feature" ? "Feature" : "Info"}] ${item.title}`,
      _subtitle: item.description?.substring(0, 60) + (item.description?.length > 60 ? "..." : ""),
    }));

    return (
      <CrudManager
        table="katalog_features"
        title="Keunggulan TNT Sport"
        description="Kelola kartu keunggulan di section 'Kenapa TNT Sport?'. Perubahan langsung tampil di halaman katalog."
        fields={fields}
        items={augmented}
        titleField="_title"
        subtitleField="_subtitle"
      />
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[katalog-features] unexpected error:", msg);
    return <ErrorState title="Terjadi Kesalahan" desc="Gagal memuat halaman. Cek server logs." />;
  }
}
