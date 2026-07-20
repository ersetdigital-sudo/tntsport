import Image from "next/image";
import type { Brand, StatItem } from "@/lib/types";

/**
 * HeroSection — text-only hero (no jersey photo):
 * centered layout with logo, big "TNT SPORT" wordmark with green
 * accent + underline bar and two-line tagline, over a subtle diagonal
 * stripe wash in the top-right corner. Stats bar sits at the bottom.
 */
export function HeroSection({ brand, stats }: { brand: Brand; stats: StatItem[] }) {
  const leading = brand.name.replace(` ${brand.accentWord}`, "");
  const taglineLines = brand.tagline.split("\n");

  return (
    <section className="relative overflow-hidden bg-white dark:bg-surface-deep">
      {/* Subtle diagonal stripe wash — decorative corner accent only. */}
      <div
        aria-hidden="true"
        className="stripes-brand absolute -right-10 -top-8 h-[110%] w-[55%] opacity-45 [clip-path:polygon(45%_0,100%_0,100%_70%,75%_100%)] sm:w-[42%]"
      />

      {/* Logo, wordmark, tagline. */}
      <div className="relative z-10 flex flex-col items-center px-5 pb-5 pt-7 text-center sm:px-8 sm:pt-10">
        <div className="h-20 w-20 overflow-hidden rounded-full border-[3px] border-primary/50 bg-white p-1 shadow-premium-md dark:bg-surface-deep sm:h-24 sm:w-24">
          <Image
            src="/logo.jpg"
            alt={`${brand.name} logo`}
            width={96}
            height={96}
            className="h-full w-full rounded-full object-cover"
            priority
          />
        </div>

        <h1 className="mt-6 text-[clamp(2.4rem,10vw,4.5rem)] font-extrabold leading-[.95] tracking-[-.05em] text-ink">
          {leading} <span className="italic text-primary">{brand.accentWord}</span>
        </h1>
        <span aria-hidden="true" className="mt-3 block h-1.5 w-14 rounded-full bg-primary" />

        <p className="mx-auto mt-5 max-w-md text-balance text-base font-extrabold leading-snug text-ink sm:text-xl">
          {taglineLines[0]}
        </p>
        {taglineLines[1] ? (
          <p className="mx-auto mt-1.5 max-w-md text-pretty text-sm leading-relaxed text-charcoal sm:text-base">
            {taglineLines[1]}
          </p>
        ) : null}
      </div>

      {/* Stats bar — solid green circle icons, green values, dividers. */}
      <div className="relative z-10 mx-4 mb-1 mt-4 grid grid-cols-3 divide-x divide-black/[.08] rounded-2xl border border-black/[.06] bg-white shadow-premium-lg dark:divide-white/10 dark:border-white/10 dark:bg-[#15151f] sm:mx-7 sm:rounded-3xl">
        {stats.slice(0, 3).map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-2 px-2 py-4 text-center sm:flex-row sm:gap-3 sm:px-4 sm:py-5"
            >
              {Icon ? (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-premium-sm sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
              ) : null}
              <div className="min-w-0">
                <p className="text-lg font-extrabold leading-none tracking-tight text-primary sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[.06em] text-ink dark:text-white sm:text-[11px]">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}