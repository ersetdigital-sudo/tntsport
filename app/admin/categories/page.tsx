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

export default async function CategoriesAdminPage() {
  try {
    if (!supabaseConfigured()) {
      return <ErrorState title="Supabase Belum Dikonfigurasi" desc="Set environment variables di .env.local" />;
    }

    let supabase;
    try {
      supabase = await createClient();
    } catch (err) {
      console.error("[categories] createClient failed:", err);
      return <ErrorState title="Gagal Terhubung ke Database" desc="Cek server logs." />;
    }

    let items: Record<string, any>[] = [];
    let queryError: string | null = null;

    try {
      const { data, error } = await supabase
        .from("product_categories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        queryError = `${error.code ?? "?"}: ${error.message}`;
        console.error("[categories] query error:", queryError);
      } else {
        items = data ?? [];
      }
    } catch (err) {
      queryError = err instanceof Error ? err.message : String(err);
      console.error("[categories] query exception:", queryError);
    }

    if (queryError) {
      return <ErrorState title="Gagal Memuat Data" desc={queryError} />;
    }

    const { CrudManager } = await import("@/components/admin/CrudManager");

    const fields = [
      { name: "name", label: "Nama Kategori", type: "text" as const, required: true, placeholder: "Sepak Bola / Futsal" },
      { name: "slug", label: "Slug", type: "text" as const, required: true, placeholder: "sepak-bola", help: "URL-friendly, unik. Contoh: sepak-bola, voli, basket" },
      { name: "sort_order", label: "Urutan", type: "number" as const, default: 1 },
    ];

    return (
      <CrudManager
        table="product_categories"
        title="Kategori Produk"
        description="Kelola kategori jersey. Kategori ditampilkan di halaman katalog publik."
        fields={fields}
        items={items}
        titleField="name"
        subtitleField="slug"
      />
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[categories] unexpected error:", msg);
    return <ErrorState title="Terjadi Kesalahan" desc="Gagal memuat halaman. Cek server logs." />;
  }
}
