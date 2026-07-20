import Image from "next/image";
import type { Brand } from "@/lib/types";

/**
 * ProfileHeader - hero section with logo, brand name, tagline,
 * and a featured jersey image matching the reference layout.
 */

// Hero jersey image (Cloudinary).
const HERO_JERSEY =
  "https://res.cloudinary.com/dqjh7utdb/image/upload/v1784499783/mrwzuqt7soqdkydjvkrm.png";

export function ProfileHeader({ brand }: { brand: Brand }) {
  const { name, accentWord, tagline } = brand;
  const leading = name.replace(` ${accentWord}`, "");

  return (
    <header className="flex w-full flex-col gap-lg sm:flex-row sm:items-center sm:justify-between">
      {/* Left: logo + text */}
      <div className="flex flex-col items-start gap-md">
        {/* Logo with registered mark */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary shadow-premium-sm sm:h-20 sm:w-20">
          <Image
            src="/logo.jpg"
            alt={`${brand.name} logo`}
            width={80}
            height={80}
            className="h-full w-full object-cover"
            priority
          />
          <span
            className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-surface-card text-[10px] font-bold text-primary shadow-sm"
            aria-hidden="true"
          >
            ®
          </span>
        </div>

        {/* Brand name */}
        <h1 className="text-heading-lg leading-tight text-ink">
          {leading}{" "}
          <span className="font-extrabold text-primary">{accentWord}</span>
        </h1>

        {/* Tagline */}
        <p className="whitespace-pre-line text-body-md text-charcoal">
          {tagline}
        </p>
      </div>

      {/* Right: featured jersey */}
      <div className="relative mx-auto h-40 w-40 shrink-0 sm:mx-0 sm:h-44 sm:w-44 md:h-52 md:w-52">
        <Image
          src={HERO_JERSEY}
          alt="Jersey TNT SPORT"
          fill
          priority
          sizes="(max-width: 640px) 160px, 208px"
          className="object-contain drop-shadow-xl"
        />
      </div>
    </header>
  );
}
