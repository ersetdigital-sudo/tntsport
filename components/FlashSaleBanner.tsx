"use client";

import Image from "next/image";
import Link from "next/link";
import { useEvergreenCountdown, pad } from "@/components/CountdownTimer";
import { BoltIcon, CartIcon, FlameIcon } from "@/components/icons";

/**
 * FlashSaleBanner - bold promo card matching the reference design.
 *
 * Layout: green FLASH SALE pill, urgent headline, white countdown cells
 * with green numbers, a jersey image on the right, and a CTA footer.
 */

// Jersey background art (Cloudinary).
const JERSEY_IMAGE =
  "https://res.cloudinary.com/dqjh7utdb/image/upload/v1784499783/mrwzuqt7soqdkydjvkrm.png";

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
    <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-surface-card text-ink shadow-premium-lg">
      {/* Jersey image. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-1/2">
        <Image
          src={JERSEY_IMAGE}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/90 to-transparent sm:bg-gradient-to-r sm:from-surface-card sm:via-surface-card/85"
          aria-hidden="true"
        />
      </div>

      {/* Soft green glow for the brand mood. */}
      <div
        className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative p-5 pt-40 sm:pt-5 md:p-6">
        {/* Flash Sale badge */}
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-on-primary shadow-sm">
          <BoltIcon className="h-4 w-4" />
          Flash Sale
        </span>

        {/* Headline */}
        <h2 className="mt-3 text-xl font-extrabold uppercase italic tracking-tight text-primary sm:text-2xl">
          Promo Berakhir Dalam:
        </h2>
        <p className="mt-1 text-sm text-charcoal">
          Jangan sampai kelewatan! Diskon spesial terbatas.
        </p>

        {/* Countdown — green numbers on white cells */}
        <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
          {units.map((u) => (
            <div
              key={u.label}
              className="flex flex-col items-center gap-1 rounded-xl border border-hairline bg-surface-card px-1 py-2 shadow-sm sm:px-2 sm:py-3"
            >
              <span className="text-xl font-bold tabular-nums leading-none text-primary sm:text-2xl">
                {remaining.done ? "00" : u.value}
              </span>
              <span className="text-[10px] font-semibold uppercase text-mute">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer: urgency warning + CTA */}
        <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning/15 text-warning"
              aria-hidden="true"
            >
              <FlameIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase text-ink">
                Harga naik setelah waktu habis!
              </p>
              <p className="text-xs text-charcoal">
                Manfaatkan sekarang sebelum terlambat.
              </p>
            </div>
          </div>

          <Link
            href={orderHref}
            target={whatsappNumber ? "_blank" : undefined}
            rel={whatsappNumber ? "noopener noreferrer" : undefined}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold uppercase text-on-primary shadow-md transition-transform hover:-translate-y-0.5 active:scale-[0.98] sm:h-12 sm:px-8"
          >
            <CartIcon className="h-5 w-5" />
            Order Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
