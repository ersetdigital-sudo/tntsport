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
      <h2 className="text-heading-md text-ink mb-lg">Ulasan Pelanggan</h2>
      <div className="grid grid-cols-1 gap-lg md:grid-cols-3 md:gap-xl items-stretch">
        {items.map((r) => (
          <ReviewCard key={r.name} {...r} />
        ))}
      </div>
    </section>
  );
}
