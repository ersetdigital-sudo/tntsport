"use client";

import { useEffect, useState } from "react";

/**
 * Evergreen countdown primitives (client-only).
 *
 * "Evergreen" = each visitor gets a fresh deadline computed as
 * `now + durationHours` the first time they load the page. The deadline
 * is persisted in localStorage (keyed per promo) so refreshing does NOT
 * reset the timer — it keeps ticking down from where it was. When it
 * hits zero it stays done until the stored deadline is cleared.
 *
 * SSR-safe: the hook returns a stable zeroed placeholder on the server
 * and during the first client render, then takes over ticking once per
 * second after mount (avoids hydration mismatch).
 */

export interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const ZERO: Remaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  done: false,
};

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

export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/**
 * Resolve (and lazily create) the persisted deadline for an evergreen
 * promo. Falls back to an in-memory deadline when localStorage is
 * unavailable (private mode, SSR guards, etc.).
 */
function resolveDeadline(storageKey: string, durationHours: number): number {
  const fresh = Date.now() + durationHours * 3_600_000;
  if (typeof window === "undefined") return fresh;

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      const parsed = Number(stored);
      if (Number.isFinite(parsed) && parsed > 0) return parsed;
    }
    window.localStorage.setItem(storageKey, String(fresh));
  } catch {
    // localStorage blocked — use the in-memory deadline instead.
  }
  return fresh;
}

/**
 * useEvergreenCountdown - ticking remaining time to a per-visitor
 * deadline. Returns a zeroed placeholder until mounted on the client.
 */
export function useEvergreenCountdown(
  durationHours: number,
  storageKey: string
): Remaining {
  const [remaining, setRemaining] = useState<Remaining>(ZERO);

  useEffect(() => {
    const deadline = resolveDeadline(storageKey, durationHours);
    setRemaining(diff(deadline, Date.now()));
    const id = setInterval(() => {
      setRemaining(diff(deadline, Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [durationHours, storageKey]);

  return remaining;
}

interface CountdownTimerProps {
  /** How long the promo lasts for each visitor. Default: 7 days. */
  durationHours?: number;
  /** localStorage key so the deadline survives refreshes. */
  storageKey?: string;
}

/**
 * CountdownTimer - standalone evergreen promo card (glass surface with a
 * brand gradient accent bar). Kept for any page that wants the timer on
 * its own; the flash-sale banner uses `useEvergreenCountdown` directly.
 */
export function CountdownTimer({
  durationHours = 24 * 7,
  storageKey = "tcc_promo_deadline",
}: CountdownTimerProps = {}) {
  const remaining = useEvergreenCountdown(durationHours, storageKey);

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
