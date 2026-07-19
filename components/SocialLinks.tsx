import { SocialLinkIcon } from "@/components/SocialLinkIcon";
import type { SocialLink } from "@/lib/types";

/**
 * SocialLinks — 5-up icon grid for social platforms.
 *
 * Uses a 5-column grid on desktop and a 3-column grid on mobile so
 * the 5 icons wrap to 3+2 cleanly. Each item is a SocialLinkIcon.
 */
export function SocialLinks({ items }: { items: SocialLink[] }) {
  return (
    <section aria-label="Tautan media sosial" className="w-full">
      <h2 className="text-heading-md text-ink mb-lg">Ikuti Kami</h2>
      <div className="grid grid-cols-3 gap-lg md:grid-cols-5 md:gap-xl">
        {items.map((s) => (
          <SocialLinkIcon key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
