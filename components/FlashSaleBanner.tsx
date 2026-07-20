"use client";

import Image from "next/image";
import Link from "next/link";
import { useEvergreenCountdown, pad } from "@/components/CountdownTimer";
import { BoltIcon, CartIcon, FlameIcon } from "@/components/icons";

/**
 * FlashSaleBanner - light promo card with a green brand accent and an
 * evergreen countdown.
 *
 * Layout mirrors the reference: a "FLASH SALE" pill, a headline, a 4-cell
 * countdown (Hari / Jam / Menit / Detik), a jersey image bleeding in from the
 * right, and a footer bar with a price-rise warning + order CTA.
 *
 * Colors come entirely from design-system tokens (primary/brand = green,
 * warning = amber-red), so the card adapts automatically to light/dark.
 *
 * Countdown is evergreen (see useEvergreenCountdown): each visitor gets a
 * fresh deadline stored in localStorage so refreshing doesn't reset it.
 */

// Jersey background art (Cloudinary — host allow-listed in next.config.mjs).
const JERSEY_IMAGE = "/jersey-transparent.png";

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
    <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-surface-card text-ink shadow-premium-xl sm:rounded-3xl">
      {/* Jersey image.
          - Mobile: full-width strip along the top, fading down into the
            card so the content below stays clear (no overlap).
          - sm+: bleeds in from the right, fading left into the card. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-[48%]">
        <Image
          src={JERSEY_IMAGE}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-contain object-center drop-shadow-[0_18px_16px_rgba(0,0,0,.22)]"
        />
        {/* Darker overlay so text stays crisp on every screen size. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/95 to-transparent sm:bg-gradient-to-r sm:from-surface-card sm:via-surface-card/90"
          aria-hidden="true"
        />
      </div>

      {/* Soft green glow for the brand mood. */}
      <div
        className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />

      {/* ---- Content ----
          Extra top padding on mobile clears the image strip above. */}
      <div className="relative p-5 pt-40 sm:p-xl sm:pt-xl md:p-xxl">
        {/* Flash-sale badge — visually grouped and separated from headline. */}
        <div className="mb-4 md:mb-5">
          <span className="inline-flex w-fit items-center gap-xs rounded-full border border-primary/25 bg-primary/15 px-md py-xs text-button-sm uppercase text-primary shadow-premium-sm">
            <BoltIcon className="h-4 w-4" />
            Flash Sale
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-lg flex items-center gap-sm text-[clamp(1.35rem,4vw,2.25rem)] font-extrabold uppercase italic leading-tight tracking-tight text-ink">
          <FlameIcon className="h-7 w-7 text-primary" />
          Promo Berakhir Dalam:
        </h2>
        <p className="mt-2 max-w-sm text-body-sm text-charcoal">
          Jangan sampai kelewatan! Diskon spesial terbatas.
        </p>

        {/* Countdown — dark cells for punchy contrast on the light card. */}
        <div className="mt-5 grid grid-cols-4 gap-2 sm:mt-xl sm:gap-3 md:gap-4">
          {units.map((u) => (
            <div
              key={u.label}
              className="flex flex-col items-center gap-1 rounded-xl border border-black/[.05] bg-white px-1 py-2.5 shadow-premium-sm dark:border-white/10 dark:bg-[#0b0b14] sm:px-2 sm:py-3 md:px-sm md:py-md"
            >
              <span className="text-xl font-bold tabular-nums leading-none text-primary sm:text-2xl md:text-heading-lg">
                {remaining.done ? "00" : u.value}
              </span>
              <span className="text-[10px] uppercase text-primary sm:text-button-sm">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer: urgency warning + CTA */}
        <div className="mt-5 flex flex-col items-stretch justify-between gap-4 border-t border-hairline pt-5 sm:mt-xl sm:flex-row sm:items-center sm:gap-lg sm:pt-0 sm:border-t-0">
          <div className="flex items-center gap-md">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning/15 text-warning"
              aria-hidden="true"
            >
              <FlameIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-body-sm font-semibold uppercase text-ink">
                Harga naik setelah waktu habis!
              </p>
              <p className="text-caption text-charcoal">
                Manfaatkan sekarang sebelum terlambat.
              </p>
            </div>
          </div>

          <Link
            href={orderHref}
            target={whatsappNumber ? "_blank" : undefined}
            rel={whatsappNumber ? "noopener noreferrer" : undefined}
            className="text-button-md inline-flex h-12 w-full shrink-0 items-center justify-center gap-sm rounded-full bg-gradient-brand px-xl text-on-primary shadow-premium-glow lift-on-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 sm:w-auto"
          >
            <CartIcon className="h-5 w-5" />
            Order Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
