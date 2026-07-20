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
      <div className="flex items-center justify-center gap-3 text-center"><span className="h-px w-10 bg-primary/40" /><p className="text-sm font-bold uppercase tracking-wide text-primary">Ikuti kami</p><span className="h-px w-10 bg-primary/40" /></div>
      <div className="mt-5 grid grid-cols-5 gap-2 sm:gap-4">
        {items.map((s) => (
          <SocialLinkIcon key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
