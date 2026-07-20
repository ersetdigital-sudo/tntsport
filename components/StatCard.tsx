import type { StatItem } from "@/lib/types";

/**
 * StatCard - single stat column inside the stats banner.
 * Responsive: smaller on mobile, larger on desktop.
 */
export function StatCard({ value, label, icon: Icon }: StatItem) {
  return (
    <div className="flex flex-col items-center gap-xxs py-sm text-center sm:py-md">
      <div className="flex items-center gap-xxs sm:gap-xs">
        {Icon ? (
          <Icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" aria-hidden="true" />
        ) : null}
        <span className="text-heading-md font-bold text-primary sm:text-heading-lg">
          {value}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-wide text-mute sm:text-button-sm">
        {label}
      </span>
    </div>
  );
}
