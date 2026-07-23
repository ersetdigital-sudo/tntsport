"use client";

import { useState, useEffect } from "react";

function getTimeRemaining(endTime: Date) {
  const total = endTime.getTime() - Date.now();
  if (total <= 0) return { hours: 0, minutes: 0, seconds: 0 };

  return {
    hours: Math.floor(total / (1000 * 60 * 60)),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 backdrop-blur sm:h-14 sm:w-14">
        <span className="text-xl font-black text-white sm:text-2xl"
              style={{ fontFamily: "var(--font-mono)" }}>
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1 text-[8px] uppercase tracking-wider text-white/50 sm:text-[9px]">{label}</span>
    </div>
  );
}

export function FlashSaleTimer() {
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set end time to end of today (midnight)
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    setEndTime(end);
  }, []);

  useEffect(() => {
    if (!endTime) return;

    setTime(getTimeRemaining(endTime));

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(endTime);
      setTime(remaining);

      if (remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  if (!endTime) {
    return (
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <TimeBlock value={0} label="Jam" />
        <span className="text-xl font-black text-[#f36458]">:</span>
        <TimeBlock value={0} label="Menit" />
        <span className="text-xl font-black text-[#f36458]">:</span>
        <TimeBlock value={0} label="Detik" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <TimeBlock value={time.hours} label="Jam" />
      <span className="text-xl font-black text-[#f36458]">:</span>
      <TimeBlock value={time.minutes} label="Menit" />
      <span className="text-xl font-black text-[#f36458]">:</span>
      <TimeBlock value={time.seconds} label="Detik" />
    </div>
  );
}
