"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { buildWhatsAppLink } from "@/lib/wa";
import "./corporate-collection.css";

interface Product {
  id: string;
  catalogue: string;
  image: string;
  alt: string;
}

interface Props {
  products: Product[];
  waNumber: string;
}

const CATALOG_NAMES: Record<string, string> = {
  "GET TNT-01": "Corporate Design 01",
  "GET TNT-02": "Corporate Design 02",
  "GET TNT-03": "Corporate Design 03",
  "GET TNT-04": "Corporate Design 04",
  "GET TNT-05": "Corporate Design 05",
  "GET TNT-06": "Corporate Design 06",
  "GET TNT-07": "Corporate Design 07",
  "GET TNT-08": "Corporate Design 08",
  "GET TNT-09": "Corporate Design 09",
  "GET TNT-010": "Corporate Design 10",
  "GET TNT-011": "Corporate Design 11",
  "GET TNT-012": "Corporate Design 12",
  "GET TNT-013": "Corporate Design 13",
  "GET TNT-014": "Corporate Design 14",
  "GET TNT-015": "Corporate Design 15",
};

const LOCAL_IMAGES: Record<string, string> = {
  "GET TNT-01": "/landing/corporate-collection/e9abbd89-51da-4ae6-b186-1459c360c0e7.png",
  "GET TNT-02": "/landing/corporate-collection/b5898a2d-f724-445c-8859-d1774ca3d299.png",
  "GET TNT-03": "/landing/corporate-collection/3b806c4b-a511-4394-b3b8-162537cc54b2.png",
  "GET TNT-04": "/landing/corporate-collection/ec9f3a8b-bd2b-4ee4-a5c1-98e89fbfe64a.png",
  "GET TNT-05": "/landing/corporate-collection/82733519-f02e-4b1f-9e2c-eeaab326f176.png",
  "GET TNT-06": "/landing/corporate-collection/e1f690fa-7f35-4347-8961-3bb3e734c1bf.png",
};

const FAQS = [
  { q: "Apakah bisa custom logo perusahaan?", a: "Bisa. Logo perusahaan dapat dipasang pada jersey sesuai posisi dan ukuran yang kamu inginkan." },
  { q: "Apakah bisa custom nama dan nomor?", a: "Bisa. Nama dan nomor punggung dapat disesuaikan untuk setiap anggota tim." },
  { q: "Apakah bisa menggunakan desain sendiri?", a: "Bisa. Kamu dapat mengirimkan desain sendiri untuk diproses, atau memilih dari koleksi yang tersedia." },
  { q: "Apakah bisa custom warna sesuai brand perusahaan?", a: "Bisa. Warna jersey dapat disesuaikan dengan warna brand perusahaan." },
  { q: "Apakah tersedia untuk kebutuhan perusahaan dalam jumlah banyak?", a: "Tersedia. Untuk kebutuhan di atas 50 pcs, hubungi kami untuk penawaran harga proyek khusus." },
  { q: "Bagaimana proses pemesanannya?", a: "Pilih desain, kirim data (logo, nama, nomor, sponsor), desain disesuaikan, lalu jersey diproses hingga siap digunakan." },
  { q: "Berapa lama proses produksinya?", a: "Estimasi waktu produksi menyesuaikan jumlah pesanan dan tingkat kerumitan desain. Hubungi kami untuk estimasi pastinya." },
];

const TIERS = {
  ecer: { atasan: 75, setelan: 145, minA: "Bisa pesan mulai 1 pcs", minS: "Bisa pesan mulai 1 set" },
  lusin: { atasan: 65, setelan: 120, minA: "Minimal pembelian 12 pcs", minS: "Minimal pembelian 12 set" },
};

