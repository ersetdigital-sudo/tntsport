import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CTALink } from "@/lib/types";

/**
 * CTALinkCard - premium link card with contextual icon container,
 * clear typography, and a chevron inside a soft circle.
 *
 * Hover: subtle lift + shadow expand.
 * Active/tap: slight scale-down feedback.
 */

/** Contextual icon container styles per accent (light + dark). */
const accentStyles: Record<CTALink["accent"], { container: string }> = {
  whatsapp: {
    container:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
  },
  primary: {
    container:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  },
  warning: {
    container:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  },
  neutral: {
    container:
      "bg-gray-50 text-gray-600 dark:bg-gray-900/50 dark:text-gray-400",
  },
};

export function CTALinkCard({
  title,
  description,
  icon: Icon,
  accent,
  href,
  external = true,
}: CTALink) {
  const { container: iconContainer } = accentStyles[accent];

  const content = (
    <>
      {/* Contextual icon container */}
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconContainer} sm:h-12 sm:w-12 md:h-14 md:w-14`}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>

      {/* Title + description */}
      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="truncate text-sm font-bold uppercase tracking-wide text-ink sm:text-body-md">
          {title}
        </span>
        <span className="text-xs text-mute sm:text-body-sm">{description}</span>
      </span>

      {/* Chevron inside soft circle */}
      {href ? (
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors duration-fast group-hover/card:bg-primary/10 group-hover/card:text-primary dark:bg-gray-800/50 sm:h-8 sm:w-8"
          aria-hidden="true"
        >
          <ChevronRight className="h-4 w-4 transition-transform duration-normal group-hover/card:translate-x-0.5 sm:h-5 sm:w-5" />
        </span>
      ) : null}
    </>
  );

  const wrapperClasses =
    "rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 p-px transition-shadow hover:shadow-premium-lg";
  const innerClasses =
    "group/card relative flex items-center gap-3 sm:gap-4 rounded-[15px] bg-surface-card p-4 shadow-premium-md transition-all duration-fast ease-premium hover:-translate-y-0.5 hover:shadow-premium-lg active:scale-[0.98] sm:p-lg";

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
