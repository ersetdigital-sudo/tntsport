import { brandTileColor, SOCIAL_BRAND_COLORS } from "@/lib/icon-registry";
import type { SocialLink } from "@/lib/types";

/**
 * SocialLinkIcon - one cell in the 5-up social grid.
 *
 * Each platform renders in its OFFICIAL brand color:
 *   - WhatsApp  #25D366 (green)
 *   - Instagram inline gradient (in the icon itself)
 *   - TikTok    #000 with subtle white edge (handled by icon)
 *   - Facebook  #1877F2 (blue)
 *   - Maps      #4285F4 (Google blue)
 *
 * The icon sits in a circle tile with a 10% brand-color background tint,
 * lifts on hover, and tints to the full brand color on hover.
 */
export function SocialLinkIcon({
  label,
  icon: Icon,
  href,
  ariaLabel,
}: SocialLink) {
  // Determine brand color from the icon component's display name.
  // The `displayName` is set by React for function components named with
  // PascalCase, so we can rely on it to match the registry keys.
  const iconName = Icon.displayName ?? "";
  const brandColor = SOCIAL_BRAND_COLORS[iconName];
  const tileBg = brandTileColor(iconName);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="group flex flex-col items-center gap-sm"
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full lift-on-hover hover:shadow-premium-lg border border-hairline"
        style={{
          backgroundColor: tileBg,
          color: brandColor,
        }}
      >
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <span className="text-button-sm text-on-dark-mute group-hover:text-ink transition-colors duration-normal">
        {label}
      </span>
    </a>
  );
}
