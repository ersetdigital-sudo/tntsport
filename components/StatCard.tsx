import type { StatItem } from "@/lib/types";

/**
 * StatCard - glass card with a big gradient-text number + caption label.
 *
 * The big number uses the brand gradient text utility so the value
 * pops without adding noise. Icon (when present) is tinted primary.
 */
export function StatCard({ value, label, icon: Icon }: StatItem) {
  return (
    <div className="glass lift-on-hover hover:shadow-premium-lg rounded-2xl p-xl flex flex-col gap-sm">
      <div className="flex items-center gap-sm">
        {Icon ? (
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        ) : null}
        <span className="text-heading-md text-gradient-brand font-semibold">
          {value}
        </span>
      </div>
      <span className="text-button-sm text-on-dark-mute uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
