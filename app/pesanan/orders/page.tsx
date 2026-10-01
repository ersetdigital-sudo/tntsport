import PesananDashboard from "@/components/admin/PesananDashboard";
import { loadPesananDashboardInitial } from "@/lib/pesanan-server";

export const metadata = {
  title: "Kelola Pesanan — TNT Sport Apparel",
  description: "Dashboard admin kelola pesanan jersey custom",
};

/**
 * Data order dibaca di server (lihat lib/pesanan-server.ts) supaya daftar
 * pesanan sudah ada di HTML pertama. Dulu halaman ini cuma merender komponen
 * client, jadi tabelnya kosong dulu sampai JS selesai memanggil
 * /api/pesanan/orders.
 */
export default async function PesananPage() {
  const initial = await loadPesananDashboardInitial();
  return <PesananDashboard initial={initial} />;
}
