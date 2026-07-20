import type { TrustBadge } from "@/lib/types";

/**
 * TrustBadges — 4-column grid of icon + title + subtext.
 * Reference: clean horizontal row with green icons and uppercase labels.
 */
export function TrustBadges({ badges }: { badges: TrustBadge[] }) {
  return (
    <section aria-label="Keunggulan" className="w-full">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.label} className="flex flex-col items-center gap-2 text-center">
              {Icon ? (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-12 sm:w-12">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
              ) : null}
              <span className="text-[10px] font-bold uppercase leading-tight text-ink sm:text-xs">
                {b.label}
              </span>
              {b.subtext ? (
                <span className="hidden text-[10px] text-mute sm:block sm:text-xs">{b.subtext}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
