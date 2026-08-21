"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { buildWhatsAppLink } from "@/lib/wa";
import "./jersey-badminton.css";

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

const CATALOG = [
  { code: "BD-10", name: "Crimson Strike", c1: "#D22D4A", c2: "#E91E8C", img: "/landing/jersey-badminton/8d0eccb8-8282-4119-9048-e5daf0dee6ac.png" },
  { code: "BD-09", name: "Green Rally", c1: "#0FB9C9", c2: "#00A8FF", img: "/landing/jersey-badminton/40d3ab5c-7d26-44ab-8eb6-ac1f904435ce.png" },
  { code: "BD-03", name: "Amber Smash", c1: "#F5A623", c2: "#E91E8C", img: "/landing/jersey-badminton/c37fd7cc-2feb-412a-bb7e-4da483008ffa.png" },
  { code: "BD-01", name: "Blue Falcon", c1: "#155EEF", c2: "#00A8FF", extra: true },
  { code: "BD-02", name: "Night Rally", c1: "#0B2A6B", c2: "#155EEF", extra: true },
  { code: "BD-04", name: "Storm Court", c1: "#00A8FF", c2: "#0B4FA8", extra: true },
  { code: "BD-05", name: "Violet Drive", c1: "#6B2AE0", c2: "#E91E8C", extra: true },
  { code: "BD-06", name: "Ace Mono", c1: "#1B2637", c2: "#55627A", extra: true },
  { code: "BD-07", name: "Cyan Sprint", c1: "#0FB9C9", c2: "#00A8FF", extra: true },
  { code: "BD-08", name: "Red Pulse", c1: "#D22D4A", c2: "#E91E8C", extra: true },
  { code: "BD-11", name: "Neon Court", c1: "#155EEF", c2: "#0FB9C9", extra: true },
  { code: "BD-12", name: "Shadow Line", c1: "#121A2A", c2: "#2C3A55", extra: true },
  { code: "BD-13", name: "Magenta Rush", c1: "#E91E8C", c2: "#6B2AE0", extra: true },
  { code: "BD-14", name: "Ocean Fast", c1: "#0B4FA8", c2: "#0FB9C9", extra: true },
  { code: "BD-15", name: "Titan Grey", c1: "#39435A", c2: "#6E7C96", extra: true },
  { code: "BD-16", name: "Sky Serve", c1: "#00A8FF", c2: "#7FD7FF", extra: true },
  { code: "BD-17", name: "Deep Court", c1: "#06152D", c2: "#155EEF", extra: true },
  { code: "BD-18", name: "Flash Point", c1: "#155EEF", c2: "#E91E8C", extra: true },
  { code: "BD-19", name: "Iron Smash", c1: "#232C3F", c2: "#155EEF", extra: true },
  { code: "BD-20", name: "Prime Blue", c1: "#0B4FA8", c2: "#00A8FF", extra: true },
];

const TESTIMONI = [
  {
    nama: "Rizky Pratama", role: "Klub PB Sinar Jaya · Bandung", desain: "BD-10 Crimson Strike",
    quote: "Desainnya persis kayak mockup, warna ga beda dikit pun. Tim lawan sampai nanya jersey-nya dari mana pas turnamen kemarin.",
    rating: 5,
  },
  {
    nama: "Dewi Anggraini", role: "Komunitas Shuttle Moms · Surabaya", desain: "BD-09 Green Rally",
    quote: "Order 24 pcs buat mommies di komunitas. Bahan adem banget buat main pagi, nameset rapi semua. Bakal repeat order.",
    rating: 5,
  },
  {
    nama: "Bagus Wicaksono", role: "Tim SMK Negeri 4 · Semarang", desain: "BD-03 Amber Smash",
    quote: "Kirim desain sendiri, dibantu revisi 2x gratis sampai cocok. Anak tim pada suka banget, keliatan lebih gahar.",
    rating: 5,
  },
  {
    nama: "Hendra Gunawan", role: "Regular Member GOR Prima · Medan", desain: "BD-01 Blue Falcon",
    quote: "Awalnya takut gambar jelek pas dicetak, ternyata full printing-nya tajam detail. Luma 6 pcs doang bisa harga bagus.",
    rating: 5,
  },
  {
    nama: "Putri Maharani", role: "Event Organizer VLeague · Yogyakarta", desain: "BD-13 Magenta Rush",
    quote: "Butuh 60 pcs dadakan buat event. Dikirim tepat waktu, semua ukuran pas sesuai size chart. Recommended!",
    rating: 5,
  },
  {
    nama: "Aditya Nugraha", role: "Unit Badminton Kantor · Jakarta", desain: "BD-06 Ace Mono",
    quote: "Logo perusahaan + sponsor tercetak jelas, jahitan kuat. Dipakai buat lomba antar divisi, aman sampai sekarang.",
    rating: 5,
  },
];

