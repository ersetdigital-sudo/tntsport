"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/wa";
import "./jersey-basket.css";

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

const WA_NUMBER = "628115491117";

const CATALOG_NAMES = [
  "Street Fade","Court Lines","Blackout","Volt Strike","Retro Block",
  "Urban Camo","Half Court","Fastbreak","Downtown","Chalk Mark",
  "Night Game","Crossover","Alley Oop","Rim Shot","Backboard",
  "Hardwood","Buzzer Beat","Full Court","Triple Threat","Home Turf"
];

const TESTIMONIALS = [
  { initials:"FA", name:"Fajar", team:"Komunitas Streetball Jogja", city:"Yogyakarta", quote:"Bahannya sangat ringan dan pergerakan terasa bebas, tidak kaku seperti jersey berkualitas rendah. Desainnya juga benar-benar sesuai permintaan." },
  { initials:"DW", name:"Dwi", team:"Tim Liga Basket Bekasi", city:"Bekasi", quote:"Pesanan 12 pcs untuk tim, semua ukuran pas. Hasil printing tajam dan nomor punggung tidak mengelupas meski sudah sering dicuci." },
  { initials:"AR", name:"Arif", team:"3x3 Kalibata Squad", city:"Jakarta", quote:"Saya hanya memesan satuan, tetapi tetap dilayani dengan baik. Nama dan nomor sesuai, pengirimannya rapi dan cepat." },
  { initials:"NP", name:"Nanda", team:"Basket Putri Sleman", city:"Sleman", quote:"Desain dari nol dibantu hingga final. Warnanya persis seperti logo klub kami. Sangat memuaskan." },
  { initials:"BG", name:"Bagas", team:"Komunitas Streetball Malang", city:"Malang", quote:"Bermain full court 2 jam tetap terasa sejuk dan tidak lembap di badan. Ini yang membedakannya dari jersey murah." },
  { initials:"RS", name:"Rizky", team:"Klub Basket Semarang", city:"Semarang", quote:"Harga sangat wajar untuk kualitas seperti ini. Tim kami sudah melakukan pemesanan ulang dua kali." }
];

const GALLERY_IMAGES = [
  { src: "/landing/jersey-futsal/4c090b09-6b9d-4d9a-a061-ca955c49c520.png", alt: "Tim Balreng Kebumen memakai jersey custom merah di Turnamen" },
  { src: "/landing/jersey-futsal/93c90d93-45be-4137-b10d-d810ada22df4.png", alt: "Tim SSB Persem memakai jersey custom kuning" },
  { src: "/landing/jersey-futsal/0cde4945-3487-4e3d-ba70-e94156ac55e3.png", alt: "Pemain memakai jersey custom lengan panjang merah" },
  { src: "/landing/jersey-futsal/3af292c0-b13f-4a74-b94e-c0b6885f633c.png", alt: "Lenox FC memakai jersey custom maroon" },
  { src: "/landing/jersey-futsal/21bccec1-b05a-464e-bc44-54cb90c01dde.png", alt: "Tim junior memakai jersey custom biru saat menerima piala juara 2" },
];

const POPUP_DATA = [
  ["Reza - Bandung","Jersey Basket Custom Full Printing","2 menit yang lalu"],
  ["Dimas - Surabaya","Custom Desain Full Team 10 pcs","6 menit yang lalu"],
  ["Yoga - Yogyakarta","Jersey Basket Satuan + Nama & Nomor","9 menit yang lalu"],
  ["Putri - Makassar","Jersey Basket Custom Full Printing","13 menit yang lalu"],
  ["Andre - Tangerang","Custom Desain Full Team 8 pcs","17 menit yang lalu"],
  ["Bima - Semarang","Jersey Basket Satuan + Logo Sponsor","21 menit yang lalu"],
  ["Galih - Balikpapan","Jersey Basket Custom Full Printing","25 menit yang lalu"],
  ["Sandi - Medan","Custom Desain Full Team 14 pcs","29 menit yang lalu"]
];

const FAQS = [
  { q:"Bisakah custom nama & nomor sendiri?", a:"Bisa. Cukup isi formulir pesanan, dan kami cetak sesuai permintaan kamu." },
  { q:"Berapa lama proses produksinya?", a:"Rata-rata 7 hari kerja tergantung jumlah pesanan." },
  { q:"Ada berapa pilihan desain?", a:"Tersedia 20 desain siap pilih. Jika menginginkan desain lain, tersedia opsi custom dari nol dengan minimal order 6 pcs." },
  { q:"Bisa order satuan?", a:"Bisa. Pesanan 1 pcs dapat langsung custom nama, nomor punggung, logo tim, dan logo sponsor — desain dasar mengikuti salah satu dari 20 desain yang tersedia." },
  { q:"Apakah bahannya cocok untuk bermain full court dalam waktu lama?", a:"Cocok. Dry Fit ringan dan menyerap keringat, sehingga tetap nyaman meski bermain lama." }
];

