"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_LIST,
  ORDER_PHOTO_STAGES,
  getProgress,
  type OrderStatus,
} from "@/lib/types";

const CHECK_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
const SPIN_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3.2-6.9"/></svg>';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function StatusPage() {
  return (
    <Suspense>
      <StatusContent />
    </Suspense>
  );
}

function StatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = (searchParams.get("order") || "").toUpperCase();

  const [phone, setPhone] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const [order, setOrder] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [steps, setSteps] = useState<{ name: string; position: number }[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);

  // Check if already verified — first sessionStorage, then server-side session cookie
  useEffect(() => {
    if (!orderId) return;

    // 1) Fast path: check sessionStorage (set by handleVerify below)
    const key = `tnt_verified_${orderId}`;
    const stored = sessionStorage.getItem(key);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setOrder(data.order);
        setHistory(data.history);
        setLoaded(true);
        return;
      } catch {
        sessionStorage.removeItem(key);
      }
    }

    // 2) Check server-side signed cookie via /api/track/session
    fetch(`/api/track/session?order=${encodeURIComponent(orderId)}`)
      .then((r) => {
        if (!r.ok) throw new Error("no session");
        return r.json();
      })
      .then((data) => {
        if (data.order) {
          sessionStorage.setItem(key, JSON.stringify(data));
          setOrder(data.order);
          setHistory(data.history);
          setLoaded(true);
        } else {
          setShowPhoneModal(true);
        }
      })
      .catch(() => {
        setShowPhoneModal(true);
      });
  }, [orderId]);

  // Animate progress bar
  useEffect(() => {
    if (!order || !loaded) return;
    const stepIdx = steps.length > 0
      ? steps.findIndex((s) => s.name === order.current_status) + 1
      : ORDER_STATUS_LIST.indexOf(order.current_status) + 1;
    const hasTracking = !!(order.tracking_number && order.courier);
    const pct = getProgress(stepIdx, hasTracking);

    // Animate bar
    setTimeout(() => {
      if (barRef.current) barRef.current.style.width = pct + "%";
    }, 100);

    // Animate counter
    let p = 0;
    const iv = setInterval(() => {
      p += 2;
      if (p >= pct) {
        p = pct;
        clearInterval(iv);
      }
      if (pctRef.current) pctRef.current.textContent = String(p);
    }, 18);

    return () => clearInterval(iv);
  }, [order, loaded, steps]);

  // Fetch production steps from DB
  useEffect(() => {
    fetch("/api/pesanan/steps")
      .then((r) => r.json())
      .then((d) => {
        if (d.steps && d.steps.length > 0) {
          setSteps(d.steps.sort((a: any, b: any) => a.position - b.position));
        }
      })
      .catch(() => {});
  }, []);

  // Reveal on scroll
  useEffect(() => {
    if (!loaded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("trk-in");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".trk-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setVerifyError("");
    setVerifying(true);

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: orderId, phone }),
      });

      if (!res.ok) {
        setVerifyError("Nomor HP tidak cocok dengan pesanan ini.");
        setVerifying(false);
        return;
      }

      const data = await res.json();
      if (!data.order) {
        setVerifyError("Nomor HP tidak cocok dengan pesanan ini.");
        setVerifying(false);
        return;
      }

      // Store verification
      sessionStorage.setItem(`tnt_verified_${orderId}`, JSON.stringify(data));
      setOrder(data.order);
      setHistory(data.history);
      setLoaded(true);
      setShowPhoneModal(false);
    } catch {
      setVerifyError("Terjadi kesalahan. Coba lagi.");
      setVerifying(false);
    }
  }

  if (!orderId) {
    return (
      <div className="trk-bg min-h-screen">
        <div className="trk-grid min-h-screen">
          <div className="trk-glow min-h-screen flex items-center justify-center px-5">
            <div className="text-center">
              <p className="text-[#9aa0aa] text-[16px]">Nomor pesanan tidak ditemukan.</p>
              <button
                onClick={() => router.push("/track")}
                className="trk-btn-accent mt-6 px-6 py-3 text-[14px]"
              >
                Kembali ke Tracking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="trk-bg min-h-screen">
        <div className="trk-grid min-h-screen">
          <div className="trk-glow min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 backdrop-blur-md bg-[rgba(10,10,11,.78)] border-b border-[#26282e]">
              <div className="max-w-3xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-3">
                <a
                  href="/track"
                  className="trk-btn-ghost w-9 h-9 grid place-items-center shrink-0"
                  aria-label="Kembali"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M11 18l-6-6 6-6" />
                  </svg>
                </a>
                <div className="leading-none">
                  <p className="trk-stencil text-[9px] text-[#9aa0aa]">TNT Sport Apparel</p>
                  <p className="trk-display text-[15px] mt-1">Detail Progres Pesanan</p>
                </div>
              </div>
            </header>

            {/* Phone verification modal */}
            {showPhoneModal && (
              <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-10">
                <div className="trk-card p-5 sm:p-7 max-w-md mx-auto">
                  <p className="trk-display text-[20px] text-center mb-2">Verifikasi Pesanan</p>
                  <p className="text-[14px] text-[#9aa0aa] text-center mb-6">
                    Masukkan nomor HP untuk melihat{" "}
                    <span className="text-white font-semibold">{orderId}</span>
                  </p>

                  <form onSubmit={handleVerify}>
                    <label className="block">
                      <span className="trk-stencil text-[10px] text-[#9aa0aa]">Nomor HP</span>
                      <input
                        required
                        type="tel"
                        inputMode="numeric"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setVerifyError("");
                        }}
                        placeholder="0812xxxxxxx"
                        autoFocus
                        className="trk-field w-full mt-2 px-4 py-3.5 text-[16px] tracking-wide"
                      />
                    </label>

                    {verifyError && (
                      <p className="mt-4 text-[13.5px] leading-relaxed rounded-xl border border-[rgba(255,59,47,.45)] bg-[rgba(255,59,47,.1)] text-[#ff8b83] px-4 py-3">
                        {verifyError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={verifying}
                      className="trk-btn-accent w-full mt-6 py-4 text-[15px] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {verifying ? "Memverifikasi…" : "Lihat Detail Pesanan"}
                    </button>
                  </form>
                </div>
              </main>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render order details
  const step = steps.length > 0
    ? steps.findIndex((s) => s.name === order.current_status) + 1
    : ORDER_STATUS_LIST.indexOf(order.current_status) + 1;
  const totalSteps = steps.length || 9;
  const hasTracking = !!(order.tracking_number && order.courier);
  const isShipped = order.current_status === "kirim" && hasTracking;
  const pct = getProgress(step, hasTracking);

  return (
    <div className="trk-bg min-h-screen bg-grid">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[rgba(10,10,11,.78)] border-b border-[#26282e]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-3">
          <a
            href="/track"
            className="trk-btn-ghost w-9 h-9 grid place-items-center shrink-0"
            aria-label="Kembali"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
          </a>
          <div className="leading-none">
            <p className="trk-stencil text-[9px] text-[#9aa0aa]">TNT Sport Apparel</p>
            <p className="trk-display text-[15px] mt-1">Detail Progres Pesanan</p>
          </div>
          <a
            href="https://wa.me/628115491117"
            className="ml-auto hidden sm:inline-flex trk-btn-ghost px-4 py-2 text-sm text-[#9aa0aa] hover:text-white"
          >
            Chat Admin
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-6 pb-40">
        {/* ORDER HEADER */}
        <section className="trk-card p-5 sm:p-7 trk-reveal">
          <div className="flex flex-wrap items-start gap-3">
            <div>
              <p className="trk-stencil text-[10px] text-[#9aa0aa]">Nomor Pesanan</p>
              <h1 className="trk-display text-[26px] sm:text-[30px] mt-1.5">
                {order.order_number}
              </h1>
              <p className="text-[15px] text-[#9aa0aa] mt-1">
                a/n <span className="text-white">{order.customer_name}</span>
              </p>
            </div>
            <span
              className={`ml-auto trk-pill ${
                isShipped ? "trk-pill-shipped" : "trk-pill-active"
              }`}
            >
              {ORDER_STATUS_LABELS[order.current_status as OrderStatus]}
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-end justify-between mb-2">
              <span className="trk-stencil text-[10px] text-[#9aa0aa]">Progres Produksi</span>
              <span className="trk-display text-[13px] text-[#3ee86b]">
                <span ref={pctRef}>0</span>%
              </span>
            </div>
            <div className="trk-bar">
              <div ref={barRef} />
            </div>
            <p className="text-[13px] text-[#9aa0aa] mt-2">
              Tahap <span className="text-white font-semibold">{step}</span> dari {totalSteps}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-6 bg-[#26282e] rounded-2xl overflow-hidden">
            <div className="trk-cell">
              <p className="trk-cell-label">Produk</p>
              <p className="trk-cell-value">{order.product_type}</p>
            </div>
            <div className="trk-cell">
              <p className="trk-cell-label">Jumlah</p>
              <p className="trk-cell-value">{order.quantity} pcs</p>
            </div>
            <div className="trk-cell">
              <p className="trk-cell-label">Ukuran</p>
              <p className="trk-cell-value">{order.sizes || "—"}</p>
            </div>
            <div className="trk-cell">
              <p className="trk-cell-label">Custom</p>
              <p className="trk-cell-value">{order.custom_name || "—"}</p>
            </div>
          </div>

          {order.design_notes && (
            <details className="mt-4 group">
              <summary className="cursor-pointer list-none flex items-center justify-between trk-btn-ghost px-4 py-3 text-[14px]">
                <span>Catatan Desain</span>
                <svg className="group-open:rotate-180 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9aa0aa" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="px-4 py-3 text-[14px] text-[#9aa0aa] leading-relaxed">
                {order.design_notes}
              </p>
            </details>
          )}
        </section>

        {/* TRACKER */}
        <section className="trk-card p-5 sm:p-7 mt-6 trk-reveal">
          <div className="flex items-center justify-between">
            <h2 className="trk-display text-[18px]">Progress Tracker</h2>
            <span className="trk-stencil text-[9px] text-[#9aa0aa]">{totalSteps} Tahap</span>
          </div>

          <div className="mt-6">
            {(steps.length > 0 ? steps : ORDER_STATUS_LIST.map((s, i) => ({ name: ORDER_STATUS_LABELS[s as OrderStatus] || s, position: i + 1 }))).map((stepDef, idx) => {
              const n = idx + 1;
              const st = n < step ? "done" : n === step ? "current" : "todo";
              const statusKey = steps.length > 0 ? stepDef.name : ORDER_STATUS_LIST[idx];
              const historyEntry = history.find((h: any) => h.status === statusKey);
              const icon =
                st === "done" ? (
                  <span dangerouslySetInnerHTML={{ __html: CHECK_SVG }} />
                ) : st === "current" ? (
                  <span dangerouslySetInnerHTML={{ __html: SPIN_SVG }} />
                ) : (
                  n
                );
              const meta =
                st === "done"
                  ? "Selesai"
                  : st === "current"
                    ? "Sedang berjalan"
                    : "Menunggu";

              return (
                <div
                  key={stepDef.name}
                  className={`trk-step ${st === "done" ? "trk-done" : ""} ${st === "current" ? "trk-current" : ""} ${st === "todo" ? "trk-todo" : ""}`}
                >
                  <span className="trk-dot">{icon}</span>
                  <p className="trk-label text-[15px]">
                    {stepDef.name}
                  </p>
                  <p
                    className={`text-[12.5px] mt-0.5 ${
                      st === "current" ? "text-[#3ee86b]" : "text-[#6b7280]"
                    }`}
                  >
                    {meta}
                  </p>
                  {historyEntry && (
                    <div className="mt-1">
                      <p className="text-[12px] text-[#6b7280]">
                        {formatShortDate(historyEntry.created_at)}
                      </p>
                      {historyEntry.note && (
                        <p className="text-[12px] text-[#9aa0aa] mt-0.5">
                          {historyEntry.note}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="trk-update-box mt-7">
            <p className="trk-stencil text-[9px] text-[#3ee86b]">Update Terakhir</p>
            <p className="text-[15px] leading-relaxed mt-2">
              {history.length > 0
                ? history[history.length - 1].note ||
                  (steps.length > 0
                    ? steps.find((s) => s.name === history[history.length - 1].status)?.name ||
                      ORDER_STATUS_LABELS[history[history.length - 1].status as OrderStatus]
                    : ORDER_STATUS_LABELS[history[history.length - 1].status as OrderStatus])
                : "Pesanan sedang diproses."}
            </p>
            <p className="text-[13px] text-[#9aa0aa] mt-2">
              {history.length > 0
                ? formatDate(history[history.length - 1].created_at)
                : "—"}
            </p>
          </div>
        </section>

        {/* RIWAYAT */}
        <section className="trk-card p-5 sm:p-7 mt-4 trk-reveal">
          <h2 className="trk-display text-[18px]">Riwayat Produksi</h2>
          <ol className="mt-5 space-y-3 text-[14px]">
            {history.length > 0 ? (
              [...history].reverse().map((h: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#3ee86b] shrink-0" />
                  <span className="flex-1">
                    {steps.length > 0
                      ? steps.find((s) => s.name === h.status)?.name ||
                        ORDER_STATUS_LABELS[h.status as OrderStatus]
                      : ORDER_STATUS_LABELS[h.status as OrderStatus]}
                    {h.note && (
                      <span className="text-[#9aa0aa]"> — {h.note}</span>
                    )}
                  </span>
                  <span className="text-[13px] text-[#9aa0aa] whitespace-nowrap">
                    {formatShortDate(h.created_at)}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-[#9aa0aa]">Belum ada riwayat.</li>
            )}
          </ol>
        </section>

        {/* PENGIRIMAN / KIRIM STATUS */}
        {step === 9 && isShipped && (
          <section className="trk-card p-5 sm:p-7 mt-4 trk-reveal">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[rgba(34,197,94,.14)] border border-[rgba(34,197,94,.5)] grid place-items-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
                  <circle cx="7" cy="18" r="1.6" />
                  <circle cx="17.5" cy="18" r="1.6" />
                </svg>
              </span>
              <div>
                <h2 className="trk-display text-[18px]">Pesanan Telah Dikirim</h2>
                <p className="text-[13px] text-[#9aa0aa]">Pesanan sedang dalam perjalanan.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px mt-5 bg-[#26282e] rounded-2xl overflow-hidden">
              <div className="trk-cell">
                <p className="trk-cell-label">Ekspedisi</p>
                <p className="trk-cell-value">{order.courier}</p>
              </div>
              <div className="trk-cell">
                <p className="trk-cell-label">Nomor Resi</p>
                <p className="trk-cell-value tracking-wide font-mono">{order.tracking_number}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href={
                  order.courier === "JNE"
                    ? "https://www.jne.co.id/tracking-package"
                    : order.courier === "J&T"
                      ? "https://www.jtexpress.co.id/track"
                      : order.courier === "SiCepat"
                        ? "https://www.sicepat.com/checkAWB"
                        : `https://www.google.com/search?q=track+${order.courier}+${order.tracking_number}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="trk-btn-accent flex-1 py-3.5 text-center text-[14px]"
              >
                Lacak Pengiriman
              </a>
              <button
                id="copyResi"
                onClick={(e) => {
                  navigator.clipboard?.writeText(order.tracking_number);
                  const btn = e.currentTarget;
                  btn.textContent = "Tersalin ✓";
                  setTimeout(() => (btn.textContent = "Salin Resi"), 1600);
                }}
                className="trk-btn-ghost px-4 py-3.5 text-[14px] text-[#9aa0aa]"
              >
                Salin Resi
              </button>
            </div>
          </section>
        )}

        {step === 9 && !isShipped && (
          <section className="trk-card p-5 sm:p-7 mt-4 trk-reveal">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[rgba(251,191,36,.14)] border border-[rgba(251,191,36,.5)] grid place-items-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
                  <circle cx="7" cy="18" r="1.6" />
                  <circle cx="17.5" cy="18" r="1.6" />
                </svg>
              </span>
              <div>
                <h2 className="trk-display text-[18px]">Sedang Diproses untuk Pengiriman</h2>
                <p className="text-[13px] text-[#9aa0aa]">Pesanan sudah selesai diproduksi dan sedang disiapkan untuk pengiriman.</p>
              </div>
            </div>
          </section>
        )}

        <p className="text-center text-[13px] text-[#6b7280] mt-8">
          Ada yang mau ditanyakan soal pesanan ini? Tim kami online Senin–Sabtu,
          09.00–17.00 WIB.
        </p>
      </main>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/628115491117?text=Halo%20TNT%20SPORT%2C%20saya%20mau%20tanya%20soal%20pesanan%20saya"
        target="_blank"
        rel="noopener noreferrer"
        className="trk-wa fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2.5 pl-4 pr-5 py-3.5 font-semibold text-[14px]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.45 1.34 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01A9.9 9.9 0 0 0 22 11.92 9.9 9.9 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.4 1.32-1.94 1.36-.5.05-.98.23-3.3-.69-2.78-1.1-4.54-3.93-4.68-4.11-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.57.8 1.96.87 2.1.07.14.11.3.02.48-.09.18-.13.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.28-.12.54.15.27.66 1.09 1.42 1.77.97.87 1.79 1.14 2.05 1.27.26.13.41.11.56-.07.15-.18.65-.76.82-1.02.18-.27.35-.22.59-.13.24.09 1.52.72 1.79.85.26.13.44.2.5.31.07.11.07.64-.17 1.32Z" />
        </svg>
        Chat Admin
      </a>
    </div>
  );
}
