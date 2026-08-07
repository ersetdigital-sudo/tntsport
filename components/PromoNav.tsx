"use client";

/**
 * PromoNav — sticky header untuk landing Promo Kemerdekaan.
 * Tanpa menu navigasi dan tanpa logo (sesuai permintaan), hanya tombol CTA.
 */
export function PromoNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[4rem] max-w-7xl items-center justify-end px-5 lg:px-8">
        <a
          href="#harga"
          className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#ef233c] hover:text-white"
        >
          Pesan sekarang
        </a>
      </div>
    </header>
  );
}