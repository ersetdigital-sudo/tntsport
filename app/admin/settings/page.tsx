import { createClient } from "@/lib/supabase/server";
import { FonnteSettings } from "@/components/admin/FonnteSettings";
import { decryptSecret } from "@/lib/fonnte-crypto";

export const dynamic = "force-dynamic";

/**
 * /admin/settings — pengaturan sistem (token notifikasi WhatsApp Fonnte).
 * Token di-dekripsi HANYA server-side untuk menampilkan 4 karakter terakhir;
 * token penuh tidak pernah dikirim ke client.
 */
export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", "fonnte_token")
    .maybeSingle();

  let hasToken = false;
  let tokenLast4: string | null = null;

  if (data?.value) {
    try {
      tokenLast4 = decryptSecret(data.value).slice(-4);
      hasToken = tokenLast4 !== null;
    } catch {
      // Key env belum di-set / data korup — halaman tetap jalan,
      // komponen akan menampilkan peringatan.
      hasToken = false;
      tokenLast4 = null;
    }
  }

  return (
    <div className="flex flex-col gap-xl animate-fade-in-up">
      <div>
        <h2 className="text-heading-lg text-ink font-bold">Pengaturan</h2>
        <p className="text-body-sm text-stone mt-xs">
          Notifikasi WhatsApp otomatis via Fonnte saat admin mengubah tahap
          produksi pesanan.
        </p>
      </div>

      <FonnteSettings
        initialHasToken={hasToken}
        initialTokenLast4={tokenLast4}
      />
    </div>
  );
}