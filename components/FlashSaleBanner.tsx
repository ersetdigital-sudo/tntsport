"use client";

import Image from "next/image";
import Link from "next/link";
import { useEvergreenCountdown, pad } from "@/components/CountdownTimer";
import { BoltIcon, CartIcon, FlameIcon } from "@/components/icons";

/**
 * FlashSaleBanner - Modern promo card with vibrant gradients and premium aesthetics.
 * 
 * Features:
 * - Gradient backgrounds with dynamic glow effects
 * - Glass morphism design elements
 * - Fully responsive (mobile-first, stacks vertically on small screens)
 * - Adaptive light/dark mode with proper contrast
 * - Animated countdown with pulse effects
 * - Evergreen countdown stored in localStorage
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
    <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-surface-card via-surface-card to-surface shadow-premium-xl transition-all duration-300 hover:shadow-premium-glow sm:rounded-3xl">
      
      {/* Animated gradient background layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Primary glow - left side */}
        <div className="absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl transition-all duration-700 group-hover:bg-primary/30 dark:bg-primary/30 dark:group-hover:bg-primary/40 sm:-left-32 sm:h-[400px] sm:w-[400px]" />
        
        {/* Secondary glow - right side */}
        <div className="absolute -right-20 bottom-0 h-[280px] w-[280px] rounded-full bg-secondary/15 blur-3xl transition-all duration-700 group-hover:bg-secondary/25 dark:bg-secondary/25 dark:group-hover:bg-secondary/35 sm:-right-32 sm:h-[380px] sm:w-[380px]" />
        
        {/* Accent glow - center */}
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl dark:bg-accent/20 sm:h-[250px] sm:w-[250px]" />
      </div>

      {/* Jersey image with improved positioning */}
      <div className="pointer-events-none absolute inset-0 sm:left-auto sm:w-[50%]">
        <div className="relative h-full w-full">
          <Image
            src={JERSEY_IMAGE}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-contain object-center opacity-90 drop-shadow-[0_20px_25px_rgba(0,0,0,.25)] transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 dark:drop-shadow-[0_20px_35px_rgba(0,0,0,.5)] sm:object-right"
          />
          {/* Gradient fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/80 to-transparent sm:bg-gradient-to-r sm:from-surface-card sm:via-surface-card/85 sm:to-transparent" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12">
        <div className="sm:max-w-[52%]">
          
          {/* Flash Sale Badge - More prominent */}
          <div className="mb-5 inline-flex animate-pulse">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 px-4 py-2 shadow-lg shadow-primary/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 dark:border-primary/40 dark:from-primary/30 dark:via-primary/20 dark:to-primary/15 dark:shadow-primary/30">
              <BoltIcon className="h-5 w-5 text-primary drop-shadow-sm" />
              <span className="text-button-sm font-bold uppercase tracking-wider text-primary">
                Flash Sale
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
            </span>
          </div>

          {/* Headline */}
          <div className="mb-3">
            <h2 className="flex flex-wrap items-center gap-3 text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold uppercase leading-tight tracking-tight text-ink drop-shadow-sm dark:text-on-dark">
              <FlameIcon className="h-8 w-8 flex-shrink-0 text-primary drop-shadow-md sm:h-9 sm:w-9" />
              <span className="bg-gradient-to-r from-ink via-ink to-charcoal bg-clip-text text-transparent dark:from-on-dark dark:via-on-dark dark:to-on-dark-mute">
                Promo Berakhir Dalam:
              </span>
            </h2>
          </div>
          
          <p className="mb-6 max-w-md text-body-sm text-charcoal dark:text-on-dark-mute sm:text-body-md">
            Jangan sampai kelewatan! Diskon spesial terbatas untuk kamu.
          </p>

          {/* Countdown - Modern glass cards */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
            {units.map((u, idx) => (
              <div
                key={u.label}
                className="group/card relative overflow-hidden rounded-xl border border-primary/20 bg-white/60 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:shadow-xl dark:border-primary/30 dark:bg-surface-dark/60 dark:shadow-primary/10 dark:hover:border-primary/50 dark:hover:shadow-primary/20"
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
                
                <div className="relative flex flex-col items-center justify-center gap-1.5 px-2 py-3 sm:gap-2 sm:px-3 sm:py-4 md:px-4 md:py-5">
                  <span className="text-gradient-brand text-2xl font-black tabular-nums leading-none sm:text-3xl md:text-4xl">
                    {remaining.done ? "00" : u.value}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80 dark:text-primary sm:text-[11px]">
                    {u.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Improved layout */}
        <div className="mt-6 flex flex-col gap-4 border-t border-hairline/50 pt-6 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
          
          {/* Urgency message */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-warning/20 to-danger/20 shadow-md dark:from-warning/30 dark:to-danger/30">
              <FlameIcon className="h-5 w-5 animate-pulse text-warning dark:text-warning" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-ink dark:text-on-dark sm:text-body-sm">
                Harga Naik Setelah Waktu Habis!
              </p>
              <p className="text-caption text-charcoal dark:text-on-dark-mute">
                Manfaatkan sekarang sebelum terlambat
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={orderHref}
            target={whatsappNumber ? "_blank" : undefined}
            rel={whatsappNumber ? "noopener noreferrer" : undefined}
            className="group/btn relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-brand px-8 text-button-md font-bold text-on-primary shadow-premium-glow transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 sm:w-auto sm:px-10"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
            
            <CartIcon className="relative h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110" />
            <span className="relative">Order Sekarang</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
