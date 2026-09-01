"use client";

import { trackLead } from "@/components/MetaPixel";

interface Props {
  href: string;
  contentName: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * TrackedLink — a minimal client component that wraps an <a> tag with
 * Meta Pixel Lead tracking on click. Use this inside server
 * components to add tracking without converting the whole component
 * to "use client".
 *
 * Props are all primitives (string, ReactNode) so they serialize safely
 * across the server/client boundary.
 */
export function TrackedLink({ href, contentName, className, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        trackLead(contentName);
      }}
    >
      {children}
    </a>
  );
}
