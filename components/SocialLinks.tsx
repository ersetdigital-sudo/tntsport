import { SocialLinkIcon } from "@/components/SocialLinkIcon";
import type { SocialLink } from "@/lib/types";

/**
 * SocialLinks — centered "IKUTI KAMI" header with decorative lines
 * and a 5-up grid of rounded-square social icons with labels.
 */
export function SocialLinks({ items }: { items: SocialLink[] }) {
  return (
    <section aria-label="Tautan media sosial" className="w-full">
      {/* Centered header with decorative arrows */}
      <div className="mb-6 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-hairline-strong" aria-hidden="true" />
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink">
          Ikuti Kami
        </h2>
        <span className="h-px w-8 bg-hairline-strong" aria-hidden="true" />
      </div>

      {/* Social icon grid */}
      <div className="grid grid-cols-5 gap-3 sm:gap-4">
        {items.map((s) => (
          <SocialLinkIcon key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
