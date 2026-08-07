"use client";

import { useEvergreenCountdown, pad } from "@/components/CountdownTimer";

/**
 * PromoCountdown — flash-sale countdown tiles for the Promo Bulan Ini
 * landing page (Jam : Menit : Detik), driven by the same perennial
 * auto-restarting deadline used across the site.
 */

export function PromoCountdown({ storageKey }: { storageKey: string }) {
  const remaining = useEvergreenCountdown(18, storageKey);
  // Use total hours (days*24 + hours) because the promo runs under a day.
  const hours = pad(remaining.days * 24 + remaining.hours);
  const minutes = pad(remaining.minutes);
  const seconds = pad(remaining.seconds);

  const tiles = [
    { value: hours, label: "Jam" },
    { value: minutes, label: "Menit" },
    { value: seconds, label: "Detik" },
  ];

  return (
    <div className="flex items-center gap-3">
      {tiles.map((t, i) => (
        <div key={t.label} className="flex items-center gap-3">
          {i > 0 && <span className="text-2xl font-black text-[#ff3b2f]">:</span>}
          <div className="w-16 rounded-2xl border border-white/10 bg-black/40 py-3 text-center">
            <div className="text-3xl font-black text-white tabular-nums">{t.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">{t.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}