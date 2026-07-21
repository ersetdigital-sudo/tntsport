import { CheckIcon, StarIcon } from "@/components/icons";
import type { Review } from "@/lib/types";

/**
 * ReviewCard — premium testimonial card.
 *
 * Hierarchy:
 *  - 5-star rating (brand green) on top
 *  - Quote as the focal point (larger, comfortable line-height)
 *  - Footer: small avatar initial + name + inline VERIFIED + muted role
 *
 * `highlight` marks the featured testimonial: brand-tinted surface, an
 * accent left rule, and a subtle "Ulasan utama" tag. Other cards stay
 * on the default white/surface-card background.
 */
type ReviewCardProps = Review & {
  highlight?: boolean;
};

export function ReviewCard({ rating, quote, name, location, identity, highlight = false }: ReviewCardProps) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <figure
      className={[
        "lift-on-hover relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border p-5 sm:gap-5 sm:p-6",
        highlight
          ? "border-primary/30 bg-primary/[0.06] shadow-premium-md dark:border-primary/30 dark:bg-primary/[0.08]"
          : "border-hairline bg-white shadow-premium-sm hover:shadow-premium-lg dark:border-white/10 dark:bg-surface-card",
      ].join(" ")}
    >
      {/* Accent left rule on highlight card */}
      {highlight && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 bg-gradient-brand"
        />
      )}

      {/* Rating */}
      <div
        className="flex gap-xxs text-primary"
        role="img"
        aria-label={`Rating ${rating} dari 5 bintang`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
            aria-hidden="true"
            style={{ opacity: i < rating ? 1 : 0.25 }}
          />
        ))}
      </div>

      {/* Quote — focal point */}
      <blockquote className="flex-1 text-body-md leading-relaxed text-ink sm:text-body-lg sm:leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Footer */}
      <figcaption className="flex items-center gap-3 border-t border-hairline pt-4 sm:pt-5">
        <span
          className={[
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold",
            highlight
              ? "bg-primary/15 text-primary ring-1 ring-primary/30"
              : "bg-primary/10 text-primary ring-1 ring-primary/20",
          ].join(" ")}
        >
          {initial}
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <span className="text-button-md text-ink">{name}</span>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold uppercase tracking-wide text-success">
              <CheckIcon className="h-3 w-3" aria-hidden="true" />
              Verified
            </span>
          </span>
          <span className="truncate text-caption text-mute">
            {identity ? `${identity} · ${location}` : location}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}