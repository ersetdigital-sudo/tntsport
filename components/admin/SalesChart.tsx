"use client";

import { useState } from "react";
import { Sparkles, BarChart3 } from "lucide-react";

type Period = "Weekly" | "Monthly" | "Yearly";

interface Series {
  label: string;
  color: string;
  values: number[];
}

interface ChartData {
  labels: string[];
  series: Series[];
  total: string;
}

interface SalesChartProps {
  data?: Record<Period, ChartData>;
}

const PERIODS: Period[] = ["Weekly", "Monthly", "Yearly"];

const EMPTY_DATA: Record<Period, ChartData> = {
  Weekly: { labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"], series: [], total: "Rp 0" },
  Monthly: { labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"], series: [], total: "Rp 0" },
  Yearly: { labels: ["2023", "2024", "2025"], series: [], total: "Rp 0" },
};

export function SalesChart({ data = EMPTY_DATA }: SalesChartProps) {
  const [period, setPeriod] = useState<Period>("Monthly");
  const { labels, series, total } = data[period];

  const hasData = series.length > 0 && series.some((s) => s.values.some((v) => v > 0));

  const maxStacked = hasData
    ? Math.max(
        ...labels.map((_, i) =>
          series.reduce((sum, s) => sum + (s.values[i] ?? 0), 0),
        ),
      )
    : 0;
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

      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[260px] text-center">
          <BarChart3 size={48} className="text-stone/40 mb-md" />
          <p className="text-body-md text-charcoal font-medium">Belum ada data penjualan</p>
          <p className="text-caption text-stone mt-xs">
            Grafik akan muncul setelah ada transaksi masuk
          </p>
        </div>
      ) : (
        <>
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
                    <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-normal z-10 whitespace-nowrap bg-surface-dark text-on-dark text-caption rounded-md px-md py-xs shadow-premium-lg">
                      {label}: {stackTotal} order
                    </div>
                    <div
                      className="w-full max-w-[28px] flex flex-col-reverse rounded-t-sm overflow-hidden transition-all duration-slow"
                      style={{ height: `${heightPct}%` }}
                    >
                      {series.map((s) => {
                        const v = s.values[i] ?? 0;
                        const segPct = stackTotal ? (v / stackTotal) * 100 : 0;
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
        </>
      )}
    </div>
  );
}

interface RevenueBreakdownProps {
  total?: string;
  dateRange?: string;
  bars?: number[];
  labels?: string[];
}

export function RevenueBreakdown({
  total = "Rp 0",
  dateRange = "-",
  bars = [],
  labels = [],
}: RevenueBreakdownProps) {
  const hasData = bars.length > 0 && bars.some((v) => v > 0);

  return (
    <div className="bg-surface-card border border-hairline rounded-xl p-xl shadow-premium-md flex flex-col">
      <div className="mb-md">
        <h3 className="text-heading-md text-ink">Revenue Breakdown</h3>
        <p className="text-heading-sm text-ink font-bold mt-sm">{total}</p>
        <p className="text-caption text-stone">{dateRange}</p>
      </div>

      {/* AI insight banner */}
      <div className="mb-lg flex items-center gap-sm rounded-md bg-primary/10 border border-primary/20 p-md">
        <Sparkles size={16} className="text-primary shrink-0" />
        <p className="text-caption text-charcoal">
          Dapatkan insight AI untuk analisis yang lebih baik
        </p>
      </div>

      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[180px] text-center">
          <BarChart3 size={40} className="text-stone/40 mb-md" />
          <p className="text-body-sm text-charcoal font-medium">Belum ada data revenue</p>
          <p className="text-caption text-stone mt-xs">
            Data breakdown akan muncul setelah ada transaksi
          </p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
