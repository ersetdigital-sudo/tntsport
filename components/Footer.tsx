import type { Brand } from "@/lib/types";

/**
 * Footer - simple centered footer with brand name and copyright.
 * Matches the reference's minimal footer style.
 */
export function Footer({ brand }: { brand: Brand }) {
  const year = new Date().getFullYear();
  const { name, accentWord } = brand;
  const leading = name.replace(` ${accentWord}`, "");

  return (
    <footer className="w-full border-t border-hairline bg-surface-card">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-2 px-6 py-10 text-center">
        <span className="text-lg font-bold text-primary">
          {leading} <span className="text-ink">{accentWord}</span>
        </span>
        <p className="text-xs text-mute">
          © {year} {brand.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
