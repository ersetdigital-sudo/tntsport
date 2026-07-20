"use client";

import Image from "next/image";
import Link from "next/link";
import { useEvergreenCountdown, pad } from "@/components/CountdownTimer";
import { BoltIcon, CartIcon, FlameIcon } from "@/components/icons";

/**
 * FlashSaleBanner - Clean modern promo card inspired by bundle promo design.
 * 
 * Features:
 * - Clean white/dark background with subtle geometric patterns
 * - Large prominent countdown numbers in brand green
 * - Jersey image with diagonal stripe accent pattern
 * - Fully responsive mobile-first layout
 * - Proper light/dark mode theming
 */

// Jersey background art (Cloudinary — host allow-listed in next.config.mjs).
const JERSEY_IMAGE =
  "https://res.cloudinary.com/dqjh7utdb/image/upload/v1784548755/ae4rmpsd23l2fcqq7thj.png";

interface FlashSaleBannerProps {
  /** WhatsApp number (digits only) for the order CTA. */
  whatsappNumber?: string;
  /** Promo length per visitor. Default: 7 days. */
  durationHours?: number;
  /** localStorage key so the deadline survives refreshes. */
  storageKey?: string;
}

export function FlashSaleBanner({
  whatsappNumber,
  durationHours = 24 * 7,
  storageKey = "tcc_flash_sale_deadline",
}: FlashSaleBannerProps) {
  const remaining = useEvergreenCountdown(durationHours, storageKey);

  const units = [
    { label: "HARI", value: pad(remaining.days) },
    { label: "JAM", value: pad(remaining.hours) },
    { label: "MENIT", value: pad(remaining.minutes) },
    { label: "DETIK", value: pad(remaining.seconds) },
  ];

  const orderHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Halo, saya mau order jersey (Flash Sale)"
      )}`
    : "#";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/[.06] bg-white shadow-premium-xl dark:border-white/10 dark:bg-surface-card sm:rounded-3xl">
      {/* Jersey image - positioned on right side */}
      <div className="pointer-events-none absolute bottom-[108px] right-0 top-0 hidden w-[48%] sm:block">
        <div className="relative h-full w-full">
          <Image
            src={JERSEY_IMAGE}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 45vw, 42vw"
            className="object-cover object-center drop-shadow-[0_10px_30px_rgba(0,0,0,.15)] dark:drop-shadow-[0_10px_40px_rgba(0,0,0,.4)]"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10">
        <div className="max-w-none sm:max-w-[58%]">
          
          {/* Flash Sale Badge - Clean and simple */}
          <div className="mb-4 inline-flex">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-md sm:gap-2 sm:px-4 sm:py-2">
              <BoltIcon className="h-4 w-4" />
              Flash Sale
            </span>
          </div>

          {/* Headline with flame icon */}
          <div className="mb-2 flex items-start gap-2 sm:mb-3 sm:gap-3">
            <FlameIcon className="mt-1 h-7 w-7 flex-shrink-0 text-danger sm:h-8 sm:w-8" />
            <h2 className="text-[clamp(1.35rem,5vw,2rem)] font-extrabold uppercase leading-[1.05] text-ink dark:text-on-dark sm:text-[1.75rem] md:text-[2rem]">
              Promo Berakhir Dalam:
            </h2>
          </div>
          
          <p className="mb-5 text-body-sm text-charcoal dark:text-on-dark-mute sm:mb-6 sm:text-body-md">
            Jangan sampai kelewatan!<br />
            Diskon spesial terbatas.
          </p>

          {/* Countdown - Big bold numbers like reference */}
          <div className="mb-5 grid grid-cols-4 gap-2 sm:mb-6 sm:gap-3 md:gap-4">
            {units.map((u) => (
              <div key={u.label} className="flex min-h-[70px] flex-col items-center justify-center rounded-xl border border-primary/10 bg-primary/[.04] px-1 py-2 shadow-premium-sm dark:border-white/10 dark:bg-white/[.04]">
                {/* Large countdown number */}
                <div className="mb-1 text-[clamp(1.65rem,7vw,3rem)] font-black leading-none text-primary sm:mb-2 sm:text-[3.25rem] md:text-[3.75rem]">
                  {remaining.done ? "00" : u.value}
                </div>
                {/* Label */}
                <div className="text-[11px] font-bold uppercase tracking-wide text-primary sm:text-xs">
                  {u.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Warning + Button */}
        <div className="relative z-10 -mx-6 -mb-6 flex flex-col gap-3 border-t border-hairline bg-white px-6 pb-6 pt-5 dark:bg-surface-card sm:-mx-8 sm:-mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:pb-8 sm:pt-6 md:-mx-10 md:-mb-10 md:px-10 md:pb-10">
          
          {/* Warning message with icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-ink dark:text-on-dark sm:text-body-sm">
                HARGA NAIK SETELAH WAKTU HABIS!
              </p>
              <p className="text-caption text-charcoal dark:text-on-dark-mute">
                Manfaatkan sekarang sebelum terlambat.
              </p>
            </div>
          </div>

          {/* CTA Button - Solid green like reference */}
          <Link
            href={orderHref}
            target={whatsappNumber ? "_blank" : undefined}
            rel={whatsappNumber ? "noopener noreferrer" : undefined}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-body-md font-bold text-white shadow-lg transition-all duration-200 hover:bg-primary-strong hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 sm:w-auto sm:px-10"
          >
            <CartIcon className="h-5 w-5" />
            ORDER SEKARANG
          </Link>
        </div>
      </div>
    </div>
  );
}
