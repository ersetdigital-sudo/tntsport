"use client";

import { trackLead } from "@/components/MetaPixel";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  /** Lead event value (default: 95000) */
  leadValue?: number;
  /** Lead event currency (default: "IDR") */
  leadCurrency?: string;
}

export function WhatsAppLeadLink({ href, children, className, label, leadValue, leadCurrency }: Props) {
  const handleClick = () => {
    trackLead(
      label || "WhatsApp CTA",
      leadValue,
      leadCurrency,
      "WhatsApp Lead"
    );
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
