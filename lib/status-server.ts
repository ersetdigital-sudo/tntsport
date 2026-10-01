/**
 * Pembacaan data halaman status pesanan JERSEY langsung di server.
 *
 * Kenapa ada: halaman /status dulu selalu kosong beberapa detik. HTML pertamanya
 * cuma memuat kerangka, isi pesanan baru muncul setelah browser menyelesaikan
 * `/api/track/session` lalu `/api/track/ensure-history` — dua request berurutan
 * ke Supabase.
 *
 * Kalau token dari link WhatsApp (`?token=`) atau cookie perangkat ada, datanya
 * dibaca di sini sehingga HTML pertama sudah berisi progres pesanan. Halaman
 * /status/maklon memang sudah bekerja seperti ini (server component).
 *
 * Client yang dipakai sengaja ANON (bukan service-role): hak bacanya jadi sama
 * persis dengan yang dipakai /api/track/session, jadi token apa pun yang ditolak
 * di jalur API juga ditolak di sini.
 */
import { createClient } from "@supabase/supabase-js";
import { verifyToken } from "@/lib/verify-token";

export type StatusStep = { name: string; position: number };

export type StatusInitial = {
  order: Record<string, unknown>;
  history: Record<string, unknown>[];
  steps: StatusStep[];
};

/**
 * `null` = token tidak ada / tidak sah / tidak cocok dengan nomor pesanan →
 * klien lanjut ke alur verifikasi HP seperti sebelumnya.
 */
export async function loadStatusInitial(
  orderNumber: string | undefined,
  rawToken: string | null
): Promise<StatusInitial | null> {
  const desired = (orderNumber || "").toUpperCase();
  if (!desired || !rawToken) return null;

  const session = verifyToken(rawToken);
  if (!session || session.orderId !== desired) return null;

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: orderRaw, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", desired)
      .single();

    if (error || !orderRaw) return null;

    const [{ data: history }, { data: stepRows }] = await Promise.all([
      supabase
        .from("order_status_history")
        .select("*")
        .eq("order_id", (orderRaw as { id: string }).id)
        .order("created_at", { ascending: true }),
      supabase
        .from("production_steps")
        .select("name, position")
        .order("position", { ascending: true }),
    ]);

    // `wo_photos` cuma untuk admin (dokumen kerja), jangan ikut ke browser
    // customer — sama seperti yang dilakukan /api/track/session.
    const { wo_photos: _wo, ...order } = orderRaw as Record<string, unknown> & {
      wo_photos?: unknown;
    };

    return {
      order,
      history: (history ?? []) as Record<string, unknown>[],
      steps: (stepRows ?? []) as StatusStep[],
    };
  } catch (e) {
    // SSR tidak boleh menjatuhkan halaman: apa pun yang gagal di sini bikin
    // halaman jatuh ke alur klien seperti sebelumnya.
    console.error("[status] gagal memuat data awal di server:", e);
    return null;
  }
}
