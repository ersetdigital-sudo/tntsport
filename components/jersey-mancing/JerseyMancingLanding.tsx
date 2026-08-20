"use client";

import { useEffect, useRef, useState } from "react";
import { buildWhatsAppLink } from "@/lib/wa";
import "./jersey-mancing.css";

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

const CATALOG_NAMES = [
  "Marlin Strike", "Ocean Wave", "Deep Blue", "Sunset Cast",
  "Tuna Hunter", "Reef Camo", "Night Spot", "Coral Reef",
  "Sailfish", "Storm Sea", "Aqua Line", "Black Water",
  "Golden Hour", "Snapper Pro", "Wild Current", "Shark Bite",
  "Blue Horizon", "Silver Scale", "Kingfish", "River Trail",
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".jmf .reveal:not(.in)");
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

export default function JerseyMancingLanding({ products, waNumber }: Props) {
  useScrollReveal();
  const [catalogActive, setCatalogActive] = useState<number | null>(null);
  const wa = (msg: string) => buildWhatsAppLink(waNumber || WA_DEFAULT, msg);

  return (
    <div className="jmf">
      {/* ===== 1. HERO ===== */}
      <header className="relative overflow-hidden" style={{ background: "var(--navy-deep)" }}>
        <img
          src="/landing/jersey-mancing/1b0b51a0-1cca-4aa0-b6aa-02bac87faed3.jpg"
          alt="Pemancing memakai jersey fishing hoodie premium di atas kapal"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ opacity: 0.45 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(6,26,46,.88),rgba(6,26,46,.68) 45%,rgba(6,26,46,.98))" }} />
        <div className="absolute inset-0 grid-lines" style={{ opacity: 0.6 }} />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <span className="chip-dark inline-block mb-6">Jersey Fishing Hoodie Premium</span>
          <h1 className="h-hero text-4xl sm:text-5xl md:text-6xl max-w-3xl text-white">
            Performa maksimal.<br /><span className="cyan">Gaya maksimal.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl font-semibold text-white">
            Jersey Fishing Hoodie Premium untuk kamu yang serius di dunia mancing.
          </p>
          <p className="mt-4 max-w-xl text-base md:text-lg" style={{ color: "var(--silver)" }}>
            Nyaman dipakai berjam-jam, ringan, adem, cepat kering, dan tampil beda dengan desain eksklusif
            yang bisa kamu custom sesuai identitas tim atau komunitas.
          </p>
          <div className="mt-8 card-dark p-5 max-w-md">
            <p className="kicker" style={{ color: "var(--silver)" }}>BONUS CUSTOM GRATIS</p>
            <p className="display text-2xl md:text-3xl mt-2 text-white">Nameset <span className="cyan">•</span> Logo <span className="cyan">•</span> Sponsor</p>
            <p className="mt-3 text-white">
              <span className="display text-2xl" style={{ color: "var(--orange)" }}>Rp135.000</span>{" "}
              <span style={{ color: "var(--silver)" }}>/ jersey</span>
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={wa("Halo, saya ingin custom jersey fishing hoodie premium. Boleh dibantu?")} target="_blank" rel="noopener" className="btn">Custom jersey sekarang</a>
            <a href="#harga" className="btn btn-line">Lihat harga</a>
          </div>
        </div>
      </header>

      {/* ===== 2. MASALAH ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="reveal">
              <div className="rule mb-6" />
              <h2 className="text-3xl md:text-4xl" style={{ color: "var(--navy-deep)" }}>Mancing bukan cuma soal dapat ikan.</h2>
              <div className="mt-6 space-y-4 text-lg" style={{ color: "var(--ink-soft)" }}>
                <p>Buat pemancing, kenyamanan saat berada di spot itu penting.</p>
                <p>Panas, keringat, aktivitas bergerak, dan waktu mancing yang panjang bisa bikin pakaian terasa gerah dan tidak nyaman.</p>
                <p>Belum lagi kalau datang bareng komunitas atau tim.</p>
                <p className="font-semibold" style={{ color: "var(--navy-deep)" }}>Masa sudah punya tim, tapi tampilannya masih biasa-biasa aja?</p>
                <p className="display text-2xl" style={{ color: "var(--navy)" }}>Saatnya pakai jersey yang memang dibuat untuk dunia mancing.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 reveal">
              <figure>
                <img src="/landing/jersey-mancing/a4fddaa0-cc8e-4288-920b-7926d7c23193.png" alt="Model memakai jersey fishing hoodie tampak depan" className="w-full rounded-2xl object-contain" style={{ aspectRatio: "3/4", border: "1px solid #E1E9F1", background: "#F4F7FA" }} />
                <figcaption className="mt-2 text-center kicker" style={{ color: "var(--ink-soft)" }}>TAMPAK DEPAN</figcaption>
              </figure>
              <figure>
                <img src="/landing/jersey-mancing/1ff3fc70-35fa-43bf-a42c-c1ee06d82572.png" alt="Model memakai jersey fishing hoodie tampak belakang" className="w-full rounded-2xl object-contain" style={{ aspectRatio: "3/4", border: "1px solid #E1E9F1", background: "#F4F7FA" }} />
                <figcaption className="mt-2 text-center kicker" style={{ color: "var(--ink-soft)" }}>TAMPAK BELAKANG</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. SOLUSI ===== */}
      <section className="relative overflow-hidden" style={{ background: "var(--navy)" }}>
        <div className="absolute inset-0 grid-lines" style={{ opacity: 0.7 }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="rule mb-6" />
          <h2 className="text-3xl md:text-4xl max-w-2xl text-white">Satu jersey untuk performa &amp; identitas tim</h2>
          <p className="mt-6 max-w-2xl text-lg" style={{ color: "var(--silver)" }}>
            Jersey Fishing Hoodie Premium dirancang untuk menemani aktivitas mancing kamu tanpa mengorbankan
            kenyamanan maupun penampilan.
          </p>
          <p className="mt-4 display text-xl md:text-2xl cyan">Ringan. Adem. Cepat kering. Dan tampil lebih profesional.</p>
          <p className="mt-10 kicker" style={{ color: "var(--silver)" }}>COCOK DIGUNAKAN UNTUK</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {["Mancing harian", "Mancing laut", "Mancing freshwater", "Komunitas mancing", "Tim mancing", "Turnamen", "Gathering", "Hunting spot bersama"].map((item) => (
              <span key={item} className="chip-dark">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. KEUNGGULAN ===== */}
      <section id="keunggulan" style={{ background: "var(--gray)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="rule mb-6" />
          <h2 className="text-3xl md:text-4xl max-w-2xl" style={{ color: "var(--navy-deep)" }}>Kenapa pilih jersey fishing hoodie ini?</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="card-light p-7 reveal">
              <p className="num">01</p>
              <h3 className="mt-3 text-xl" style={{ color: "var(--navy-deep)" }}>Bahan dry fit</h3>
              <p className="mt-3" style={{ color: "var(--ink-soft)" }}>Ringan dan nyaman digunakan untuk aktivitas outdoor. Membantu menjaga tubuh tetap nyaman saat berkeringat dan lebih cepat kering.</p>
            </div>
            <div className="card-light p-7 reveal">
              <p className="num">02</p>
              <h3 className="mt-3 text-xl" style={{ color: "var(--navy-deep)" }}>Adem &amp; nyaman</h3>
              <p className="mt-3" style={{ color: "var(--ink-soft)" }}>Sirkulasi udara maksimal untuk membantu mengurangi rasa gerah saat digunakan dalam aktivitas panjang.</p>
            </div>
            <div className="card-light p-7 reveal">
              <p className="num">03</p>
              <h3 className="mt-3 text-xl" style={{ color: "var(--navy-deep)" }}>Jahitan kuat</h3>
              <p className="mt-3" style={{ color: "var(--ink-soft)" }}>Dibuat dengan jahitan yang kuat untuk menemani aktivitas outdoor dan penggunaan berulang.</p>
            </div>
            <div className="card-light p-7 reveal">
              <p className="num">04</p>
              <h3 className="mt-3 text-xl" style={{ color: "var(--navy-deep)" }}>Desain fishing eksklusif</h3>
              <p className="mt-3" style={{ color: "var(--ink-soft)" }}>Bukan jersey biasa. Visualnya dibuat dengan karakter khas dunia mancing yang membuat penampilan kamu lebih standout di spot maupun saat berkumpul bersama komunitas.</p>
            </div>
            <div className="p-7 md:col-span-2 rounded-[18px] reveal" style={{ background: "var(--navy-deep)" }}>
              <p className="num" style={{ color: "var(--cyan)" }}>05</p>
              <h3 className="mt-3 text-xl text-white">Custom gratis</h3>
              <p className="mt-3" style={{ color: "var(--silver)" }}>Bikin jersey kamu lebih personal.</p>
              <p className="mt-4 kicker cyan">GRATIS CUSTOM</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <span className="chip-dark">Nameset</span>
                <span className="chip-dark">Logo tim</span>
                <span className="chip-dark">Logo komunitas</span>
                <span className="chip-dark">Logo sponsor</span>
              </div>
              <p className="mt-5 display text-xl text-white">Satu jersey, <span className="cyan">satu identitas.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. EMOTIONAL ===== */}
      <section className="relative overflow-hidden" style={{ background: "var(--navy-deep)" }}>
        <img src="/landing/jersey-mancing/bf91d06a-0c92-4bcb-afac-169dc8155fab.jpg" alt="Tim mancing memakai jersey seragam di dermaga saat matahari terbit" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.4 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(6,26,46,.96),rgba(6,26,46,.55))" }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl reveal">
            <div className="rule mb-6" />
            <h2 className="text-3xl md:text-5xl text-white">Bawa nama tim kamu ke setiap spot.</h2>
            <div className="mt-6 space-y-4 text-lg" style={{ color: "#D6E3EE" }}>
              <p>Bayangin datang ke spot mancing bareng teman-teman. Semua pakai jersey dengan nama, logo, dan identitas tim sendiri.</p>
              <p>Bukan cuma terlihat kompak. Tapi terasa seperti <strong className="cyan">satu tim.</strong></p>
              <p>Karena setiap perjalanan mancing punya cerita. Dan setiap tim punya identitas.</p>
              <p className="display text-2xl text-white">Bikin jersey yang ikut menjadi bagian dari cerita itu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. CUSTOM ===== */}
      <section style={{ background: "linear-gradient(135deg,var(--navy-deep) 0%,var(--navy-soft) 55%,#15607F 100%)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div className="reveal">
              <div className="h-[2px] w-16 mb-6" style={{ background: "rgba(255,255,255,.6)" }} />
              <h2 className="text-3xl md:text-4xl text-white">Custom sesuai identitas kamu</h2>
              <div className="mt-6 space-y-3 text-lg" style={{ color: "#E4F3F8" }}>
                <p>Punya nama tim? Punya komunitas? Punya sponsor?</p>
                <p>Atau ingin bikin jersey dengan nama sendiri?</p>
                <p className="display text-3xl text-white">Bisa.</p>
                <p>Kamu cukup kirim detail custom yang diinginkan. Tim kami akan membantu menyesuaikan desain jersey dengan identitas kamu.</p>
              </div>
            </div>
            <div className="rounded-[18px] p-8 bg-white reveal">
              <p className="kicker" style={{ color: "var(--ink-soft)" }}>CUSTOM GRATIS</p>
              <p className="display text-3xl mt-3" style={{ color: "var(--navy-deep)" }}>Nameset <span className="cyan">+</span> Logo <span className="cyan">+</span> Sponsor</p>
              <p className="mt-4" style={{ color: "var(--ink-soft)" }}>Tanpa perlu bikin desain dari nol.</p>
              <a href={wa("Halo, saya ingin custom jersey fishing. Nameset + Logo + Sponsor. Boleh dibantu?")} target="_blank" rel="noopener" className="btn mt-7">Custom jersey sekarang</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. SOCIAL PROOF ===== */}
      <section style={{ background: "var(--gray)" }}>
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl" style={{ color: "var(--navy-deep)" }}>Dipakai buat mancing, tetap keren buat foto.</h2>
          <p className="mt-6 text-lg" style={{ color: "var(--ink-soft)" }}>Jersey yang nyaman untuk aktivitas. Sekaligus cukup keren untuk dipakai saat:</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Mancing", "Tournament", "Gathering", "Komunitas", "Hunting Spot"].map((item) => (
              <span key={item} className="chip-light">{item}</span>
            ))}
          </div>
          <p className="mt-8 display text-xl" style={{ color: "var(--navy)" }}>Karena outfit pemancing juga bisa punya style.</p>
        </div>
      </section>

      {/* ===== 8. TARGET AUDIENCE ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="rule mb-6" />
          <h2 className="text-3xl md:text-4xl" style={{ color: "var(--navy-deep)" }}>Cocok buat kamu yang...</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 text-lg">
            {[
              "Sering mancing dan butuh pakaian yang nyaman untuk aktivitas outdoor",
              "Punya komunitas atau tim mancing",
              "Mau bikin jersey tim yang terlihat lebih profesional",
              "Ikut event atau turnamen mancing",
              "Mau punya jersey dengan nama dan logo sendiri",
              "Ingin tampil kompak saat mancing bareng",
            ].map((item) => (
              <li key={item} className="card-light p-5 flex gap-3">
                <span className="check">✓</span>
                <span style={{ color: "var(--ink-soft)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 9. KATALOG ===== */}
      <section id="katalog" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center">
            <div className="rule mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl" style={{ color: "var(--navy-deep)" }}>Katalog desain jersey</h2>
            <p className="mt-4 text-lg" style={{ color: "var(--ink-soft)" }}>{products.length} pilihan desain. Semua bisa dicustom nameset, logo, dan sponsor.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {products.map((p, i) => (
              <article key={p.id} className="catalog-card reveal">
                <button
                  type="button"
                  onClick={() => setCatalogActive(i)}
                  className="block w-full text-left p-0 bg-transparent cursor-pointer"
                  aria-label={`Perbesar foto: ${p.alt}`}
                >
                  <div className="catalog-thumb overflow-hidden">
                    {p.image.includes("placeholder") ? (
                      <span>KODE {String(i + 1).padStart(2, "0")}</span>
                    ) : (
                      <img src={p.image} alt={p.alt} className="transition-transform duration-500 hover:scale-105" loading="lazy" />
                    )}
                  </div>
                </button>
                <div className="p-3 md:p-4 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="display text-sm md:text-base truncate" style={{ color: "var(--navy-deep)" }}>{p.catalogue}</p>
                  </div>
                  <a
                    href={wa(`Halo, saya tertarik desain ${p.catalogue} di kategori Jersey Fishing. Bisa info lebih lanjut?`)}
                    target="_blank"
                    rel="noopener"
                    className="font-semibold shrink-0 transition-colors text-xs"
                    style={{ color: "var(--orange-cta)" }}
                  >
                    Pilih →
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href={wa("Halo, saya ingin pilih desain jersey fishing dan pesan. Boleh dibantu?")} target="_blank" rel="noopener" className="btn">Pilih desain &amp; pesan</a>
          </div>
        </div>

        {/* Catalog Lightbox */}
        {catalogActive !== null && products[catalogActive] && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,.85)", backdropFilter: "blur(4px)" }}
            onClick={() => setCatalogActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative my-auto" style={{ maxWidth: "92vw" }} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setCatalogActive(null)}
                aria-label="Tutup"
                className="absolute -top-2 -right-2 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-white shadow-lg"
                style={{ background: "var(--orange-cta)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={products[catalogActive].image}
                alt={products[catalogActive].alt}
                className="max-h-[65vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                style={{ border: "1px solid rgba(255,255,255,.1)" }}
              />
              <p className="mt-3 text-center text-sm font-bold" style={{ color: "rgba(255,255,255,.8)" }}>{products[catalogActive].catalogue}</p>
              <div className="mt-4 flex justify-center">
                <a
                  href={wa(`Halo, saya tertarik desain ${products[catalogActive].catalogue} di kategori Jersey Fishing. Bisa info lebih lanjut?`)}
                  target="_blank"
                  rel="noopener"
                  className="btn text-sm px-6 py-3"
                >
                  🎣 Tanya Desain Ini via WhatsApp →
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== 10. HARGA ===== */}
      <section id="harga" style={{ background: "var(--gray)" }}>
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="text-center">
            <div className="rule mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl" style={{ color: "var(--navy-deep)" }}>Harga jersey fishing hoodie</h2>
            <p className="mt-4 text-lg" style={{ color: "var(--ink-soft)" }}>Satu harga, semua custom sudah termasuk. Tanpa biaya desain tambahan.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-[1.1fr_1fr] items-stretch">
            {/* Kartu Harga */}
            <div className="relative overflow-hidden rounded-[22px] p-8 md:p-10 reveal" style={{ background: "linear-gradient(150deg,var(--navy-deep) 0%,#12303A 55%,#17475A 100%)" }}>
              <div className="absolute inset-0 grid-lines" style={{ opacity: 0.5 }} />
              <div className="relative">
                <span className="chip-dark inline-block">Paket Custom Lengkap</span>
                <p className="mt-6 kicker" style={{ color: "var(--silver)" }}>HARGA PER JERSEY</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="display text-2xl md:text-3xl" style={{ color: "var(--orange)" }}>Rp</span>
                  <span className="display text-6xl md:text-7xl leading-none" style={{ color: "var(--orange)" }}>135.000</span>
                </div>
                <p className="mt-4 text-lg" style={{ color: "#E4F3F8" }}>Sudah termasuk <strong style={{ color: "var(--orange)" }}>FREE CUSTOM</strong> — tanpa biaya tambahan.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="chip-dark">Custom Desain</span>
                  <span className="chip-dark">Nameset</span>
                  <span className="chip-dark">Logo</span>
                  <span className="chip-dark">Sponsor</span>
                </div>
                <a href={wa("Halo, saya ingin pesan jersey fishing hoodie premium Rp135.000. Boleh dibantu?")} target="_blank" rel="noopener" className="btn mt-8">Pesan sekarang</a>
              </div>
            </div>

            {/* Rincian */}
            <div className="card-light p-8 md:p-10 flex flex-col justify-center reveal">
              <p className="kicker" style={{ color: "var(--ink-soft)" }}>SUDAH TERMASUK</p>
              <ul className="mt-5 space-y-4 text-lg" style={{ color: "var(--ink-soft)" }}>
                <li className="flex gap-3"><span className="check">✓</span> Bahan dry fit premium</li>
                <li className="flex gap-3"><span className="check">✓</span> Desain fishing eksklusif</li>
                <li className="flex gap-3"><span className="check">✓</span> Custom nameset GRATIS</li>
                <li className="flex gap-3"><span className="check">✓</span> Custom logo tim &amp; komunitas GRATIS</li>
                <li className="flex gap-3"><span className="check">✓</span> Custom logo sponsor GRATIS</li>
              </ul>
              <p className="mt-7 pt-6 text-base" style={{ borderTop: "1px solid #E1E9F1", color: "var(--ink-soft)" }}>
                Order rombongan atau satuan sama-sama bisa. Kirim nama, logo, atau desain kamu — tim kami yang bantu susun.
              </p>
            </div>
          </div>

          {/* Custom Desain Sendiri */}
          <div className="mt-8 card-light p-8 md:p-10 reveal">
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <p className="kicker" style={{ color: "var(--ink-soft)" }}>OPSI CUSTOM PENUH</p>
                <h3 className="display text-2xl md:text-3xl mt-2" style={{ color: "var(--navy-deep)" }}>Mau desain sendiri? Bebas.</h3>
                <p className="mt-3 text-lg" style={{ color: "var(--ink-soft)" }}>
                  Kamu bisa custom desain dari nol — bebas pilih warna, motif, layout, nameset, logo tim, sampai logo sponsor.
                  Tinggal kirim referensi atau file desainmu, tim kami yang rapikan.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="chip-light">Bebas warna</span>
                  <span className="chip-light">Bebas motif</span>
                  <span className="chip-light">Desain dari nol</span>
                  <span className="chip-light">Revisi dibantu</span>
                </div>
              </div>
              <div className="rounded-[18px] p-6 text-center" style={{ background: "var(--navy-deep)" }}>
                <p className="kicker" style={{ color: "var(--silver)" }}>MINIMAL ORDER</p>
                <p className="display text-5xl md:text-6xl mt-1 leading-none" style={{ color: "var(--orange)" }}>6</p>
                <p className="mt-2 text-white">pcs untuk custom desain sendiri</p>
                <p className="mt-3 text-sm" style={{ color: "var(--silver)" }}>Harga tetap Rp135.000 / jersey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. OFFER ===== */}
      <section id="order" className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--navy-deep) 0%, #0D2844 50%, var(--navy) 100%)" }}>
        <div className="absolute inset-0 grid-lines" style={{ opacity: 0.4 }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(41,171,226,.12), transparent 60%)" }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="reveal">
              <div className="flex items-center gap-3 mb-6">
                <div className="rule" />
                <span className="kicker" style={{ color: "var(--cyan)" }}>Premium Quality</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight">Saatnya bikin jersey<br />tim kamu sendiri</h2>
              <p className="mt-5 display text-xl md:text-2xl" style={{ color: "var(--cyan)" }}>Jersey Fishing Hoodie Premium</p>
              <p className="mt-4 text-lg" style={{ color: "var(--silver)" }}>Bahan dry fit premium, desain eksklusif, custom gratis. Siap menemani setiap petualangan mancing kamu.</p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: "✓", text: "Bahan Dry Fit Premium" },
                  { icon: "✓", text: "Ringan & Nyaman" },
                  { icon: "✓", text: "Adem untuk Outdoor" },
                  { icon: "✓", text: "Jahitan Kuat" },
                  { icon: "✓", text: "Desain Eksklusif" },
                  { icon: "✓", text: "Custom GRATIS" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold" style={{ background: "var(--cyan)", color: "var(--navy-deep)" }}>{item.icon}</span>
                    <span className="text-sm" style={{ color: "var(--silver)" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="reveal">
              <div className="relative rounded-[24px] p-8 md:p-10" style={{ background: "linear-gradient(180deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.02) 100%)", border: "1px solid rgba(255,255,255,.1)", backdropFilter: "blur(8px)" }}>
                <div className="absolute -top-4 left-8 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider" style={{ background: "var(--orange)", color: "#fff" }}>
                  LIMITED OFFER
                </div>
                <p className="kicker mt-2" style={{ color: "var(--silver)" }}>Mulai custom sekarang</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="display text-4xl md:text-5xl" style={{ color: "var(--orange)" }}>Rp135.000</span>
                  <span className="text-lg" style={{ color: "var(--silver)" }}>/jersey</span>
                </div>
                <p className="mt-3 text-sm" style={{ color: "var(--silver)" }}>Sudah termasuk custom nameset, logo, dan sponsor GRATIS.</p>
                <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
                  <a href={wa("Halo, saya ingin mulai custom jersey fishing hoodie premium. Boleh dibantu?")} target="_blank" rel="noopener" className="btn w-full text-center text-lg py-4">
                    🎣 Pesan Jersey Custom
                  </a>
                </div>
                <p className="mt-4 text-center text-xs" style={{ color: "var(--silver)" }}>Kirim nama, logo, atau desain yang kamu punya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 12. URGENCY ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24 text-center">
          <h2 className="text-3xl md:text-5xl" style={{ color: "var(--navy-deep)" }}>Jangan cuma jadi penonton di spot.</h2>
          <p className="mt-6 text-lg" style={{ color: "var(--ink-soft)" }}>
            Kalau sudah punya tim, komunitas, atau sekadar ingin punya jersey mancing dengan identitas sendiri...
          </p>
          <p className="mt-4 display text-xl md:text-2xl" style={{ color: "var(--navy)" }}>Kenapa tidak sekalian bikin yang benar-benar sesuai karakter kamu?</p>
          <p className="mt-4" style={{ color: "var(--ink-soft)" }}>Custom sekarang dan buat jersey yang siap menemani perjalanan mancing berikutnya.</p>
          <a href={wa("Halo, saya ingin custom jersey fishing. Boleh dibantu?")} target="_blank" rel="noopener" className="btn mt-8">Saya mau custom jersey</a>
        </div>
      </section>

      {/* ===== 13. FINAL CTA / FOOTER ===== */}
      <footer id="final" className="relative overflow-hidden" style={{ background: "var(--navy-deep)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(19,198,230,.28), transparent 62%)" }} />
        <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
          <h2 className="text-3xl md:text-5xl text-white">Siap tampil kompak di spot?</h2>
          <p className="mt-6 text-lg font-semibold" style={{ color: "#DCEAF3" }}>Bikin Jersey Fishing Hoodie Custom untuk tim kamu sekarang.</p>
          <div className="card-dark mt-8 p-6 inline-block">
            <p className="kicker" style={{ color: "var(--silver)" }}>CUSTOM GRATIS</p>
            <p className="display text-2xl md:text-3xl mt-2 text-white">Nameset <span className="cyan">•</span> Logo <span className="cyan">•</span> Sponsor</p>
          </div>
          <div className="mt-8 space-y-1" style={{ color: "var(--silver)" }}>
            <p>Nyaman dipakai.</p>
            <p>Tampil lebih profesional.</p>
            <p>Identitas tim makin kuat.</p>
          </div>
          <a href={wa("Halo, saya ingin custom jersey fishing hoodie premium untuk tim saya. Boleh dibantu?")} target="_blank" rel="noopener" className="btn mt-9 text-lg">Custom jersey sekarang</a>
          <p className="mt-5 text-sm" style={{ color: "var(--silver)" }}>Klik tombol di atas dan konsultasikan desain kamu bersama tim kami.</p>
          <p className="mt-12 text-xs" style={{ color: "#5C7488" }}>Jersey Fishing Hoodie Premium — TNT SPORT APPAREL</p>
        </div>
      </footer>
    </div>
  );
}
