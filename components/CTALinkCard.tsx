import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import type { CTALink } from "@/lib/types";

/**
 * CTALinkCard - clean light-gray card with green circle icon,
 * bold title, gray subtitle, and right chevron arrow.
 * Matches the screenshot's quick-action style.
 */

export function CTALinkCard({
  title,
  description,
  icon: Icon,
  href,
  external = true,
}: CTALink) {
  const inner = (
    <>
      {/* Green circle icon */}
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" />
      </span>

      {/* Title + description */}
      <span className="flex flex-1 flex-col gap-xxs min-w-0">
        <span className="text-body-md font-bold uppercase text-ink">{title}</span>
        <span className="text-body-sm text-mute">{description}</span>
      </span>

      {/* Chevron arrow */}
      {href ? (
        <ArrowRightIcon
          className="h-5 w-5 shrink-0 text-stone group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-normal"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const containerClasses = `group lift-on-hover hover:shadow-premium-md rounded-2xl bg-background-canvas border border-hairline p-lg flex items-center gap-lg ${
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
