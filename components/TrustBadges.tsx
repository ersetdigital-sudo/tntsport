import { Badge } from "@/components/Badge";
import type { TrustBadge } from "@/lib/types";

/**
 * TrustBadges — horizontal row of 3 pill badges under the profile.
 *
 * Wraps to a comfortable row on mobile. Each badge maps its variant
 * from the data (neutral / info / success) per Design.md Badge spec.
 */
export function TrustBadges({ badges }: { badges: TrustBadge[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-sm">
      {badges.map((b) => {
        const Icon = b.icon;
        return (
          <Badge key={b.label} variant={b.variant}>
            {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
            <span>{b.label}</span>
          </Badge>
        );
      })}
    </div>
  );
}
