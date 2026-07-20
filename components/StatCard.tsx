import type { StatItem } from "@/lib/types";

/**
 * StatCard - single stat column inside the stats banner.
 *
 * Each stat shows:
 *  - icon inside a soft green circular container
 *  - large responsive value (mobile: xl → desktop: 3xl)
 *  - small uppercase label below with clear line-break
 */
export function StatCard({ value, label, icon: Icon }: StatItem) {
  return (
    <div className="flex flex-col items-center gap-xs py-sm text-center sm:py-md">
      {/* Soft green icon container */}
      {Icon ? (
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-10 sm:w-10"
          aria-hidden="true"
        >
          <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
        </span>
      ) : null}

      {/* Value */}
      <span className="text-xl font-bold tabular-nums leading-none text-primary sm:text-2xl md:text-3xl">
        {value}
      </span>

      {/* Label */}
      <span className="text-[10px] font-semibold uppercase tracking-wide text-mute sm:text-xs">
        {label}
      </span>
    </div>
  );
}
