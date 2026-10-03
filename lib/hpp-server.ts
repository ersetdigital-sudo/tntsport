/**
 * Pembacaan database HPP untuk halaman Kalkulator (/pesanan/hpp).
 *
 * Pola auth-nya tntsport: service role SETELAH login diverifikasi
 * (hasAdminAccess — cookie `pesanan_auth`). Tabel hpp_items dikunci RLS tanpa
 * policy anon, jadi hanya service role yang bisa membacanya. Belum login /
 * gagal baca → `null`, dan halaman tetap tampil dengan pesan error, bukan crash.
 */
import { createClient } from "@supabase/supabase-js";
import { hasAdminAccess } from "@/lib/admin-auth";

export type HppItem = {
  id: number;
  kategori: string;
  item: string;
  variasi: string;
  harga: number;
  satuan: string;
  urutan: number;
};

/**
 * Client ke tabel HPP: service role kalau tersedia (tabel HPP tidak punya
 * policy anon), kalau tidak jatuh ke anon — dan pembacaan akan gagal
 * (null) tanpa crash, sama seperti endpoint dashboard lain di repo ini.
 */
export function getHppDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey) return null;
  return createClient(
    url,
    serviceKey || anonKey,
    serviceKey ? { auth: { persistSession: false } } : undefined
  );
}

/** `null` = belum login / gagal baca database. */
export async function loadHppItems(): Promise<HppItem[] | null> {
  try {
    const db = getHppDb();
    if (!db) return null;
    if (!(await hasAdminAccess(db))) return null;

    const res = await db
      .from("hpp_items")
      .select("id, kategori, item, variasi, harga, satuan, position")
      .order("position", { ascending: true });

    if (res.error || !res.data) return null;

    return (res.data as Record<string, unknown>[]).map((row) => ({
      id: Number(row.id),
      kategori: String(row.kategori),
      item: String(row.item),
      variasi: String(row.variasi),
      harga: Number(row.harga),
      satuan: String(row.satuan ?? "pcs"),
      urutan: Number(row.position ?? 0),
    }));
  } catch {
    return null;
  }
}
