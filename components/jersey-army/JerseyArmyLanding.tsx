"use client";

import { useState, useEffect, useRef } from "react";
import { buildWhatsAppLink } from "@/lib/wa";
import "./jersey-army.css";

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

const WA_DEFAULT = "628115491117";

const POPUP_DATA = [
  ["Andri - Jakarta","Jersey Army Custom Full Printing","3 menit yang lalu"],
  ["Rizky - Surabaya","Jersey Army Satuan + Nama & Logo","7 menit yang lalu"],
  ["Dimas - Bandung","Custom Desain Full Team 12 pcs","11 menit yang lalu"],
  ["Fajar - Yogyakarta","Jersey Army Custom Full Printing","15 menit yang lalu"],
  ["Aldi - Semarang","Jersey Army Satuan + Logo Sponsor","19 menit yang lalu"],
  ["Nanda - Makassar","Custom Desain Full Team 8 pcs","23 menit yang lalu"],
];

function usePopup() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(POPUP_DATA[0]);
  const idx = useRef(0);
  const stopped = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const show = () => {
        if (stopped.current) return;
        setData(POPUP_DATA[idx.current % POPUP_DATA.length]);
        idx.current++;
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          setTimeout(show, 4200);
        }, 5500);
      };
      show();
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => { stopped.current = true; setVisible(false); };
  return { visible, data, close };
}

function useScrollReveal() {
  useEffect(() => {
    const selectors = ".ja .fadeup:not(.in), .ja .fade-l:not(.in), .ja .fade-r:not(.in), .ja .fade-z:not(.in)";
    const els = document.querySelectorAll(selectors);
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e, i) => {
      (e as HTMLElement).style.transitionDelay = `${(i % 4) * 100}ms`;
      io.observe(e);
    });
    return () => io.disconnect();
  }, []);
}

const GALLERY_IMAGES = [
  { src: "/landing/jersey-futsal/4c090b09-6b9d-4d9a-a061-ca955c49c520.png", alt: "Komunitas army memakai jersey custom" },
  { src: "/landing/jersey-futsal/93c90d93-45be-4137-b10d-d810ada22df4.png", alt: "Tim army memakai jersey custom kuning" },
  { src: "/landing/jersey-futsal/0cde4945-3487-4e3d-ba70-e94156ac55e3.png", alt: "Pemain memakai jersey custom lengan panjang" },
  { src: "/landing/jersey-futsal/3af292c0-b13f-4a74-b94e-c0b6885f633c.png", alt: "Komunitas army maroon" },
  { src: "/landing/jersey-futsal/21bccec1-b05a-464e-bc44-54cb90c01dde.png", alt: "Tim army junior memakai jersey custom biru" },
];

