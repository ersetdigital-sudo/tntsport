import { Badge } from "@/components/Badge";
import { CheckIcon, StarIcon } from "@/components/icons";
import type { Review } from "@/lib/types";

/**
 * ReviewCard — clean testimonial card.
 *
 * Layout: 5-star rating (amber), quote, footer with avatar initial,
 * name + identity + location, and a "Verified" success badge. Card lifts
 * on hover. Mobile-first: comfortable padding, legible type.
 */
export function ReviewCard({ rating, quote, name, location, identity }: Review) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <figure className="lift-on-hover flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-white p-5 shadow-premium-sm hover:shadow-premium-lg dark:border-white/10 dark:bg-surface-card sm:gap-4 sm:p-6">
      {/* Stars */}
      <div
        className="flex gap-xxs text-warning"
        role="img"
        aria-label={`Rating ${rating} dari 5 bintang`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className="h-4 w-4 sm:h-5 sm:w-5"
            aria-hidden="true"
            style={{ opacity: i < rating ? 1 : 0.25 }}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 text-body-sm leading-relaxed text-ink sm:text-body-md">
        “{quote}”
      </blockquote>

      {/* Footer */}
      <figcaption className="flex items-center gap-3 border-t border-hairline pt-3 sm:pt-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-extrabold text-primary">
          {initial}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className="text-button-md text-ink">{name}</span>
            <Badge variant="success" className="gap-xxs px-1.5 py-0">
              <CheckIcon className="h-3 w-3" aria-hidden="true" />
              <span className="text-button-sm">Verified</span>
            </Badge>
          </span>
          <span className="truncate text-caption text-charcoal">
            {identity ? `${identity} · ${location}` : location}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
