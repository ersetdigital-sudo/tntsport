import { ReviewCard } from "@/components/ReviewCard";
import type { Review } from "@/lib/types";

/**
 * Reviews — customer testimonial section.
 *
 * Grid: 1 column on mobile, 3 columns on desktop. Each ReviewCard
 * stretches to equal height via items-stretch (flex inside the card).
 */
export function Reviews({ items }: { items: Review[] }) {
  return (
    <section aria-label="Ulasan pelanggan" className="w-full">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Cerita dari lapangan</p>
          <h2 className="mt-2 text-heading-lg text-ink">Ulasan pelanggan</h2>
        </div>
        <span className="hidden rounded-full border border-hairline px-3 py-1.5 text-caption text-charcoal sm:inline-flex">Rating rata-rata 4.9/5</span>
      </div>
      <div className="grid grid-cols-1 gap-lg md:grid-cols-3 md:gap-xl items-stretch">
        {items.map((r) => (
          <ReviewCard key={r.name} {...r} />
        ))}
      </div>
    </section>
  );
}
