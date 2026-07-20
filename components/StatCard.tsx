import type { StatItem } from "@/lib/types";

/**
 * StatCard - single stat column inside the stats banner.
 *
 * Renders: green icon + bold green value + gray uppercase label.
 * Used inside StatsGrid which provides the card container.
 */
export function StatCard({ value, label, icon: Icon }: StatItem) {
  return (
    <div className="flex flex-col items-center gap-xs py-md text-center">
      <div className="flex items-center gap-xs">
        {Icon ? (
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        ) : null}
        <span className="text-heading-md font-bold text-primary">
          {value}
        </span>
      </div>
      <span className="text-button-sm uppercase tracking-wide text-mute">
        {label}
      </span>
    </div>
  );
}
