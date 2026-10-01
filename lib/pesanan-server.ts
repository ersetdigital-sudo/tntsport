/**
 * Pembacaan data awal Dashboard Pesanan langsung di server.
 *
 * Kenapa ada: `/pesanan/orders` cuma merender komponen client, jadi HTML
 * pertamanya kosong dan daftar order baru muncul setelah JS jalan → client
 * memanggil `/api/pesanan/orders`. Di jaringan seluler itu terasa sebagai
 * "dashboard-nya lama".
 *
 * Halaman sekarang membaca order + tahap produksi di server dan mengirimnya
 * sebagai prop `initial`, sehingga HTML pertama sudah berisi daftar order.
 * Sesudah itu dashboard tetap menyegarkan sendiri lewat API seperti biasa.
 *
 * Hanya dijalankan kalau cookie login `pesanan_auth` ada — supaya HTML yang
 * dikirim server tidak berisi data order untuk permintaan yang belum login
 * (API-nya sendiri sudah tidak dijaga, tapi HTML lebih mudah terindeks).
 * Client yang dipakai sama dengan `/api/pesanan/orders` (anon key), jadi hak
 * bacanya tidak berubah sedikit pun.
 */
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { mapOrderRow } from "@/lib/order-map";

export type PesananStep = { id: string; name: string; position: number };

export type PesananDashboardInitial = {
  orders: ReturnType<typeof mapOrderRow>[];
  steps: PesananStep[];
};

/** `null` = belum login / gagal baca → dashboard jalan seperti sebelumnya. */
export async function loadPesananDashboardInitial(): Promise<PesananDashboardInitial | null> {
  const cookieStore = await cookies();
  if (cookieStore.get("pesanan_auth")?.value !== "true") return null;

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [ordersRes, stepsRes] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("production_steps").select("*").order("position", { ascending: true }),
    ]);

    if (ordersRes.error || !ordersRes.data) return null;

    return {
      orders: ordersRes.data.map(mapOrderRow),
      steps: (stepsRes.data ?? []) as PesananStep[],
    };
  } catch (e) {
    // Render server tidak boleh menjatuhkan halaman: apa pun yang gagal di
    // sini bikin halaman jatuh ke alur client seperti sebelumnya.
    console.error("[pesanan] gagal memuat data awal di server:", e);
    return null;
  }
}
