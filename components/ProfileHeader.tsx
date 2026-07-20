import Image from "next/image";
import type { Brand } from "@/lib/types";

/**
 * ProfileHeader - hero section with left-aligned brand info and
 * product jersey image on the right.
 *
 * Layout: [logo + name + tagline] ... [jersey image]
 * Mobile: stacks vertically with image below text.
 */

const JERSEY_IMAGE =
  "https://res.cloudinary.com/dqjh7utdb/image/upload/v1784495791/hadepgirs684wzyeizza.png";

export function ProfileHeader({ brand }: { brand: Brand }) {
  const { name, accentWord, tagline } = brand;
  const leading = name.replace(` ${accentWord}`, "");

  return (
    <header className="flex items-center justify-between gap-lg">
      {/* Left: logo + brand name + tagline */}
      <div className="flex items-start gap-md">
        {/* Logo circle */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-primary shadow-premium-sm">
          <Image
            src="/logo.jpg"
            alt={`${brand.name} logo`}
            width={56}
            height={56}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        {/* Brand text */}
        <div className="flex flex-col gap-xxs">
          <h1 className="text-heading-lg leading-tight text-ink">
            {leading}{" "}
            <span className="font-bold text-primary">{accentWord}</span>
          </h1>
          <p className="text-body-sm text-charcoal whitespace-pre-line">
            {tagline}
          </p>
        </div>
      </div>

      {/* Right: jersey product image */}
      <div className="relative hidden h-36 w-32 shrink-0 sm:block md:h-44 md:w-40">
        <Image
          src={JERSEY_IMAGE}
          alt="Jersey TNT SPORT"
          fill
          priority
          sizes="160px"
          className="object-contain object-center drop-shadow-lg"
        />
      </div>
    </header>
  );
}
