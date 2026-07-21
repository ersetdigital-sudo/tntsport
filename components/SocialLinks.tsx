import { SocialLinkIcon } from "@/components/SocialLinkIcon";
import type { SocialLink } from "@/lib/types";

/**
 * SocialLinks — "IKUTI KAMI" heading with a 5-up grid of brand-colored
 * icon tiles, matching the reference.
 */
export function SocialLinks({ items }: { items: SocialLink[] }) {
  return (
    <section aria-label="Tautan media sosial" className="w-full">
      <div className="flex items-center justify-center text-center">
        <p className="text-sm font-extrabold uppercase tracking-[.08em] text-primary">Ikuti Kami</p>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-2 sm:gap-4">
        {items.map((s) => (
          <SocialLinkIcon key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}