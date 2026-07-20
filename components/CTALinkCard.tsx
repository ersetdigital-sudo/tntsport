import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import type { CTALink } from "@/lib/types";

/**
 * CTALinkCard - full-width link-in-bio row, premium edition.
 *
 * Layout: [soft-tint icon tile] [title + description] [chevron in circle]
 * Hover state: lift (-2px), shadow expand, chevron shifts right.
 * Active state: subtle scale down for clear tap feedback on mobile.
 * When `href` is omitted the card renders as informational (non-link).
 */

/** Soft icon surface per accent — light + dark variants. */
const iconSurface: Record<CTALink["accent"], string> = {
  whatsapp:
    "bg-gradient-brand text-white shadow-premium-sm",
  primary:
    "bg-gradient-brand text-white shadow-premium-sm",
  warning:
    "bg-gradient-brand text-white shadow-premium-sm",
  neutral:
    "bg-gradient-brand text-white shadow-premium-sm",
};

export function CTALinkCard({
  title,
  description,
  icon: Icon,
  accent,
  href,
  external = true,
}: CTALink) {
  const content = (
    <>
      {/* Icon tile — soft tinted container matching the action context. */}
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl md:h-14 md:w-14 ${iconSurface[accent]}`}
        aria-hidden="true"
      >
        <Icon className="h-[18px] w-[18px] md:h-6 md:w-6" />
      </span>

      {/* Title + description — compact on mobile, readable on desktop. */}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-base font-semibold leading-tight text-ink md:text-heading-md">
          {title}
        </span>
        <span className="text-sm text-charcoal md:text-body-sm">
          {description}
        </span>
      </span>

      {/* Arrow affordance (links only) — chevron inside a soft circle. */}
      {href ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover/card:bg-primary group-hover/card:text-white">
          <ChevronRightIcon className="h-4 w-4 transition-transform duration-normal group-hover/card:translate-x-0.5" />
        </span>
      ) : null}
    </>
  );

  const wrapperClasses =
    "rounded-2xl bg-transparent";
  const innerClasses =
    "group/card relative flex min-h-[84px] items-center gap-3 rounded-2xl border border-black/[.055] bg-white p-4 md:gap-4 md:p-5 " +
    "shadow-premium-md transition-all duration-normal ease-premium hover:-translate-y-1 hover:shadow-premium-lg active:scale-[0.98]";

  if (!href) {
    return (
      <div className={wrapperClasses}>
        <div className={innerClasses}>{content}</div>
      </div>
    );
  }

  if (external) {
    return (
      <div className={wrapperClasses}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={innerClasses}
        >
          {content}
        </a>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <Link href={href} className={innerClasses}>
        {content}
      </Link>
    </div>
  );
}
