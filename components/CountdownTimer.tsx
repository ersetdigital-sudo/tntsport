"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * CountdownTimer - real-time promo countdown (client component).
 *
 * Target: end of the current month (23:59:59 local time). Recomputed on
 * mount so SSR renders a stable placeholder and the client takes over
 * ticking once per second.
 *
 * Card uses the glass surface with a brand gradient top accent bar and
 * a subtle glow.
 */
function getEndOfMonth(now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function diff(target: number, now: number): Remaining {
  const ms = Math.max(0, target - now);
  if (ms === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function CountdownTimer() {
  const target = useMemo(() => getEndOfMonth(new Date()).getTime(), []);
  const [remaining, setRemaining] = useState<Remaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    setRemaining(diff(target, Date.now()));
    const id = setInterval(() => {
      setRemaining(diff(target, Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Hari", value: pad(remaining.days) },
    { label: "Jam", value: pad(remaining.hours) },
    { label: "Menit", value: pad(remaining.minutes) },
    { label: "Detik", value: pad(remaining.seconds) },
  ];

  return (
    <div className="relative glass rounded-2xl p-xl md:p-xxl shadow-premium-md overflow-hidden">
      {/* Top accent bar - brand gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand" aria-hidden="true" />

      <p className="text-button-sm text-on-dark-mute uppercase tracking-wider">
        Promo Berakhir Dalam
      </p>
      <div className="mt-lg flex gap-md md:gap-lg">
        {units.map((u) => (
          <div
            key={u.label}
            className="flex flex-1 flex-col items-center gap-xxs rounded-xl bg-surface-dark/60 p-md md:p-lg border border-hairline"
          >
            <span className="text-code-md md:text-display-lg text-gradient-brand tabular-nums leading-none font-semibold">
              {remaining.done ? "00" : u.value}
            </span>
            <span className="text-button-sm text-on-dark-mute uppercase">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
