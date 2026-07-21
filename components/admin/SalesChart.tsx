"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

/**
 * SalesChart — bar chart panel following the dashboard-sidebar-overview
 * wireframe (Sales Trend, span 2).
 *
 * Custom SVG/CSS chart (no chart lib in the project). Supports
 * Weekly / Monthly / Yearly tabs and shows a stacked bar series with
 * New vs Existing customers. On-brand TNT SPORT: brand gradient bars,
 * glass/solid surface, premium shadow.
 */

type Period = "Weekly" | "Monthly" | "Yearly";

interface Series {
  label: string;
  color: string;
  values: number[];
}

const PERIODS: Period[] = ["Weekly", "Monthly", "Yearly"];

const MONTHLY_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const WEEKLY_LABELS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const YEARLY_LABELS = ["2021", "2022", "2023", "2024", "2025"];

const DATA: Record<Period, { labels: string[]; series: Series[]; total: string }> = {
  Weekly: {
    labels: WEEKLY_LABELS,
    total: "Rp 4.820.000",
    series: [
      {
        label: "New User",
        color: "var(--color-primary)",
        values: [42, 55, 38, 60, 72, 48, 65],
      },
      {
        label: "Existing User",
        color: "var(--color-secondary-strong)",
        values: [30, 40, 28, 45, 52, 36, 50],
      },
    ],
  },
  Monthly: {
    labels: MONTHLY_LABELS,
    total: "Rp 20.320.000",
    series: [
      {
        label: "New User",
        color: "var(--color-primary)",
        values: [55, 62, 48, 70, 82, 95, 78, 88, 72, 90, 85, 100],
      },
      {
        label: "Existing User",
        color: "var(--color-secondary-strong)",
        values: [40, 48, 36, 55, 62, 70, 58, 66, 54, 68, 64, 78],
      },
    ],
  },
  Yearly: {
    labels: YEARLY_LABELS,
    total: "Rp 182.400.000",
    series: [
      {
        label: "New User",
        color: "var(--color-primary)",
        values: [45, 60, 75, 88, 100],
      },
      {
        label: "Existing User",
        color: "var(--color-secondary-strong)",
        values: [32, 48, 58, 70, 82],
      },
    ],
  },
};

export function SalesChart() {
  const [period, setPeriod] = useState<Period>("Monthly");
  const { labels, series, total } = DATA[period];

  // Max stacked value for scaling.
  const maxStacked = Math.max(
    ...labels.map((_, i) =>
      series.reduce((sum, s) => sum + (s.values[i] ?? 0), 0),
    ),
  );
  const scaleMax = Math.ceil(maxStacked / 20) * 20 || 100;

  return (
    <div className="bg-surface-card border border-hairline rounded-xl p-xl shadow-premium-md lg:col-span-2 flex flex-col">
      {/* Header: title + tabs */}
      <div className="flex flex-wrap items-start justify-between gap-md mb-lg">
        <div>
          <h3 className="text-heading-md text-ink">Sales Trend</h3>
          <p className="text-caption text-stone mt-xs">
            Total Revenue:{" "}
            <span className="text-ink font-semibold">{total}</span>
          </p>
        </div>
        <div className="flex items-center gap-xxs bg-surface rounded-md p-xxs border border-hairline">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`text-button-sm px-md py-sm rounded-sm transition-colors duration-normal ${
                period === p
                  ? "bg-secondary text-on-primary"
                  : "text-stone hover:text-ink"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-lg mb-md">
        {series.map((s) => (
          <div key={s.label} className="flex items-center gap-xs">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-caption text-charcoal">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[260px] flex flex-col">
        <div className="flex-1 flex items-end gap-sm md:gap-md border-b border-hairline pb-xs">
          {labels.map((label, i) => {
            const stack = series.map((s) => s.values[i] ?? 0);
            const stackTotal = stack.reduce((a, b) => a + b, 0);
            const heightPct = (stackTotal / scaleMax) * 100;
            return (
              <div
                key={label}
                className="group relative flex-1 flex flex-col items-center justify-end h-full"
              >
                {/* Tooltip on hover */}
                <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-normal z-10 whitespace-nowrap bg-surface-dark text-on-dark text-caption rounded-md px-md py-xs shadow-premium-lg">
                  {label}: {stackTotal} order
                </div>
                <div
                  className="w-full max-w-[28px] flex flex-col-reverse rounded-t-sm overflow-hidden transition-all duration-slow"
                  style={{ height: `${heightPct}%` }}
                >
                  {series.map((s) => {
                    const v = s.values[i] ?? 0;
                    const segPct = stackTotal
                      ? (v / stackTotal) * 100
                      : 0;
                    return (
                      <div
                        key={s.label}
                        style={{
                          height: `${segPct}%`,
                          backgroundColor: s.color,
                        }}
                        className="w-full"
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {/* X axis */}
        <div className="flex gap-sm md:gap-md mt-sm">
          {labels.map((label) => (
            <span
              key={label}
              className="flex-1 text-center text-caption text-stone"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * RevenueBreakdown — side panel (span 1) with vertical bars + AI insight
 * banner, matching the wireframe's "Revenue Breakdown" card.
 */
export function RevenueBreakdown() {
  const bars = [62, 48, 75, 90, 55, 82, 70, 95, 68, 88, 78, 100];
  const labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  return (
    <div className="bg-surface-card border border-hairline rounded-xl p-xl shadow-premium-md flex flex-col">
      <div className="mb-md">
        <h3 className="text-heading-md text-ink">Revenue Breakdown</h3>
        <p className="text-heading-sm text-ink font-bold mt-sm">
          Rp 20.320.000
        </p>
        <p className="text-caption text-stone">Jan 1 - 30 Nov 2025</p>
      </div>

      {/* AI insight banner */}
      <div className="mb-lg flex items-center gap-sm rounded-md bg-primary/10 border border-primary/20 p-md">
        <Sparkles size={16} className="text-primary shrink-0" />
        <p className="text-caption text-charcoal">
          Dapatkan insight AI untuk analisis yang lebih baik
        </p>
      </div>

      {/* Vertical bars */}
      <div className="flex-1 flex items-end justify-between gap-xxs min-h-[180px] border-b border-hairline pb-xs">
        {bars.map((v, i) => (
          <div
            key={i}
            className="group relative flex-1 flex flex-col items-center justify-end h-full"
          >
            <div
              className="w-full max-w-[14px] rounded-t-sm bg-gradient-brand transition-all duration-slow group-hover:opacity-80"
              style={{ height: `${v}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-sm">
        {labels.map((l) => (
          <span key={l} className="text-caption text-stone flex-1 text-center">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}