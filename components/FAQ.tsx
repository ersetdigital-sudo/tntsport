import { ChevronRightIcon } from "@/components/icons";

const FAQ_ITEMS = [
  {
    q: "Apa itu jersey custom full printing?",
    a: "Jersey custom full printing adalah jersey yang dicetak menggunakan teknik printing sublimasi, sehingga desain menutupi seluruh permukaan kain tanpa batasan warna. Cocok untuk tim futsal, sepak bola, komunitas, event, dan seragam kantor.",
  },
  {
    q: "Berapa harga jersey custom di TNT SPORT?",
    a: "Harga mulai dari Rp65.000 per pcs dengan harga pabrik langsung tanpa perantara. Semakin banyak jumlah pesanan, semakin hemat harga per pcs-nya. Konsultasi via WhatsApp untuk estimasi harga sesuai desain dan jumlah.",
  },
  {
    q: "Berapa lama proses produksi jersey custom?",
    a: "Estimasi produksi 5–10 hari kerja tergantung jumlah pesanan dan kompleksitas desain. Pengiriman ke seluruh Indonesia via ekspedisi terpercaya.",
  },
  {
    q: "Apakah bisa request desain sendiri?",
    a: "Bisa. Tim desainer TNT SPORT siap membantu membuatkan desain dari nol atau memakai desain yang sudah kamu punya. Konsultasi dan revisi desain gratis sampai cocok.",
  },
  {
    q: "Apakah ada garansi untuk jersey yang dipesan?",
    a: "Ya, semua pesanan dilindungi garansi 100%. Jika ada cacat produksi atau kesalahan, akan diganti tanpa biaya tambahan.",
  },
  {
    q: "Mengapa harus pilih TNT SPORT untuk bikin jersey custom?",
    a: "TNT SPORT adalah pabrik jersey custom dengan pengalaman melayani 350.000+ pesanan. Keunggulan kami: bahan premium dry-fit, printing sublimasi full color tanpa batasan, harga pabrik langsung, desain gratis, dan garansi 100%.",
  },
];

export function FAQ() {
  return (
    <section aria-label="Pertanyaan yang sering diajukan" className="w-full">
      <p className="section-kicker">FAQ</p>
      <h2 className="mt-2 text-heading-lg text-ink">
        Pertanyaan yang Sering Diajukan
      </h2>
      <div className="mt-5 flex flex-col gap-3">
        {FAQ_ITEMS.map((item, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-hairline bg-white shadow-premium-sm dark:border-white/10 dark:bg-surface-card [&[open]]:shadow-premium-md"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-sm p-md text-body-sm font-bold text-ink sm:p-lg sm:text-body-md">
              {item.q}
              <ChevronRightIcon className="h-4 w-4 shrink-0 text-charcoal transition-transform duration-200 group-open:rotate-90 dark:text-white/40" />
            </summary>
            <p className="px-md pb-md text-body-sm leading-relaxed text-charcoal dark:text-white/60 sm:px-lg sm:pb-lg">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** FAQ data for JSON-LD schema generation. */
export const FAQ_SCHEMA_ITEMS = FAQ_ITEMS.map((item) => ({
  "@type": "Question" as const,
  name: item.q,
  acceptedAnswer: {
    "@type": "Answer" as const,
    text: item.a,
  },
}));
