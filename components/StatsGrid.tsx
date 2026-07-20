import { StatCard } from "@/components/StatCard";
import type { StatItem } from "@/lib/types";

/**
 * StatsGrid — single rounded card with 3 stat columns separated by
 * vertical dividers. Maintains 3 columns even on mobile for compactness.
 *
 * Card uses a subtle border + shadow so it reads as one distinct unit.
 */
export function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <section aria-label="Statistik TNT SPORT" className="w-full">
      <div className="grid grid-cols-3 gap-0 overflow-hidden rounded-2xl border border-hairline bg-surface-card shadow-premium-sm">
        {stats.map((s, index) => (
          <div
            key={s.label}
            className={`px-xs sm:px-md ${
              index !== stats.length - 1
                ? "border-r border-hairline"
                : ""
            }`}
          >
            <StatCard {...s} />
          </div>
        ))}
      </div>
    </section>
  );
}
