import Image from "next/image";
import type { Brand } from "@/lib/types";

/**
 * ProfileHeader - brand identity block at the top of the page.
 *
 * Avatar: 96px circle with an animated conic gradient ring (brand
 * gradient: coral -> magenta -> electric). The logo image sits inside on
 * a surface-dark tile so it reads cleanly on any background.
 *
 * Brand name uses heading-lg typography. The `accentWord` ("SPORT")
 * is rendered with a brand gradient text fill - the only saturated note
 * in the heading. Tagline uses body-md + on-dark-mute.
 *
 * Uses next/image for the logo (explicit width/height, AVIF/WebP auto).
 */
export function ProfileHeader({ brand }: { brand: Brand }) {
  const { name, accentWord, tagline } = brand;
  const leading = name.replace(` ${accentWord}`, "");

  return (
    <header className="flex flex-col items-center text-center gap-lg">
      {/* Avatar with animated gradient ring */}
      <div className="relative h-28 w-28">
        {/* Rotating gradient ring */}
        <div
          className="absolute inset-0 rounded-full ring-conic-brand animate-spin-slow"
          aria-hidden="true"
        />
        {/* Inner tile with logo */}
        <div className="absolute inset-[4px] rounded-full overflow-hidden bg-surface-dark shadow-premium-md">
          <Image
            src="/logo.jpg"
            alt={`${brand.name} logo`}
            width={96}
            height={96}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Brand name - h1 is the page's single primary heading */}
      <h1 className="text-heading-lg text-ink">
        {leading}{" "}
        <span className="text-gradient-brand">{accentWord}</span>
      </h1>

      {/* Tagline - preserve the explicit line break from data */}
      <p className="text-body-md text-on-dark-mute max-w-md whitespace-pre-line">
        {tagline}
      </p>
    </header>
  );
}
