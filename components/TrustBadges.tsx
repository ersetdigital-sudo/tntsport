import type { TrustBadge } from "@/lib/types";

/**
 * TrustBadges — 4-column grid (2x2 on mobile) with icon, bold title,
 * and gray subtext. Matches the screenshot's trust indicator row.
 */
export function TrustBadges({ badges }: { badges: TrustBadge[] }) {
  return (
    <section aria-label="Keunggulan" className="w-full">
      <div className="grid grid-cols-2 gap-lg md:grid-cols-4">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.label} className="flex flex-col items-center gap-xs text-center">
              {Icon ? (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              ) : null}
              <span className="text-body-sm font-bold uppercase text-ink">
                {b.label}
              </span>
              {b.subtext ? (
                <span className="text-caption text-mute">{b.subtext}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
