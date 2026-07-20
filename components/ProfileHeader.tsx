import Image from "next/image";
import type { Brand } from "@/lib/types";

/**
 * ProfileHeader - hero section with logo, brand name, and tagline.
 * Clean text-only layout, no product image. Mobile-first and responsive.
 */
export function ProfileHeader({ brand }: { brand: Brand }) {
  const { name, accentWord, tagline } = brand;
  const leading = name.replace(` ${accentWord}`, "");

  return (
    <header className="flex flex-col items-center gap-md text-center sm:flex-row sm:items-center sm:gap-lg sm:text-left">
      {/* Logo circle */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary shadow-premium-sm sm:h-20 sm:w-20">
        <Image
          src="/logo.jpg"
          alt={`${brand.name} logo`}
          width={80}
          height={80}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Brand text */}
      <div className="flex flex-col gap-xs">
        <h1 className="text-heading-lg leading-tight text-ink">
          {leading}{" "}
          <span className="font-bold text-primary">{accentWord}</span>
        </h1>
        <p className="text-body-sm text-charcoal whitespace-pre-line sm:text-body-md">
          {tagline}
        </p>
      </div>
    </header>
  );
}
