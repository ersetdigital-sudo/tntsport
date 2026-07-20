import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CTALink } from "@/lib/types";

/**
 * CTALinkCard - clean card-style link row matching the reference design.
 *
 * Layout: [green icon circle] [title + description] [→]
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
      {/* Green icon container */}
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>

      {/* Title + description */}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-sm font-bold uppercase tracking-wide text-ink sm:text-base">
          {title}
        </span>
        <span className="text-xs text-mute sm:text-sm">{description}</span>
      </span>

      {/* Right arrow affordance (links only) */}
      {href ? (
        <ArrowRight
          className="h-5 w-5 shrink-0 text-mute transition-transform duration-normal group-hover:translate-x-1 sm:h-6 sm:w-6"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const containerClasses =
    "group flex items-center gap-4 rounded-2xl border border-hairline bg-surface-card p-4 shadow-premium-sm transition-all duration-fast hover:-translate-y-0.5 hover:shadow-premium-md active:scale-[0.98] sm:p-5";

  if (!href) {
    return <div className={containerClasses}>{content}</div>;
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={containerClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={containerClasses}>
      {content}
    </Link>
  );
}
