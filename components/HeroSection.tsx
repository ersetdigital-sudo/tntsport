import Image from "next/image";
import type { Brand, StatItem } from "@/lib/types";
import { CartIcon, CheckIcon, WhatsAppIcon } from "@/components/icons";

const JERSEY_IMAGE =
  "https://res.cloudinary.com/dqjh7utdb/image/upload/v1784499783/mrwzuqt7soqdkydjvkrm.png";

/** The first screen: product-forward, with the important order action visible immediately. */
export function HeroSection({
  brand,
  stats,
}: {
  brand: Brand;
  stats: StatItem[];
}) {
  const { name, accentWord } = brand;
  const leading = name.replace(` ${accentWord}`, "");
  const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    "Halo TNT SPORT, saya ingin konsultasi jersey custom."
  )}`;

  return (
    <section className="hero-shell relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-surface-deep text-on-dark shadow-premium-xl sm:rounded-[36px]">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" aria-hidden="true" />

      <div className="relative px-5 pb-5 pt-5 sm:px-8 sm:pb-8 sm:pt-7 lg:px-12 lg:pb-10 lg:pt-9">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 sm:pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/15 bg-white shadow-premium-sm sm:h-11 sm:w-11">
              <Image src="/logo.jpg" alt={`${brand.name} logo`} width={44} height={44} className="h-full w-full object-cover" priority />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">Custom apparel</p>
              <p className="text-sm font-bold tracking-tight text-white">{leading} <span className="text-primary">{accentWord}</span></p>
            </div>
          </div>
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/70 sm:inline-flex">Since 2017 · Indonesia</span>
        </div>

        <div className="grid items-center gap-2 pt-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-8 lg:pt-10">
          <div className="relative z-10 max-w-xl lg:pb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
              Produksi full printing
            </div>
            <h1 className="mt-5 max-w-lg text-[clamp(2.7rem,8vw,5.8rem)] font-bold leading-[0.9] tracking-[-0.07em] text-white">
              Jersey yang terasa <span className="text-gradient-brand">seunik timmu.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
              Bebaskan desain, warna, dan identitas tim. Dikerjakan langsung dari pabrik dengan standar yang siap bertanding.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 text-sm font-bold text-on-primary shadow-premium-glow transition-transform duration-normal hover:-translate-y-0.5 active:scale-[0.98]">
                <WhatsAppIcon className="h-5 w-5" />
                Konsultasi gratis
              </a>
              <a href="#koleksi" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 text-sm font-bold text-white transition-colors hover:bg-white/10 active:scale-[0.98]">
                <CartIcon className="h-5 w-5 text-primary" />
                Lihat pilihan order
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/65">
              {["Desain gratis", "Minimum order fleksibel", "Kirim seluruh Indonesia"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5"><CheckIcon className="h-3.5 w-3.5 text-primary" />{item}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-2 h-[270px] w-full max-w-md sm:h-[360px] lg:mt-0 lg:h-[480px] lg:max-w-none">
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap select-none text-[clamp(5rem,17vw,12rem)] font-bold leading-none tracking-[-0.11em] text-white/[0.045]">TNT</span>
            <div className="absolute inset-x-[12%] bottom-[9%] top-[3%] rounded-[48%] border border-primary/20 bg-primary/10 blur-2xl" aria-hidden="true" />
            <Image src={JERSEY_IMAGE} alt="Jersey custom TNT SPORT" fill priority sizes="(max-width: 1024px) 90vw, 48vw" className="object-contain drop-shadow-[0_30px_25px_rgba(0,0,0,0.55)]" />
            <div className="absolute bottom-5 right-0 rounded-2xl border border-white/15 bg-black/35 px-3 py-2.5 backdrop-blur-md sm:right-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">Mulai dari</p>
              <p className="mt-0.5 text-lg font-bold tracking-tight text-white">Rp65<span className="text-sm text-white/60">rb</span></p>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] sm:grid-cols-4 lg:mt-0">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`px-4 py-4 sm:px-5 ${index % 2 === 0 ? "border-r border-white/10" : ""} ${index < 2 ? "border-b border-white/10 sm:border-b-0" : ""} sm:border-r sm:last:border-r-0`}>
              <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
