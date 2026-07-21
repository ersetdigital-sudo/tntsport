import Link from "next/link";
import { ArrowRightIcon, StarIcon } from "@/components/icons";
import type { CTAAccent, CTALink } from "@/lib/types";

/**
 * CTALinkCard — bold, conversion-focused link-in-bio row.
 *
 * Layout: [icon badge] [UPPERCASE bold title + muted subtitle] [arrow circle]
 * The primary-accent card is the "main" CTA — it carries an "UTAMA" pill and
 * a stronger shadow so it leads the visual hierarchy.
 *
 * Mobile-first: 68px min touch target, balanced icon/text/arrow scale.
 */
const accentStyles: Record<
  CTAAccent,
  { card: string; iconBadge: string; arrow: string; badge?: string }
> = {
  whatsapp: {
    card: "bg-whatsapp text-white dark:bg-surface-card dark:text-white dark:ring-1 dark:ring-whatsapp/30",
    iconBadge: "bg-white/20 dark:bg-whatsapp dark:text-white",
    arrow: "bg-white/20 group-hover/card:bg-white/30 dark:bg-whatsapp/15 dark:text-whatsapp dark:group-hover/card:bg-whatsapp dark:group-hover/card:text-white",
  },
  primary: {
    card: "bg-primary text-white shadow-premium-lg dark:bg-surface-card dark:text-white dark:ring-1 dark:ring-primary/30 dark:shadow-premium-glow",
    iconBadge: "bg-white/20 dark:bg-primary dark:text-white",
    arrow: "bg-white/20 group-hover/card:bg-white/30 dark:bg-primary/15 dark:text-primary dark:group-hover/card:bg-primary dark:group-hover/card:text-white",
    badge: "UTAMA",
  },
  warning: {
    card: "bg-warning text-white dark:bg-surface-card dark:text-white dark:ring-1 dark:ring-warning/30",
    iconBadge: "bg-white/20 dark:bg-warning dark:text-white",
    arrow: "bg-white/20 group-hover/card:bg-white/30 dark:bg-warning/15 dark:text-warning dark:group-hover/card:bg-warning dark:group-hover/card:text-white",
  },
  neutral: {
    card: "bg-[#1e1e2a] text-white dark:bg-surface-card dark:text-white dark:ring-1 dark:ring-white/10",
    iconBadge: "bg-white/20 dark:bg-white/10 dark:text-white",
    arrow: "bg-white/20 group-hover/card:bg-white/30 dark:bg-white/10 dark:text-white/60 dark:group-hover/card:bg-white/20 dark:group-hover/card:text-white",
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
      {/* Icon badge */}
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl backdrop-blur-sm sm:h-12 sm:w-12 sm:rounded-2xl ${styles.iconBadge}`}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>

      {/* Title + description + optional UTAMA badge */}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="break-words text-sm font-extrabold uppercase leading-tight tracking-[-.01em] sm:text-base">
            {title}
          </span>
          {styles.badge ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.08em] text-white backdrop-blur-sm">
              <StarIcon className="h-2.5 w-2.5" aria-hidden="true" />
              {styles.badge}
            </span>
          ) : null}
        </span>
        <span className="break-words text-xs font-medium leading-snug text-white/75 dark:text-white/60 sm:text-sm">
          {description}
        </span>
      </span>

      {/* Arrow affordance (links only). */}
      {href ? (
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover/card:translate-x-0.5 sm:h-9 sm:w-9 ${styles.arrow}`}
        >
          <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      ) : null}
    </>
  );

  const classes = `group/card relative flex min-h-[68px] items-center gap-3 overflow-hidden rounded-2xl p-4 shadow-premium-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:min-h-[80px] sm:gap-4 sm:rounded-3xl sm:p-5 ${styles.card}`;

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
