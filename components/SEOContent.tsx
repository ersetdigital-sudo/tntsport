/**
 * SEOContent — crawlable text block that answers search intent for
 * "jersey custom full printing". Visually compact, semantically rich.
 */
export function SEOContent() {
  return (
    <section aria-label="Tentang layanan jersey custom" className="w-full">
      <p className="section-kicker">Tentang Layanan</p>
      <h2 className="mt-2 text-heading-lg text-ink">
        Bikin Jersey Custom Full Printing untuk Tim & Komunitas
      </h2>
      <p className="mt-3 text-body-sm leading-relaxed text-charcoal dark:text-white/60 sm:text-body-md">
        TNT SPORT adalah pabrik jersey custom yang melayani pesanan jersey full printing
        untuk tim futsal, sepak bola, komunitas, event, sekolah, dan perusahaan. Dengan
        teknik printing sublimasi, desain kamu dicetak penuh di seluruh permukaan jersey
        tanpa batasan warna — termasuk gradasi, motif, dan detail rumit sekalipun.
      </p>

      <h3 className="mt-5 text-body-md font-bold text-ink">
        Keunggulan Bikin Jersey Custom di TNT SPORT
      </h3>
      <ul className="mt-2 flex flex-col gap-1.5 text-body-sm text-charcoal dark:text-white/60">
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span><strong className="text-ink">Bahan premium dry-fit</strong> — nyaman dipakai, menyerap keringat, tidak mudah luntur.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span><strong className="text-ink">Desain bebas</strong> — tim desainer siap bantu dari nol, revisi gratis sampai cocok.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span><strong className="text-ink">Harga pabrik langsung</strong> — tanpa perantara, mulai dari Rp65.000 per pcs.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span><strong className="text-ink">Kirim ke seluruh Indonesia</strong> — packing aman, ekspedisi terpercaya.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span><strong className="text-ink">Garansi 100%</strong> — pesanan dijamin aman dari cacat produksi.</span>
        </li>
      </ul>

      <h3 className="mt-5 text-body-md font-bold text-ink">
        Alur Pemesanan Jersey Custom
      </h3>
      <ol className="mt-2 flex flex-col gap-2 text-body-sm text-charcoal dark:text-white/60">
        <li className="flex items-start gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">1</span>
          <span><strong className="text-ink">Konsultasi via WhatsApp</strong> — sampaikan kebutuhan, jumlah, dan referensi desain.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">2</span>
          <span><strong className="text-ink">Desain dibuatkan</strong> — tim desainer buatkan mockup, revisi sampai puas.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">3</span>
          <span><strong className="text-ink">Produksi</strong> — printing sublimasi full color, proses 5–10 hari kerja.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">4</span>
          <span><strong className="text-ink">Kirim ke alamatmu</strong> — packing rapi, kirim ke seluruh Indonesia.</span>
        </li>
      </ol>
    </section>
  );
}
