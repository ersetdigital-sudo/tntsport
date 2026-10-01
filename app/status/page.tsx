import type { Metadata } from "next";
import { headers } from "next/headers";
import { getTokenFromCookie } from "@/lib/verify-token";
import { loadStatusInitial } from "@/lib/status-server";
import StatusClient from "./StatusClient";

export const metadata: Metadata = {
  title: "Status Pesanan — TNT Sport Apparel",
  description: "Pantau progres produksi pesanan jersey custom TNT Sport Apparel.",
  robots: { index: false, follow: false },
};

// Dibaca per request: token ada di query/cookie, jadi halaman ini tidak bisa
// di-cache sebagai halaman statis.
export const dynamic = "force-dynamic";

/**
 * Halaman /status sekarang dirender server. Kalau token dari link WhatsApp
 * (`?token=`) atau cookie perangkat ada, HTML pertama sudah berisi progres
 * pesanan — sebelumnya halaman ini kosong beberapa detik sambil menunggu dua
 * fetch berurutan di browser.
 *
 * Token diambil dari query dulu, cookie jadi cadangan supaya kunjungan ulang
 * (bookmark / refresh tanpa query) tetap bisa dirender di server. Kalau
 * dua-duanya tidak ada, halaman dirender seperti sebelumnya dan klien
 * menampilkan modal verifikasi HP.
 */
export default async function StatusPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; token?: string }>;
}) {
  const sp = await searchParams;
  const h = await headers();
  const token = sp.token || getTokenFromCookie(h.get("cookie"));
  const initial = await loadStatusInitial(sp.order, token);

  return <StatusClient initial={initial} />;
}