const GALLERY_IMAGES = [
  { src: "/landing/jersey-futsal/4c090b09-6b9d-4d9a-a061-ca955c49c520.png", alt: "Komunitas badminton memakai jersey custom" },
  { src: "/landing/jersey-futsal/93c90d93-45be-4137-b10d-d810ada22df4.png", alt: "Tim badminton memakai jersey custom kuning" },
  { src: "/landing/jersey-futsal/0cde4945-3487-4e3d-ba70-e94156ac55e3.png", alt: "Pemain memakai jersey custom lengan panjang" },
  { src: "/landing/jersey-futsal/3af292c0-b13f-4a74-b94e-c0b6885f633c.png", alt: "Komunitas badminton maroon" },
  { src: "/landing/jersey-futsal/21bccec1-b05a-464e-bc44-54cb90c01dde.png", alt: "Tim badminton junior memakai jersey custom biru" },
];

const TOAST_DATA = {
  nama: ["Rizky", "Andi", "Dewi", "Bagus", "Putri", "Fajar", "Hendra", "Sinta", "Yoga", "Nabila", "Reza", "Tari", "Bima", "Aditya", "Lia"],
  kota: ["Bandung", "Surabaya", "Jakarta", "Semarang", "Yogyakarta", "Malang", "Medan", "Solo", "Bekasi", "Denpasar", "Makassar", "Tangerang"],
  item: ["BD-10 Crimson Strike", "BD-09 Green Rally", "BD-03 Amber Smash", "jersey custom klub", "jersey custom komunitas"],
  qty: [6, 12, 12, 14, 16, 18, 20, 24],
};

function pick<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)];
}

