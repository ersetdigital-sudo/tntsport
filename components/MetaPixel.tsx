"use client";

import { useEffect } from "react";

interface MetaPixelProps {
  pixelId: string;
  enabled: boolean;
}

export function MetaPixel({ pixelId, enabled }: MetaPixelProps) {
  useEffect(() => {
    if (!enabled || !pixelId) return;

    // Guard anti double-fire: React StrictMode (dev) me-mount effect dua kali,
    // dan tanpa guard ini `fbq('track','PageView')` terkirim dobel.
    // Script/noscript juga sengaja tidak dihapus saat unmount — pixel harus
    // hidup sepanjang lifetime halaman.
    const w = window as any;
    if (w.__tntFbPixelId === pixelId) return;
    w.__tntFbPixelId = pixelId;
    // event_id deduplication: browser pixel & mirror Conversions API yang
    // membawa event_id sama dihitung SATU event oleh Meta (standar dedup Meta).
    w.__tntFbPageViewEventId =
      "pv-" + pixelId + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);

    // Load Meta Pixel script
    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView', {}, {eventID: window.__tntFbPageViewEventId});
    `;
    document.head.appendChild(script);

    // Add noscript fallback
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

// Event tracking helpers (call these from components)
// value + currency wajib dikirim agar Meta bisa menghitung ROAS dengan akurat.
// Default: 95000 IDR (harga mulai jersey atasan ecer).
export const DEFAULT_EVENT_VALUE = 95000;
export const DEFAULT_EVENT_CURRENCY = "IDR";

export function trackViewContent(
  contentName: string,
  contentCategory: string,
  value: number = DEFAULT_EVENT_VALUE,
  currency: string = DEFAULT_EVENT_CURRENCY
) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "ViewContent", {
      content_name: contentName,
      content_category: contentCategory,
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
    (window as any).fbq("track", "Lead", {
      content_name: contentName,
      value,
      currency,
    });
  }
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, params);
  }
}
