import type { LandingTestimonial } from "@/lib/category-landing";

/**
 * TestimonialCarousel — auto-scroll horizontal infinite (looping mulus).
 *
 * Strategi (sesuai requirement):
 * - 100% CSS animation (transform: translateX + @keyframes) — tanpa JS sama
 *   sekali (server component), smooth di HP low-end karena jalan di compositor
 *   GPU; tidak konflik dengan scroll vertikal halaman.
 * - Konten dirender 2x set identik; tiap item memakai margin-right (BUKAN
 *   flex gap) supaya loop translateX(-50%) presisi mulus sekaligus aman dari
 *   bug flexbox gap di Safari iOS lama.
 * - Fallback tanpa animasi (browser lama / JS gagal load): strip statis yang
 *   tetap bisa di-swipe horizontal (overflow-x: auto).
 * - prefers-reduced-motion: animasi mati total, tampil sebagai strip statis.
 * - Pause saat hover / touch-and-hold / fokus keyboard via animation-play-state.
 * - will-change: transform HANYA di track yang dianimasi.
 * - Tidak ada unit vh — aman terhadap collapse-nya address bar Safari iOS.
 * - Card width min(21rem, 78vw) — tidak terpotong di layar 375–430px.
 */
export function TestimonialCarousel({ items }: { items: LandingTestimonial[] }) {
  if (!items.length) return null;

  return (
    <div
      className="t-wrap card rounded-3xl py-8 reveal"
      role="region"
      aria-label="Testimoni pelanggan — bergulir otomatis, tahan untuk berhenti"
    >
      <div className="t-track">
        {/* Set pertama */}
        {items.map((r, i) => (
          <TestimonialCard key={`a-${r.name}-${i}`} r={r} />
        ))}
        {/* Duplikat set yang sama — bikin loop -50% tanpa patah */}
        {items.map((r, i) => (
          <TestimonialCard key={`b-${r.name}-${i}`} r={r} ariaHidden />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ r, ariaHidden = false }: { r: LandingTestimonial; ariaHidden?: boolean }) {
  return (
    <figure className="t-item card rounded-2xl p-6 flex flex-col" aria-hidden={ariaHidden || undefined}>
      <span
        className="self-start rounded-full px-2.5 py-1 text-[11px] font-bold inline-flex items-center gap-1.5"
        style={{ background: "rgba(34,197,94,.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,.3)" }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Verified Buyer
      </span>
      <div className="mt-3 text-[#ff6b00] tracking-wider" aria-label="Rating 5 dari 5">
        {"★★★★★"}
      </div>
      <blockquote className="mt-3 text-[15px] leading-relaxed text-white/85 italic flex-1">
        &ldquo;{r.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 pt-4 border-t border-white/10">
        <p className="font-bold">— {r.name}, {r.team}</p>
        <p className="text-sm text-[#9aa1ad] mt-0.5 flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          {r.city}
        </p>
      </figcaption>
    </figure>
  );
}
