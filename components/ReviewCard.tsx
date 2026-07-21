import { StarIcon, VerifiedBadgeIcon } from "@/components/icons";
import type { Review } from "@/lib/types";

/**
 * ReviewCard — premium testimonial card.
 *
 * Hierarchy:
 *  - 5-star rating (brand green) on top
 *  - Quote as the focal point (larger, comfortable line-height)
 *  - Footer: identity block that reads like a real customer profile —
 *    a clean initial avatar fused with the name, a blue social-style
 *    verified badge, and a neat role · location line beneath.
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

      {/* Footer — customer identity block */}
      <figcaption className="flex items-center gap-3 border-t border-hairline pt-4 sm:gap-3.5 sm:pt-5">
        {/* Initial avatar — fused with the name as a single identity unit */}
        <span
          aria-hidden="true"
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold leading-none",
            highlight
              ? "bg-gradient-brand text-on-primary shadow-premium-sm ring-2 ring-primary/20"
              : "bg-primary/10 text-primary ring-1 ring-inset ring-primary/25 dark:bg-primary/15 dark:ring-primary/30",
          ].join(" ")}
        >
          {initial}
        </span>

        {/* Identity text — name + verified badge, then role · location */}
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-button-md text-ink">{name}</span>
            <VerifiedBadgeIcon className="h-[18px] w-[18px] shrink-0" />
          </span>
          <span className="flex items-center gap-1.5 truncate text-caption text-mute">
            {identity && (
              <>
                <span className="truncate font-medium text-charcoal">
                  {identity}
                </span>
                <span aria-hidden="true" className="text-stone">·</span>
              </>
            )}
            <span className="truncate">{location}</span>
          </span>
        </span>
      </figcaption>
    </figure>
  );
}