/**
 * Icon name registry + brand color mapping.
 *
 * Maps the string key stored in the database (e.g. "WhatsAppIcon") to
 * the React component, and exposes the official brand color per social
 * platform so SocialLinkIcon can render each in its real brand color.
 */
import type { ComponentType, SVGProps } from "react";
import * as icons from "@/components/icons";

export type IconName = keyof typeof icons;

export const ICON_NAMES = Object.keys(icons) as IconName[];

export function resolveIcon(
  name: string | null | undefined
): ComponentType<SVGProps<SVGSVGElement>> | undefined {
  if (!name) return undefined;
  return (icons as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[name];
}

/**
 * Official brand color per social platform.
 *
 * Instagram uses an inline gradient (handled in the icon itself), so it
 * returns `undefined` here — the tile background stays neutral so the
 * gradient icon reads cleanly.
 */
export const SOCIAL_BRAND_COLORS: Record<string, string | undefined> = {
  WhatsAppIcon: "#25D366",
  InstagramIcon: undefined, // inline gradient in the icon
  TikTokIcon: "#000000",
  FacebookIcon: "#1877F2",
  MapsIcon: "#4285F4",
};

/** Background tint (10% opacity) for the social icon tile. */
export function brandTileColor(iconName: string): string | undefined {
  const c = SOCIAL_BRAND_COLORS[iconName];
  if (!c) return undefined;
  return `${c}1A`; // append alpha = 0x1A ≈ 10%
}