export function JerseyBadmintonLanding({ products, waNumber }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [priceMode, setPriceMode] = useState<"ecer" | "lusin">("ecer");
  const [swapping, setSwapping] = useState(false);
  const [galleryActive, setGalleryActive] = useState<number | null>(null);
  const [toasts, setToasts] = useState<{ id: number; text: string; sub: string }[]>([]);
  const streakRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const toastIdRef = useRef(0);

  /* ---------- scroll reveal ---------- */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".jbm .reveal");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ---------- dynamic speed streaks ---------- */
  useEffect(() => {
    const wrap = streakRef.current;
    if (!wrap) return;
    const colors = ["rgba(0,168,255,.9)", "rgba(21,94,239,.85)", "rgba(127,215,255,.7)", "rgba(233,30,140,.6)"];
    for (let i = 0; i < 9; i++) {
      const s = document.createElement("i");
      s.style.top = `${6 + Math.random() * 84}%`;
      s.style.left = `${Math.random() * 70}%`;
      s.style.width = `${80 + Math.random() * 260}px`;
      s.style.background = `linear-gradient(90deg,transparent,${colors[i % 4]},transparent)`;
      s.style.animationDelay = `${-Math.random() * 5.5}s`;
      s.style.animationDuration = `${4.5 + Math.random() * 3.5}s`;
      wrap.appendChild(s);
    }
    return () => {
      while (wrap.firstChild) wrap.removeChild(wrap.firstChild);
    };
  }, []);

  /* ---------- hero parallax ---------- */
  useEffect(() => {
    const img = heroImgRef.current;
    if (!img || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, raf: number | null = null;
    const el = img; // non-null ref for loop

    function loop() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.transform = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
      raf = Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1 ? requestAnimationFrame(loop) : null;
    }

    function onMove(e: MouseEvent) {
      tx = (e.clientX / window.innerWidth - 0.5) * 18;
      ty = (e.clientY / window.innerHeight - 0.5) * 12;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ---------- toast notifications ---------- */
  const addToast = useCallback(() => {
    if (typeof document !== "undefined" && document.hidden) return;
    const id = ++toastIdRef.current;
    const text = `<b>${pick(TOAST_DATA.nama)}</b> dari ${pick(TOAST_DATA.kota)} baru pesan <b>${pick(TOAST_DATA.qty)} pcs</b> ${pick(TOAST_DATA.item)}`;
    const sub = `${Math.floor(Math.random() * 28) + 2} menit lalu · Terverifikasi`;
    setToasts((prev) => [...prev.slice(-3), { id, text, sub }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5800);
  }, []);

  useEffect(() => {
    const t = setTimeout(addToast, 4500);
    const loop = setInterval(addToast, 6000 + Math.random() * 7000);
    return () => { clearTimeout(t); clearInterval(loop); };
  }, [addToast]);

  /* ---------- price toggle ---------- */
  const handlePriceTab = (mode: "ecer" | "lusin") => {
    if (mode === priceMode) return;
    setSwapping(true);
    setTimeout(() => {
      setPriceMode(mode);
      setSwapping(false);
    }, 220);
  };

  const wa = (msg: string) => buildWhatsAppLink(waNumber || "628115491117", msg);

  return (
    <div className="jbm">
      {/* ===== FLOATING LOGO ===== */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#06152D]/70 border-b border-white/[.07]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E91E8C] shadow-[0_0_14px_#E91E8C]" />
            <span className="dspl text-[17px] tracking-wide">Badminton<span className="text-[#00A8FF]"> Collection</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-9 eyebrow text-[10.5px] text-[#D9DEE7]/85">
            <a href="#value" className="hover:text-white transition-colors">Keunggulan</a>
            <a href="#collection" className="hover:text-white transition-colors">Koleksi</a>
            <a href="#harga" className="hover:text-white transition-colors">Harga</a>
            <a href="#custom" className="hover:text-white transition-colors">Custom</a>
            <a href="#target" className="hover:text-white transition-colors">Untuk Siapa</a>
          </nav>
          <a href="#collection" className="btn px-5 py-2 text-[11.5px]">Pilih Desain</a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section id="hero" className="relative overflow-hidden pt-16 pb-0 sm:pt-20 lg:pt-24">
        <div className="absolute inset-0 grid-lines" aria-hidden="true" />
        <div className="absolute inset-0 hero-glow g1" aria-hidden="true" />
        <div className="absolute inset-0 hero-glow g2" aria-hidden="true" />
        <div className="absolute inset-0 hero-glow g3" aria-hidden="true" />
        <div className="absolute -left-40 top-24 h-[520px] w-[520px] rounded-full opacity-[.14]" style={{ background: "conic-gradient(from 120deg,#00A8FF,#E91E8C,#155EEF,#00A8FF)", filter: "blur(90px)" }} aria-hidden="true" />

        <div className="relative" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
          <div className="grid items-center gap-10 lg:grid-cols-[44fr_56fr] lg:gap-6">
            {/* COPY */}
            <div className="relative z-10 pb-14 lg:pb-24">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#00A8FF]/30 bg-[#00A8FF]/[.08] px-4 py-2 backdrop-blur">
                <span className="flex -space-x-1.5">
                  {["#00A8FF", "#E91E8C", "#155EEF"].map((c) => (
                    <span key={c} className="h-4 w-4 rounded-full border-2 border-[#06152D]" style={{ background: c }} />
                  ))}
                </span>
                <span className="eyebrow text-[9.5px]" style={{ color: "#7FD7FF" }}>Dipercaya 500+ Tim Badminton</span>
              </div>

              <h1 className="dspl hero-h1">
                Dominasi<br />
                <span className="sharp italic">lapangan.</span><br />
                <span style={{ WebkitTextStroke: "1.5px rgba(0,168,255,.65)", color: "transparent" }}>Bukan cuma</span><br />
                <span style={{ WebkitTextStroke: "1.5px rgba(0,168,255,.65)", color: "transparent" }}>kata-kata.</span>
              </h1>

              <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: "rgba(217,222,231,.85)" }}>
                Jersey badminton custom full printing. Dry-fit adem, jahitan kuat, <span style={{ color: "#00A8FF", fontWeight: 700 }}>free nameset &amp; logo</span> — siap buat latihan sampai final turnamen.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#collection" className="btn px-9 py-4 text-sm">Pilih Desain <span aria-hidden="true">→</span></a>
                <a href="#testimoni" className="btn-ghost px-7 py-4 text-sm" style={{ fontSize: 12 }}>Lihat Testimoni</a>
              </div>

              {/* stat strip */}
              <div className="mt-10 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl" style={{ background: "rgba(255,255,255,.09)" }}>
                {[
                  { v: "20+", l: "Desain Siap Pakai" },
                  { v: "4.9", l: "Rating Pelanggan" },
                  { v: "6", l: "Min. Order / Pcs" },
                ].map((s) => (
                  <div key={s.l} className="px-4 py-4" style={{ background: "rgba(6,21,45,.85)", backdropFilter: "blur(8px)" }}>
                    <p className="dspl text-2xl" style={{ color: "#00A8FF" }}>{s.v}</p>
                    <p className="eyebrow mt-1.5 text-[8px]" style={{ color: "rgba(217,222,231,.55)" }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PRODUCT */}
            <div className="relative mt-2 lg:mt-0">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[78%] aspect-square rounded-full blur-[60px]" style={{ background: "radial-gradient(circle,rgba(0,168,255,.30),rgba(21,94,239,.14) 45%,transparent 70%)" }} />
              {/* shuttle orbit ring */}
              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block" aria-hidden="true">
                <div className="h-[460px] w-[460px] rounded-full border border-dashed border-[#00A8FF]/20" style={{ animation: "jbm-spin 40s linear infinite" }} />
              </div>
              <span className="dot" style={{ left: "12%", top: "26%" }} />
              <span className="dot" style={{ left: "78%", top: "16%", animationDelay: "-3s" }} />
              <span className="dot" style={{ left: "88%", top: "58%", animationDelay: "-5s", background: "rgba(233,30,140,.7)", boxShadow: "0 0 10px rgba(233,30,140,.8)" }} />
              <span className="dot" style={{ left: "24%", top: "72%", animationDelay: "-1.5s" }} />
              <img ref={heroImgRef} src="/landing/jersey-badminton/c7feb97a-5f8f-4114-9788-ad01760eaede.png" alt="Model mengenakan jersey badminton custom BD-10" className="hero-figure relative" />

              {/* floating cards */}
              <div className="hero-float card" style={{ left: "0%", top: "20%" }}>
                <div className="flex items-center gap-1 text-[13px]" style={{ color: "#F5A623" }}>★★★★★</div>
                <p className="eyebrow mt-1.5 text-[8.5px]" style={{ color: "rgba(217,222,231,.65)" }}>1.2rb+ review tim</p>
              </div>
              <div className="hero-float card" style={{ right: "2%", bottom: "30%" }}>
                <p className="dspl text-[15px]" style={{ color: "#00A8FF" }}>BD-10</p>
                <p className="eyebrow mt-1 text-[8.5px]" style={{ color: "rgba(217,222,231,.65)" }}>Crimson Strike</p>
              </div>
              <div className="hero-float card" style={{ left: "4%", bottom: "10%" }}>
                <p className="eyebrow text-[8.5px]" style={{ color: "#22C55E" }}>● Produksi 3–5 hari</p>
                <p className="eyebrow mt-1 text-[8.5px]" style={{ color: "rgba(217,222,231,.65)" }}>Full printing rapi</p>
              </div>
            </div>
          </div>
        </div>

        {/* marquee strip */}
        <div className="relative border-y border-white/[.07] bg-[#050F22]/80 py-4 backdrop-blur" aria-hidden="true">
          <div className="jbm-marquee eyebrow text-[10.5px]" style={{ color: "rgba(217,222,231,.55)" }}>
            <span>FREE NAMESET &amp; NOMOR</span><i>✦</i><span>FREE LOGO KLUB &amp; SPONSOR</span><i>✦</i><span>BAHAN DRY-FIT PREMIUM</span><i>✦</i><span>FULL PRINTING TAJAM</span><i>✦</i><span>MIN. ORDER 6 PCS</span><i>✦</i><span>FREE NAMESET &amp; NOMOR</span><i>✦</i><span>FREE LOGO KLUB &amp; SPONSOR</span><i>✦</i><span>BAHAN DRY-FIT PREMIUM</span><i>✦</i><span>FULL PRINTING TAJAM</span><i>✦</i><span>MIN. ORDER 6 PCS</span><i>✦</i>
          </div>
        </div>
      </section>

      {/* ===== VALUE ===== */}
      <section id="value" style={{ position: "relative", padding: "80px 0", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
          <div className="reveal" style={{ maxWidth: "48rem" }}>
            <h2 className="dspl" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Dibuat untuk <span style={{ color: "#155EEF" }}>game</span> yang cepat.</h2>
            <p style={{ marginTop: 20, color: "#D9DEE7", lineHeight: 1.6 }}>Badminton menuntut gerakan cepat, fokus tinggi, dan kenyamanan maksimal. Karena itu, jersey yang digunakan juga harus siap mengikuti setiap gerakan di lapangan.</p>
          </div>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {[
              { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="1.6" strokeLinecap="round"><path d="M12 3v10" /><path d="M8 7l4-4 4 4" /><path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /></svg>, title: "Dry-Fit Adem", desc: "Ringan dan nyaman digunakan untuk latihan maupun pertandingan." },
              { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="1.6" strokeLinecap="round"><rect x="3" y="9" width="18" height="8" rx="2" /><path d="M7 9V4h10v5" /><path d="M7 17v3h10v-3" /></svg>, title: "Full Printing", desc: "Desain dicetak secara penuh agar visual jersey terlihat lebih maksimal dan berkarakter." },
              { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="1.6" strokeLinecap="round"><path d="M4 18c4-10 12-10 16 0" /><path d="M4 12h2M9 12h2M14 12h2M19 12h1" /></svg>, title: "Jahitan Kuat", desc: "Jahitan rapi dan kuat untuk mendukung aktivitas olahraga yang intens." },
              { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="1.6" strokeLinecap="round"><path d="M15 4l5 5L9 20H4v-5z" /><path d="M13 6l5 5" /></svg>, title: "Free Custom", desc: "Nameset, nomor, logo klub, komunitas, dan sponsor dapat disesuaikan." },
            ].map((f, i) => (
              <div key={i} className="reveal card" style={{ padding: 28 }}>
                {f.icon}
                <h3 className="dspl" style={{ fontSize: "1.25rem", marginTop: 20 }}>{f.title}</h3>
                <p style={{ marginTop: 10, fontSize: 14, color: "#D9DEE7", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COLLECTION ===== */}
      <section id="collection" style={{ position: "relative", padding: "80px 0", background: "rgba(8,11,16,.6)", borderTop: "1px solid rgba(255,255,255,.08)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div className="mesh" style={{ opacity: 0.6 }} />
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
          <div className="reveal" style={{ maxWidth: "48rem" }}>
            <p className="eyebrow" style={{ fontSize: 11, color: "#00A8FF", marginBottom: 16 }}>Collection</p>
            <h2 className="dspl" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Pilih desain yang sesuai <span style={{ color: "#00A8FF" }}>karakter timmu</span>.</h2>
            <p style={{ marginTop: 20, color: "#D9DEE7" }}>Beragam desain badminton dengan karakter sporty, modern, dan kompetitif.</p>
          </div>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {products.map((p, i) => {
              const isHidden = i >= 9 && !showAll;
              return (
                <article key={p.id} className={`reveal card cat-item`} style={{ overflow: "hidden", display: isHidden ? "none" : undefined }}>
                  {p.image.includes("placeholder") ? (
                    <div className="ph-tile" style={{ aspectRatio: "1", ["--c1" as string]: CATALOG[i]?.c1 || "#155EEF", ["--c2" as string]: CATALOG[i]?.c2 || "#00A8FF" }}>
                      <span className="ph-code dspl">{p.catalogue}</span>
                      <span className="ph-tag eyebrow" style={{ fontSize: 9 }}>Segera Hadir</span>
                    </div>
                  ) : (
                    <div style={{ overflow: "hidden" }}>
                      <img src={p.image} alt={p.alt} style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }} loading="lazy" />
                    </div>
                  )}
                  <div style={{ padding: 24, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
                    <div>
                      <h3 className="dspl" style={{ fontSize: "1.5rem", color: !p.image.includes("placeholder") ? "#F5F7FA" : "rgba(245,247,250,.75)" }}>{CATALOG[i]?.name || p.catalogue}</h3>
                      <p className="eyebrow" style={{ fontSize: 10.5, color: !p.image.includes("placeholder") ? "#00A8FF" : "rgba(217,222,231,.40)", marginTop: 6 }}>{p.catalogue}</p>
                    </div>
                    <a href={wa(`Halo, saya tertarik desain ${p.catalogue} di kategori Badminton.`)} target="_blank" rel="noopener" className="btn-ghost" style={{ fontSize: 11, padding: "8px 16px", color: !p.image.includes("placeholder") ? "#F5F7FA" : "rgba(245,247,250,.70)" }}>{!p.image.includes("placeholder") ? "Pilih Desain" : "Tanya Desain"}</a>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="reveal" style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            {!showAll && products.length > 9 && (
              <button className="btn-ghost" style={{ padding: "14px 32px", fontSize: 11.5, color: "#F5F7FA" }} onClick={() => setShowAll(true)}>
                Lihat Semua {products.length} Desain <span aria-hidden="true" style={{ marginLeft: 4 }}>↓</span>
              </button>
            )}
            <p className="eyebrow" style={{ fontSize: 9.5, color: "rgba(217,222,231,.40)" }}>Desain baru terus ditambahkan tiap bulan</p>
          </div>
        </div>
      </section>

      {/* ===== TEAM IDENTITY ===== */}
      <section style={{ position: "relative", padding: "80px 0", overflow: "hidden" }}>
        <div className="speed" style={{ opacity: 0.6 }}><span /><span /><span /><span /><span /></div>
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56, alignItems: "center" }}>
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: -24, borderRadius: 32, background: "radial-gradient(60% 60% at 50% 50%,rgba(233,30,140,.22),transparent 70%)", filter: "blur(16px)" }} />
            <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", border: "1px solid rgba(255,255,255,.12)" }}>
              <img src="/landing/jersey-badminton/40d3ab5c-7d26-44ab-8eb6-ac1f904435ce.png" alt="Pemain badminton dengan jersey tim custom" style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="reveal">
            <h2 className="dspl" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Satu tim. <span style={{ color: "#E91E8C" }}>Satu identitas.</span></h2>
            <p style={{ marginTop: 20, color: "#D9DEE7", lineHeight: 1.6, maxWidth: "32rem" }}>Bikin jersey yang bukan cuma seragam, tapi menjadi identitas klub kamu.</p>
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
              {["Nama Pemain", "Nomor Pemain", "Logo Klub", "Logo Komunitas", "Logo Sponsor"].map((c) => (
                <div key={c} className="chip" style={{ padding: "12px 16px" }}>
                  <span className="eyebrow" style={{ fontSize: 10.5 }}>{c}</span>
                </div>
              ))}
            </div>
            <p className="dspl" style={{ fontSize: "clamp(1.5rem, 3vw, 1.875rem)", marginTop: 36, lineHeight: 1.1 }}>
              Setiap pemain punya nama.<br /><span style={{ color: "#155EEF" }}>Setiap tim punya identitas.</span>
            </p>
           </div>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      <section id="testimoni" className="relative py-20 md:py-28">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
          {/* header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-2 text-[11px]" style={{ color: "#00A8FF" }}>
                <span>🏆</span> KATA MEREKA YANG SUDAH MAIN PAKAI
              </p>
              <h2 className="dspl mt-3" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.8rem)", color: "#fff", lineHeight: 1 }}>
                BUKTI BUKAN <span style={{ color: "#00A8FF" }}>JANJI.</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="dspl text-3xl" style={{ color: "#F5A623" }}>4.9<span className="text-lg">/5</span></p>
                <p className="eyebrow text-[8.5px]" style={{ color: "rgba(217,222,231,.5)", marginTop: 4 }}>1.2RB+ REVIEW TIM</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <p className="text-[13px] max-w-[220px]" style={{ color: "rgba(217,222,231,.65)" }}>
                Review asli dari klub, komunitas, dan event yang udah pakai jersey TNT.
              </p>
            </div>
          </div>

          {/* testimonial grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONI.map((t) => (
              <article key={t.nama} className="tst-card reveal group" style={{ padding: 26 }}>
                {/* quote mark */}
                <span className="dspl absolute -top-1 right-5 select-none" style={{ fontSize: "5rem", color: "rgba(0,168,255,.12)", lineHeight: 1 }}>&ldquo;</span>
                <div className="flex items-center gap-1 text-[13px]" style={{ color: "#F5A623" }}>
                  {"★".repeat(t.rating)}
                </div>
                <p className="relative mt-4 text-[14.5px] leading-relaxed" style={{ color: "#E6EAF2" }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3.5">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-full dspl text-[15px]" style={{ background: "linear-gradient(135deg,#155EEF,#00A8FF)", color: "#fff" }}>
                    {t.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold truncate" style={{ color: "#F5F7FA" }}>{t.nama}</p>
                    <p className="eyebrow text-[8px] truncate" style={{ color: "rgba(217,222,231,.5)", marginTop: 3 }}>{t.role}</p>
                  </div>
                </div>
                <p className="eyebrow mt-4 pt-4 border-t border-white/[.07] text-[8.5px]" style={{ color: "#00A8FF" }}>✓ ORDER {t.desain}</p>
              </article>
            ))}
          </div>

          {/* bukti foto strip */}
          <div className="mt-14 overflow-hidden">
            <p className="eyebrow text-[10px] mb-5 flex items-center gap-3" style={{ color: "rgba(217,222,231,.55)" }}>
              <span className="h-px w-8" style={{ background: "rgba(0,168,255,.6)" }} />
              FOTO NYATA DARI LAPANGAN — BUKAN EDIT, BUKAN REKAYASA
            </p>
            <div className="gallery-marquee">
              {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((g, i) => (
                <div key={i} role="button" tabIndex={0} onClick={() => setGalleryActive(i % GALLERY_IMAGES.length)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setGalleryActive(i % GALLERY_IMAGES.length); }} className="cursor-pointer overflow-hidden rounded-2xl" style={{ width: 260, height: 195, flexShrink: 0 }}>
                  <img src={g.src} alt={g.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .5s" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-20 flex flex-col items-center gap-4">
            <a href={wa("Halo TNT SPORT APPAREL, saya lihat testimoni & galeri hasil jersey, saya mau order juga!")} target="_blank" rel="noopener" className="btn px-10 py-4 text-sm">
              Gabung 500+ Tim — Order Sekarang <span aria-hidden="true">→</span>
            </a>
            <p className="eyebrow text-[9px]" style={{ color: "rgba(217,222,231,.40)" }}>Gratis konsultasi desain via WhatsApp</p>
          </div>
        </div>
        {galleryActive !== null && GALLERY_IMAGES[galleryActive] && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,.85)", backdropFilter: "blur(4px)" }} onClick={() => setGalleryActive(null)} role="dialog" aria-modal="true">
            <div className="relative my-auto" style={{ maxWidth: "92vw" }} onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setGalleryActive(null)} aria-label="Tutup" className="absolute -top-2 -right-2 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-white shadow-lg" style={{ background: "#155EEF" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </button>
              <img src={GALLERY_IMAGES[galleryActive].src} alt={GALLERY_IMAGES[galleryActive].alt} className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl" style={{ border: "1px solid rgba(255,255,255,.1)" }} />
              <p className="mt-3 text-center text-sm" style={{ color: "rgba(255,255,255,.6)" }}>{GALLERY_IMAGES[galleryActive].alt}</p>
            </div>
          </div>
        )}
      </section>

      {/* ===== HARGA ===== */}
      <section id="harga" style={{ position: "relative", padding: "80px 0", overflow: "hidden" }}>
        <div className="hero-glow g1" style={{ opacity: 0.45, right: "-24%", top: "8%" }} />
        <div className="grid-lines" />
        <div style={{ position: "relative", maxWidth: 1024, margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
          <p className="reveal eyebrow" style={{ fontSize: 10.5, color: "#00A8FF", marginBottom: 16 }}>Harga &amp; Paket</p>
          <h2 className="reveal dspl" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Pilih <span className="sharp">paket timmu</span>.</h2>
          <p className="reveal" style={{ marginTop: 16, color: "rgba(217,222,231,.85)" }}>Pilih jumlah pembelian, harga akan menyesuaikan otomatis.</p>

          {/* tabs */}
          <div className="reveal" style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 40 }} role="tablist">
            <button role="tab" aria-selected={priceMode === "ecer"} className={`price-tab eyebrow${priceMode === "ecer" ? " is-on" : ""}`} style={{ fontSize: 11 }} onClick={() => handlePriceTab("ecer")}>Ecer</button>
            <button role="tab" aria-selected={priceMode === "lusin"} className={`price-tab eyebrow${priceMode === "lusin" ? " is-on" : ""}`} style={{ fontSize: 11 }} onClick={() => handlePriceTab("lusin")}>Lusin • Hemat</button>
          </div>
          <div className="reveal price-rule" style={{ maxWidth: 448, margin: "16px auto 0" }} />
          <p className="reveal eyebrow" style={{ fontSize: 9.5, color: "rgba(217,222,231,.40)", marginTop: 16 }}>Mulai 12 pcs otomatis dapat harga lusin</p>

          {/* price display */}
          <div className="reveal" style={{ marginTop: 48, textAlign: "left", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ fontSize: 9.5, color: "rgba(0,168,255,.80)" }}>Paket Custom Lengkap</p>
              <div style={{ marginTop: 16, display: "flex", alignItems: "flex-end", gap: 10 }}>
                <span className="dspl" style={{ fontSize: "1.5rem", color: "rgba(217,222,231,.60)", paddingBottom: 12 }}>Rp</span>
                <span className={`dspl price-num${swapping ? " swap" : ""}`} style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}>
                  {priceMode === "lusin" ? "85" : "95"}<span style={{ fontSize: "clamp(1.875rem, 5vw, 3rem)" }}>RB</span>
                </span>
                <span className="eyebrow" style={{ fontSize: 10, color: "rgba(217,222,231,.55)", paddingBottom: 16 }}>/pcs</span>
              </div>
              <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <p className="eyebrow" style={{ fontSize: 9.5, color: "rgba(217,222,231,.55)" }}>
                  {priceMode === "lusin" ? "Berlaku untuk pembelian mulai 12 pcs" : "Bisa beli satuan, tanpa minimal"}
                </p>
                {priceMode === "lusin" && (
                  <span className="eyebrow" style={{ fontSize: 9.5, color: "#E91E8C" }}>Hemat 10rb / pcs</span>
                )}
              </div>
              <div style={{ marginTop: 36 }}>
                <a href="#final" className="btn" style={{ padding: "16px 32px", fontSize: 14 }}>Pilih Desain <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <ul className="price-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16, fontSize: 15, color: "#D9DEE7" }}>
              <li><span className="eyebrow" style={{ fontSize: 9.5, color: "rgba(217,222,231,.45)" }}>Semua paket termasuk</span></li>
              <li><span style={{ color: "#00A8FF" }}>✓</span>Bahan dry-fit premium</li>
              <li><span style={{ color: "#00A8FF" }}>✓</span>Full printing &amp; desain bebas</li>
              <li><span style={{ color: "#00A8FF" }}>✓</span>Nama dan nomor punggung</li>
              <li><span style={{ color: "#00A8FF" }}>✓</span>Logo tim, komunitas &amp; sponsor</li>
              <li><span style={{ color: "#00A8FF" }}>✓</span>Revisi desain dibantu</li>
            </ul>
          </div>

          {/* spec rail */}
          <div className="reveal" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[
              { val: "Free", label: "Biaya desain & nameset" },
              { val: "6", unit: "PCS", label: "Minimal desain sendiri" },
              { val: "12", unit: "PCS", label: "Otomatis harga lusin" },
            ].map((s, i) => (
              <div key={i} className="spec" style={{ textAlign: "left" }}>
                <p className="dspl" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1, color: i === 0 ? undefined : undefined }}>
                  {s.val}{s.unit && <span style={{ fontSize: "0.42em", color: "rgba(217,222,231,.45)", verticalAlign: "super", marginLeft: 4 }}>{s.unit}</span>}
                </p>
                <p className="eyebrow" style={{ fontSize: 9, color: "rgba(217,222,231,.50)", marginTop: 12 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* bulk rail */}
          <div className="reveal bulk-rail" style={{ marginTop: 56, paddingTop: 32, display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "baseline", gap: 20, textAlign: "left" }}>
            <h3 className="dspl" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1, flexShrink: 0 }}>Lebih dari <span style={{ color: "#E91E8C" }}>50 pcs</span>?</h3>
            <p style={{ fontSize: 14, color: "rgba(217,222,231,.70)", flex: 1, lineHeight: 1.6 }}>Harga proyek khusus untuk komunitas, instansi, sekolah, dan event.</p>
            <a href="#final" className="arrow-link eyebrow" style={{ fontSize: 10.5, color: "#00A8FF", flexShrink: 0 }}>Minta Harga Khusus <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      {/* ===== CUSTOM ===== */}
      <section id="custom" style={{ position: "relative", padding: "80px 0", background: "rgba(8,11,16,.6)", borderTop: "1px solid rgba(255,255,255,.08)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
          <div className="reveal" style={{ maxWidth: "48rem" }}>
            <h2 className="dspl" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Desain sesuai <span style={{ color: "#00A8FF" }}>timmu</span>.</h2>
            <p style={{ marginTop: 20, color: "#D9DEE7", lineHeight: 1.6 }}>Tidak perlu mulai dari desain kosong. Pilih desain favorit dari koleksi yang tersedia, lalu sesuaikan dengan identitas tim kamu.</p>
          </div>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {[
              { n: "01", title: "Pilih Desain", desc: "Pilih desain badminton yang paling sesuai dengan karakter tim." },
              { n: "02", title: "Kirim Data", desc: "Kirim nama, nomor, logo, dan sponsor." },
              { n: "03", title: "Custom", desc: "Desain disesuaikan dengan identitas tim kamu." },
              { n: "04", title: "Siap Dimainkan", desc: "Jersey siap digunakan untuk latihan, pertandingan, turnamen, maupun event tim." },
            ].map((s, i) => (
              <div key={i} className="reveal card" style={{ padding: 28 }}>
                <p className="num" style={{ fontSize: "3rem" }}>{s.n}</p>
                <h3 className="dspl" style={{ fontSize: "1.25rem", marginTop: 16 }}>{s.title}</h3>
                <p style={{ marginTop: 10, fontSize: 14, color: "#D9DEE7", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 44 }}>
            <a href="#final" className="btn" style={{ padding: "16px 36px", fontSize: 14 }}>Mulai Custom</a>
          </div>
        </div>
      </section>

      {/* ===== TARGET ===== */}
      <section id="target" style={{ position: "relative", padding: "80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center" }}>
          <div className="reveal">
            <h2 className="dspl" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Untuk tim yang serius <span style={{ color: "#155EEF" }}>di lapangan</span>.</h2>
            <p style={{ marginTop: 20, color: "#D9DEE7", lineHeight: 1.6, maxWidth: "32rem" }}>Dari latihan rutin sampai pertandingan besar, gunakan jersey yang membuat tim terlihat lebih kompak dan profesional.</p>
          </div>
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16 }}>
            {["Klub Badminton", "Komunitas", "Sekolah", "Kampus", "Turnamen", "Tim Kompetitif"].map((t) => (
              <div key={t} className="chip" style={{ padding: "24px 20px" }}>
                <span className="eyebrow" style={{ fontSize: 11 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="final" style={{ position: "relative", padding: "clamp(96px, 12vw, 128px) 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div className="mesh" />
        <div className="speed"><span /><span /><span /><span /><span /></div>
        <div className="reveal" style={{ position: "relative", maxWidth: 896, margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
          <h2 className="dspl" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>Siap tampil <span className="grad-text">lebih tajam</span> di lapangan?</h2>
          <p style={{ marginTop: 24, fontSize: "clamp(1rem, 2vw, 1.125rem)", fontWeight: 600, color: "#F5F7FA" }}>Pilih desain badminton favoritmu dan custom sesuai identitas tim.</p>
          <p className="eyebrow" style={{ marginTop: 16, fontSize: 10.5, color: "rgba(217,222,231,.80)" }}>20+ Desain <span style={{ color: "#E91E8C" }}>•</span> Siap Custom <span style={{ color: "#E91E8C" }}>•</span> Untuk Klub &amp; Komunitas</p>
          <div style={{ marginTop: 40 }}>
            <a href="#collection" className="btn" style={{ padding: "20px 40px", fontSize: 16 }}>Pilih Desain Badminton →</a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "40px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", fontSize: 14, color: "rgba(217,222,231,.70)" }}>
          <span className="dspl" style={{ fontSize: "1rem" }}>Badminton<span style={{ color: "#00A8FF" }}> Collection</span></span>
          <span>Custom Jersey · Klub &amp; Komunitas</span>
        </div>
      </footer>

      {/* ===== TOAST NOTIFICATIONS ===== */}
      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className="toast in">
            <span className="toast-dot" />
            <div style={{ fontSize: 12.5, lineHeight: 1.35, color: "rgba(217,222,231,.80)" }}>
              <span dangerouslySetInnerHTML={{ __html: t.text }} />
              <div className="eyebrow" style={{ fontSize: 8.5, color: "rgba(217,222,231,.40)", marginTop: 6 }}>{t.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
