"use client";

import Image from "next/image";
import Link from "next/link";
import { useEvergreenCountdown, pad } from "@/components/CountdownTimer";
import { BoltIcon, CartIcon, FlameIcon, TagIcon } from "@/components/icons";

/**
 * FlashSaleBanner — dark cinematic card built around the TNT SPORT jersey
 * artwork (black jersey + neon green light streaks). The image fills the
 * card as a full-bleed background with a left-to-right dark scrim so the
 * copy stays readable; countdown boxes are frosted glass with neon labels.
 */

interface FlashSaleBannerProps {
  /** WhatsApp number (digits only) for the order CTA. */
  whatsappNumber?: string;
  /** Promo length per visitor. Default: 7 days. */
  durationHours?: number;
  /** localStorage key so the deadline survives refreshes. */
  storageKey?: string;
}

function CountdownBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg border border-white/15 bg-white/[.08] px-1 py-2 backdrop-blur-md sm:rounded-xl sm:py-3">
      <span className="text-[clamp(1.5rem,6.5vw,2.4rem)] font-black leading-none tracking-tight text-white tabular-nums">
        {value}
      </span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-[.08em] text-primary sm:mt-1.5 sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span aria-hidden="true" className="shrink-0 pb-4 text-xl font-black text-primary sm:text-2xl">
      :
    </span>
  );
}

export function FlashSaleBanner({
  whatsappNumber,
  durationHours = 24 * 7,
  storageKey = "tcc_flash_sale_deadline",
}: FlashSaleBannerProps) {
  const remaining = useEvergreenCountdown(durationHours, storageKey);

  const units = [
    { label: "Hari", value: pad(remaining.days) },
    { label: "Jam", value: pad(remaining.hours) },
    { label: "Menit", value: pad(remaining.minutes) },
    { label: "Detik", value: pad(remaining.seconds) },
  ];

  const orderHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Halo, saya mau order jersey (Flash Sale)"
      )}`
    : "#";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07090a] shadow-premium-lg sm:rounded-3xl">
      {/* Full-bleed jersey artwork — anchored right so the shirt stays visible. */}
      <Image
        src="/flash-sale-jersey.png"
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 640px"
        className="object-cover object-[72%_20%]"
      />
      {/* Scrim — dark wash from the left + bottom for copy legibility. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#07090a] via-[#07090a]/82 to-[#07090a]/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#07090a] to-transparent"
      />
      {/* Neon top edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
      />

      <div className="relative z-10 p-5 sm:p-7">
        {/* Flash sale pill — glassy with neon text. */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[.08em] text-primary backdrop-blur-sm sm:px-3.5 sm:py-1.5">
          <BoltIcon className="h-3.5 w-3.5" />
          Flash Sale
        </span>

        {/* Headline. */}
        <div className="mt-3 flex items-start gap-2 sm:mt-4 sm:gap-2.5">
          <FlameIcon className="mt-0.5 h-6 w-6 shrink-0 text-danger sm:h-8 sm:w-8" aria-hidden="true" />
          <h2 className="max-w-[15ch] text-balance text-[clamp(1.15rem,4.6vw,1.7rem)] font-extrabold italic uppercase leading-[1.05] tracking-[-.02em] text-white">
            Promo Berakhir Dalam:
          </h2>
        </div>
        <p className="mt-2 max-w-[30ch] text-pretty text-[13px] leading-relaxed text-white/70 sm:text-[15px]">
          Jangan sampai kelewatan! Diskon spesial terbatas.
        </p>

        {/* Countdown — frosted glass boxes with neon colons. */}
        <div className="mt-5 flex items-end gap-1 sm:mt-7 sm:max-w-[70%] sm:gap-2">
          <CountdownBox value={remaining.done ? "00" : units[0].value} label={units[0].label} />
          <Colon />
          <CountdownBox value={remaining.done ? "00" : units[1].value} label={units[1].label} />
          <span aria-hidden="true" className="w-0.5 shrink-0 sm:w-2" />
          <CountdownBox value={remaining.done ? "00" : units[2].value} label={units[2].label} />
          <Colon />
          <CountdownBox value={remaining.done ? "00" : units[3].value} label={units[3].label} />
        </div>
      </div>

      {/* Bottom bar — urgency + solid neon CTA. */}
      <div className="relative z-10 flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-7 sm:py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary sm:h-10 sm:w-10">
            <TagIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[13px] font-extrabold uppercase leading-tight text-white sm:text-sm">
              Harga naik setelah waktu habis!
            </p>
            <p className="mt-0.5 text-xs text-white/60 sm:text-[13px]">
              Manfaatkan sekarang sebelum terlambat.
            </p>
          </div>
        </div>

        <Link
          href={orderHref}
          target={whatsappNumber ? "_blank" : undefined}
          rel={whatsappNumber ? "noopener noreferrer" : undefined}
          className="inline-flex h-12 w-full touch-manipulation items-center justify-center gap-2.5 rounded-xl bg-primary text-[15px] font-extrabold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(0,200,83,.35)] transition-all duration-200 hover:brightness-110 active:scale-[0.97] sm:w-auto sm:px-7"
        >
          <CartIcon className="h-5 w-5" aria-hidden="true" />
          Order Sekarang
        </Link>
      </div>
    </div>
  );
}
