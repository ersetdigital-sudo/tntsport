import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import type { CTAAccent, CTALink } from "@/lib/types";

/**
 * CTALinkCard — bold, conversion-focused link-in-bio row.
 *
 * Layout: [icon badge] [UPPERCASE bold title + muted subtitle] [arrow circle]
 *
 * Light mode: full-bleed accent backgrounds for maximum impact.
 * Dark mode: consistent dark surface with accent-colored icon badge,
 * accent-tinted arrow, and subtle glow on the primary CTA — keeping
 * the palette premium and cohesive with the brand.
 */
const accentStyles: Record<
  CTAAccent,
  { card: string; iconBadge: string; arrow: string }
> = {
  whatsapp: {
    card: "bg-whatsapp text-white dark:bg-surface-card dark:text-white",
    iconBadge:
      "bg-white/20 dark:bg-whatsapp dark:text-white",
    arrow:
      "bg-white/20 group-hover/card:bg-white/30 dark:bg-whatsapp/15 dark:text-whatsapp dark:group-hover/card:bg-whatsapp dark:group-hover/card:text-white",
  },
  primary: {
    card: "bg-primary text-white dark:bg-surface-card dark:text-white dark:ring-1 dark:ring-primary/30 dark:shadow-premium-glow",
    iconBadge:
      "bg-white/20 dark:bg-primary dark:text-white",
    arrow:
      "bg-white/20 group-hover/card:bg-white/30 dark:bg-primary/15 dark:text-primary dark:group-hover/card:bg-primary dark:group-hover/card:text-white",
  },
  warning: {
    card: "bg-warning text-white dark:bg-surface-card dark:text-white",
    iconBadge:
      "bg-white/20 dark:bg-warning dark:text-white",
    arrow:
      "bg-white/20 group-hover/card:bg-white/30 dark:bg-warning/15 dark:text-warning dark:group-hover/card:bg-warning dark:group-hover/card:text-white",
  },
  neutral: {
    card: "bg-[#1e1e2a] text-white dark:bg-surface-card dark:text-white",
    iconBadge:
      "bg-white/20 dark:bg-white/10 dark:text-white",
    arrow:
      "bg-white/20 group-hover/card:bg-white/30 dark:bg-white/10 dark:text-white/60 dark:group-hover/card:bg-white/20 dark:group-hover/card:text-white",
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
  const styles = accentStyles[accent];

  const content = (
    <>
      {/* Icon badge — accent-colored tile. */}
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl backdrop-blur-sm sm:h-14 sm:w-14 sm:rounded-[16px] ${styles.iconBadge}`}
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
      </span>

      {/* Title + description. */}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="break-words text-[15px] font-extrabold uppercase leading-tight tracking-[-.01em] sm:text-lg">
          {title}
        </span>
        <span className="break-words text-[13px] font-medium leading-snug text-white/80 dark:text-white/60 sm:text-[15px]">
          {description}
        </span>
      </span>

      {/* Arrow affordance (links only). */}
      {href ? (
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 sm:h-10 sm:w-10 ${styles.arrow}`}
        >
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/card:translate-x-0.5 sm:h-5 sm:w-5" />
        </span>
      ) : null}
    </>
  );

  const classes = `group/card relative flex min-h-[88px] items-center gap-4 rounded-3xl p-5 shadow-premium-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-lg active:scale-[0.98] sm:min-h-[96px] sm:gap-5 sm:rounded-[28px] sm:p-6 ${styles.card}`;

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