import type { ComponentType } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * MetricCard — KPI card following the dashboard-sidebar-overview wireframe.
 *
 * Shows an icon, label, big value, and a YoY change indicator with a
 * mini sparkline. Visual style stays on-brand with TNT SPORT: glass/solid
 * surface, brand gradient icon chip, premium shadow, hover lift.
 */
interface MetricCardProps {
  label: string;
  value: string;
  suffix?: string;
  /** Year-over-year change, e.g. "+0.94" or "-1.2". */
  change?: string;
  changeLabel?: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  /** Mini sparkline bars (0–100 scale). Optional. */
  spark?: number[];
  /** Accent color for the icon chip — defaults to brand gradient. */
  accent?: "brand" | "success" | "warning" | "info" | "danger";
}

const accentClasses: Record<NonNullable<MetricCardProps["accent"]>, string> = {
  brand: "bg-gradient-brand text-on-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  info: "bg-info/15 text-info",
  danger: "bg-danger/15 text-danger",
};

export function MetricCard({
  label,
  value,
  suffix,
  change,
  changeLabel = "last year",
  icon: Icon,
  spark,
  accent = "brand",
}: MetricCardProps) {
  const isPositive = change?.startsWith("+") ?? true;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? "text-success" : "text-danger";

  return (
    <div className="bg-surface-card border border-hairline rounded-xl p-xl shadow-premium-md lift-on-hover">
      <div className="flex items-start justify-between gap-md">
        <div className="min-w-0">
          <p className="text-button-sm text-stone uppercase tracking-wider">
            {label}
          </p>
          <div className="mt-sm flex items-baseline gap-xs">
            <span className="text-heading-lg text-ink font-bold tracking-tight">
              {value}
            </span>
            {suffix && (
              <span className="text-caption text-stone">{suffix}</span>
            )}
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${accentClasses[accent]}`}
        >
          <Icon size={18} />
        </div>
      </div>

      {/* Change indicator + sparkline */}
      <div className="mt-md flex items-center justify-between gap-md">
        {change && (
          <div className="flex items-center gap-xs">
            <TrendIcon size={14} className={trendColor} />
            <span className={`text-caption font-semibold ${trendColor}`}>
              {change}
            </span>
            <span className="text-caption text-stone">{changeLabel}</span>
          </div>
        )}
        {spark && spark.length > 0 && (
          <div className="flex items-end gap-xxs h-6" aria-hidden>
            {spark.map((v, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-primary/40"
                style={{ height: `${Math.max(12, Math.min(100, v))}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}