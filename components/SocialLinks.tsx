import { SocialLinkIcon } from "@/components/SocialLinkIcon";
import type { SocialLink } from "@/lib/types";

/** Small arrow rule used on both sides of the "IKUTI KAMI" heading. */
function ArrowRule({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="44"
      height="10"
      viewBox="0 0 44 10"
      fill="none"
      aria-hidden="true"
      className={`text-primary ${direction === "left" ? "" : "rotate-180"}`}
    >
      <path d="M2 5h36M38 5l-5-4M38 5l-5 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * SocialLinks — "→ IKUTI KAMI ←" heading with arrow rules and a
 * 5-up grid of brand-colored icon tiles, matching the reference.
 */
export function SocialLinks({ items }: { items: SocialLink[] }) {
  return (
    <section aria-label="Tautan media sosial" className="w-full">
      <div className="flex items-center justify-center gap-3 text-center">
        <ArrowRule direction="left" />
        <p className="text-sm font-extrabold uppercase tracking-[.08em] text-primary">Ikuti Kami</p>
        <ArrowRule direction="right" />
      </div>
      <div className="mt-5 grid grid-cols-5 gap-2 sm:gap-4">
        {items.map((s) => (
          <SocialLinkIcon key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
