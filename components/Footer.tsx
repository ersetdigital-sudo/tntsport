import Link from "next/link";
import type { Brand } from "@/lib/types";

const LANDING_LINKS = [
  { href: "/jersey-futsal", label: "Jersey Futsal" },
  { href: "/jersey-voli", label: "Jersey Voli" },
  { href: "/jersey-basket", label: "Jersey Basket" },
  { href: "/jersey-racing", label: "Jersey Racing" },
  { href: "/jersey-running", label: "Jersey Running" },
  { href: "/jersey-mancing", label: "Jersey Mancing" },
  { href: "/jersey-army", label: "Jersey Army" },
  { href: "/jersey-badminton", label: "Jersey Badminton" },
  { href: "/corporate-collection", label: "Corporate Collection" },
  { href: "/fantasy-club", label: "Fantasy Club" },
];

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

        {/* Landing page links */}
        <div className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-1.5">
          {LANDING_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] text-charcoal transition hover:text-primary hover:underline"
            >
              {link.label}
            </Link>
          ))}
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
