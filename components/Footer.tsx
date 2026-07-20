import type { Brand } from "@/lib/types";

/**
 * Footer - simple centered footer with brand name and copyright.
 * Matches the screenshot's minimal footer style.
 */
export function Footer({ brand }: { brand: Brand }) {
  const year = new Date().getFullYear();
  const { name, accentWord } = brand;
  const leading = name.replace(` ${accentWord}`, "");

  return (
    <footer className="w-full border-t border-hairline bg-surface-card">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-sm px-lg py-xxxl text-center">
        <span className="text-body-md font-bold text-ink">
          {leading}{" "}
          <span className="text-primary">{accentWord}</span>
        </span>
        <p className="text-caption text-mute">
          © {year} {brand.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