export function CorporateCollectionLanding({ products, waNumber }: Props) {
  const [tier, setTier] = useState<"ecer" | "lusin">("ecer");
  const [catActive, setCatActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const heroRef = useRef<HTMLImageElement>(null);
  const tCarouselRef = useRef<HTMLDivElement>(null);

  const waClosing = buildWhatsAppLink(waNumber, "Halo TNT SPORT APPAREL, saya mau order jersey corporate custom untuk perusahaan saya.");
  const waBulk = buildWhatsAppLink(waNumber, "Halo TNT SPORT APPAREL, saya butuh jersey corporate lebih dari 50 pcs buat perusahaan. Minta harga khusus dong!");
  const wa = (msg: string) => buildWhatsAppLink(waNumber, msg);

  /* ── scroll reveal ── */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => (e.target as HTMLElement).classList.add("in"), Math.min(i * 80, 320));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".corp .reveal, .corp .lineGrow").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── parallax ── */
  useEffect(() => {
    const par = heroRef.current;
    if (!par || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        par.style.transform = `translate3d(0,${y * 0.05}px,0)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── testimonial auto-slide ── */
  useEffect(() => {
    const tc = tCarouselRef.current;
    if (!tc) return;
    const step = () => (tc.querySelector("article") as HTMLElement)?.offsetWidth + 24 || 0;
    const go = (d: number) => tc.scrollBy({ left: d * step(), behavior: "smooth" });
    let paused = false;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    tc.addEventListener("pointerenter", onEnter);
    tc.addEventListener("pointerleave", onLeave);
    tc.addEventListener("touchstart", onEnter, { passive: true });
    const id = setInterval(() => {
      if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (tc.scrollLeft + tc.clientWidth >= tc.scrollWidth - 8) tc.scrollTo({ left: 0, behavior: "smooth" });
      else go(1);
    }, 4500);
    return () => {
      clearInterval(id);
      tc.removeEventListener("pointerenter", onEnter);
      tc.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const tPrev = () => {
    const tc = tCarouselRef.current;
    if (!tc) return;
    const w = (tc.querySelector("article") as HTMLElement)?.offsetWidth + 24 || 0;
    tc.scrollBy({ left: -w, behavior: "smooth" });
  };
  const tNext = () => {
    const tc = tCarouselRef.current;
    if (!tc) return;
    const w = (tc.querySelector("article") as HTMLElement)?.offsetWidth + 24 || 0;
    tc.scrollBy({ left: w, behavior: "smooth" });
  };

  const t = TIERS[tier];

  return (
    <div className="corp">

      {/* ═══════════ HERO ═══════════ */}
      <section id="top" className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#0D0F11]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(242,106,33,.20),transparent_58%)]" />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 220px 60px rgba(13,15,17,.9)" }} />
        <span className="streak hidden lg:block" />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-12 pt-8 lg:pt-10">
          <span className="label text-[#F3F0E8] text-[10px] sm:text-[11px]">Corporate&nbsp;Collection</span>
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-12 flex-1 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center py-10 lg:py-14">
          <div className="lg:col-span-7">
            <div className="reveal flex items-center gap-4 mb-7">
              <span className="block w-12 h-px bg-[#F26A21]" />
              <span className="label text-[#F26A21]">Jersey Corporate Custom</span>
            </div>
            <h1 className="reveal display text-[14vw] sm:text-[10vw] lg:text-[5.6rem] xl:text-[6.4rem] text-[#F3F0E8] leading-[0.9]">
              Bikin Timmu<br />Tampil Lebih <span className="orange">Profesional.</span>
            </h1>
            <p className="reveal mt-7 text-base lg:text-xl text-[#F3F0E8]/90 max-w-xl leading-snug">
              Jersey custom untuk perusahaan, instansi, komunitas, dan tim yang ingin tampil kompak dengan identitas sendiri.
            </p>
            <ul className="reveal mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-xl">
              <li className="flex items-center gap-3"><span className="orange">✓</span><span className="label text-[#F3F0E8]">Free Custom Logo</span></li>
              <li className="flex items-center gap-3"><span className="orange">✓</span><span className="label text-[#F3F0E8]">Free Nameset &amp; Nomor</span></li>
              <li className="flex items-center gap-3"><span className="orange">✓</span><span className="label text-[#F3F0E8]">Full Printing</span></li>
              <li className="flex items-center gap-3"><span className="orange">✓</span><span className="label text-[#F3F0E8]">Bisa Tambah Sponsor</span></li>
            </ul>
            <div className="reveal mt-10">
              <a href="#koleksi" className="btn inline-flex items-center justify-center gap-3 label bg-[#F26A21] text-[#0D0F11] text-[12px] px-10 py-5 shadow-[0_18px_40px_-18px_rgba(242,106,33,.9)] hover:bg-[#F3F0E8]">
                Pilih Desain <span>→</span>
              </a>
            </div>
            <div className="reveal mt-6 label text-[#A6A8AA]">
              20+ Desain <span className="orange">•</span> Siap Custom <span className="orange">•</span> Untuk Tim &amp; Perusahaan
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative">
              <img
                ref={heroRef}
                src="/landing/corporate-collection/af987cf0-5c27-49a2-8a78-60a1078a3ab4.png"
                alt="Jersey corporate custom tampak depan"
                className="w-full h-[52vh] lg:h-[76vh] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,.7)]"
              />
              <div className="hidden sm:block absolute top-4 lg:top-10 -left-2 lg:-left-6 border border-white/15 bg-[#0D0F11]/80 backdrop-blur px-5 py-4">
                <span className="label orange block">Custom Available</span>
                <span className="label text-[#F3F0E8] block mt-2 text-[10px]">Logo • Nama • Nomor • Sponsor</span>
              </div>
              <div className="absolute bottom-2 lg:bottom-8 right-0 flex flex-col items-end gap-2">
                <span className="label border border-white/15 bg-[#0D0F11]/80 backdrop-blur px-3 py-2 text-[#F3F0E8]">Dry-Fit</span>
                <span className="label border border-white/15 bg-[#0D0F11]/80 backdrop-blur px-3 py-2 text-[#F3F0E8]">Full Print</span>
                <span className="label border border-[#F26A21]/60 bg-[#F26A21]/10 backdrop-blur px-3 py-2 orange">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/12 overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-5 flex items-center gap-5 overflow-x-hidden">
            <span className="label text-[#A6A8AA] shrink-0 hidden sm:inline">Keunggulan</span>
            <span className="hidden sm:block w-8 h-px bg-[#F26A21] shrink-0" />
            <div className="flex items-center gap-8 shrink-0 marquee-track">
              {["Free Custom Logo", "Free Nameset & Nomor", "Full Printing", "Bisa Tambah Sponsor", "Dry-Fit Premium", "Jahitan Rapi", "Revisi Tanpa Batas", "Bisa Satuan", "Harga Pabrik", "Free Custom Logo", "Free Nameset & Nomor", "Full Printing", "Bisa Tambah Sponsor", "Dry-Fit Premium"].map((item, i) => (
                <span key={i} className="label text-[#F3F0E8]/70 whitespace-nowrap flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#F26A21] rounded-full shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TRUST BAR ═══════════ */}
      <section className="bg-[#0D0F11] border-y border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-12 lg:py-16 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          <div className="reveal">
            <span className="display text-[13vw] sm:text-[7vw] lg:text-[3.4rem] text-[#F3F0E8] block leading-none">20+</span>
            <span className="label text-[#A6A8AA] block mt-3">Desain Siap Custom</span>
          </div>
          <div className="reveal lg:border-l lg:border-white/10 lg:pl-8">
            <span className="display text-[13vw] sm:text-[7vw] lg:text-[3.4rem] orange block leading-none">Full</span>
            <span className="label text-[#A6A8AA] block mt-3">Printing</span>
          </div>
          <div className="reveal lg:border-l lg:border-white/10 lg:pl-8">
            <span className="display text-[13vw] sm:text-[7vw] lg:text-[3.4rem] text-[#F3F0E8] block leading-none">Free</span>
            <span className="label text-[#A6A8AA] block mt-3">Custom Identitas</span>
          </div>
          <div className="reveal lg:border-l lg:border-white/10 lg:pl-8">
            <span className="display text-[8vw] sm:text-[5vw] lg:text-[2.6rem] text-[#F3F0E8] block leading-[1.05] break-words">Tim &amp;<br />Perusahaan</span>
            <span className="label text-[#A6A8AA] block mt-3">Skala Berapa Pun</span>
          </div>
        </div>
      </section>

      {/* ═══════════ KEUNGGULAN ═══════════ */}
      <section id="keunggulan" className="bg-[#F3F0E8] text-[#17191C] py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <span className="reveal label text-[#A6A8AA] block mb-8">Keunggulan</span>
              <h2 className="reveal display text-[10vw] sm:text-[7vw] lg:text-[4.4rem]">
                Bukan Sekadar Seragam.<br /><span className="orange">Identitas.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-24">
              <p className="reveal text-[15px] leading-relaxed text-[#17191C]/75">
                Jersey corporate yang dirancang untuk berbagai aktivitas perusahaan — mulai dari event, gathering, olahraga, outing, komunitas internal, hingga kegiatan promosi brand.
              </p>
            </div>
          </div>
          <div className="mt-20 lg:mt-28 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
            <div className="reveal"><div className="lineGrow h-px bg-[#17191C]/20 mb-6" /><span className="display text-4xl text-[#F26A21] block">01</span><h3 className="display text-2xl mt-4">Dry-Fit Nyaman</h3><p className="mt-3 text-[15px] leading-relaxed text-[#17191C]/70">Ringan dan nyaman digunakan untuk berbagai aktivitas.</p></div>
            <div className="reveal"><div className="lineGrow h-px bg-[#17191C]/20 mb-6" /><span className="display text-4xl text-[#F26A21] block">02</span><h3 className="display text-2xl mt-4">Full Printing</h3><p className="mt-3 text-[15px] leading-relaxed text-[#17191C]/70">Desain dapat disesuaikan dengan identitas visual perusahaan.</p></div>
            <div className="reveal"><div className="lineGrow h-px bg-[#17191C]/20 mb-6" /><span className="display text-4xl text-[#F26A21] block">03</span><h3 className="display text-2xl mt-4">Custom Identitas</h3><p className="mt-3 text-[15px] leading-relaxed text-[#17191C]/70">Logo perusahaan, nama, nomor, dan sponsor dapat disesuaikan.</p></div>
            <div className="reveal"><div className="lineGrow h-px bg-[#17191C]/20 mb-6" /><span className="display text-4xl text-[#F26A21] block">04</span><h3 className="display text-2xl mt-4">Jahitan Rapi &amp; Kuat</h3><p className="mt-3 text-[15px] leading-relaxed text-[#17191C]/70">Finishing rapi untuk menghasilkan jersey yang nyaman dan profesional.</p></div>
          </div>
        </div>
      </section>

      {/* ═══════════ KUALITAS PRODUK ═══════════ */}
      <section id="kualitas" className="bg-[#17191C] py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="overflow-hidden shot">
              <img src="/landing/corporate-collection/f7be3d49-3fa0-475b-9a25-654be5ba1eb3.png" alt="Detail close-up bahan jersey dry-fit" className="card-img w-full h-auto" />
            </div>
            <div className="mt-4 flex items-center gap-4"><span className="block w-10 h-px bg-[#F26A21]" /><span className="label text-[#A6A8AA]">Detail Bahan</span></div>
          </div>
          <div className="lg:col-span-7">
            <span className="reveal label text-[#A6A8AA] block mb-8">Kualitas Produk</span>
            <h2 className="reveal display text-[9vw] sm:text-[6vw] lg:text-[3.6rem] text-[#F3F0E8]">
              Bukan Cuma Terlihat Profesional.<br /><span className="orange">Nyaman Dipakai Seharian.</span>
            </h2>
            <p className="reveal mt-8 text-[15px] text-[#A6A8AA] leading-relaxed max-w-xl">
              Karena jersey corporate bukan hanya soal tampilan. Kenyamanan dan kualitas juga harus diperhatikan.
            </p>
            <div className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-10">
              <div className="reveal"><div className="h-px bg-white/15 mb-5" /><h3 className="display text-xl text-[#F3F0E8]">Dry-Fit Nyaman</h3><p className="mt-3 text-[15px] text-[#A6A8AA] leading-relaxed">Ringan, adem, dan nyaman digunakan untuk berbagai aktivitas.</p></div>
              <div className="reveal"><div className="h-px bg-white/15 mb-5" /><h3 className="display text-xl text-[#F3F0E8]">Full Printing</h3><p className="mt-3 text-[15px] text-[#A6A8AA] leading-relaxed">Warna dan desain tampil maksimal dengan printing pada seluruh permukaan jersey.</p></div>
              <div className="reveal"><div className="h-px bg-white/15 mb-5" /><h3 className="display text-xl text-[#F3F0E8]">Bahan Berkualitas</h3><p className="mt-3 text-[15px] text-[#A6A8AA] leading-relaxed">Material dirancang untuk memberikan kenyamanan saat digunakan.</p></div>
              <div className="reveal"><div className="h-px bg-white/15 mb-5" /><h3 className="display text-xl text-[#F3F0E8]">Jahitan Rapi &amp; Kuat</h3><p className="mt-3 text-[15px] text-[#A6A8AA] leading-relaxed">Finishing rapi dengan jahitan yang dibuat untuk penggunaan jangka panjang.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CUSTOMIZATION ═══════════ */}
      <section id="custom" className="bg-[#F3F0E8] text-[#17191C] py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <span className="reveal label text-[#A6A8AA] block mb-8">Customization</span>
            <h2 className="reveal display text-[10vw] sm:text-[7vw] lg:text-[4rem]">
              Jersey-nya Bisa Dibuat<br /><span className="orange">Sesuai Identitas Timmu.</span>
            </h2>
            <p className="reveal mt-8 text-[15px] leading-relaxed text-[#17191C]/75 max-w-lg">
              Tidak perlu menggunakan jersey yang terlihat generik. Sesuaikan detail jersey dengan identitas perusahaan, komunitas, event, atau tim kamu. Custom warna & desain tersedia untuk pembelian minimal 6 pcs.
            </p>
            <div className="mt-12 border-t border-[#17191C]/15">
              <div className="reveal bigword display text-[11vw] lg:text-[3.4rem] py-3 border-b border-[#17191C]/15">Logo Perusahaan</div>
              <div className="reveal bigword display text-[11vw] lg:text-[3.4rem] py-3 border-b border-[#17191C]/15">Nama Pemain</div>
              <div className="reveal bigword display text-[11vw] lg:text-[3.4rem] py-3 border-b border-[#17191C]/15">Nomor</div>
              <div className="reveal bigword display text-[11vw] lg:text-[3.4rem] py-3 border-b border-[#17191C]/15">Sponsor</div>
              <div className="reveal bigword display text-[11vw] lg:text-[3.4rem] py-3 border-b border-[#17191C]/15">Warna Brand</div>
            </div>
            <div className="reveal mt-10">
              <a href={wa("Halo TNT SPORT APPAREL, saya mau custom jersey corporate dengan warna dan desain sendiri (min. 6 pcs). Bisa info lebih lanjut?")} target="_blank" rel="noopener noreferrer" className="btn inline-flex items-center gap-3 label bg-[#17191C] text-[#F3F0E8] px-8 py-4 hover:bg-[#F26A21] hover:text-[#0D0F11]">
                Custom Sekarang <span>→</span>
              </a>
              <p className="mt-3 label text-[#17191C]/50 text-[10px]">Custom warna & desain — minimal order 6 pcs</p>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="reveal shot overflow-hidden"><img src="/landing/corporate-collection/e9abbd89-51da-4ae6-b186-1459c360c0e7.png" alt="Variasi jersey tampak depan" className="card-img w-full aspect-[4/5] object-cover" /></div>
            <div className="reveal shot overflow-hidden mt-10"><img src="/landing/corporate-collection/b5898a2d-f724-445c-8859-d1774ca3d299.png" alt="Variasi jersey tampak belakang dengan nameset" className="card-img w-full aspect-[4/5] object-cover" /></div>
            <div className="reveal shot overflow-hidden"><img src="/landing/corporate-collection/3b806c4b-a511-4394-b3b8-162537cc54b2.png" alt="Variasi jersey sudut samping" className="card-img w-full aspect-[4/5] object-cover" /></div>
            <div className="reveal shot overflow-hidden mt-10"><img src="/landing/corporate-collection/ec9f3a8b-bd2b-4ee4-a5c1-98e89fbfe64a.png" alt="Satu set jersey dan celana" className="card-img w-full aspect-[4/5] object-cover" /></div>
          </div>
        </div>
      </section>

      {/* ═══════════ COLLECTION (KATALOG) ═══════════ */}
      <section id="koleksi" className="bg-[#17191C] py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <span className="reveal label text-[#A6A8AA] block mb-8">Collection</span>
          <h2 className="reveal display text-[9vw] sm:text-[6.4vw] lg:text-[4rem] text-[#F3F0E8] max-w-4xl">
            Pilih Desain yang Sesuai <span className="orange">Karakter Timmu.</span>
          </h2>
          <p className="reveal mt-6 text-[15px] text-[#A6A8AA] max-w-xl leading-relaxed">
            Beragam desain corporate dengan karakter sporty, modern, dan profesional.
          </p>

          <div className="corp-collection-grid mt-14 lg:mt-20">
            {products.map((p, i) => {
              const isHidden = i >= 9 && !showAll;
              const isPlaceholder = p.image.includes("placeholder");
              const localImg = LOCAL_IMAGES[p.catalogue];
              const imgSrc = isPlaceholder && localImg ? localImg : p.image;
              const hasRealImage = !isPlaceholder || !!localImg;
              const displayName = CATALOG_NAMES[p.catalogue] || p.catalogue;
              return (
                <article
                  key={p.id}
                  className={`reveal card cat-card border border-white/12 bg-[#17191C] flex flex-col ${isHidden ? "hidden" : ""}`}
                  onClick={() => setCatActive(i)}
                >
                  <div className="relative overflow-hidden bg-[#0D0F11] flex items-center justify-center">
                    {hasRealImage ? (
                      <img src={imgSrc} alt={p.alt} className="card-img w-full h-auto object-contain" loading="lazy" />
                    ) : (
                      <>
                        <span className="ph absolute inset-0" />
                        <span className="relative label text-[#A6A8AA] py-20">{p.catalogue}</span>
                      </>
                    )}
                  </div>
                  <div className="cat-card-info">
                    <div>
                      <h3 className={`display leading-tight ${hasRealImage ? "text-[#F3F0E8]" : "text-[#F3F0E8]/75"}`}>{displayName}</h3>
                      <span className={`label block mt-1 ${hasRealImage ? "text-[#A6A8AA]" : "text-[#A6A8AA]/60"}`}>{p.catalogue}</span>
                    </div>
                    <span className={`cat-card-btn btn label border border-white/20 whitespace-nowrap hover:bg-[#F26A21] hover:border-[#F26A21] hover:text-[#0D0F11] ${hasRealImage ? "text-[#F3F0E8]" : "text-[#F3F0E8]/70"}`}>
                      Pilih Desain
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            {!showAll && products.length > 9 && (
              <button type="button" onClick={() => setShowAll(true)} className="btn inline-flex items-center gap-3 label border border-white/25 text-[#F3F0E8] px-10 py-5 hover:border-[#F26A21] hover:text-[#F26A21]">
                Lihat Semua {products.length} Desain <span>↓</span>
              </button>
            )}
            <p className="reveal mt-6 label text-[#A6A8AA]">Desain baru terus ditambahkan tiap bulan</p>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="proses" className="bg-[#F3F0E8] text-[#17191C] py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <span className="reveal label text-[#A6A8AA] block mb-8">How It Works</span>
          <h2 className="reveal display text-[10vw] sm:text-[7vw] lg:text-[4rem] max-w-4xl">
            Dari Desain<br /><span className="orange">Jadi Jersey Timmu.</span>
          </h2>
          <div className="mt-16 lg:mt-24 relative">
            <div className="lineGrow reveal hidden lg:block absolute top-[14px] left-0 right-0 h-px bg-[#17191C]/20" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
              <div className="reveal relative">
                <span className="hidden lg:block w-[9px] h-[9px] bg-[#F26A21] rounded-full mb-8 mt-[10px]" />
                <span className="display text-[3.2rem] text-[#17191C]/20 block leading-none lg:hidden">01</span>
                <span className="label orange hidden lg:block mb-3">01</span>
                <h3 className="display text-xl mt-2">Pilih Desain</h3>
                <p className="mt-3 text-[15px] text-[#17191C]/70 leading-relaxed">Pilih desain corporate yang paling cocok.</p>
              </div>
              <div className="reveal relative">
                <span className="hidden lg:block w-[9px] h-[9px] bg-[#F26A21] rounded-full mb-8 mt-[10px]" />
                <span className="display text-[3.2rem] text-[#17191C]/20 block leading-none lg:hidden">02</span>
                <span className="label orange hidden lg:block mb-3">02</span>
                <h3 className="display text-xl mt-2">Kirim Data</h3>
                <p className="mt-3 text-[15px] text-[#17191C]/70 leading-relaxed">Kirim logo, nama, nomor, sponsor, dan detail lainnya.</p>
              </div>
              <div className="reveal relative">
                <span className="hidden lg:block w-[9px] h-[9px] bg-[#F26A21] rounded-full mb-8 mt-[10px]" />
                <span className="display text-[3.2rem] text-[#17191C]/20 block leading-none lg:hidden">03</span>
                <span className="label orange hidden lg:block mb-3">03</span>
                <h3 className="display text-xl mt-2">Proses Custom</h3>
                <p className="mt-3 text-[15px] text-[#17191C]/70 leading-relaxed">Desain disesuaikan dengan kebutuhan tim.</p>
              </div>
              <div className="reveal relative">
                <span className="hidden lg:block w-[9px] h-[9px] bg-[#F26A21] rounded-full mb-8 mt-[10px]" />
                <span className="display text-[3.2rem] text-[#17191C]/20 block leading-none lg:hidden">04</span>
                <span className="label orange hidden lg:block mb-3">04</span>
                <h3 className="display text-xl mt-2">Siap Digunakan</h3>
                <p className="mt-3 text-[15px] text-[#17191C]/70 leading-relaxed">Jersey diproses dan siap digunakan untuk aktivitas tim.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ HARGA ═══════════ */}
      <section id="harga" className="bg-[#17191C] py-24 lg:py-36 grid-lines">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <span className="reveal label text-[#A6A8AA] block mb-8">Harga</span>
              <h2 className="reveal display text-[10vw] sm:text-[7vw] lg:text-[4.4rem] text-[#F3F0E8]">
                Pilih Paket<br /><span className="orange">Timmu.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="reveal text-[15px] text-[#A6A8AA] leading-relaxed mb-8">Pilih jumlah pembelian, harga akan menyesuaikan otomatis.</p>
              <div className="reveal inline-flex border border-white/15 p-1" role="tablist" aria-label="Jumlah pembelian">
                <button type="button" onClick={() => setTier("ecer")} role="tab" aria-selected={tier === "ecer"} className={`tier-btn label px-6 py-3 ${tier === "ecer" ? "bg-[#F26A21] text-[#0D0F11]" : "text-[#A6A8AA] hover:text-[#F3F0E8]"}`}>
                  Ecer
                </button>
                <button type="button" onClick={() => setTier("lusin")} role="tab" aria-selected={tier === "lusin"} className={`tier-btn label px-6 py-3 ${tier === "lusin" ? "bg-[#F26A21] text-[#0D0F11]" : "text-[#A6A8AA] hover:text-[#F3F0E8]"}`}>
                  Lusin — Hemat
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-24 grid lg:grid-cols-2 gap-px bg-white/12 border border-white/12">
            <div className="reveal bg-[#17191C] p-8 lg:p-12 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <span className="label text-[#A6A8AA]">Jersey Atasan</span>
                <span className="label text-[#A6A8AA] border border-white/15 px-3 py-1">Fleksibel</span>
              </div>
              <h3 className="display text-3xl lg:text-4xl mt-8 text-[#F3F0E8]">Atasan Saja</h3>
              <div className="mt-8 flex flex-wrap items-end gap-x-3 gap-y-1">
                <span className="label text-[#A6A8AA] pb-3">Rp</span>
                <span className="display text-[19vw] sm:text-[10vw] lg:text-[6.5rem] leading-[0.85] text-[#F3F0E8]">{t.atasan}</span>
                <span className="display text-3xl lg:text-4xl text-[#F3F0E8] pb-1">RB</span>
                <span className="label text-[#A6A8AA] pb-3">/pcs</span>
              </div>
              <p className="mt-5 text-[13px] text-[#A6A8AA]">{t.minA}</p>
              <div className="h-px bg-white/12 my-10" />
              <ul className="space-y-4 text-[15px] text-[#F3F0E8]/85">
                <li className="flex gap-4"><span className="orange">—</span><span>Full printing &amp; desain bebas</span></li>
                <li className="flex gap-4"><span className="orange">—</span><span>Nama dan nomor punggung</span></li>
                <li className="flex gap-4"><span className="orange">—</span><span>Revisi desain tanpa batas</span></li>
              </ul>
              <a href={waClosing} target="_blank" rel="noopener noreferrer" className="btn mt-12 inline-flex items-center justify-between gap-4 label border border-white/25 text-[#F3F0E8] px-7 py-4 hover:border-[#F26A21] hover:text-[#F26A21]">
                Pilih Atasan <span>→</span>
              </a>
            </div>

            <div className="reveal relative bg-[#17191C] p-8 lg:p-12 flex flex-col">
              <span className="absolute top-0 left-0 right-0 h-px bg-[#F26A21]" />
              <div className="flex items-start justify-between gap-4">
                <span className="label orange">Atasan + Celana</span>
                <span className="label bg-[#F26A21] text-[#0D0F11] px-3 py-1">Paling Diminati</span>
              </div>
              <h3 className="display text-3xl lg:text-4xl mt-8 text-[#F3F0E8]">Jersey Setelan</h3>
              <div className="mt-8 flex flex-wrap items-end gap-x-3 gap-y-1">
                <span className="label orange pb-3">Rp</span>
                <span className="display text-[19vw] sm:text-[10vw] lg:text-[6.5rem] leading-[0.85] orange">{t.setelan}</span>
                <span className="display text-3xl lg:text-4xl orange pb-1">RB</span>
                <span className="label text-[#A6A8AA] pb-3">/set</span>
              </div>
              <p className="mt-5 text-[13px] text-[#A6A8AA]">{t.minS}</p>
              <div className="h-px bg-white/12 my-10" />
              <ul className="space-y-4 text-[15px] text-[#F3F0E8]/85">
                <li className="flex gap-4"><span className="orange">—</span><span>Semua benefit paket atasan</span></li>
                <li className="flex gap-4"><span className="orange">—</span><span>Celana full custom siap tanding</span></li>
                <li className="flex gap-4"><span className="orange">—</span><span>Prioritas jadwal produksi</span></li>
              </ul>
              <a href={waClosing} target="_blank" rel="noopener noreferrer" className="btn mt-12 inline-flex items-center justify-between gap-4 label bg-[#F26A21] text-[#0D0F11] px-7 py-4 hover:bg-[#F3F0E8]">
                Pilih Setelan <span>→</span>
              </a>
            </div>
          </div>

          {/* Bulk CTA */}
          <div className="reveal mt-8 border border-white/12 px-8 lg:px-12 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="display text-2xl lg:text-3xl text-[#F3F0E8]">
                Butuh Lebih dari <span className="orange">50 Pcs?</span>
              </h4>
              <p className="mt-2 text-[15px] text-[#A6A8AA]">Dapatkan harga proyek khusus untuk perusahaan, instansi, komunitas, dan event.</p>
            </div>
            <a href={waBulk} target="_blank" rel="noopener noreferrer" className="btn shrink-0 inline-flex items-center gap-3 label border border-[#F26A21] text-[#F26A21] px-7 py-4 hover:bg-[#F26A21] hover:text-[#0D0F11]">
              Minta Harga Khusus <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIAL ═══════════ */}
      <section className="bg-[#0D0F11] py-24 lg:py-36 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="reveal label text-[#A6A8AA] block mb-8">Testimonial</span>
              <h2 className="reveal display text-[9vw] sm:text-[6.4vw] lg:text-[3.8rem] text-[#F3F0E8]">
                Mereka Sudah Tampil Bersama.<br /><span className="orange">Sekarang Giliran Timmu.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right flex lg:justify-end gap-3">
              <button type="button" onClick={tPrev} className="btn label border border-white/20 text-[#F3F0E8] w-12 h-12 hover:border-[#F26A21] hover:text-[#F26A21]" aria-label="Testimonial sebelumnya">←</button>
              <button type="button" onClick={tNext} className="btn label border border-white/20 text-[#F3F0E8] w-12 h-12 hover:border-[#F26A21] hover:text-[#F26A21]" aria-label="Testimonial berikutnya">→</button>
            </div>
          </div>
        </div>
        <div className="mt-14 lg:mt-20 pl-6 lg:pl-12">
          <div ref={tCarouselRef} className="hscroll pr-6 lg:pr-12">
            {[
              { quote: "Jersey corporate dari TNT bikin tim kami keliatan lebih kompak pas company outing. Kualitas bahan beneran adem.", name: "Andi Prasetyo", team: "PT Mitra Solusi · Jakarta" },
              { quote: "Order 50 set buat sports day kantor. Hasilnya rapi semua, warna ga luntur meski udah dicuci berkali-kali.", name: "Rina Wulandari", team: "Bank Digital Nusantara · Bandung" },
              { quote: "Custom logo dan nama perusahaan langsung di jersey. Klien kami sampe nanya jersey-nya pesen dimana.", name: "Budi Santoso", team: "Construction Pro · Surabaya" },
            ].map((t, i) => (
              <article key={i} className="w-[82vw] sm:w-[46vw] lg:w-[30rem] border border-white/12 p-8 lg:p-10 flex flex-col">
                <div className="label orange tracking-[0.4em]">★★★★★</div>
                <p className="display text-2xl lg:text-[1.75rem] mt-8 text-[#F3F0E8] leading-tight">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto pt-10 flex items-center gap-4">
                  <span className="w-12 h-12 ph border border-white/12 shrink-0" />
                  <div>
                    <span className="label text-[#F3F0E8] block">{t.name}</span>
                    <span className="label text-[#A6A8AA] block mt-1">{t.team}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TEAM GALLERY ═══════════ */}
      <section className="bg-[#17191C] py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="reveal label text-[#A6A8AA] block mb-8">Team Gallery</span>
              <h2 className="reveal display text-[9vw] sm:text-[6.4vw] lg:text-[3.8rem] text-[#F3F0E8]">
                Bukan Cuma Jersey.<br /><span className="orange">Ini Identitas Timmu.</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="reveal text-[15px] text-[#A6A8AA] leading-relaxed">
                Slot foto tim — siap diisi dengan dokumentasi asli tim dan perusahaan kamu.
              </p>
            </div>
          </div>
          <div className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="reveal ph border border-white/12 aspect-[3/4] flex items-end p-5"><span className="label text-[#A6A8AA]">Corporate Event</span></div>
            <div className="reveal ph border border-white/12 aspect-[3/4] lg:mt-10 flex items-end p-5"><span className="label text-[#A6A8AA]">Team Gathering</span></div>
            <div className="reveal ph border border-white/12 aspect-[3/4] flex items-end p-5"><span className="label text-[#A6A8AA]">Sports Day</span></div>
            <div className="reveal ph border border-white/12 aspect-[3/4] lg:mt-10 flex items-end p-5"><span className="label text-[#A6A8AA]">Company Community</span></div>
          </div>
        </div>
      </section>

      {/* ═══════════ UNTUK SIAPA ═══════════ */}
      <section id="untuk-siapa" className="bg-[#F3F0E8] text-[#17191C] py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <span className="reveal label text-[#A6A8AA] block mb-8">Untuk Siapa</span>
              <h2 className="reveal display text-[10vw] sm:text-[7vw] lg:text-[4.4rem]">
                Dibuat untuk<br />Tim yang Bergerak Bersama.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-28">
              <p className="reveal text-[15px] leading-relaxed text-[#17191C]/70">
                Dari aktivitas internal hingga event perusahaan, tampilkan identitas tim secara konsisten dan profesional.
              </p>
            </div>
          </div>
          <div className="mt-16 border-t border-[#17191C]/15">
            {["Perusahaan", "Instansi", "Corporate Event", "Gathering", "Komunitas", "Organisasi"].map((item, i) => (
              <div key={item} className="reveal flex items-baseline gap-6 border-b border-[#17191C]/15 py-4">
                <span className="label text-[#F26A21] w-10">{String(i + 1).padStart(2, "0")}</span>
                <span className="bigword display text-[9vw] lg:text-[3.6rem]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" className="bg-[#17191C] py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="reveal label text-[#A6A8AA] block mb-8">FAQ</span>
            <h2 className="reveal display text-[10vw] sm:text-[7vw] lg:text-[3.4rem] text-[#F3F0E8]">
              Yang Sering<br /><span className="orange">Ditanyakan.</span>
            </h2>
          </div>
          <div className="lg:col-span-8 border-t border-white/12">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq reveal border-b border-white/12 ${faqOpen === i ? "open" : ""}`}>
                <button type="button" onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-start justify-between gap-6 text-left py-7">
                  <span className="q display text-lg lg:text-2xl text-[#F3F0E8] transition-colors">{f.q}</span>
                  <span className="plus display text-2xl text-[#A6A8AA] shrink-0 leading-none">+</span>
                </button>
                <div className="faq-body">
                  <p className="text-[15px] text-[#A6A8AA] leading-relaxed pb-7 pr-10 max-w-2xl">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section id="final" className="relative noise bg-[#0D0F11] py-28 lg:py-44 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6 relative text-center">
          <span className="reveal label text-[#A6A8AA] block mb-10">Corporate Collection</span>
          <h2 className="reveal display text-[10vw] sm:text-[7vw] lg:text-[4.8rem] text-[#F3F0E8]">
            Siap Bikin Timmu<br />Tampil Lebih <span className="orange">Profesional?</span>
          </h2>
          <p className="reveal mt-8 text-[15px] lg:text-lg text-[#A6A8AA] max-w-2xl mx-auto leading-relaxed">
            Pilih desain corporate favoritmu, sesuaikan dengan identitas perusahaan, lalu buat jersey untuk timmu.
          </p>
          <ul className="reveal mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-4 max-w-2xl mx-auto text-left">
            <li className="flex items-center gap-4 border-b border-white/10 pb-3"><span className="orange">✓</span><span className="label text-[#F3F0E8]">Free Custom Logo</span></li>
            <li className="flex items-center gap-4 border-b border-white/10 pb-3"><span className="orange">✓</span><span className="label text-[#F3F0E8]">Free Custom Nameset</span></li>
            <li className="flex items-center gap-4 border-b border-white/10 pb-3"><span className="orange">✓</span><span className="label text-[#F3F0E8]">Free Custom Nomor</span></li>
            <li className="flex items-center gap-4 border-b border-white/10 pb-3"><span className="orange">✓</span><span className="label text-[#F3F0E8]">Bisa Tambah Sponsor</span></li>
            <li className="flex items-center gap-4 border-b border-white/10 pb-3 sm:col-span-2"><span className="orange">✓</span><span className="label text-[#F3F0E8]">Desain Sesuai Identitas Tim</span></li>
          </ul>
          <div className="reveal mt-14">
            <a href={waClosing} target="_blank" rel="noopener noreferrer" className="btn inline-flex items-center gap-3 label bg-[#F26A21] text-[#0D0F11] px-10 py-5 hover:bg-[#F3F0E8]">
              Pilih Desain Corporate <span>→</span>
            </a>
          </div>
          <div className="reveal mt-8 label text-[#A6A8AA]">
            Pilih Desain <span className="orange">•</span> Kirim Data <span className="orange">•</span> Custom <span className="orange">•</span> Selesai
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-[#0D0F11] border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="label text-[#F3F0E8]">Corporate Collection</span>
          <a href="https://www.tntsportapparel.id" className="label text-[#A6A8AA] hover:text-[#F26A21]">tntsportapparel.id</a>
        </div>
      </footer>

      {/* ═══════════ CATALOG MODAL ═══════════ */}
      {catActive !== null && products[catActive] && (() => {
        const p = products[catActive];
        const isPlaceholder = p.image.includes("placeholder");
        const localImg = LOCAL_IMAGES[p.catalogue];
        const imgSrc = isPlaceholder && localImg ? localImg : p.image;
        const hasRealImage = !isPlaceholder || !!localImg;
        return (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setCatActive(null)}>
            <div className="relative bg-[#17191C] border border-white/15 max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setCatActive(null)} className="absolute top-4 right-4 label text-[#A6A8AA] hover:text-[#F26A21] text-xl leading-none">✕</button>
              {hasRealImage ? (
                <img src={imgSrc} alt={p.alt} className="w-full aspect-[4/5] object-cover" />
              ) : (
                <div className="w-full aspect-[4/5] bg-[#0D0F11] flex items-center justify-center relative">
                  <span className="ph absolute inset-0" />
                  <span className="relative display text-2xl text-[#A6A8AA]">{p.catalogue}</span>
                </div>
              )}
              <h3 className="display text-xl text-[#F3F0E8] mt-4">{CATALOG_NAMES[p.catalogue] || p.catalogue}</h3>
              <span className="label text-[#A6A8AA] block mt-1">{p.catalogue}</span>
              <a href={wa(`Halo, saya tertarik desain ${p.catalogue} di kategori Corporate.`)} target="_blank" rel="noopener noreferrer" className="btn mt-6 w-full inline-flex items-center justify-center gap-3 label bg-[#F26A21] text-[#0D0F11] px-6 py-4 hover:bg-[#F3F0E8]">
                Pesan via WhatsApp <span>→</span>
              </a>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