function buildWA(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function Marquee({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const halfWidth = track.scrollWidth / 2;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current -= speed / 60;
        if (Math.abs(posRef.current) >= halfWidth) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className="mq relative z-10 py-3" style={{ background: "#ffe500", color: "#0a0a0a", borderTop: "2px solid #000", borderBottom: "2px solid #000", overflow: "hidden" }}>
      <div ref={trackRef} className="text-lg sm:text-xl" style={{ display: "flex", width: "max-content" }}>
        {children}
        {children}
      </div>
    </div>
  );
}

function GalleryMarquee({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const halfWidth = track.scrollWidth / 2;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current -= 0.5;
        if (Math.abs(posRef.current) >= halfWidth) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active]);

  const items = [...images, ...images, ...images];

  return (
    <>
      <div ref={containerRef} className="mt-7 overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)" }}>
        <div ref={trackRef} style={{ display: "flex", gap: "1rem", width: "max-content" }}>
          {items.map((g, i) => (
            <button key={i} type="button" onClick={() => setActive(i % images.length)} style={{ flex: "0 0 auto", width: "min(13.5rem,70vw)", cursor: "pointer", padding: 0, textAlign: "left", background: "none", border: "none" }}>
              <img src={g.src} alt={g.alt} loading="lazy" style={{ width: "100%", height: "auto", aspectRatio: "4/3", objectFit: "cover", borderRadius: "1rem", border: "1px solid rgba(255,255,255,.12)", display: "block" }} />
            </button>
          ))}
        </div>
      </div>
      {active !== null && images[active] && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.85)", padding: "1rem", backdropFilter: "blur(4px)" }} onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <div style={{ position: "relative", maxWidth: "92vw", margin: "auto" }} onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setActive(null)} aria-label="Tutup foto" style={{ position: "absolute", top: "-0.5rem", right: "-0.5rem", zIndex: 10, width: "2.75rem", height: "2.75rem", borderRadius: "9999px", display: "grid", placeItems: "center", color: "#fff", background: "#ff2d1f", border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,.4)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
            </button>
            <img src={images[active].src} alt={images[active].alt} style={{ maxHeight: "82vh", width: "auto", maxWidth: "100%", borderRadius: "1rem", objectFit: "contain", boxShadow: "0 25px 50px rgba(0,0,0,.5)" }} />
            <p style={{ marginTop: "0.75rem", textAlign: "center", fontSize: "0.875rem", color: "rgba(255,255,255,.6)" }}>{images[active].alt}</p>
          </div>
        </div>
      )}
    </>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

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

  const close = () => {
    stopped.current = true;
    setVisible(false);
  };

  return { visible, data, close };
}

