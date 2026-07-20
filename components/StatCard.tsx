import type { StatItem } from "@/lib/types";

/**
 * StatCard - single stat column inside the stats banner.
 *
 * Each stat shows:
 *  - icon inside a soft green circular container
 *  - large responsive value
 *  - small uppercase label below
 */
export function StatCard({ value, label, icon: Icon }: StatItem) {
  return (
    <div className="flex flex-col items-center gap-2 py-4 text-center sm:py-5">
      {Icon ? (
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-9 sm:w-9"
          aria-hidden="true"
        >
          <Icon className="h-4 w-4" />
        </span>
      ) : null}

      <span className="text-xl font-bold tabular-nums leading-none text-primary sm:text-2xl">
        {value}
      </span>

      <span className="text-[10px] font-semibold uppercase tracking-wide text-mute">
        {label}
      </span>
    </div>
  );
}
