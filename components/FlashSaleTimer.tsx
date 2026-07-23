"use client";

import { useState, useEffect } from "react";

const SALE_KEY = "tntFlashSaleEnd";
const SALE_DURATION = 72 * 60 * 60 * 1000; // 72 hours

function getEndTime(): number {
  if (typeof window === "undefined") return Date.now() + SALE_DURATION;

  const stored = localStorage.getItem(SALE_KEY);
  let end = stored ? Number(stored) : 0;

  if (!end || end <= Date.now()) {
    end = Date.now() + SALE_DURATION;
    localStorage.setItem(SALE_KEY, String(end));
  }

  return end;
}

function getTimeRemaining(endTime: number) {
  const remaining = Math.max(0, endTime - Date.now());
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-0 flex-1 rounded-lg border border-[#00aa13]/20 bg-[#171b14] px-1.5 py-2.5 text-center sm:rounded-xl sm:px-3 sm:py-3.5">
      <strong className="block text-2xl font-black leading-none text-[#00aa13] sm:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-mono)" }}>
        {String(value).padStart(2, "0")}
      </strong>
      <span className="mt-1 block text-[6px] font-bold uppercase tracking-widest text-white/40 sm:mt-1.5 sm:text-[7px] lg:text-[8px]"
            style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="shrink-0 text-base font-black text-[#00aa13]/45 sm:text-lg lg:text-xl"
          style={{ fontFamily: "var(--font-mono)" }}>
      :
    </span>
  );
}

export function FlashSaleTimer() {
  const [endTime, setEndTime] = useState<number>(0);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const end = getEndTime();
    setEndTime(end);
    setTime(getTimeRemaining(end));

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(end);
      setTime(remaining);

      if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        // Reset timer when it reaches zero
        const newEnd = Date.now() + SALE_DURATION;
        localStorage.setItem(SALE_KEY, String(newEnd));
        setEndTime(newEnd);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-3 flex items-center justify-center gap-1 sm:mt-4 sm:gap-2 lg:gap-2.5"
         aria-label="Hitung mundur flash sale">
      <TimeBlock value={time.days} label="Hari" />
      <Separator />
      <TimeBlock value={time.hours} label="Jam" />
      <Separator />
      <TimeBlock value={time.minutes} label="Menit" />
      <Separator />
      <TimeBlock value={time.seconds} label="Detik" />
    </div>
  );
}
