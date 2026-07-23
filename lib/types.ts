/**
 * Type definitions for all landing-page + catalog content.
 *
 * Two layers exist on purpose:
 *
 * 1. `Db*` types — the raw row shape returned by Supabase. `icon` is a
 *    string key (e.g. "WhatsAppIcon") stored in the database.
 * 2. UI types (Brand, StatItem, CTALink, …) — what components consume,
 *    where `icon` is a resolved React component.
 *
 * lib/queries.ts bridges the two: it fetches `Db*` rows and maps the
 * icon string to the matching component from components/icons.
 *
 * Keeping DB-shape and UI-shape separate means the database is never
 * aware of React, and components are never aware of string keys.
 */
import type { ComponentType, SVGProps } from "react";

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export interface Brand {
  name: string;
  accentWord: string;
  monogram: string;
  tagline: string;
  url: string;
  description: string;
  whatsappNumber: string;
  logoPath: string;
  metaPixelId: string;
  metaPixelEnabled: boolean;
}

export interface DbBrand extends Omit<Brand, "whatsappNumber" | "logoPath" | "accentWord" | "metaPixelId" | "metaPixelEnabled"> {
  accent_word: string;
  whatsapp_number: string;
  logo_path: string;
  meta_pixel_id: string;
  meta_pixel_enabled: boolean;
}

// ---------------------------------------------------------------------------
// Landing content
// ---------------------------------------------------------------------------
export interface TrustBadge {
  label: string;
  subtext?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  variant: "neutral" | "filled" | "success" | "warning" | "info";
}

export interface DbTrustBadge {
  id: string;
  label: string;
  subtext: string | null;
  icon: string | null;
  variant: "neutral" | "filled" | "success" | "warning" | "info";
  sort_order: number;
}

export interface StatItem {
  value: string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export type CTAAccent = "whatsapp" | "primary" | "warning" | "neutral";

export interface CTALink {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent: CTAAccent;
  href?: string;
  external?: boolean;
}

export interface Review {
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  name: string;
  location: string;
  /** Short identity descriptor, e.g. "Kapten Tim Futsal". */
  identity?: string;
}

export interface SocialLink {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  ariaLabel: string;
}

/** DB-row shape shared by stats / cta_links / social_links (icon stored as string). */
export interface DbStat {
  value: string;
  label: string;
  icon: string | null;
  sort_order: number;
}

export interface DbCTALink {
  title: string;
  description: string;
  href: string | null;
  accent: CTAAccent;
  icon: string | null;
  sort_order: number;
}

export interface DbReview {
  rating: number;
  quote: string;
  name: string;
  location: string;
  identity?: string;
  sort_order: number;
}

export interface DbSocialLink {
  label: string;
  href: string;
  icon: string;
  aria_label: string;
  sort_order: number;
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------
export type StockStatus = "in_stock" | "limited" | "out_of_stock";
export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  sortOrder: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  size: ProductSize;
  stockQty: number;
  priceDelta: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  categoryId: string | null;
  stockStatus: StockStatus;
  featured: boolean;
  sortOrder: number;
  images: ProductImage[];
  variants: ProductVariant[];
}

// ---------------------------------------------------------------------------
// Admin payload types (for create/update forms)
// ---------------------------------------------------------------------------
export interface ProductPayload {
  slug: string;
  name: string;
  description: string | null;
  price: number;
  categoryId: string | null;
  stockStatus: StockStatus;
  featured: boolean;
  sortOrder: number;
}
