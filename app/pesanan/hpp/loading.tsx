/**
 * Suspense fallback rute `/pesanan/hpp` — kerangka halaman sederhana dengan
 * warna latar dashboard, mengikuti pola loading antar-halaman dashboard
 * (navigasi sidebar memindah halaman, bukan ganti tab).
 */
export default function PesananHppLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="text-[13px] opacity-60">Memuat Kalkulator HPP…</span>
    </div>
  );
}
