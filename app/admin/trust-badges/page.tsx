import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { CrudManager, type Field } from "@/components/admin/CrudManager";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { name: "label", label: "Label", type: "text", required: true, placeholder: "Bahan Premium" },
  { name: "subtext", label: "Subtext", type: "text", placeholder: "Kualitas terbaik" },
  { name: "icon", label: "Icon", type: "icon" },
  {
    name: "variant",
    label: "Warna",
    type: "select",
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
  { name: "sort_order", label: "Urutan", type: "number", default: 1 },
];

function ErrorState({ title, desc, id }: { title: string; desc: string; id: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-xxl px-xl text-center">
      <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center mb-lg">
        <ShieldCheck size={28} className="text-warning" />
      </div>
      <h2 className="text-heading-md text-ink mb-sm">{title}</h2>
      <p className="text-body-sm text-charcoal max-w-md mb-lg">{desc}</p>
      <p className="text-caption text-stone font-mono">{id}</p>
    </div>
  );
}

export default async function TrustBadgesAdminPage() {
  // Wrap everything in try-catch — never let this page crash.
  try {
    if (!supabaseConfigured()) {
      return (
        <ErrorState
          title="Supabase Belum Dikonfigurasi"
          desc="Environment variable NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY belum di-set."
          id="ERR_NOT_CONFIGURED"
        />
      );
    }

    let supabase;
    try {
      supabase = await createClient();
    } catch (err) {
      console.error("[trust-badges] createClient failed:", err);
      return (
        <ErrorState
          title="Gagal Terhubung ke Database"
          desc="Tidak dapat membuat koneksi ke Supabase. Cek server logs."
          id="ERR_CLIENT_CREATE"
        />
      );
    }

    const { data, error, status } = await supabase
      .from("trust_badges")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      const code = error.code ?? "UNKNOWN";
      const msg = error.message ?? "No message";
      console.error(`[trust-badges] Query error: code=${code} status=${status} msg=${msg}`);

      // Table doesn't exist
      if (code === "42P01" || msg.includes("does not exist")) {
        return (
          <ErrorState
            title="Tabel Trust Badges Belum Ada"
            desc="Jalankan migrasi 0003_landing_admin.sql di Supabase Dashboard → SQL Editor."
            id="ERR_TABLE_MISSING"
          />
        );
      }

      // Permission denied
      if (code === "42501" || status === 403 || msg.includes("permission")) {
        return (
          <ErrorState
            title="Akses Ditolak"
            desc="Tidak memiliki izin untuk mengakses tabel trust_badges. Pastikan RLS policy sudah benar."
            id="ERR_PERMISSION_DENIED"
          />
        );
      }

      // Other Supabase error
      return (
        <ErrorState
          title="Gagal Memuat Data"
          desc={`Supabase error: ${msg}`}
          id={`ERR_DB_${code}`}
        />
      );
    }

    return (
      <CrudManager
        table="trust_badges"
        title="Trust Badges"
        description="Grid keunggulan di landing page (Bahan Premium, Desain Bebas, Harga Pabrik, dll)."
        fields={fields}
        items={data ?? []}
        renderItem={(item) => ({
          title: `${item.label} — ${item.variant}`,
          subtitle: item.subtext ?? "Tanpa subtext",
        })}
      />
    );
  } catch (err) {
    // Catch ANY unexpected error — never crash the page
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[trust-badges] Unexpected error:", msg);
    return (
      <ErrorState
        title="Terjadi Kesalahan"
        desc="Gagal memuat halaman Trust Badges. Cek server logs untuk detail."
        id="ERR_UNEXPECTED"
      />
    );
  }
}
