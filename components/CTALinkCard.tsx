import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import type { CTALink } from "@/lib/types";

/**
 * CTALinkCard — link-in-bio row matching the reference:
 * [solid green rounded icon tile] [UPPERCASE bold title + muted subtitle]
 * [chevron in soft green circle].
 */
export function CTALinkCard({
  title,
  description,
  icon: Icon,
  href,
  external = true,
}: CTALink) {
  const content = (
    <>
      {/* Solid green icon tile. */}
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-premium-sm sm:h-14 sm:w-14 sm:rounded-2xl"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
      </span>

      {/* Title + description. */}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="break-words text-[15px] font-extrabold uppercase leading-tight tracking-[-.01em] text-ink sm:text-lg">
          {title}
        </span>
        <span className="break-words text-[13px] leading-snug text-charcoal sm:text-[15px]">
          {description}
        </span>
      </span>

      {/* Chevron affordance (links only). */}
      {href ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover/card:bg-primary group-hover/card:text-white">
          <ChevronRightIcon className="h-4 w-4 transition-transform group-hover/card:translate-x-0.5" />
        </span>
      ) : null}
    </>
  );

  const classes =
    "group/card relative flex min-h-[80px] items-center gap-3.5 rounded-2xl border border-black/[.05] bg-white p-4 shadow-premium-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-lg active:scale-[0.98] dark:border-white/10 dark:bg-surface-card sm:gap-4 sm:rounded-3xl sm:p-5";

  if (!href) {
    return <div className={classes}>{content}</div>;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
