import Link from "next/link";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import type { Brand } from "@/lib/types";

/**
 * ClosingCTA — final conversion band after testimoni.
 *
 * Re-surfaces the two primary actions: order via WhatsApp (main) and
 * browse the catalog (supporting). Mobile-first: stacked full-width
 * buttons; desktop: side-by-side. Sporty green gradient + stripe accent.
 */
export function ClosingCTA({ brand }: { brand: Brand }) {
  const waHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    "Halo TNT SPORT, saya mau order jersey custom."
  )}`;
  const katalogHref = `${brand.url}/katalog`;

  return (
    <section
      aria-label="Order sekarang"
      className="relative overflow-hidden rounded-2xl bg-gradient-brand p-5 shadow-premium-lg sm:rounded-3xl sm:p-7"
    >
      <div
        aria-hidden="true"
        className="stripes-brand absolute -right-8 -top-6 h-[120%] w-[55%] opacity-30 [clip-path:polygon(45%_0,100%_0,100%_70%,75%_100%)]"
      />
      <div className="relative z-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="max-w-[34ch]">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[.16em] text-white/80">
            Siap mulai?
          </p>
          <h2 className="mt-2 text-balance text-lg font-extrabold leading-tight text-white sm:text-2xl">
            Pesan jersey custom tim kamu sekarang
          </h2>
          <p className="mt-1.5 text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
            Konsultasi gratis via WhatsApp. Desain bebas, harga pabrik, kirim se-Indonesia.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-white px-6 text-sm font-extrabold uppercase tracking-wide text-primary shadow-premium-md transition-all duration-200 hover:brightness-95 active:scale-[0.98] sm:w-auto sm:text-base"
          >
            <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
            Order via WhatsApp
          </Link>
          <Link
            href={katalogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/40 px-6 text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] sm:w-auto sm:text-base"
          >
            Lihat Katalog
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
