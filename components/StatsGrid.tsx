import { StatCard } from "@/components/StatCard";
import type { StatItem } from "@/lib/types";

/**
 * StatsGrid — single white rounded card with 3 stat columns
 * separated by subtle dividers. Matches the screenshot's banner style.
 */
export function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <section aria-label="Statistik TNT SPORT" className="w-full">
      <div className="grid grid-cols-3 divide-x divide-hairline rounded-2xl border border-hairline bg-surface-card shadow-premium-sm">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
