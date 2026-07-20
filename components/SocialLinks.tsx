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
      <div className="text-center">
        <p className="section-kicker">Jangan kehilangan momen</p>
        <h2 className="mt-2 text-heading-lg text-ink">Ikuti perjalanan kami</h2>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-lg md:grid-cols-5 md:gap-xl">
        {items.map((s) => (
          <SocialLinkIcon key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
