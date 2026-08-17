"use client";

import { trackContact, trackLead } from "@/components/MetaPixel";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function WhatsAppLeadLink({ href, children, className, label }: Props) {
  const handleClick = () => {
    trackLead(label || "WhatsApp CTA");
    trackContact(label || "WhatsApp CTA");
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
