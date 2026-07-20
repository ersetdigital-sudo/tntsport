import type { TrustBadge } from "@/lib/types";

/**
 * TrustBadges — modern 2x2 / 4-up card grid: soft-green icon tiles,
 * bold labels, subtle borders with a green hover lift.
 */
export function TrustBadges({ badges }: { badges: TrustBadge[] }) {
  return (
    <section aria-label="Keunggulan" className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.label}
              className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-black/[.06] bg-surface-card px-3 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md dark:border-white/10"
            >
              {/* subtle corner glow accent */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary/[.07] transition-transform duration-300 group-hover:scale-150"
              />
              {Icon ? (
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
                </span>
              ) : null}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-extrabold uppercase leading-tight tracking-[.02em] text-ink sm:text-xs">
                  {b.label}
                </span>
                {b.subtext ? (
                  <span className="text-[10px] leading-tight text-mute sm:text-[11px]">{b.subtext}</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
