import type { TrustBadge } from "@/lib/types";

/**
 * TrustBadges — 4-up row matching the reference: green outline icons,
 * bold uppercase labels, muted subtext, hairline dividers between cells.
 */
export function TrustBadges({ badges }: { badges: TrustBadge[] }) {
  return (
    <section aria-label="Keunggulan" className="w-full">
      <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-black/[.08] sm:gap-y-0 dark:sm:divide-white/10">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.label} className="flex flex-col items-center gap-2.5 px-2 text-center">
              {Icon ? (
                <span className="flex h-11 w-11 items-center justify-center text-primary sm:h-12 sm:w-12">
                  <Icon className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden="true" strokeWidth={1.5} />
                </span>
              ) : null}
              <span className="text-[11px] font-extrabold uppercase leading-tight tracking-[.02em] text-ink sm:text-xs">
                {b.label}
              </span>
              {b.subtext ? (
                <span className="-mt-1 text-[10px] leading-tight text-mute sm:text-xs">{b.subtext}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
