import type { Brand } from "@/lib/types";

/**
 * Footer - premium gradient footer.
 *
 * Layered: a subtle brand gradient strip on top, the deep surface below.
 * Brand wordmark uses button-sm uppercase; tagline uses caption;
 * copyright uses caption with on-dark-mute. The divider is a hairline
 * with a gradient tint.
 */
export function Footer({ brand }: { brand: Brand }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-surface-deep text-on-dark-mute">
      {/* Top gradient strip */}
      <div className="h-px w-full bg-gradient-brand opacity-60" aria-hidden="true" />

      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-lg px-lg py-xxxl text-center md:px-xxl">
        <div className="flex flex-col items-center gap-sm">
          <span className="text-button-sm text-on-dark uppercase tracking-wider">
            {brand.name}
          </span>
          <p className="text-caption text-on-dark-mute max-w-xs">
            {brand.tagline.replace("\n", " ")}
          </p>
        </div>

        <div className="h-px w-24 bg-gradient-brand opacity-40" />

        <p className="text-caption text-on-dark-mute">
          © {year} {brand.name}. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