export default function JerseyBasketLanding({ products, waNumber }: Props) {
  useScrollReveal();
  const popup = usePopup();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [priceMode, setPriceMode] = useState<"ecer" | "lusin">("ecer");

  return (
    <div className="jersey-basket">
      {/* ===== 1. HERO ===== */}
      <section id="hero" className="relative overflow-hidden grain hatch" style={{ background: "radial-gradient(120% 90% at 78% 12%,rgba(255,229,0,.11),transparent 55%),radial-gradient(90% 80% at 8% 90%,rgba(255,45,31,.12),transparent 58%),#08080a" }}>
        <p aria-hidden="true" className="display stroke-text absolute select-none pointer-events-none hidden lg:block" style={{ top: "14%", left: "-3%", fontSize: "clamp(6rem,17vw,17rem)", opacity: 0.1, zIndex: 0 }}>
          BALL OUT
        </p>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-12 pb-20 md:pb-16 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-[1.02fr_1fr] gap-10 lg:gap-6 items-center">
            <div className="reveal">
              <p className="kicker text-xs sm:text-sm inline-flex items-center gap-2 px-3 py-1.5" style={{ color: "#ffe500", border: "1px solid rgba(255,229,0,.42)", background: "rgba(255,229,0,.06)" }}>
                🏀 Custom Jersey Basket
              </p>
              <h1 className="display hero-title mt-5" style={{ fontSize: "clamp(3.1rem,8.6vw,6.6rem)" }}>
                Jersey Kamu.<br />
                <span className="volt-text">Nama Kamu.</span><br />
                Game Kamu.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "#c9c9d2" }}>
                Bahan Dry Fit ringan, full printing tajam, desain bebas — dari street ball sampai liga
                komunitas. Custom nama, nomor, dan logo tim sendiri, tanpa proses yang rumit.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={buildWA("Halo, saya ingin memesan jersey basket custom. Boleh dibantu?")} target="_blank" rel="noopener" className="btn btn-volt text-base sm:text-lg px-7 py-4">
                  🔥 Pesan Jersey Sekarang →
                </a>
                <a href="#katalog" className="btn btn-ghost text-base px-6 py-4">Lihat 20 Desain Siap Pilih</a>
              </div>
              <ul className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 cond text-xs lg:text-sm font-bold tracking-wide" style={{ color: "#d5d5de" }}>
                <li className="flex items-center gap-2"><span className="volt-text">✚</span>100+ Tim Telah Memesan</li>
                <li className="flex items-center gap-2"><span className="volt-text">✚</span>Bisa Satuan</li>
                <li className="flex items-center gap-2"><span className="volt-text">✚</span>Bahan Dry Fit Premium</li>
                <li className="flex items-center gap-2"><span className="volt-text">✚</span>Packing Aman</li>
              </ul>
            </div>

            <div className="relative reveal">
              <div className="hero-glow" aria-hidden="true"></div>
              <div className="hero-arc" aria-hidden="true"></div>
              <div className="hero-cut-wrap relative z-10">
                <img className="hero-cut" src="/landing/jersey-basket/fefef2d5-6e2e-4daa-a4fd-ccaa58f0fc60.png" alt="Pemain basket memakai jersey custom full printing biru-oranye nomor 10 sedang mendribel bola" />
              </div>
              <div className="absolute z-20 hidden sm:block" style={{ top: "4%", right: "6%" }}>
                <div className="display-flat text-center px-3 py-2" style={{ background: "#ff2d1f", color: "#fff", transform: "rotate(6deg)", boxShadow: "5px 5px 0 0 #000" }}>
                  <span className="block text-2xl leading-none">FULL</span>
                  <span className="block text-xs tracking-widest" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>PRINTING</span>
                </div>
              </div>
              <div className="absolute z-20" style={{ bottom: "4%", left: "2%" }}>
                <div className="cond px-3 py-2 text-sm font-extrabold tracking-widest" style={{ background: "#ffe500", color: "#0a0a0a", transform: "rotate(-3deg)", boxShadow: "5px 5px 0 0 #000" }}>
                  DRY FIT · ADEM
                </div>
              </div>
            </div>
          </div>
        </div>

        <Marquee speed={30}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "1.6rem", paddingRight: "1.6rem", fontFamily: "'Anton', sans-serif", textTransform: "uppercase", flexShrink: 0 }}>
            STREETBALL <span className="flare-text">●</span> LIGA KOMUNITAS <span className="flare-text">●</span> 3X3 <span className="flare-text">●</span>{" "}
            BISA SATUAN <span className="flare-text">●</span> 20 DESAIN SIAP PILIH <span className="flare-text">●</span>{" "}
            CUSTOM DARI NOL <span className="flare-text">●</span> DRY FIT PREMIUM <span className="flare-text">●</span>
          </span>
        </Marquee>
      </section>

      {/* ===== 2. KENAPA PILIH KAMI ===== */}
      <section id="kenapa" className="relative grain" style={{ background: "#101014" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-14 items-start">
            <div className="reveal">
              <p className="kicker text-xs" style={{ color: "#ff2d1f" }}>Kenapa Pilih Kami</p>
              <h2 className="display mt-4" style={{ fontSize: "clamp(1.85rem,4.2vw,3.15rem)" }}>
                Jersey yang salah pilih hanya menaikkan <span className="volt-text">rasa percaya diri</span>,
                bukan performa di lapangan
              </h2>
            </div>
            <p className="reveal text-base sm:text-lg leading-relaxed lg:pt-16" style={{ color: "#c9c9d2" }}>
              Basket adalah permainan cepat — crossover, drive, jump shot. Jersey yang kaku atau berbahan
              panas akan mengganggu pergerakan. Kami merancang jersey yang benar-benar diperhitungkan
              untuk bergerak, bukan sekadar untuk difoto.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <article className="reveal card relative p-7 pt-10 pb-8">
              <span className="tape">01</span>
              <p className="display-flat card-title text-2xl sm:text-[1.7rem]">Bahan ringan,<br />tidak lembap saat berkeringat</p>
              <p className="leading-relaxed" style={{ color: "#c9c9d2" }}>
                Dry Fit premium, tetap sejuk meski bermain full court 2 jam nonstop.
              </p>
            </article>
            <article className="reveal card relative p-7 pt-10 pb-8">
              <span className="tape">02</span>
              <p className="display-flat card-title text-2xl sm:text-[1.7rem]">Bisa satuan, tanpa<br />minimum satu tim</p>
              <p className="leading-relaxed" style={{ color: "#c9c9d2" }}>
                Baik pesanan 1 pcs untuk pribadi maupun jumlah besar untuk tim, harganya tetap wajar.
              </p>
            </article>
            <article className="reveal card relative p-7 pt-10 pb-8 sm:col-span-2 lg:col-span-1">
              <span className="tape tape-flare">03</span>
              <p className="display-flat card-title text-2xl sm:text-[1.7rem]">Desain dengan<br />identitas sendiri</p>
              <p className="leading-relaxed" style={{ color: "#c9c9d2" }}>
                Bukan template pasaran — kirim logo, pilih warna, dan jersey kamu punya identitasnya sendiri.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== 3. PILIHAN ORDER + KATALOG ===== */}
      <section id="order" className="relative grain" style={{ background: "#08080a" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-3xl reveal">
            <p className="kicker text-xs volt-text">Pilihan Order</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,5vw,3.6rem)" }}>
              20 desain siap pilih, atau rancang dari nol — <span className="flare-text">sesuai kebutuhan kamu</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "#c9c9d2" }}>
              Ingin praktis? Pilih saja dari 20 desain yang tersedia. Ingin tampil berbeda?
              Custom sepenuhnya juga bisa.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-5">
            <article className="reveal card card-volt relative p-7 sm:p-9 flex flex-col">
              <span className="tape">Min. 6 pcs</span>
              <p className="text-3xl">🎨</p>
              <h3 className="display mt-3 text-3xl sm:text-4xl">Custom desain<br />full team</h3>
              <p className="mt-4 leading-relaxed" style={{ color: "#c9c9d2" }}>
                Minimal order 6 pcs. Desain 100% dari nol — warna, motif, dan logo tim sepenuhnya kamu
                tentukan. Cocok untuk tim yang ingin punya identitas sendiri, bukan jersey pasaran.
              </p>
              <ul className="mt-6 space-y-3 cond text-base font-semibold tracking-wide" style={{ color: "#e7e7ee" }}>
                <li className="flex gap-3"><span className="volt-text">✚</span>Bebas mengajukan desain dari nol</li>
                <li className="flex gap-3"><span className="volt-text">✚</span>Cocok untuk komunitas streetball, tim liga, dan klub basket</li>
                <li className="flex gap-3"><span className="volt-text">✚</span>Semakin banyak pesanan, semakin hemat per pcs</li>
              </ul>
              <div className="mt-auto pt-8">
                <a href={buildWA("Halo, saya ingin berkonsultasi mengenai desain jersey basket custom full team (min. 6 pcs).")} target="_blank" rel="noopener" className="btn btn-volt w-full text-base py-4">Konsultasi Desain Tim →</a>
              </div>
            </article>

            <article className="reveal card relative p-7 sm:p-9 flex flex-col">
              <span className="tape tape-flare">1 pcs</span>
              <p className="text-3xl">🏀</p>
              <h3 className="display mt-3 text-3xl sm:text-4xl">Order satuan</h3>
              <p className="mt-4 leading-relaxed" style={{ color: "#c9c9d2" }}>
                Cukup 1 pcs. Pilih dari <strong className="text-white">20 desain siap pakai</strong>, lalu
                tinggal custom:
              </p>
              <ul className="mt-6 space-y-3 cond text-base font-semibold tracking-wide" style={{ color: "#e7e7ee" }}>
                <li className="flex gap-3"><span className="volt-text">✚</span>Nama &amp; Nomor Punggung</li>
                <li className="flex gap-3"><span className="volt-text">✚</span>Logo Tim</li>
                <li className="flex gap-3"><span className="volt-text">✚</span>Logo Sponsor</li>
              </ul>
              <p className="mt-5 text-sm italic" style={{ color: "#8c8c99" }}>
                (Desain dasar mengikuti katalog, bukan custom dari nol)
              </p>
              <div className="mt-auto pt-8">
                <a href="#katalog" className="btn btn-ghost w-full text-base py-4">Pilih Dari 20 Desain →</a>
              </div>
            </article>
          </div>

          <div className="reveal mt-6 flex items-start gap-3 p-5" style={{ background: "#17171c", borderLeft: "4px solid #ff2d1f" }}>
            <span className="text-xl leading-none">💡</span>
            <p className="leading-relaxed" style={{ color: "#c9c9d2" }}>
              Ingin desain yang benar-benar baru? <strong className="text-white">Minimal order 6 pcs.</strong>
              Ingin langsung pesan? Pilih saja dari 20 desain yang sudah tersedia.
            </p>
          </div>
        </div>

        <div id="katalog" className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pb-16 sm:pb-24">
          <div className="reveal flex flex-wrap items-end justify-between gap-4 border-t pt-12" style={{ borderColor: "rgba(255,255,255,.12)" }}>
            <div>
              <p className="kicker text-xs" style={{ color: "#ff2d1f" }}>Katalog Desain</p>
              <h3 className="display mt-3" style={{ fontSize: "clamp(1.7rem,4vw,2.8rem)" }}>{products.length} Desain Siap Pilih</h3>
            </div>
            <p className="cond text-sm font-bold tracking-widest" style={{ color: "#8c8c99" }}>
              Cukup sebutkan nomornya saat memesan
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {products.map((p) => (
              <a
                key={p.id}
                href={buildWhatsAppLink(waNumber, `Halo TNT SPORT APPAREL, saya tertarik dengan desain *${p.catalogue}* di kategori *Jersey Basket*. Bisa info lebih lanjut?`)}
                target="_blank"
                rel="noopener"
                className="cat-item block"
              >
                <div className="relative" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="cat-name">{p.catalogue}</figcaption>
              </a>
            ))}
          </div>
          <div className="reveal mt-8 text-center">
            <a href={buildWA("Halo, saya ingin melihat katalog desain jersey basket. Boleh dikirimkan?")} target="_blank" rel="noopener" className="btn btn-flare text-base px-7 py-4">Tanyakan Desain Yang Diinginkan →</a>
          </div>
        </div>
      </section>

      {/* ===== 3.5 HARGA ===== */}
      <section id="harga" className="relative grain" style={{ background: "#101014" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-2xl reveal">
            <p className="kicker text-xs" style={{ color: "#ff2d1f" }}>Daftar Harga</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,5vw,3.6rem)" }}>
              Pilih Paket <span className="volt-text">Tim Basket Kamu</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "#c9c9d2" }}>
              Pilih jumlah pembelian, harga akan menyesuaikan otomatis.
            </p>
          </div>

          {/* Toggle Ecer / Lusin */}
          <div className="mt-8 flex justify-center reveal">
            <div className="price-toggle">
              <button className={priceMode === "ecer" ? "active" : ""} onClick={() => setPriceMode("ecer")}>Ecer</button>
              <button className={priceMode === "lusin" ? "active" : ""} onClick={() => setPriceMode("lusin")}>Lusin · Hemat</button>
            </div>
          </div>

          {/* Kartu Harga */}
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {/* Atasan */}
            <article className="price-card relative p-7 sm:p-9 flex flex-col reveal">
              <div className="flex items-start justify-between gap-3">
                <p className="kicker text-xs" style={{ color: "#8c8c99" }}>Jersey Atasan</p>
                <span className="cond text-[10px] font-bold tracking-widest px-3 py-1" style={{ background: "rgba(255,255,255,.08)", color: "#c9c9d2", border: "1px solid rgba(255,255,255,.15)" }}>FLEKSIBEL</span>
              </div>
              <h3 className="display mt-4 text-3xl sm:text-4xl">Atasan Saja</h3>
              <div className="mt-6 flex items-end gap-1.5">
                <span className="display text-2xl pb-2" style={{ color: "#8c8c99" }}>Rp</span>
                <span key={priceMode} className="display text-6xl sm:text-7xl leading-none price-fade">
                  {priceMode === "ecer" ? "75rb" : "65rb"}
                </span>
                <span className="pb-2.5 text-lg" style={{ color: "#8c8c99" }}>/pcs</span>
              </div>
              <p key={priceMode + "-atasan"} className="mt-2.5 text-sm price-fade" style={{ color: "#8c8c99" }}>
                {priceMode === "ecer" ? "Bisa pesan mulai 1 pcs" : "Minimal pembelian 12 pcs"}
              </p>
              <ul className="mt-7 pt-6 space-y-3 text-[15px] flex-1" style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
                {(priceMode === "ecer"
                  ? ["Full printing, pilih dari katalog desain", "Nama dan nomor punggung", "Revisi desain tanpa batas", "Bahan dry-fit standar liga pro, nyaman dan tidak bau", "Printing sublime, warna cerah dan tahan bertahun-tahun"]
                  : ["Bebas desain sendiri atau pilih dari katalog kami", "Nama dan nomor punggung, gratis", "Revisi desain tanpa batas sampai tim kamu puas", "Bahan dry-fit standar liga pro, nyaman dan tidak bau", "Printing sublime, warna cerah dan tahan bertahun-tahun"]
                ).map((item) => (
                  <li key={item} className="flex gap-3"><span className="volt-text">✚</span><span style={{ color: "#e7e7ee" }}>{item}</span></li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a href={buildWA("Halo TNT SPORT APPAREL, saya mau pesan Jersey Atasan saja (basket). Minta info lengkapnya dong!")} target="_blank" rel="noopener" className="btn btn-ghost w-full text-base py-4">Pilih Atasan</a>
              </div>
            </article>

            {/* Setelan */}
            <article className="price-card price-card-hl relative p-7 sm:p-9 flex flex-col reveal">
              <div className="flex items-start justify-between gap-3">
                <p className="kicker text-xs" style={{ color: "#ffe500" }}>Atasan + Celana</p>
                <span className="cond text-[10px] font-bold tracking-widest px-3 py-1" style={{ background: "var(--volt)", color: "#0a0a0a" }}>PALING DIMINATI</span>
              </div>
              <h3 className="display mt-4 text-3xl sm:text-4xl">Jersey Setelan</h3>
              <div className="mt-6 flex items-end gap-1.5">
                <span className="display text-2xl pb-2" style={{ color: "#ffe500" }}>Rp</span>
                <span key={priceMode} className="display text-6xl sm:text-7xl leading-none price-fade volt-text">
                  {priceMode === "ecer" ? "145rb" : "120rb"}
                </span>
                <span className="pb-2.5 text-lg" style={{ color: "#8c8c99" }}>/set</span>
              </div>
              <p key={priceMode + "-setelan"} className="mt-2.5 text-sm price-fade" style={{ color: "#8c8c99" }}>
                {priceMode === "ecer" ? "Bisa pesan mulai 1 set" : "Minimal pembelian 12 set"}
              </p>
              <ul className="mt-7 pt-6 space-y-3 text-[15px] flex-1" style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
                {(priceMode === "ecer"
                  ? ["Full printing, pilih dari katalog desain", "Nama dan nomor punggung", "Revisi desain tanpa batas", "Bahan dry-fit standar liga pro, nyaman dan tidak bau", "Printing sublime, warna cerah dan tahan bertahun-tahun", "Celana non printing"]
                  : ["Bebas desain sendiri atau pilih dari katalog kami", "Nama dan nomor punggung, gratis", "Revisi desain tanpa batas sampai tim kamu puas", "Bahan dry-fit standar liga pro, nyaman dan tidak bau", "Printing sublime, warna cerah dan tahan bertahun-tahun", "Celana non printing"]
                ).map((item) => (
                  <li key={item} className="flex gap-3"><span className="volt-text">✚</span><span style={{ color: "#e7e7ee" }}>{item}</span></li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a href={buildWA("Halo TNT SPORT APPAREL, saya mau pesan Jersey Setelan atasan + celana (basket). Minta info lengkapnya dong!")} target="_blank" rel="noopener" className="btn btn-volt w-full text-base py-4">Pilih Setelan</a>
              </div>
            </article>
          </div>

          {/* Bulk */}
          <div className="mt-5 bulk-strip flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-7 sm:px-9 reveal">
            <div>
              <h3 className="display text-3xl sm:text-4xl">Butuh Lebih dari <span className="flare-text">50 Pcs?</span></h3>
              <p className="mt-2 text-sm sm:text-base" style={{ color: "#c9c9d2" }}>Dapatkan harga proyek khusus untuk komunitas, sekolah, dan event.</p>
            </div>
            <a href={buildWA("Halo TNT SPORT APPAREL, saya butuh jersey basket lebih dari 50 pcs buat komunitas/sekolah/event. Minta harga khusus dong!")} target="_blank" rel="noopener" className="btn btn-flare px-6 py-3.5 text-base whitespace-nowrap shrink-0">Minta Harga Khusus</a>
          </div>
        </div>
      </section>

      {/* ===== 4. CARA ORDER ===== */}
      <section id="cara-order" className="relative grain hatch" style={{ background: "#101014" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-2xl reveal">
            <p className="kicker text-xs volt-text">Cara Pesan</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,5vw,3.6rem)" }}>
              Proses pesanan mudah, hanya <span className="volt-text">4 langkah</span>
            </h2>
          </div>

          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <li className="reveal card p-7">
              <p className="step-num">1</p>
              <p className="display-flat mt-4 text-xl">Pilih Desain</p>
              <p className="mt-2 leading-relaxed" style={{ color: "#c9c9d2" }}>Pilih dari 20 desain atau kirimkan referensi sendiri.</p>
            </li>
            <li className="reveal card p-7">
              <p className="step-num">2</p>
              <p className="display-flat mt-4 text-xl">Isi Detail</p>
              <p className="mt-2 leading-relaxed" style={{ color: "#c9c9d2" }}>Nama, nomor, ukuran, jumlah pemain.</p>
            </li>
            <li className="reveal card p-7">
              <p className="step-num">3</p>
              <p className="display-flat mt-4 text-xl">Konfirmasi &amp; Bayar</p>
              <p className="mt-2 leading-relaxed" style={{ color: "#c9c9d2" }}>Periksa preview terlebih dahulu sebelum produksi dimulai.</p>
            </li>
            <li className="reveal card p-7" style={{ borderColor: "rgba(255,229,0,.45)" }}>
              <p className="step-num" style={{ WebkitTextStrokeColor: "#ffe500" }}>4</p>
              <p className="display-flat mt-4 text-xl">Jersey Tiba Di Tangan Kamu</p>
              <p className="mt-2 leading-relaxed" style={{ color: "#c9c9d2" }}>Dikirim rapi dengan pengemasan aman.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ===== 5. TESTIMONI ===== */}
      <section id="testimoni" className="relative grain" style={{ background: "#08080a" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="max-w-2xl reveal">
            <p className="kicker text-xs" style={{ color: "#ff2d1f" }}>Ulasan Pelanggan</p>
            <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,5vw,3.6rem)" }}>
              Ulasan dari mereka yang <span className="volt-text">sudah memesan</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "#c9c9d2" }}>
              Komunitas streetball hingga tim liga telah mempercayai kualitas jersey kami.
            </p>
          </div>

          {/* Gallery Foto Testimoni */}
          <div className="mt-10 reveal">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
              <div>
                <p className="kicker text-xs" style={{ color: "#ffe500" }}>Foto Hasil Jersey</p>
                <h3 className="display mt-2" style={{ fontSize: "clamp(1.5rem,3.5vw,2.2rem)" }}>
                  Bukan Edit, <span className="volt-text">Bukan Rekayasa</span>
                </h3>
              </div>
              <p className="cond text-xs font-bold tracking-widest" style={{ color: "#8c8c99" }}>
                Foto asli dari pelanggan
              </p>
            </div>
            <GalleryMarquee images={GALLERY_IMAGES} />
            <div className="mt-6 text-center">
              <a href={buildWA("Halo, saya lihat galeri hasil jersey pelanggan, saya mau order seperti itu!")} target="_blank" rel="noopener" className="btn btn-volt text-base px-7 py-4">
                🔥 Mau Jersey Seperti Ini? Order Sekarang
              </a>
            </div>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="reveal card p-7 flex flex-col">
                <p><span className="verified">✔ Verified Buyer</span></p>
                <p className="stars mt-4" aria-label="5 dari 5 bintang">★★★★★</p>
                <blockquote className="mt-4 leading-relaxed" style={{ color: "#c9c9d2" }}>&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <span className="ini" aria-hidden="true">{t.initials}</span>
                  <div>
                    <p className="cond font-extrabold tracking-wide text-white">— {t.name}, {t.team}</p>
                    <p className="text-sm mt-0.5" style={{ color: "#8c8c99" }}>📍 {t.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. URGENCY / PROMO ===== */}
      <section className="relative overflow-hidden grain" style={{ background: "#ffe500", color: "#0a0a0a" }}>
        <p aria-hidden="true" className="display absolute select-none pointer-events-none" style={{ top: "-8%", right: "-2%", fontSize: "clamp(7rem,18vw,16rem)", color: "rgba(0,0,0,.07)", zIndex: 0 }}>PROMO</p>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-8 items-center">
            <div className="reveal">
              <p className="kicker text-xs" style={{ color: "#d41a0e" }}>Slot Produksi Terbatas</p>
              <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,5.2vw,3.7rem)" }}>
                Promo untuk tim yang memesan minggu ini
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed font-medium" style={{ color: "#26260a" }}>
                Pesan minggu ini dan dapatkan potongan harga khusus untuk pembelian di atas 10 pcs.
                Slot produksi terbatas, segera amankan tempat kamu.
              </p>
            </div>
            <div className="reveal lg:justify-self-end">
              <a href={buildWA("Halo, saya ingin mengklaim promo jersey basket minggu ini (di atas 10 pcs).")} target="_blank" rel="noopener" className="btn btn-flare text-base sm:text-lg px-8 py-5 w-full lg:w-auto">Klaim Promo Sekarang →</a>
              <p className="mt-4 cond text-sm font-bold tracking-widest text-center lg:text-right" style={{ color: "#3d3d10" }}>
                Berlaku untuk pesanan di atas 10 pcs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. FAQ ===== */}
      <section id="faq" className="relative grain" style={{ background: "#101014" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-14">
            <div className="reveal">
              <p className="kicker text-xs volt-text">FAQ</p>
              <h2 className="display mt-4" style={{ fontSize: "clamp(1.9rem,4.6vw,3.2rem)" }}>
                Masih ada<br />pertanyaan?
              </h2>
              <p className="mt-5 leading-relaxed" style={{ color: "#c9c9d2" }}>
                Kalau pertanyaan kamu belum ada di sini, langsung hubungi kami — akan segera dibalas.
              </p>
              <a href={buildWA("Halo, saya ingin menanyakan beberapa hal mengenai jersey basket custom.")} target="_blank" rel="noopener" className="btn btn-ghost mt-6 text-base px-6 py-3.5">Hubungi Kami →</a>
            </div>

            <div className="reveal">
              {FAQS.map((faq, i) => (
                <div key={i} className="faq" style={{ borderBottom: "1px solid rgba(255,255,255,.12)" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 py-5 cursor-pointer list-none"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "1.06rem",
                      letterSpacing: "0.02em",
                      color: openFaq === i ? "#ffe500" : "#f2f2f6",
                      transition: "color 0.16s ease",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      padding: "1.35rem 0",
                    }}
                  >
                    <span>{faq.q}</span>
                    <span
                      className="flex-none relative mt-1"
                      style={{
                        width: "1.6rem",
                        height: "1.6rem",
                        border: "1.5px solid rgba(255,255,255,.3)",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%,-50%)",
                          width: ".7rem",
                          height: "1.6px",
                          background: "#ffe500",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          transform: openFaq === i ? "translate(-50%,-50%) rotate(90deg)" : "translate(-50%,-50%)",
                          width: "1.6px",
                          height: ".7rem",
                          background: "#ffe500",
                          opacity: openFaq === i ? 0 : 1,
                          transition: "transform 0.2s ease, opacity 0.2s ease",
                        }}
                      />
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 leading-relaxed" style={{ color: "#c9c9d2", maxWidth: "56ch", lineHeight: 1.65 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. CTA PENUTUP ===== */}
      <section className="relative overflow-hidden grain hatch" style={{ background: "radial-gradient(100% 90% at 50% 0%,rgba(255,45,31,.18),transparent 60%),#08080a" }}>
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 py-20 sm:py-28 text-center">
          <p className="kicker text-xs volt-text reveal">Mulai Sekarang</p>
          <h2 className="display mt-5 reveal" style={{ fontSize: "clamp(2.3rem,7vw,5.2rem)" }}>
            Saatnya tim kamu punya <span className="volt-text">jersey sendiri</span>
          </h2>
          <p className="mt-6 text-lg reveal" style={{ color: "#c9c9d2" }}>
            Tinggalkan jersey pasaran. Bangun identitas tim kamu di lapangan.
          </p>
          <div className="mt-10 reveal">
            <a href={buildWA("Halo, saya ingin memesan jersey basket custom sekarang.")} target="_blank" rel="noopener" className="btn btn-volt text-base sm:text-xl px-9 py-5">🔥 Pesan Jersey Basket Sekarang →</a>
          </div>
          <p className="mt-6 cond text-sm font-bold tracking-widest reveal" style={{ color: "#8c8c99" }}>
            100+ tim telah memesan · bisa satuan · dry fit premium
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "#101014", borderTop: "1px solid rgba(255,255,255,.12)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-24 md:pb-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <a href="#hero" className="display-flat text-xl">JERSEY<span className="volt-text">BASKET</span></a>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 cond text-sm font-bold tracking-widest" style={{ color: "#8c8c99" }}>
            <a href="#kenapa" className="hover:text-white transition-colors">Kenapa Kami</a>
            <a href="#katalog" className="hover:text-white transition-colors">Desain</a>
            <a href="#cara-order" className="hover:text-white transition-colors">Cara Pesan</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <p className="text-sm" style={{ color: "#8c8c99" }}>© 2026 Jersey Basket Custom</p>
        </div>
      </footer>

      {/* POP-UP NOTIFIKASI */}
      <div
        className="pop"
        role="status"
        aria-live="polite"
        style={{
          transform: popup.visible ? "translateY(0)" : "translateY(140%)",
          opacity: popup.visible ? 1 : 0,
          pointerEvents: popup.visible ? "auto" : "none",
        }}
      >
        <span className="pop-dot" aria-hidden="true"></span>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug">
            <strong className="text-white">{popup.data[0]}</strong>, baru memesan{" "}
            <em className="not-italic" style={{ color: "#c9c9d2" }}>{popup.data[1]}</em>,{" "}
            <span style={{ color: "#8c8c99" }}>{popup.data[2]}</span>
          </p>
          <p className="mt-1"><span className="verified">✔ Verified</span></p>
        </div>
        <button onClick={popup.close} aria-label="Tutup notifikasi" className="flex-none text-lg leading-none px-1" style={{ color: "#8c8c99" }}>
          ×
        </button>
      </div>
    </div>
  );
}
