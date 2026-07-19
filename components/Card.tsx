import type { ComponentProps, ReactNode } from "react";

/**
 * Card - premium surface containers.
 *
 * Variants:
 *  - glass:  translucent + backdrop-blur (default for landing content)
 *  - solid:  opaque surface-card with hairline border
 *  - feature: dark/elevated surface for hero CTAs
 *
 * Depth comes from multilayer shadows (shadow-premium-*) and subtle
 * border tint - never flat. Hover lift applied via `lift-on-hover`
 * utility when the consumer opts in.
 */
type CardVariant = "glass" | "solid" | "feature";

const variantClasses: Record<CardVariant, string> = {
  glass: "glass shadow-premium-md",
  solid: "bg-surface-card border border-hairline shadow-premium-md",
  feature:
    "bg-surface-dark text-on-dark border border-hairline shadow-premium-lg",
};

interface CardProps extends ComponentProps<"div"> {
  variant?: CardVariant;
  children: ReactNode;
}

export function Card({
  variant = "glass",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <div className={`rounded-2xl ${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
