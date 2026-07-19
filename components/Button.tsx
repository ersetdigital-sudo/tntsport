import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Button - premium pill CTA.
 *
 * Primary:    brand gradient bg, on-primary text, glow hover, scale 1.02.
 * Secondary:  glass surface, ink text, lift hover.
 * Ghost:      transparent, hairline border, lift hover.
 *
 * Renders as <a> via next/link when `href` is provided, else <button>.
 */
type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-brand text-on-primary shadow-premium-glow hover:scale-[1.02] hover:shadow-premium-glow",
  secondary:
    "glass text-ink hover:border-hairline-strong hover:shadow-premium-lg",
  ghost:
    "bg-transparent text-on-dark-mute border border-hairline hover:bg-surface-card hover:text-ink",
};

interface BaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

interface ButtonAsLinkProps extends BaseProps {
  href: string;
  external?: boolean;
}

interface ButtonAsButtonProps
  extends BaseProps,
    Omit<ComponentProps<"button">, "className" | "children" | "type"> {
  href?: undefined;
  external?: undefined;
  type?: "button" | "submit" | "reset";
}

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", children, className = "" } = props;
  const classes = `text-button-md inline-flex h-12 items-center justify-center gap-sm rounded-full px-xl lift-on-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 disabled:opacity-40 disabled:hover:scale-100 ${variantClasses[variant]} ${className}`;

  if (props.href !== undefined) {
    const { href, external } = props as ButtonAsLinkProps;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    href: _omitHref,
    external: _omitExternal,
    variant: _omitVariant,
    className: _omitClass,
    children: _omitChildren,
    ...buttonProps
  } = props as ButtonAsButtonProps;
  void _omitHref;
  void _omitExternal;
  void _omitVariant;
  void _omitClass;
  void _omitChildren;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
