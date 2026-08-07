"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/components/MetaPixel";

interface Props {
  contentName: string;
  contentCategory: string;
}

export function ViewContentTracker({ contentName, contentCategory }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      trackViewContent(contentName, contentCategory);
    }, 5000);

    return () => clearTimeout(timer);
  }, [contentName, contentCategory]);

  return null;
}
