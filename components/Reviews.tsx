import { ReviewCard } from "@/components/ReviewCard";
import { StarIcon } from "@/components/icons";
import type { Review } from "@/lib/types";

/**
 * Reviews — customer testimonial section.
 *
 * Layout: 3-up grid on desktop with the first review as a highlight card
 * (brand-tinted surface + accent left rule). Mobile stacks vertically.
 * Header carries a trust chip: ★ 5.0/5 · dari ratusan pemesanan.
 */
export function Reviews({ items }: { items: Review[] }) {
  const avg = items.length ? items.reduce((sum, r) => sum + r.rating, 0) / items.length : 0;
  const avgLabel = avg ? avg.toFixed(1) : "—";

  return (
    <section aria-label="Ulasan pelanggan" className="w-full">
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Cerita dari lapangan</p>
          <h2 className="mt-2 text-heading-lg text-ink">Ulasan pelanggan</h2>
          <p className="mt-1 text-caption text-charcoal dark:text-white/50">Review asli dari tim yang sudah pesan di TNT SPORT.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-white/60 px-3 py-1.5 text-caption shadow-premium-sm dark:border-white/15 dark:bg-white/[0.08]">
          <StarIcon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span className="font-semibold text-ink dark:text-white">Rating {avgLabel}</span>
          <span className="text-charcoal dark:text-white/60" aria-hidden="true">·</span>
          <span className="text-charcoal dark:text-white/70">dipercaya ratusan tim</span>
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-lg md:grid-cols-3 md:gap-xl items-stretch">
        {items.map((r, i) => (
          <ReviewCard key={r.name} {...r} highlight={i === 0} />
        ))}
      </div>
    </section>
  );
}