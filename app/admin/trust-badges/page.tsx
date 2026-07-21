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

type FetchResult =
  | { ok: true; items: Record<string, any>[] }
  | { ok: false; reason: "not_configured" | "table_missing" | "permission_denied" | "unknown"; detail: string };

async function fetchTrustBadges(): Promise<FetchResult> {
  // 1. Check if Supabase env vars are set
  if (!supabaseConfigured()) {
    return { ok: false, reason: "not_configured", detail: "Supabase environment variables not set." };
  }

  const supabase = await createClient();

  // 2. Query with error handling
  const { data, error, status } = await supabase
    .from("trust_badges")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    // 42P01 = undefined_table (table doesn't exist)
    if (error.code === "42P01" || error.message?.includes("does not exist")) {
      console.error(`[trust-badges] Table not found (status ${status}). Run migration 0003_landing_admin.sql.`);
      return { ok: false, reason: "table_missing", detail: error.message };
    }
    // 42501 = insufficient_privilege / RLS permission denied
    if (error.code === "42501" || status === 403 || error.message?.includes("permission")) {
      console.error(`[trust-badges] Permission denied (status ${status}, code ${error.code}).`);
      return { ok: false, reason: "permission_denied", detail: error.message };
    }
    console.error(`[trust-badges] Query error (status ${status}, code ${error.code}):`, error.message);
    return { ok: false, reason: "unknown", detail: error.message };
  }

  return { ok: true, items: data ?? [] };
}

function ErrorState({ reason, detail }: { reason: string; detail: string }) {
  const messages: Record<string, { title: string; desc: string }> = {
    not_configured: {
      title: "Supabase Belum Dikonfigurasi",
      desc: "Environment variable NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY belum di-set di Vercel.",
    },
    table_missing: {
      title: "Tabel Trust Badges Belum Ada",
      desc: "Jalankan migrasi 0003_landing_admin.sql di Supabase Dashboard → SQL Editor untuk membuat tabel trust_badges.",
    },
    permission_denied: {
      title: "Akses Ditolak",
      desc: "Tidak memiliki izin untuk mengakses tabel trust_badges. Pastikan RLS policy sudah benar dan user sudah login.",
    },
    unknown: {
      title: "Terjadi Kesalahan",
      desc: "Gagal memuat data Trust Badges. Cek server logs untuk detail lebih lanjut.",
    },
  };

  const msg = messages[reason] ?? messages.unknown;

  return (
    <div className="flex flex-col items-center justify-center py-xxl px-xl text-center">
      <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center mb-lg">
        <ShieldCheck size={28} className="text-warning" />
      </div>
      <h2 className="text-heading-md text-ink mb-sm">{msg.title}</h2>
      <p className="text-body-sm text-charcoal max-w-md mb-lg">{msg.desc}</p>
      <p className="text-caption text-stone font-mono">Error ID: trust-badges-{reason}</p>
    </div>
  );
}

export default async function TrustBadgesAdminPage() {
  const result = await fetchTrustBadges();

  if (!result.ok) {
    return <ErrorState reason={result.reason} detail={result.detail} />;
  }

  return (
    <CrudManager
      table="trust_badges"
      title="Trust Badges"
      description="Grid keunggulan di landing page (Bahan Premium, Desain Bebas, Harga Pabrik, dll)."
      fields={fields}
      items={result.items}
      renderItem={(item) => ({
        title: `${item.label} — ${item.variant}`,
        subtitle: item.subtext ?? "Tanpa subtext",
      })}
    />
  );
}
