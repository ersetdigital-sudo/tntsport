"use client";

import Image from "next/image";
import Link from "next/link";
import { useEvergreenCountdown, pad } from "@/components/CountdownTimer";
import { BoltIcon, CartIcon, FlameIcon, TagIcon } from "@/components/icons";

/**
 * FlashSaleBanner — matches the reference art:
 * - soft-green "FLASH SALE" pill with bolt
 * - flame + italic "PROMO BERAKHIR DALAM:" headline
 * - white countdown boxes (big dark numbers, green labels, green colons)
 * - jersey photo over diagonal green stripes on the right
 * - bottom bar: tag icon + urgency copy + outlined "ORDER SEKARANG" button
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
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl border border-black/[.06] bg-white px-1 py-2.5 shadow-premium-md dark:border-white/10 dark:bg-[#15151f] sm:py-3">
      <span className="text-[clamp(1.6rem,7vw,2.4rem)] font-black leading-none tracking-tight text-ink tabular-nums">
        {value}
      </span>
      <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[.08em] text-primary sm:text-[11px]">
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
    <div className="relative overflow-hidden rounded-2xl border border-black/[.06] bg-white shadow-premium-lg dark:border-white/10 dark:bg-surface-card sm:rounded-3xl">
      {/* Diagonal stripes + jersey, top-right. */}
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[62%] w-[52%] sm:h-[70%] sm:w-[46%]">
        <div className="stripes-brand absolute -right-4 -top-4 h-full w-full [clip-path:polygon(30%_0,100%_0,100%_82%,60%_100%)]" />
        <div className="absolute -right-3 top-0 h-full w-[92%]">
          <Image
            src="/jersey-transparent.png"
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, 300px"
            className="object-contain object-top drop-shadow-[0_14px_28px_rgba(0,0,0,.25)]"
          />
        </div>
      </div>

      <div className="relative z-10 p-5 sm:p-7">
        {/* Flash sale pill. */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.08em] text-primary">
          <BoltIcon className="h-3.5 w-3.5" />
          Flash Sale
        </span>

        {/* Headline. */}
        <div className="mt-4 flex items-start gap-2 sm:gap-2.5">
          <FlameIcon className="mt-0.5 h-6 w-6 shrink-0 text-danger sm:h-8 sm:w-8" aria-hidden="true" />
          <h2 className="max-w-[52%] text-balance text-[clamp(1.15rem,4.6vw,1.7rem)] font-extrabold italic uppercase leading-[1.05] tracking-[-.02em] text-ink sm:max-w-[55%]">
            Promo Berakhir Dalam:
          </h2>
        </div>
        <p className="mt-2 max-w-[55%] text-pretty text-[13px] leading-relaxed text-charcoal sm:max-w-[58%] sm:text-[15px]">
          Jangan sampai kelewatan! Diskon spesial terbatas.
        </p>

        {/* Countdown — grouped pairs with green colons. */}
        <div className="mt-6 flex items-end gap-1.5 sm:mt-7 sm:max-w-[62%] sm:gap-2">
          <CountdownBox value={remaining.done ? "00" : units[0].value} label={units[0].label} />
          <Colon />
          <CountdownBox value={remaining.done ? "00" : units[1].value} label={units[1].label} />
          <span aria-hidden="true" className="w-1 shrink-0 sm:w-2" />
          <CountdownBox value={remaining.done ? "00" : units[2].value} label={units[2].label} />
          <Colon />
          <CountdownBox value={remaining.done ? "00" : units[3].value} label={units[3].label} />
        </div>
      </div>

      {/* Bottom bar — urgency + CTA. */}
      <div className="relative z-10 flex flex-col gap-4 border-t border-black/[.06] bg-white px-5 py-5 dark:border-white/10 dark:bg-surface-card sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <TagIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[13px] font-extrabold uppercase leading-tight text-ink sm:text-sm">
              Harga naik setelah waktu habis!
            </p>
            <p className="mt-0.5 text-xs text-charcoal sm:text-[13px]">
              Manfaatkan sekarang sebelum terlambat.
            </p>
          </div>
        </div>

        <Link
          href={orderHref}
          target={whatsappNumber ? "_blank" : undefined}
          rel={whatsappNumber ? "noopener noreferrer" : undefined}
          className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border-2 border-primary bg-white text-[15px] font-extrabold uppercase tracking-wide text-primary shadow-premium-sm transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-premium-md active:scale-[0.98] dark:bg-transparent dark:hover:bg-primary sm:w-auto sm:px-7"
        >
          <CartIcon className="h-5 w-5" aria-hidden="true" />
          Order Sekarang
        </Link>
      </div>
    </div>
  );
}
