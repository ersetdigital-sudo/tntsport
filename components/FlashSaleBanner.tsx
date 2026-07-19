"use client";

import Image from "next/image";
import Link from "next/link";
import { useEvergreenCountdown, pad } from "@/components/CountdownTimer";
import { CartIcon, FlameIcon } from "@/components/icons";

/**
 * FlashSaleBanner - dark red promo hero with an evergreen countdown.
 *
 * Layout mirrors the reference: a "FLASH SALE" pill, a fiery headline,
 * a 4-cell countdown (Hari / Jam / Menit / Detik), a jersey image bleeding
 * in from the right, and a footer bar with a price-rise warning + order CTA.
 *
 * Countdown is evergreen (see useEvergreenCountdown): each visitor gets a
 * fresh deadline stored in localStorage so refreshing doesn't reset it.
 */

// Jersey background art (Cloudinary — host allow-listed in next.config.mjs).
const JERSEY_IMAGE =
  "https://res.cloudinary.com/dqjh7utdb/image/upload/v1784495791/hadepgirs684wzyeizza.png";

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
    <div className="relative overflow-hidden rounded-3xl border border-hairline bg-surface-deep text-on-dark shadow-premium-xl">
      {/* Jersey image.
          - Mobile: full-width strip along the top, fading down into the
            panel so the content below stays clear (no overlap).
          - sm+: bleeds in from the right, fading left into the panel. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-1/2">
        <Image
          src={JERSEY_IMAGE}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-center opacity-70"
        />
        {/* Fade direction flips with the layout so text stays legible. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/60 to-transparent sm:bg-gradient-to-r sm:from-surface-deep sm:via-surface-deep/70"
          aria-hidden="true"
        />
      </div>

      {/* Ambient red glow for the flash-sale mood. */}
      <div
        className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-danger/25 blur-3xl"
        aria-hidden="true"
      />

      {/* ---- Content ----
          Extra top padding on mobile clears the image strip above. */}
      <div className="relative p-xl pt-40 sm:pt-xl md:p-xxl">
        {/* Flash-sale pill */}
        <span className="inline-flex items-center gap-xs rounded-full bg-gradient-to-r from-danger to-primary px-md py-xs text-button-sm uppercase text-white shadow-premium-glow">
          <FlameIcon className="h-4 w-4" />
          Flash Sale
        </span>

        {/* Headline */}
        <h2 className="mt-lg flex items-center gap-sm text-heading-lg font-bold uppercase italic tracking-tight">
          <FlameIcon className="h-7 w-7 text-danger" />
          Promo Berakhir Dalam:
        </h2>
        <p className="mt-xs text-body-sm text-on-dark-mute">
          Jangan sampai kelewatan! Diskon spesial terbatas.
        </p>

        {/* Countdown */}
        <div className="mt-xl flex max-w-lg gap-sm md:gap-md">
          {units.map((u) => (
            <div
              key={u.label}
              className="flex flex-1 flex-col items-center gap-xxs rounded-xl border border-hairline bg-black/40 px-sm py-md backdrop-blur-xs"
            >
              <span className="text-heading-lg font-bold tabular-nums leading-none text-white">
                {remaining.done ? "00" : u.value}
              </span>
              <span className="text-button-sm uppercase text-danger">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Footer bar ---- */}
      <div className="relative border-t border-hairline bg-black/40 backdrop-blur-xs">
        <div className="flex flex-col gap-md p-lg md:flex-row md:items-center md:justify-between md:p-xl">
          <div className="flex items-center gap-md">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger/20 text-danger">
              <FlameIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-body-sm font-semibold uppercase text-white">
                Harga naik setelah waktu habis!
              </p>
              <p className="text-caption text-on-dark-mute">
                Manfaatkan sekarang sebelum terlambat.
              </p>
            </div>
          </div>

          <Link
            href={orderHref}
            target={whatsappNumber ? "_blank" : undefined}
            rel={whatsappNumber ? "noopener noreferrer" : undefined}
            className="text-button-md inline-flex h-12 shrink-0 items-center justify-center gap-sm rounded-full bg-gradient-to-r from-danger to-primary px-xl text-white shadow-premium-glow lift-on-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
          >
            <CartIcon className="h-5 w-5" />
            Order Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
