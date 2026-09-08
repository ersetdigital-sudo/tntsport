/**
 * Integrasi notifikasi WhatsApp via Fonnte API.
 *
 * - Satu fungsi template untuk SEMUA tahap (bukan 9 template terpisah).
 * - Token diambil dari tabel `app_settings`, didekripsi SERVER-SIDE
 *   (lib/fonnte-crypto), dan TIDAK PERNAH dikirim ke client/browser.
 * - Nomor HP dinormalisasi + divalidasi sebelum dikirim (lihat lib/wa.ts).
 */

import { normalizeWhatsAppNumber } from "@/lib/wa";
import { decryptSecret } from "@/lib/fonnte-crypto";
import { createClient } from "@/lib/supabase/server";

export const FONNTE_TOKEN_KEY = "fonnte_token";
export const FONNTE_API_URL = "https://api.fonnte.com/send";
export const FONNTE_TIMEOUT_MS = 10_000;

/** Nama tahap produksi (1-9). */
export const STAGE_NAMES: Record<number, string> = {
  1: "Desain",
  2: "Layout",
  3: "Print",
  4: "Pres",
  5: "Potong",
  6: "Jahit",
  7: "Finishing",
  8: "Packing",
  9: "Kirim",
};

/** Map status text (kolom current_status) → nomor tahap 1-9. */
export const STATUS_TO_STAGE: Record<string, number> = {
  desain: 1,
  layout: 2,
  print: 3,
  pres: 4,
  potong: 5,
  jahit: 6,
  finishing: 7,
  packing: 8,
  kirim: 9,
};

/** Map nomor tahap 1-9 → status text (kebalikan STATUS_TO_STAGE). */
export const STAGE_TO_STATUS: Record<number, string> = Object.fromEntries(
  Object.entries(STATUS_TO_STAGE).map(([status, stage]) => [stage, status])
);

/** URL tracking publik (encode nomor pesanan bila ada karakter spesial). */
export function buildTrackingUrl(orderNumber: string): string {
  return `https://www.tntsportapparel.id/status?order=${encodeURIComponent(
    orderNumber
  )}`;
}

/**
 * Satu fungsi template untuk semua tahap.
 * - Tahap 1-8: template umum "UPDATE PESANAN".
 * - Tahap 9: template khusus "PESANAN DIKIRIM".
 * Tanpa emoji, bahasa Indonesia natural, hanya tahap aktif (tanpa daftar 9 tahap).
 */
export function buildWhatsAppMessage(
  stage: number,
  order: { customer_name: string; order_number: string }
): string {
  const customerName = order.customer_name;
  const orderNumber = order.order_number;
  const trackingUrl = buildTrackingUrl(orderNumber);

  if (stage === 9) {
    return [
      "PESANAN DIKIRIM",
      `Halo Kak ${customerName},`,
      "",
      `Pesanan #${orderNumber} sudah selesai diproduksi dan sudah masuk tahap pengiriman.`,
      "",
      "Cek detail pesanan dan informasi pengiriman di:",
      trackingUrl,
      "",
      "Terima kasih sudah mempercayakan pesanan Kakak kepada TNT Sport Apparel.",
    ].join("\n");
  }

  const stageName = STAGE_NAMES[stage] ?? `Tahap ${stage}`;

  return [
    "UPDATE PESANAN",
    `Halo Kak ${customerName},`,
    "",
    `Pesanan #${orderNumber} saat ini sudah masuk tahap:`,
    stageName,
    "",
    `Progress: ${stage}/9 tahap`,
    "",
    "Cek progres lengkap pesanan Kakak di:",
    trackingUrl,
    "",
    "Kami akan mengirimkan update kembali saat pesanan masuk ke tahap berikutnya.",
    "",
    "Terima kasih sudah mempercayakan pesanan Kakak kepada TNT Sport Apparel.",
  ].join("\n");
}

/** Validasi nomor HP format internasional Fonnte (628xxxxxxxxxx). */
export function isValidFonntePhone(phone: string): boolean {
  return /^62\d{8,14}$/.test(phone);
}

/**
 * Ambil token Fonnte dari app_settings, didekripsi server-side.
 * Return null bila belum disimpan. TIDAK pernah di-log.
 */
export async function getFonnteToken(): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", FONNTE_TOKEN_KEY)
    .maybeSingle();

  if (!data?.value) return null;

  try {
    return decryptSecret(data.value);
  } catch {
    // Key berubah / data korup — tidak di-log isinya, cukup return null.
    return null;
  }
}

/**
 * Kirim pesan WhatsApp via Fonnte API.
 * - Token diambil + didekripsi di server, dipakai sebagai header Authorization.
 * - Timeout 10 detik, error network ditangani try-catch.
 * - Return `{ success, response }` — response TIDAK pernah berisi token.
 */
export async function sendFonnteMessage(
  phone: string,
  message: string
): Promise<{ success: boolean; response: Record<string, unknown> }> {
  const token = await getFonnteToken();
  if (!token) {
    return {
      success: false,
      response: { error: "fonnte_token_not_set" },
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FONNTE_TIMEOUT_MS);

  try {
    const res = await fetch(FONNTE_API_URL, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ target: phone, message }),
      signal: controller.signal,
    });

    let body: Record<string, unknown> = {};
    try {
      body = (await res.json()) as Record<string, unknown>;
    } catch {
      // Response bukan JSON — pakai status code saja.
      body = { status_code: res.status };
    }

    return {
      success: res.ok,
      response: { status_code: res.status, ...body },
    };
  } catch (err) {
    // AbortController → timeout; fetch error lain → network failure.
    const name = err instanceof Error ? err.name : "unknown";
    return {
      success: false,
      response: { error: name === "AbortError" ? "timeout" : "network_error" },
    };
  } finally {
    clearTimeout(timeout);
  }
}

/** Normalisasi + validasi satu paket untuk dipakai endpoint admin. */
export function normalizeAndValidatePhone(raw: string): string | null {
  const phone = normalizeWhatsAppNumber(raw);
  return isValidFonntePhone(phone) ? phone : null;
}