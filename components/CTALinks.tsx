import { CTALinkCard } from "@/components/CTALinkCard";
import type { CTALink } from "@/lib/types";

/**
 * CTALinks — full-width link-in-bio style list.
 *
 * Cards are stacked vertically with a comfortable gap on mobile
 * and slightly looser spacing on desktop so each bold CTA card
 * has room to breathe and draw the eye.
 */
export function CTALinks({ items }: { items: CTALink[] }) {
  return (
    <section aria-label="Tautan cepat" className="w-full">
      <ul className="flex flex-col gap-4 sm:gap-xl">
        {items.map((cta) => (
          <li key={cta.title}>
            <CTALinkCard {...cta} />
          </li>
        ))}
      </ul>
    </section>
  );
}