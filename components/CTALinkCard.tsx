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
    "bg-green-500/15 text-green-500",
  primary:
    "bg-primary/15 text-primary",
  warning:
    "bg-warning/15 text-warning",
  neutral:
    "bg-white/10 text-ash",
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
        <span className="text-sm text-on-dark-mute md:text-body-sm">
          {description}
        </span>
      </span>

      {/* Arrow affordance (links only) — chevron inside a soft circle. */}
      {href ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-ash transition-colors group-hover/card:bg-primary/15 group-hover/card:text-primary">
          <ChevronRightIcon className="h-4 w-4 transition-transform duration-normal group-hover/card:translate-x-0.5" />
        </span>
      ) : null}
    </>
  );

  const wrapperClasses =
    "rounded-2xl bg-gradient-to-br from-primary/35 via-white/10 to-transparent p-px";
  const innerClasses =
    "group/card relative flex items-center gap-3 md:gap-4 rounded-[15px] bg-surface-card/90 p-4 md:p-5 " +
    "shadow-premium-md transition-all duration-normal ease-premium hover:bg-surface-card " +
    "hover:-translate-y-1 hover:shadow-premium-lg active:scale-[0.98]";

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
