import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import type { CTAAccent, CTALink } from "@/lib/types";

/**
 * CTALinkCard — bold, conversion-focused link-in-bio row.
 *
 * Layout: [icon badge] [UPPERCASE bold title + muted subtitle] [arrow circle]
 *
 * Each accent variant gets its own full-bleed background color so
 * different CTAs are instantly distinguishable at a glance. White text
 * sits on every color for maximum contrast. The primary accent (brand
 * green) is the most attention-grabbing — reserved for the main CTA.
 */
const accentStyles: Record<CTAAccent, string> = {
  whatsapp: "bg-whatsapp text-white",
  primary: "bg-primary text-white",
  warning: "bg-warning text-white",
  neutral: "bg-[#1e1e2a] text-white dark:bg-[#262633]",
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
      {/* Icon badge — semi-transparent white tile. */}
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm sm:h-14 sm:w-14 sm:rounded-[16px]"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
      </span>

      {/* Title + description. */}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="break-words text-[15px] font-extrabold uppercase leading-tight tracking-[-.01em] sm:text-lg">
          {title}
        </span>
        <span className="break-words text-[13px] font-medium leading-snug text-white/80 sm:text-[15px]">
          {description}
        </span>
      </span>

      {/* Arrow affordance (links only). */}
      {href ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 transition-all duration-200 group-hover/card:bg-white/30 sm:h-10 sm:w-10">
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/card:translate-x-0.5 sm:h-5 sm:w-5" />
        </span>
      ) : null}
    </>
  );

  const classes = `group/card relative flex min-h-[88px] items-center gap-4 rounded-3xl p-5 shadow-premium-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-lg active:scale-[0.98] sm:min-h-[96px] sm:gap-5 sm:rounded-[28px] sm:p-6 ${accentStyles[accent]}`;

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