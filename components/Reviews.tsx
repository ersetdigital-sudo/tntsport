import { ReviewCard } from "@/components/ReviewCard";
import { StarIcon } from "@/components/icons";
import type { Review } from "@/lib/types";

/**
 * Reviews — customer testimonial section.
 *
 * Grid: 1 column on mobile, 3 columns on desktop. Each ReviewCard
 * stretches to equal height via items-stretch.
 */
export function Reviews({ items }: { items: Review[] }) {
  const avg = items.length ? items.reduce((sum, r) => sum + r.rating, 0) / items.length : 0;
  const avgLabel = avg ? avg.toFixed(1) : "—";

  return (
    <section aria-label="Ulasan pelanggan" className="w-full">
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div>
          <p className="section-kicker">Cerita dari lapangan</p>
          <h2 className="mt-2 text-heading-lg text-ink">Ulasan pelanggan</h2>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-hairline px-3 py-1.5 text-caption text-charcoal">
          <StarIcon className="h-3.5 w-3.5 text-warning" aria-hidden="true" />
          {avgLabel}/5
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-lg md:grid-cols-3 md:gap-xl items-stretch">
        {items.map((r) => (
          <ReviewCard key={r.name} {...r} />
        ))}
      </div>
    </section>
  );
}
