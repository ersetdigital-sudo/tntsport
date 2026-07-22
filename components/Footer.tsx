import Image from "next/image";
import type { Brand } from "@/lib/types";

/**
 * Footer — simple centered footer with brand logo and copyright.
 */
export function Footer({ brand }: { brand: Brand }) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/[.06] bg-surface-card dark:border-white/10 dark:bg-surface-deep">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 px-6 py-6 text-center">
        {/* Logo */}
        <Image
          src="/af7bb11e-1e11-423d-809a-1d5c75fbe91f.png"
          alt="TNT Sport"
          width={48}
          height={48}
          className="h-12 w-12 rounded-xl object-contain"
        />
        {/* Brand name */}
        <span className="text-sm font-bold text-ink">
          {brand.name}
        </span>
        {/* Copyright */}
        <p className="text-[11px] text-stone">
          © {year} {brand.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