export default function JerseyArmyLanding({ products, waNumber }: Props) {
  useScrollReveal();
  const [catalogActive, setCatalogActive] = useState<number | null>(null);
  const [galleryActive, setGalleryActive] = useState<number | null>(null);
  const [priceMode, setPriceMode] = useState<"ecer" | "lusin">("ecer");
  const popup = usePopup();
  const wa = (msg: string) => buildWhatsAppLink(waNumber || WA_DEFAULT, msg);

  return (
    <div className="ja camo">
      {/* ===== 1. HERO ===== */}
      <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center overflow-hidden pt-10 sm:pt-0">
        <img src="/landing/jersey-army/df62916f-610f-46cc-a278-6b32be359ad2.png" alt="Rak jersey Army Collection di studio gelap" className="absolute inset-0 w-full h-full object-cover object-center" style={{ opacity: 0.6 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(7,10,8,.95) 0%,rgba(7,10,8,.72) 45%,rgba(7,10,8,.35) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: "linear-gradient(to top,var(--black),transparent)" }} />
        <div className="relative max-w-6xl mx-auto px-5 py-14 sm:py-24 w-full">
          <p className="cond gold text-xs sm:text-sm mb-3 sm:mb-5">Army Collection</p>
          <h1 className="display text-[2.6rem] sm:text-5xl md:text-6xl lg:text-9xl max-w-4xl leading-[1.02] sm:leading-[.92]">
            TAMPIL SOLID.<br /><span className="gold">TAMPIL BERKARAKTER.</span>
          </h1>
          <p className="cond text-xs sm:text-base mt-4 sm:mt-6" style={{ color: "rgba(244,241,232,.85)" }}>Jersey Army untuk tim yang punya identitas</p>
          <div className="rule my-5 sm:my-8 max-w-md" />
          <p className="max-w-xl text-[0.95rem] sm:text-lg leading-relaxed" style={{ color: "rgba(244,241,232,.8)" }}>
            Bukan sekadar jersey warna hijau. <strong className="text-[var(--cream)]">Army Collection</strong> dibuat untuk kamu yang ingin tampil
            <strong className="text-[var(--cream)]"> kompak, tangguh, dan berbeda</strong> bersama tim, komunitas, instansi, maupun organisasi.
            Desain bergaya <strong className="text-[var(--cream)]">military &amp; tactical</strong>, siap menemani berbagai aktivitas.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#katalog" className="btn text-sm sm:text-base px-5 sm:px-8 py-3 sm:py-4"><span>Pilih Desain Army</span><span className="ico" aria-hidden="true">↗</span></a>
            <span className="cond text-[10px] sm:text-sm" style={{ color: "rgba(244,241,232,.7)" }}>20+ desain siap custom</span>
          </div>
        </div>
      </section>

      {/* ===== 2. IDENTITAS ===== */}
      <section className="py-14 sm:py-24 lg:py-32" style={{ borderTop: "1px solid rgba(181,155,91,.15)" }}>
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 fade-l">
            <h2 className="display text-4xl sm:text-5xl lg:text-7xl">SATU TIM.<br /><span className="gold">SATU IDENTITAS.</span></h2>
            <div className="rule my-8 max-w-sm" />
            <p className="text-lg leading-relaxed" style={{ color: "rgba(244,241,232,.8)" }}>
              Pernah lihat tim datang dengan jersey yang seragam dan langsung kelihatan kompak? Itulah kekuatan sebuah jersey.
              Bukan cuma pakaian, <strong className="text-[var(--cream)]">tapi identitas yang membuat sebuah tim terlihat lebih solid.</strong>
            </p>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: "rgba(244,241,232,.7)" }}>
              Mulai dari nama anggota, logo komunitas, nama instansi, sampai sponsor — semuanya bisa disesuaikan dengan kebutuhan tim kamu.
            </p>
            <p className="cond gold text-base sm:text-lg mt-8">Bikin jersey yang benar-benar punya tim kamu.</p>
          </div>
          <div className="lg:col-span-5 fadeup">
            <div className="p-3" style={{ border: "1px solid rgba(181,155,91,.25)" }}>
              <img src="/landing/jersey-army/5603bdcb-4a48-47d3-a72a-0e9a26630672.png" alt="Jersey army terlipat" className="w-full h-[420px] sm:h-[520px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. TACTICAL ===== */}
      <section className="py-14 sm:py-24 lg:py-32" style={{ background: "linear-gradient(180deg,rgba(25,53,36,.35),transparent)" }}>
        <div className="max-w-5xl mx-auto px-5 text-center fadeup">
          <h2 className="display text-2xl sm:text-4xl lg:text-6xl">DESAIN TACTICAL YANG BIKIN TIM<br className="hidden sm:block" /> TERLIHAT LEBIH <span className="gold">BERKARAKTER</span></h2>
          <p className="mt-5 sm:mt-7 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(244,241,232,.78)" }}>
            Setiap desain Army Collection punya karakter <strong className="text-[var(--cream)]">military, tactical, dan rugged</strong> yang cocok untuk berbagai kebutuhan.
          </p>
          <div className="rule my-8 sm:my-10" />
          <p className="cond text-[10px] sm:text-sm mb-4" style={{ color: "rgba(244,241,232,.65)" }}>Cocok untuk</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Komunitas", "Instansi", "Corporate", "Organisasi", "Tim Outdoor", "Event", "Gathering"].map((item) => (
              <span key={item} className="cond text-[10px] sm:text-sm px-2.5 sm:px-4 py-1 sm:py-2" style={{ border: "1px solid rgba(181,155,91,.35)" }}>{item}</span>
            ))}
          </div>
          <div className="mt-10 sm:mt-14 grid sm:grid-cols-3 gap-4 text-left">
            <div className="card p-7"><p className="display text-3xl">MAU TAMPIL FORMAL?</p><p className="cond gold mt-3 text-sm">Bisa.</p></div>
            <div className="card p-7"><p className="display text-3xl">MAU TERLIHAT TACTICAL?</p><p className="cond gold mt-3 text-sm">Bisa.</p></div>
            <div className="card p-7"><p className="display text-3xl">MAU LEBIH AGRESIF?</p><p className="cond gold mt-3 text-sm">Tinggal pilih modelnya.</p></div>
          </div>
        </div>
      </section>

      {/* ===== 4. PROSES ===== */}
      <section id="pilih" className="py-14 sm:py-24 lg:py-32" style={{ borderTop: "1px solid rgba(181,155,91,.15)" }}>
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-start">
          <div className="fadeup">
            <h2 className="display text-3xl sm:text-5xl lg:text-6xl">PILIH DESAINNYA.<br /><span className="gold">KAMI YANG BIKIN JADI MILIK TIMMU.</span></h2>
            <p className="mt-7 text-lg leading-relaxed" style={{ color: "rgba(244,241,232,.78)" }}>
              Nggak perlu pusing mulai dari desain kosong. <strong className="text-[var(--cream)]">Pilih salah satu dari 20+ desain Army yang sudah tersedia.</strong>
            </p>
            <p className="cond gold text-base mt-8">Custom sesuai kebutuhan tim.</p>
            <a href="#katalog" className="btn mt-8"><span>Pilih Desain Army</span><span className="ico" aria-hidden="true">↗</span></a>
          </div>
          <div className="card p-8 sm:p-10 fadeup">
            <p className="cond text-sm gold mb-6">Kemudian kirim</p>
            <ul className="space-y-4 text-lg">
              {["Nama tim / komunitas", "Logo", "Nameset", "Nomor", "Logo sponsor"].map((item, i) => (
                <li key={i} className="flex gap-4 items-start pb-4" style={{ borderBottom: i < 4 ? "1px solid rgba(181,155,91,.15)" : "none" }}>
                  <span className="gold">✓</span> {item}
                </li>
              ))}
            </ul>
            <p className="mt-7" style={{ color: "rgba(244,241,232,.7)" }}>Tim kami akan membantu menyesuaikan desain sesuai identitas kamu.</p>
          </div>
        </div>
      </section>

      {/* ===== 5. ALASAN ===== */}
      <section className="py-14 sm:py-24 lg:py-32" style={{ background: "linear-gradient(180deg,transparent,rgba(25,53,36,.4),transparent)" }}>
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="display text-3xl sm:text-5xl lg:text-6xl max-w-3xl fadeup">KENAPA BANYAK TIM MEMILIH <span className="gold">JERSEY CUSTOM?</span></h2>
          <div className="rule my-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { num: "01", title: "Identitas Lebih Kuat", desc: "Logo dan nama tim membuat jersey terasa lebih personal dan profesional." },
              { num: "02", title: "Tim Terlihat Lebih Kompak", desc: "Satu desain yang seragam membuat seluruh anggota terlihat sebagai satu kesatuan." },
              { num: "03", title: "Desain Lebih Berkarakter", desc: "Gaya Army & Tactical memberikan tampilan yang tegas dan maskulin." },
              { num: "04", title: "Bisa Custom", desc: "Sesuaikan nama, nomor, logo, sponsor, dan elemen lainnya sesuai kebutuhan." },
              { num: "05", title: "Siap untuk Berbagai Aktivitas", desc: "Cocok untuk kegiatan komunitas, outdoor, event, gathering, maupun aktivitas tim lainnya." },
            ].map((item) => (
              <div key={item.num} className="card p-8 fadeup">
                <p className="num">{item.num}</p>
                <h3 className="cond text-lg mt-3">{item.title}</h3>
                <p className="mt-3" style={{ color: "rgba(244,241,232,.75)" }}>{item.desc}</p>
              </div>
            ))}
            <div className="card p-8 flex flex-col justify-center fadeup" style={{ borderColor: "rgba(181,155,91,.45)" }}>
              <p className="display text-4xl gold">20+</p>
              <p className="cond text-sm mt-2">Desain Army siap custom</p>
              <a href="#cta" className="cond gold text-sm mt-5 underline underline-offset-4">Lihat pilihannya →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. HARGA ===== */}
      <section id="harga" className="relative py-14 sm:py-24 lg:py-32 overflow-hidden" style={{ borderTop: "1px solid rgba(181,155,91,.15)" }}>
        <div className="gridbg" />
        <div className="relative max-w-6xl mx-auto px-5">
          <div className="text-center fadeup">
            <p className="cond text-xs gold mb-4">Harga &amp; paket</p>
            <h2 className="display text-3xl sm:text-5xl lg:text-6xl">PILIH <span className="gold">PAKET TIMMU</span></h2>
            <p className="mt-4" style={{ color: "rgba(244,241,232,.72)" }}>Pilih jumlah pembelian, harga akan menyesuaikan otomatis.</p>
          </div>

          {/* Toggle */}
          <div className="mt-9 flex justify-center fadeup">
            <div className="relative inline-flex p-1.5 rounded-full" style={{ border: "1px solid rgba(181,155,91,.35)", background: "rgba(7,10,8,.85)" }}>
              <button className={`relative z-10 cond text-xs sm:text-sm px-6 sm:px-9 py-2.5 rounded-full transition-colors duration-300`} style={{ color: priceMode === "ecer" ? "var(--black)" : "rgba(244,241,232,.8)", background: priceMode === "ecer" ? "var(--gold)" : "transparent" }} onClick={() => setPriceMode("ecer")}>Ecer</button>
              <button className={`relative z-10 cond text-xs sm:text-sm px-6 sm:px-9 py-2.5 rounded-full transition-colors duration-300`} style={{ color: priceMode === "lusin" ? "var(--black)" : "rgba(244,241,232,.8)", background: priceMode === "lusin" ? "var(--gold)" : "transparent" }} onClick={() => setPriceMode("lusin")}>Lusin • Hemat</button>
            </div>
          </div>
          <p className="mt-4 text-center cond text-[11px]" style={{ color: "rgba(244,241,232,.55)" }}>
            {priceMode === "ecer" ? "Mulai 12 pcs otomatis dapat harga lusin" : "Harga lusin aktif — hemat Rp10.000 per jersey"}
          </p>

          {/* Price Card */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="lift fadeup relative overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(181,155,91,.5)", background: "linear-gradient(165deg,rgba(25,53,36,.96),rgba(9,16,11,.99))" }}>
              <div className="sheen" />
              <div className="relative grid sm:grid-cols-2">
                <div className="p-8 sm:p-10" style={{ borderBottom: "1px solid rgba(181,155,91,.22)" }}>
                  <p className="cond text-[11px] gold">Jersey Army Atasan</p>
                  <h3 className="display text-3xl sm:text-4xl mt-1.5">PAKET CUSTOM LENGKAP</h3>
                  <div className="mt-8 flex items-end gap-2">
                    <span className="gold display text-2xl pb-3">Rp</span>
                    <span className="price display text-5xl sm:text-6xl lg:text-7xl leading-none gold">{priceMode === "ecer" ? "85rb" : "75rb"}</span>
                    <span className="cond text-sm pb-3" style={{ color: "rgba(244,241,232,.6)" }}>/pcs</span>
                  </div>
                  <p className="cond text-[11px] mt-3" style={{ color: "rgba(244,241,232,.7)" }}>
                    {priceMode === "ecer" ? "Bisa beli satuan, tanpa minimal" : "Harga lusin aktif mulai 12 pcs"}
                  </p>
                  <a href="#katalog" className="btn mt-8 w-full"><span>Pilih Desain</span><span className="ico" aria-hidden="true">↗</span></a>
                </div>
                <div className="p-8 sm:p-10">
                  <p className="cond text-[11px]" style={{ color: "rgba(244,241,232,.55)" }}>Semua sudah termasuk</p>
                  <ul className="mt-6 space-y-3.5 text-[15px]">
                    {["Bahan dry fit premium", "Full printing & desain bebas", "Nama dan nomor punggung", "Logo tim, komunitas & sponsor", "Revisi desain dibantu"].map((item) => (
                      <li key={item} className="flex gap-3"><span className="gold">✓</span> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative px-8 sm:px-10 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between" style={{ borderTop: "1px solid rgba(181,155,91,.22)", background: "rgba(7,10,8,.55)" }}>
                <p className="cond text-[11px]" style={{ color: "rgba(244,241,232,.75)" }}>Mau desain sendiri dari nol? <span className="gold">Minimal 6 pcs</span>, harga tetap sama.</p>
                <a href="#cta" className="cond text-[11px] gold underline underline-offset-4 whitespace-nowrap">Konsultasi desain →</a>
              </div>
            </div>
          </div>

          {/* Info Strips */}
          <div className="mt-5 grid sm:grid-cols-3 gap-5 fadeup">
            <div className="rounded-xl p-5 text-center" style={{ border: "1px solid rgba(181,155,91,.2)" }}><p className="display text-3xl gold">FREE</p><p className="cond text-[11px] mt-1" style={{ color: "rgba(244,241,232,.65)" }}>Biaya desain &amp; nameset</p></div>
            <div className="rounded-xl p-5 text-center" style={{ border: "1px solid rgba(181,155,91,.2)" }}><p className="display text-3xl gold">6</p><p className="cond text-[11px] mt-1" style={{ color: "rgba(244,241,232,.65)" }}>Minimal pcs desain sendiri</p></div>
            <div className="rounded-xl p-5 text-center" style={{ border: "1px solid rgba(181,155,91,.2)" }}><p className="display text-3xl gold">12</p><p className="cond text-[11px] mt-1" style={{ color: "rgba(244,241,232,.65)" }}>Pcs untuk harga lusin</p></div>
          </div>

          {/* Bulk */}
          <div className="mt-5 rounded-2xl p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 fadeup lift" style={{ border: "1px solid rgba(181,155,91,.3)", background: "linear-gradient(120deg,rgba(25,53,36,.6),rgba(7,10,8,.9))" }}>
            <div>
              <h3 className="display text-2xl sm:text-4xl">BUTUH LEBIH DARI 50 PCS?</h3>
              <p className="mt-2 text-[15px]" style={{ color: "rgba(244,241,232,.7)" }}>Harga proyek khusus untuk komunitas, instansi, sekolah, dan event.</p>
            </div>
            <a href={wa("Halo TNT SPORT APPAREL, saya butuh jersey army lebih dari 50 pcs. Minta harga khusus dong!")} target="_blank" rel="noopener" className="btn whitespace-nowrap self-start sm:self-auto"><span>Minta Harga Khusus</span><span className="ico" aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      {/* ===== 7. KATALOG ===== */}
      <section id="katalog" className="py-14 sm:py-24 lg:py-32" style={{ borderTop: "1px solid rgba(181,155,91,.15)", background: "linear-gradient(180deg,rgba(25,53,36,.28),transparent)" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 fadeup">
            <div>
              <p className="cond text-xs gold mb-4">Katalog</p>
              <h2 className="display text-3xl sm:text-5xl lg:text-6xl">20 DESAIN ARMY<br /><span className="gold">SIAP CUSTOM</span></h2>
            </div>
            <p className="cond text-xs sm:text-right max-w-xs" style={{ color: "rgba(244,241,232,.6)" }}>Klik desain untuk melihat detail lebih besar</p>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <button key={p.id} className="tile fadeup" onClick={() => setCatalogActive(i)}>
                {p.image.includes("placeholder") ? (
                  <div className="ph jersey-ph w-full aspect-[4/5]" data-code={p.catalogue} />
                ) : (
                  <img src={p.image} alt={p.alt} className="cat-img w-full aspect-[4/5] object-cover" loading="lazy" />
                )}
                <div className="meta">
                  <span className="cond text-[11px]">{p.catalogue}</span>
                  <span className="zoom cond text-[11px] gold">Lihat ↗</span>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-10 text-center fadeup" style={{ color: "rgba(244,241,232,.6)" }}>
            Belum ketemu yang pas? <a href="#cta" className="gold underline underline-offset-4">Minta rekomendasi desain</a>
          </p>
        </div>

        {/* Catalog Lightbox */}
        {catalogActive !== null && products[catalogActive] && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(4,6,5,.88)", backdropFilter: "blur(4px)" }} onClick={() => setCatalogActive(null)} role="dialog" aria-modal="true">
            <div className="relative w-full max-w-lg" style={{ background: "var(--black)", border: "1px solid rgba(181,155,91,.35)" }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setCatalogActive(null)} aria-label="Tutup" className="absolute -top-3 -right-3 w-10 h-10 text-xl leading-none flex items-center justify-center rounded-full transition" style={{ background: "var(--cream)", color: "var(--black)" }}>×</button>
              {products[catalogActive].image.includes("placeholder") ? (
                <div className="ph jersey-ph w-full aspect-square" data-code={products[catalogActive].catalogue} />
              ) : (
                <img src={products[catalogActive].image} alt={products[catalogActive].alt} className="w-full aspect-square object-cover" />
              )}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6" style={{ borderTop: "1px solid rgba(181,155,91,.25)" }}>
                <div>
                  <p className="cond text-sm">{products[catalogActive].catalogue}</p>
                  <p className="text-sm" style={{ color: "rgba(244,241,232,.6)" }}>Army Collection</p>
                </div>
                <a href={wa(`Halo, saya tertarik desain ${products[catalogActive].catalogue} di kategori Jersey Army.`)} target="_blank" rel="noopener" className="btn"><span>Order Sekarang</span><span className="ico" aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== 8. GALERI ===== */}
      <section id="galeri" className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-3xl mb-6">
            <div className="rule mb-6" />
            <h2 className="text-3xl md:text-4xl">Foto Hasil Jersey Army</h2>
            <p className="mt-3 text-lg" style={{ color: "var(--cream)" }}>Foto asli dari pelanggan — bukan edit, bukan rekayasa.</p>
          </div>
        </div>
        <div className="gal-wrap mt-7">
          <div className="gal-track">
            {Array.from({ length: 2 }).map((_, dup) =>
              GALLERY_IMAGES.map((g, i) => (
                <button key={`${dup}-${i}`} type="button" onClick={() => setGalleryActive(dup === 0 ? i : null)} className="gal-item">
                  <img src={g.src} alt={dup === 1 ? "" : g.alt} loading="lazy" />
                </button>
              ))
            )}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 mt-8 text-center">
          <a href={wa("Halo TNT SPORT APPAREL, saya lihat galeri hasil jersey pelanggan, saya mau order seperti itu!")} target="_blank" rel="noopener" className="btn">
            🎯 Mau Jersey Seperti Ini? Order Sekarang
          </a>
        </div>
        {galleryActive !== null && GALLERY_IMAGES[galleryActive] && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,.85)", backdropFilter: "blur(4px)" }} onClick={() => setGalleryActive(null)} role="dialog" aria-modal="true">
            <div className="relative my-auto" style={{ maxWidth: "92vw" }} onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setGalleryActive(null)} aria-label="Tutup" className="absolute -top-2 -right-2 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-white shadow-lg" style={{ background: "var(--gold)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </button>
              <img src={GALLERY_IMAGES[galleryActive].src} alt={GALLERY_IMAGES[galleryActive].alt} className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl" style={{ border: "1px solid rgba(255,255,255,.1)" }} />
              <p className="mt-3 text-center text-sm" style={{ color: "rgba(255,255,255,.6)" }}>{GALLERY_IMAGES[galleryActive].alt}</p>
            </div>
          </div>
        )}
      </section>

      {/* ===== 9. CTA ===== */}
      <section id="cta" className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(8,11,8,1) 0%,rgba(18,26,19,.95) 50%,rgba(8,11,8,1) 100%)" }} />
        <div className="absolute inset-0 gridbg" />
        <div className="relative max-w-3xl mx-auto px-5 text-center fadeup">
          <h2 className="display text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
            SIAP BIKIN <span className="gold">JERSEY ARMY</span> TIMMU?
          </h2>
          <p className="mt-6 sm:mt-8 text-sm sm:text-lg leading-relaxed" style={{ color: "rgba(241,243,236,.8)" }}>
            Pilih desain favoritmu dan custom sesuai identitas tim.
          </p>
          <p className="cond mt-5 sm:mt-7 text-[10px] sm:text-xs tracking-[.18em]" style={{ color: "rgba(241,243,236,.55)" }}>
            20+ DESAIN ARMY • SIAP CUSTOM • UNTUK TIM &amp; KOMUNITAS
          </p>
          <div className="mt-10 sm:mt-12">
            <a href="#katalog" className="btn text-sm sm:text-base px-7 sm:px-10 py-3.5 sm:py-4">
              <span>PILIH DESAIN ARMY</span>
              <span className="ico" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: "1px solid rgba(181,155,91,.18)" }} className="py-10">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <span className="display text-2xl">ARMY <span className="gold">COLLECTION</span></span>
          <span className="cond text-xs" style={{ color: "rgba(244,241,232,.55)" }}>Jersey Custom Military &amp; Tactical — TNT SPORT APPAREL</span>
        </div>
      </footer>

      {/* POPUP NOTIFIKASI */}
      <div className="pop" style={{ transform: popup.visible ? "translateY(0)" : "translateY(140%)", opacity: popup.visible ? 1 : 0, pointerEvents: popup.visible ? "auto" : "none" }}>
        <span className="pop-dot" />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug">
            <strong className="text-white">{popup.data[0]}</strong>, baru memesan{" "}
            <em className="not-italic" style={{ color: "var(--cream)" }}>{popup.data[1]}</em>,{" "}
            <span style={{ color: "var(--gold)" }}>{popup.data[2]}</span>
          </p>
        </div>
        <button onClick={popup.close} aria-label="Tutup notifikasi" className="shrink-0 text-lg leading-none px-1" style={{ color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}>×</button>
      </div>
    </div>
  );
}
