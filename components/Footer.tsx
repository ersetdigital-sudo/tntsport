import type { Brand } from "@/lib/types";

/**
 * Footer — modern minimal footer for the landing page bio-link card.
 */
export function Footer({ brand }: { brand: Brand }) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/[.06] bg-surface-card dark:border-white/10 dark:bg-surface-deep">
      {/* Main footer */}
      <div className="mx-auto max-w-lg px-6 py-6">
        {/* Brand + description */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-lg font-extrabold italic tracking-tight text-ink">
            TNT SPORT <span className="text-primary">APPAREL</span>
          </span>
          <p className="max-w-xs text-xs leading-relaxed text-charcoal">
            Tempat bikin jersey futsal custom. Desain bebas, harga pabrik, kirim se-Indonesia.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/[.06] dark:border-white/10">
        <div className="mx-auto flex max-w-lg items-center justify-center px-6 py-3">
          <p className="text-[10px] text-stone">
            © {year} {brand.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
