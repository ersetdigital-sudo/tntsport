import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import type { CTALink } from "@/lib/types";

/**
 * CTALinkCard - full-width link-in-bio row, premium glass edition.
 *
 * Layout: [gradient icon tile] [title + description] [-> arrow]
 * Hover state: lift (-2px), shadow expand, arrow shift right, and the
 * glass border tints with the brand gradient. When `href` is omitted
 * the card renders as informational (non-link) without the arrow.
 */

/** Accent -> gradient class for the icon tile. */
const accentTile: Record<CTALink["accent"], string> = {
  whatsapp: "bg-whatsapp text-white",
  primary: "bg-gradient-brand text-on-primary",
  warning: "bg-warning text-white",
  neutral: "bg-surface-dark text-on-dark",
};

export function CTALinkCard({
  title,
  description,
  icon: Icon,
  accent,
  href,
  external = true,
}: CTALink) {
  const inner = (
    <>
      {/* Icon tile - square with rounded corners, gradient per accent */}
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-premium-sm ${accentTile[accent]}`}
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" />
      </span>

      {/* Title + description */}
      <span className="flex flex-1 flex-col gap-xxs min-w-0">
        <span className="text-heading-md text-ink">{title}</span>
        <span className="text-body-sm text-on-dark-mute">{description}</span>
      </span>

      {/* Arrow affordance (links only) */}
      {href ? (
        <ArrowRightIcon
          className="h-5 w-5 shrink-0 text-on-dark-mute group-hover:text-primary group-hover:translate-x-1 transition-all duration-normal"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const containerClasses = `group lift-on-hover hover:shadow-premium-lg glass rounded-2xl p-xl md:px-xxl flex items-center gap-lg ${
    href ? "cursor-pointer" : ""
  }`;

  if (!href) {
    return <div className={containerClasses}>{inner}</div>;
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={containerClasses}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={containerClasses}>
      {inner}
    </Link>
  );
}
