"use client";

import { useEffect } from "react";

interface MetaPixelProps {
  pixelId: string;
  enabled: boolean;
}

/* ------------------------------------------------------------------ */
/*  Helpers: eventID generation & CAPI server mirror                  */
/* ------------------------------------------------------------------ */

/** Generate a unique eventID for deduplication between browser pixel & CAPI. */
function generateEventId(eventName: string): string {
  return `${eventName}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Send an event to our server-side CAPI route (/api/capi) so Meta can
 * deduplicate it with the matching browser event (same eventID).
 * Fire-and-forget — must never block the user interaction.
 */
function sendCAPIEvent(
  eventName: string,
  eventId: string,
  customData?: Record<string, any>
) {
  try {
    const pixelId = (window as any).__tntFbPixelId;
    if (!pixelId) return;
    fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId,
        customData,
        pixelId,
        eventSourceUrl: window.location.href,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // fire-and-forget — silently ignore errors
  }
}

/* ------------------------------------------------------------------ */
/*  MetaPixel component (client)                                       */
/* ------------------------------------------------------------------ */

export function MetaPixel({ pixelId, enabled }: MetaPixelProps) {
  useEffect(() => {
    if (!enabled || !pixelId) return;

    const w = window as any;

    // Guard: prevent re-initialization on remount or React StrictMode.
    if (w.__tntFbPixelId === pixelId) return;
    w.__tntFbPixelId = pixelId;

    // Check if the Meta Pixel script was already loaded (e.g. by GTM).
    // If fbq is already defined, the pixel is active — just mirror to CAPI
    // but do NOT fire another PageView (GTM already did).
    const alreadyLoaded = typeof w.fbq === "function";

    if (alreadyLoaded) {
      // Pixel is live (loaded by GTM or another source). Only mirror
      // the existing PageView to CAPI for dedup — do NOT append a
      // second script or fire a second fbq('track', 'PageView').
      const pvEventId = w.__tntFbPageViewEventId || generateEventId("PageView");
      w.__tntFbPageViewEventId = pvEventId;
      sendCAPIEvent("PageView", pvEventId);
      return;
    }

    // No pixel loaded yet — initialize from scratch.
    const pvEventId = generateEventId("PageView");
    w.__tntFbPageViewEventId = pvEventId;

    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments);n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView', {}, {eventID: '${pvEventId}'});
    `;
    document.head.appendChild(script);

    sendCAPIEvent("PageView", pvEventId);

    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);
  }, [pixelId, enabled]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  Event tracking helpers — setiap event punya eventID + CAPI mirror */
/*  value + currency wajib dikirim agar Meta bisa menghitung ROAS.    */
/* ------------------------------------------------------------------ */

export const DEFAULT_EVENT_VALUE = 95000;
export const DEFAULT_EVENT_CURRENCY = "IDR";

export function trackViewContent(
  contentName: string,
  contentCategory: string,
  value: number = DEFAULT_EVENT_VALUE,
  currency: string = DEFAULT_EVENT_CURRENCY
) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    const w = window as any;
    const eventId = generateEventId("ViewContent");
    w.fbq("track", "ViewContent", {
      content_name: contentName,
      content_category: contentCategory,
      value,
      currency,
    }, { eventID: eventId });
    sendCAPIEvent("ViewContent", eventId, {
      content_name: contentName,
      content_category: contentCategory,
      value,
      currency,
    });
  }
}

export function trackContact(
  contentName: string,
  value: number = DEFAULT_EVENT_VALUE,
  currency: string = DEFAULT_EVENT_CURRENCY
) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    const w = window as any;
    const eventId = generateEventId("Contact");
    w.fbq("track", "Contact", {
      content_name: contentName,
      value,
      currency,
    }, { eventID: eventId });
    sendCAPIEvent("Contact", eventId, {
      content_name: contentName,
      value,
      currency,
    });
  }
}

export function trackLead(
  contentName: string,
  value: number = DEFAULT_EVENT_VALUE,
  currency: string = DEFAULT_EVENT_CURRENCY
) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    const w = window as any;
    const eventId = generateEventId("Lead");
    w.fbq("track", "Lead", {
      content_name: contentName,
      value,
      currency,
    }, { eventID: eventId });
    sendCAPIEvent("Lead", eventId, {
      content_name: contentName,
      value,
      currency,
    });
  }
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    const w = window as any;
    const eventId = generateEventId(eventName);
    w.fbq("track", eventName, params, { eventID: eventId });
    sendCAPIEvent(eventName, eventId, params);
  }
}
