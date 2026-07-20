import { brandTileColor, SOCIAL_BRAND_COLORS } from "@/lib/icon-registry";
import type { SocialLink } from "@/lib/types";

/**
 * SocialLinkIcon - one cell in the 5-up social grid.
 *
 * Rounded-square white tile with brand-colored icon and label below.
 * Matches the screenshot's clean social section.
 */
export function SocialLinkIcon({
  label,
  icon: Icon,
  href,
  ariaLabel,
}: SocialLink) {
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
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-hairline lift-on-hover hover:shadow-premium-md"
        style={{
          backgroundColor: tileBg,
          color: brandColor,
        }}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="text-caption text-mute group-hover:text-ink transition-colors duration-normal">
        {label}
      </span>
    </a>
  );
}
