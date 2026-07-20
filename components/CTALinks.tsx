import { CTALinkCard } from "@/components/CTALinkCard";
import type { CTALink } from "@/lib/types";

/**
 * CTALinks — full-width link-in-bio style list.
 *
 * Cards are stacked vertically with a compact gap on mobile
 * and slightly looser spacing on desktop.
 */
export function CTALinks({ items }: { items: CTALink[] }) {
  return (
    <section aria-label="Tautan cepat" className="w-full">
      <ul className="flex flex-col gap-3 sm:gap-lg">
        {items.map((cta) => (
          <li key={cta.title}>
            <CTALinkCard {...cta} />
          </li>
        ))}
      </ul>
    </section>
  );
}
