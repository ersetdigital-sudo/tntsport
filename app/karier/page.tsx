import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import KarierForm from "./KarierForm";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-karier",
  weight: "400",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-karier",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Loker Video Editor — TNT Sport Apparel",
  description:
    "Lowongan kerja Video Editor di TNT Sport Apparel, Yogyakarta. Full-time / WFO. Kirim lamaran langsung dari halaman ini.",
};

export default function KarierPage() {
  return (
    <div
      className={`${bebasNeue.variable} ${plusJakarta.variable} min-h-screen`}
      style={{
        backgroundColor: "#FAFAFA",
        color: "#0B1F3A",
        fontFamily: "var(--font-body-karier), system-ui, sans-serif",
        colorScheme: "light",
      }}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-black/5 backdrop-blur" style={{ backgroundColor: "rgba(250,250,250,0.9)" }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:h-20 sm:px-8">
          <a href="#top" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-karier.png" alt="Logo TNT Sport Apparel" width={52} height={52} className="h-11 w-11 object-contain shrink-0 sm:h-[3.25rem] sm:w-[3.25rem]" />
            <span className="text-xl sm:text-2xl leading-none" style={{ fontFamily: "var(--font-display-karier), Impact, sans-serif", letterSpacing: "0.02em", textTransform: "uppercase" }}>
              TNT <span style={{ color: "#FF6B35" }}>Sport</span> Apparel
            </span>
          </a>
          <span className="hidden sm:inline-block rounded-full border px-4 py-2 text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.22em", borderColor: "#FF6B35", color: "#FF6B35" }}>
            Open Recruitment
          </span>
          <span className="sm:hidden rounded-full border px-2.5 py-1.5 text-[9px] font-semibold uppercase" style={{ letterSpacing: "0.22em", borderColor: "#FF6B35", color: "#FF6B35" }}>
            Open Rec.
          </span>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ backgroundColor: "rgba(255,107,53,0.1)" }} />
          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-24">
            <p className="text-[11px] sm:text-xs font-bold uppercase" style={{ letterSpacing: "0.22em", color: "#FF6B35" }}>
              Dibutuhkan — We&apos;re Hiring
            </p>
            <h1 className="mt-4 text-[19vw] sm:text-[8rem] lg:text-[10rem]" style={{ fontFamily: "var(--font-display-karier), Impact, sans-serif", letterSpacing: "0.02em", lineHeight: 0.88, textTransform: "uppercase" }}>
              <span className="block">Video</span>
              <span className="block" style={{ color: "#FF6B35" }}>Editor</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: "rgba(11,31,58,0.7)" }}>
              Bergabunglah bersama tim kreatif TNT Sport Apparel dan ciptakan karya visual yang menginspirasi dunia olahraga.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <span className="rounded-full bg-white border px-4 py-2 text-[10px] sm:text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.22em", borderColor: "rgba(11,31,58,0.12)" }}>
                Penempatan — Yogyakarta
              </span>
              <span className="rounded-full bg-white border px-4 py-2 text-[10px] sm:text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.22em", borderColor: "rgba(11,31,58,0.12)" }}>
                Full-Time / WFO
              </span>
            </div>
            <a
              href="#form"
              className="mt-9 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-lg transition hover:brightness-110"
              style={{ backgroundColor: "#FF6B35", boxShadow: "0 10px 25px rgba(255,107,53,0.25)" }}
            >
              Lamar Sekarang
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
            </a>
          </div>
        </section>

        {/* KUALIFIKASI */}
        <section className="border-y border-black/5 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <h2 className="text-5xl sm:text-7xl" style={{ fontFamily: "var(--font-display-karier), Impact, sans-serif", letterSpacing: "0.02em", textTransform: "uppercase" }}>
              Kualifikasi
            </h2>
            <div className="mt-3 h-1.5 w-16 rounded-full" style={{ backgroundColor: "#FF6B35" }} />
            <ol className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {[
                "Terampil di bidang editing video (CapCut / Premiere / After Effects)",
                "Kreatif, paham tren editing & gaya video yang lagi viral",
                "Paham cara bikin video yang menarik, eye catching & engaging",
                "Min. pengalaman 1 tahun, atau Fresh Graduate dengan portofolio kuat sangat dipertimbangkan",
                "Bisa bekerja secara mandiri dan tepat waktu",
                "Passion di dunia olahraga & jersey custom",
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-3xl sm:text-4xl leading-none pt-0.5" style={{ fontFamily: "var(--font-display-karier), Impact, sans-serif", color: "#FF6B35" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed" style={{ color: "rgba(11,31,58,0.8)" }}>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* BENEFIT */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="text-5xl sm:text-7xl" style={{ fontFamily: "var(--font-display-karier), Impact, sans-serif", letterSpacing: "0.02em", textTransform: "uppercase" }}>
            Benefit
          </h2>
          <div className="mt-3 h-1.5 w-16 rounded-full" style={{ backgroundColor: "#FF6B35" }} />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {/* Gaji Pokok */}
            <div className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(255,107,53,0.12)", color: "#FF6B35" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </div>
              <h3 className="mt-5 text-2xl" style={{ fontFamily: "var(--font-display-karier), Impact, sans-serif", letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Gaji Pokok Kompetitif
              </h3>
              <p className="mt-2 leading-relaxed" style={{ color: "rgba(11,31,58,0.7)" }}>Sesuai pengalaman dan kemampuan</p>
            </div>
            {/* Uang Makan */}
            <div className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(255,107,53,0.12)", color: "#FF6B35" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.7 1.3 3 3 3s3-1.3 3-3V2M6 12v10M18 2c-1.7 1.5-2.5 4-2.5 7 0 2 .8 3 2.5 3v10" /></svg>
              </div>
              <h3 className="mt-5 text-2xl" style={{ fontFamily: "var(--font-display-karier), Impact, sans-serif", letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Uang Makan Harian
              </h3>
              <p className="mt-2 leading-relaxed" style={{ color: "rgba(11,31,58,0.7)" }}>Diberikan setiap hari kerja</p>
            </div>
            {/* Mess */}
            <div className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(255,107,53,0.12)", color: "#FF6B35" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" /></svg>
              </div>
              <h3 className="mt-5 text-2xl" style={{ fontFamily: "var(--font-display-karier), Impact, sans-serif", letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Mess Gratis
              </h3>
              <p className="mt-2 leading-relaxed" style={{ color: "rgba(11,31,58,0.7)" }}>Disediakan tempat tinggal nyaman</p>
            </div>
          </div>
        </section>

        {/* FORM */}
        <section id="form" className="scroll-mt-20" style={{ backgroundColor: "#0B1F3A" }}>
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
            <p className="text-[11px] font-bold uppercase" style={{ letterSpacing: "0.22em", color: "#FF6B35" }}>
              Form Lamaran
            </p>
            <h2 className="mt-3 text-5xl sm:text-7xl text-white" style={{ fontFamily: "var(--font-display-karier), Impact, sans-serif", letterSpacing: "0.02em", textTransform: "uppercase" }}>
              Video Editor
            </h2>
            <p className="mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Isi data di bawah ini. Setelah klik kirim, kamu akan diarahkan ke WhatsApp dengan lamaran yang sudah tersusun rapi — tinggal kirim.
            </p>
            <KarierForm />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t" style={{ backgroundColor: "#0B1F3A", borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-karier.png" alt="Logo TNT Sport Apparel" className="h-11 w-11 object-contain" style={{ width: "2.75rem", height: "2.75rem" }} />
          </div>
          <h2 className="text-4xl sm:text-6xl text-white" style={{ fontFamily: "var(--font-display-karier), Impact, sans-serif", letterSpacing: "0.02em", textTransform: "uppercase" }}>
            Wear Your <span style={{ color: "#FF6B35" }}>Team Identity</span>
          </h2>
          <div className="mt-8 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:gap-10" style={{ color: "rgba(255,255,255,0.75)" }}>
            <span className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              Yogyakarta, Indonesia
            </span>
            <a href="https://instagram.com/thenext_trend" target="_blank" rel="noopener" className="flex items-center gap-2.5 transition hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              @thenext_trend
            </a>
            <a href="https://wa.me/6287780881117" target="_blank" rel="noopener" className="flex items-center gap-2.5 transition hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8.8 9c.2 1.2.8 2.4 1.8 3.4s2.2 1.6 3.4 1.8l1-1.3 2 .9-.3 1.6c-2.2.4-4.6-.7-6.3-2.4S8.1 9.1 8.5 6.9l1.6-.3.9 2L8.8 9Z" /></svg>
              +62 877-8088-1117
            </a>
          </div>
          <p className="mt-10 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            &copy; {new Date().getFullYear()} TNT Sport Apparel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
