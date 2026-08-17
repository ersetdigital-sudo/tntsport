"use client";

import { trackContact, trackLead } from "@/components/MetaPixel";
import { WhatsAppIcon } from "@/components/icons";

interface Props {
  href: string;
}

/**
 * WhatsAppCTA — the green "CHAT WHATSAPP" card on the homepage.
 *
 * Replaces the DB-driven CTALinkCard for the WhatsApp item so we can
 * attach Meta Pixel Lead + Contact tracking directly via onClick.
 * Layout and styling match the original CTALinkCard whatsapp accent.
 */
export function WhatsAppCTA({ href }: Props) {
  const handleClick = () => {
    trackLead("Homepage CTA");
    trackContact("Homepage CTA");
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group/card relative flex min-h-[68px] items-center gap-3 overflow-hidden rounded-2xl bg-whatsapp p-4 text-white shadow-premium-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary dark:bg-surface-card dark:ring-1 dark:ring-whatsapp/30 sm:min-h-[80px] sm:gap-4 sm:rounded-3xl sm:p-5"
    >
      {/* Icon badge */}
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm sm:h-12 sm:w-12 sm:rounded-2xl dark:bg-whatsapp dark:text-white"
        aria-hidden="true"
      >
        <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>

      {/* Title + description */}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="break-words text-sm font-extrabold uppercase leading-tight tracking-[-.01em] sm:text-base">
          Chat WhatsApp
        </span>
        <span className="break-words text-xs font-medium leading-snug text-white/75 sm:text-sm dark:text-white/60">
          Order &amp; tanya desain langsung ke admin
        </span>
      </span>

      {/* Arrow */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 transition-all duration-200 group-hover/card:translate-x-0.5 group-hover/card:bg-white/30 sm:h-9 sm:w-9 dark:bg-whatsapp/15 dark:text-whatsapp dark:group-hover/card:bg-whatsapp dark:group-hover/card:text-white">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 sm:h-5 sm:w-5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}
