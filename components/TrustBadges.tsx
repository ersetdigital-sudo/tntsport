import type { TrustBadge } from "@/lib/types";

/**
 * TrustBadges — 4-column grid with icon, bold title, and gray subtext.
 * Responsive: smaller text/icons on mobile, larger on desktop.
 */
export function TrustBadges({ badges }: { badges: TrustBadge[] }) {
  return (
    <section aria-label="Keunggulan" className="w-full">
      <div className="grid grid-cols-4 gap-xs sm:gap-lg">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.label} className="flex flex-col items-center gap-xs text-center">
              {Icon ? (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-12 sm:w-12">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
              ) : null}
              <span className="text-[11px] font-bold uppercase leading-tight text-ink sm:text-body-sm">
                {b.label}
              </span>
              {b.subtext ? (
                <span className="text-[10px] text-mute sm:text-caption">{b.subtext}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
