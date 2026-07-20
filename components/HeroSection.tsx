import Image from "next/image";
import type { Brand, StatItem } from "@/lib/types";

/** Compact profile header for the link-in-bio landing page. */
export function HeroSection({ brand, stats }: { brand: Brand; stats: StatItem[] }) {
  const leading = brand.name.replace(` ${brand.accentWord}`, "");

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-white px-5 pt-7 dark:bg-surface-card sm:rounded-[36px] sm:px-8 sm:pt-10">
      <div className="bio-stripes pointer-events-none absolute inset-y-0 right-0 w-[64%] opacity-70" aria-hidden="true" />
      <div className="relative min-h-[360px] sm:min-h-[390px]">
        <div className="relative z-10 mx-auto max-w-xl text-center">
          <div className="mx-auto h-[76px] w-[76px] overflow-hidden rounded-full border-2 border-primary/60 bg-white p-1 shadow-premium-md dark:bg-surface-deep sm:h-24 sm:w-24">
            <Image src="/logo.jpg" alt={`${brand.name} logo`} width={96} height={96} className="h-full w-full rounded-full object-cover" priority />
          </div>
          <h1 className="mt-6 text-[clamp(2.1rem,8vw,4.4rem)] font-extrabold leading-[.9] tracking-[-.075em] text-ink">
            {leading} <span className="text-gradient-brand">{brand.accentWord}</span>
          </h1>
          <p className="mt-5 text-sm font-semibold leading-snug text-ink sm:text-lg">Pabrik Jersey Custom Full Printing.</p>
          <p className="mt-2 text-sm leading-relaxed text-charcoal sm:text-base">Desain bebas, harga pabrik,<br />kirim se-Indonesia.</p>
        </div>

        <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 overflow-hidden rounded-2xl border border-black/[.06] bg-white/95 shadow-premium-md backdrop-blur dark:border-white/10 dark:bg-[#15151f] sm:rounded-3xl">
          {stats.slice(0, 3).map((stat, index) => {
            const Icon = stat.icon;
            return <div key={stat.label} className={`flex items-center justify-center gap-2 px-2 py-4 text-center text-gray-950 sm:gap-3 sm:px-4 sm:py-5 dark:text-white ${index < 2 ? "border-r border-black/[.08] dark:border-white/10" : ""}`}>
              {Icon ? <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary sm:flex"><Icon className="h-5 w-5" /></span> : null}
              <div className="min-w-0 text-center"><p className="text-lg font-extrabold leading-none tracking-tight text-primary sm:text-2xl">{stat.value}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[.04em] text-gray-950 dark:text-white sm:text-[11px]">{stat.label}</p></div>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
