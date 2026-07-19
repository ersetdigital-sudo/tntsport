import { CTALinkCard } from "@/components/CTALinkCard";
import type { CTALink } from "@/lib/types";

/**
 * CTALinks — full-width link-in-bio style list (linktree-like).
 *
 * Each row is a CTALinkCard. Stacked vertically with lg gap. The list
 * is a <ul> for semantics; each <li> wraps a card so screen readers
 * announce the count.
 */
export function CTALinks({ items }: { items: CTALink[] }) {
  return (
    <section aria-label="Tautan cepat" className="w-full">
      <ul className="flex flex-col gap-lg">
        {items.map((cta) => (
          <li key={cta.title}>
            <CTALinkCard {...cta} />
          </li>
        ))}
      </ul>
    </section>
  );
}
