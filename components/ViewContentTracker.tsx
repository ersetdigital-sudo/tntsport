"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/components/MetaPixel";

interface Props {
  contentName: string;
  contentCategory: string;
  /** nilai event untuk ROAS Meta — default 95000 (harga mulai atasan ecer) */
  value?: number;
  /** kode mata uang ISO 3 huruf — default "IDR" */
  currency?: string;
}

export function ViewContentTracker({ contentName, contentCategory, value, currency }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      trackViewContent(contentName, contentCategory, value, currency);
    }, 5000);

    return () => clearTimeout(timer);
  }, [contentName, contentCategory]);

  return null;
}
