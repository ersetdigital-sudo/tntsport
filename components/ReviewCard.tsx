import { Badge } from "@/components/Badge";
import { StarIcon } from "@/components/icons";
import type { Review } from "@/lib/types";

/**
 * ReviewCard - glass testimonial card.
 *
 * Layout: 5-star rating row (warning amber), quote (body-lg), then a
 * footer with name + location + "Verified" success badge. Card lifts
 * on hover for the premium feel.
 */
export function ReviewCard({ rating, quote, name, location }: Review) {
  return (
    <figure className="glass lift-on-hover hover:shadow-premium-lg rounded-2xl p-xl flex h-full flex-col gap-md">
      {/* Stars */}
      <div
        className="flex gap-xxs text-warning"
        role="img"
        aria-label={`Rating ${rating} dari 5 bintang`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className="h-4 w-4"
            aria-hidden="true"
            style={{ opacity: i < rating ? 1 : 0.25 }}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-body-lg text-ink flex-1 leading-relaxed">
        “{quote}”
      </blockquote>

      {/* Footer */}
      <figcaption className="flex flex-wrap items-center gap-sm pt-xs">
        <span className="text-button-md text-ink">{name}</span>
        <span className="text-caption text-on-dark-mute">· {location}</span>
        <Badge variant="success" className="ml-auto">
          <span className="text-button-sm">Verified</span>
        </Badge>
      </figcaption>
    </figure>
  );
}
