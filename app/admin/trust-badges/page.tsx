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

export default async function TrustBadgesAdminPage() {
  // Outer guard: never crash this page
  try {
    if (!supabaseConfigured()) {
      return <ErrorState title="Supabase Belum Dikonfigurasi" desc="Set environment variables di Vercel." />;
    }

    let supabase;
    try {
      supabase = await createClient();
    } catch (err) {
      console.error("[trust-badges] createClient failed:", err);
      return <ErrorState title="Gagal Terhubung ke Database" desc="Cek server logs." />;
    }

    let items: Record<string, any>[] = [];
    let queryError: string | null = null;

    try {
      const { data, error } = await supabase
        .from("trust_badges")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        queryError = `${error.code ?? "?"}: ${error.message}`;
        console.error("[trust-badges] query error:", queryError);
      } else {
        items = data ?? [];
      }
    } catch (err) {
      queryError = err instanceof Error ? err.message : String(err);
      console.error("[trust-badges] query exception:", queryError);
    }

    if (queryError) {
      return <ErrorState title="Gagal Memuat Data" desc={queryError} />;
    }

    // Import CrudManager dynamically to avoid import-chain crashes
    const { CrudManager } = await import("@/components/admin/CrudManager");
    const { ICON_NAMES } = await import("@/lib/icon-registry");

    const fields = [
      { name: "label", label: "Label", type: "text" as const, required: true, placeholder: "Bahan Premium" },
      { name: "subtext", label: "Subtext", type: "text" as const, placeholder: "Kualitas terbaik" },
      { name: "icon", label: "Icon", type: "icon" as const },
      {
        name: "variant",
        label: "Warna",
        type: "select" as const,
        required: true,
        default: "neutral",
        options: [
          { value: "neutral", label: "Neutral" },
          { value: "filled", label: "Filled" },
          { value: "success", label: "Success (hijau)" },
          { value: "warning", label: "Warning (kuning)" },
          { value: "info", label: "Info (biru)" },
        ],
      },
      { name: "sort_order", label: "Urutan", type: "number" as const, default: 1 },
    ];

    return (
      <CrudManager
        table="trust_badges"
        title="Trust Badges"
        description="Grid keunggulan di landing page (Bahan Premium, Desain Bebas, Harga Pabrik, dll)."
        fields={fields}
        items={items}
        renderItem={(item: Record<string, any>) => ({
          title: `${item.label} — ${item.variant}`,
          subtitle: item.subtext ?? "Tanpa subtext",
        })}
      />
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[trust-badges] unexpected error:", msg);
    return <ErrorState title="Terjadi Kesalahan" desc="Gagal memuat halaman. Cek server logs." />;
  }
}
