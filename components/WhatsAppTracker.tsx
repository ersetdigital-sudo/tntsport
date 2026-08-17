"use client";

import { useEffect } from "react";
import { trackContact } from "@/components/MetaPixel";

/**
 * WhatsAppTracker — lightweight event-delegation tracker for WhatsApp links.
 *
 * Attaches a single document-level click listener that fires Meta Pixel
 * Contact events for any `<a>` whose href contains "whatsapp". Works with
 * both server and client rendered links — no wrapping or prop changes needed.
 *
 * Mount once in layouts or pages that contain WhatsApp CTAs.
 */
export function WhatsAppTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor && anchor.href.includes("whatsapp")) {
        trackContact("WhatsApp CTA");
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
