import { StatCard } from "@/components/StatCard";
import type { StatItem } from "@/lib/types";

/**
 * StatsGrid — 4-up grid of StatCards (2x2 on mobile, 1x4 on desktop).
 *
 * Gap follows Design.md card-grid guidance (lg–xl). On mobile the
 * 2x2 layout keeps each cell readable without horizontal scrolling.
 */
export function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <section aria-label="Statistik TCC Jersey" className="w-full">
      <div className="grid grid-cols-2 gap-lg md:grid-cols-4 md:gap-xl">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
