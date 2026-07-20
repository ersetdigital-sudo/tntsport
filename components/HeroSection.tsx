import Image from "next/image";
import type { Brand, StatItem } from "@/lib/types";

const JERSEY_IMAGE =
  "https://res.cloudinary.com/dqjh7utdb/image/upload/v1784499783/mrwzuqt7soqdkydjvkrm.png";

/** Compact profile header for the link-in-bio landing page. */
export function HeroSection({ brand, stats }: { brand: Brand; stats: StatItem[] }) {
  const leading = brand.name.replace(` ${brand.accentWord}`, "");

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-white px-5 pt-7 sm:rounded-[36px] sm:px-8 sm:pt-10">
      <div className="bio-stripes pointer-events-none absolute inset-y-0 right-0 w-[64%] opacity-70" aria-hidden="true" />
      <div className="relative min-h-[400px] sm:min-h-[430px]">
        <div className="relative z-10 max-w-[58%] sm:max-w-[55%]">
          <div className="h-[76px] w-[76px] overflow-hidden rounded-full border-2 border-primary/60 bg-white p-1 shadow-premium-md sm:h-24 sm:w-24">
            <Image src="/logo.jpg" alt={`${brand.name} logo`} width={96} height={96} className="h-full w-full rounded-full object-cover" priority />
          </div>
          <h1 className="mt-6 text-[clamp(2.1rem,8vw,4.4rem)] font-extrabold leading-[.9] tracking-[-.075em] text-ink">
            {leading} <span className="text-gradient-brand">{brand.accentWord}</span>
          </h1>
          <p className="mt-5 text-sm font-semibold leading-snug text-ink sm:text-lg">Pabrik Jersey Custom Full Printing.</p>
          <p className="mt-2 text-sm leading-relaxed text-charcoal sm:text-base">Desain bebas, harga pabrik,<br />kirim se-Indonesia.</p>
        </div>

        <div className="absolute -right-7 bottom-[74px] top-1 w-[62%] sm:-right-8 sm:bottom-[70px] sm:w-[58%]">
          <div className="absolute inset-[9%] rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <Image src={JERSEY_IMAGE} alt="Jersey custom TNT SPORT" fill priority sizes="(max-width: 640px) 62vw, 400px" className="object-contain object-right-bottom drop-shadow-[0_18px_15px_rgba(10,20,15,.22)]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 overflow-hidden rounded-2xl border border-black/[.06] bg-white/95 shadow-premium-md backdrop-blur sm:rounded-3xl">
          {stats.slice(0, 3).map((stat, index) => {
            const Icon = stat.icon;
            return <div key={stat.label} className={`flex items-center justify-center gap-2 px-2 py-4 sm:gap-3 sm:px-4 sm:py-5 ${index < 2 ? "border-r border-black/[.08]" : ""}`}>
              {Icon ? <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary sm:flex"><Icon className="h-5 w-5" /></span> : null}
              <div className="min-w-0 text-center sm:text-left"><p className="text-lg font-extrabold leading-none tracking-tight text-primary sm:text-2xl">{stat.value}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[.04em] text-ink sm:text-[11px]">{stat.label}</p></div>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
