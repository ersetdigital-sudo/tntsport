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
      className="group flex min-w-0 flex-col items-center gap-2"
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-hairline bg-white shadow-premium-sm lift-on-hover hover:shadow-premium-md sm:h-14 sm:w-14"
        style={{
          backgroundColor: tileBg,
          color: brandColor,
        }}
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </span>
      <span className="truncate text-[9px] font-bold uppercase text-ink transition-colors duration-normal group-hover:text-primary sm:text-caption">
        {label}
      </span>
    </a>
  );
}
