/**
 * Pembacaan database "DAFTAR KAIN" untuk tab Daftar Kain di /pesanan/hpp.
 * Polanya sama dengan lib/hpp-server.ts: dibaca di server lewat service role
 * SETELAH login diverifikasi (hasAdminAccess). Belum login / gagal baca → null.
 */
import { createClient } from "@supabase/supabase-js";
import { hasAdminAccess } from "@/lib/admin-auth";

export type KainFabric = {
  id: number;
  grup: string;
  nama: string;
  hargaPerKg: number;
  hargaAtasan: number | null;
  hargaCelana: number | null;
};

/** `null` = belum login / gagal baca database. */
export async function loadKainFabrics(): Promise<KainFabric[] | null> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !anonKey) return null;
    const db = createClient(
      url,
      serviceKey || anonKey,
      serviceKey ? { auth: { persistSession: false } } : undefined
    );
    if (!(await hasAdminAccess(db))) return null;

    const res = await db
      .from("kain_fabrics")
      .select("id, grup, nama, harga_per_kg, harga_atasan, harga_celana")
      .order("position", { ascending: true });

    if (res.error || !res.data) return null;

    return (res.data as Record<string, unknown>[]).map((row) => ({
      id: Number(row.id),
      grup: String(row.grup),
      nama: String(row.nama),
      hargaPerKg: Number(row.harga_per_kg),
      hargaAtasan: row.harga_atasan == null ? null : Number(row.harga_atasan),
      hargaCelana: row.harga_celana == null ? null : Number(row.harga_celana),
    }));
  } catch {
    return null;
  }
}
