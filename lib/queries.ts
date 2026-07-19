/**
 * Server-side data access for the public site.
 *
 * Every function here:
 *   1. Tries Supabase first (using the server client — auth cookies flow
 *      through automatically).
 *   2. Falls back to the static defaults in lib/data.ts when Supabase is
 *      unreachable OR returns no rows. This keeps the landing page
 *      resilient — a misconfigured database never takes the site down.
 *
 * All functions are safe to call from Server Components and run at
 * request/build time (ISR controls re-frequency).
 */
import { createClient } from "@/lib/supabase/server";
import { resolveIcon } from "@/lib/icon-registry";
import * as fallback from "@/lib/data";
import type {
  Brand,
  CTALink,
  DbBrand,
  DbCTALink,
  DbReview,
  DbSocialLink,
  DbStat,
  Review,
  SocialLink,
  StatItem,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export async function getBrand(): Promise<Brand> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("brand")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) return fallback.brand;

  const row = data as DbBrand;
  return {
    name: row.name,
    accentWord: row.accent_word,
    monogram: row.monogram,
    tagline: row.tagline,
    url: row.url,
    description: row.description,
    whatsappNumber: row.whatsapp_number,
    logoPath: row.logo_path,
  };
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
export async function getStats(): Promise<StatItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stats")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback.stats;

  return (data as DbStat[]).map((row) => ({
    value: row.value,
    label: row.label,
    icon: resolveIcon(row.icon),
  }));
}

// ---------------------------------------------------------------------------
// Trust badges
// ---------------------------------------------------------------------------
// Trust badges are derived from a fixed set of stats/reviews rather than
// stored separately — keeping them in sync with real numbers matters more
// than per-badge editability. If you want admin-editable trust badges
// later, add a `trust_badges` table mirroring the stats shape.
export async function getTrustBadges() {
  return fallback.trustBadges;
}

// ---------------------------------------------------------------------------
// CTA links
// ---------------------------------------------------------------------------
export async function getCTALinks(): Promise<CTALink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cta_links")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback.ctaLinks;

  return (data as DbCTALink[]).map((row) => {
    const Icon = resolveIcon(row.icon) ?? fallback.ctaLinks[0].icon;
    return {
      title: row.title,
      description: row.description,
      href: row.href ?? undefined,
      accent: row.accent,
      icon: Icon,
      // External links open in a new tab (WhatsApp, catalog, etc.).
      external: row.href ? row.href.startsWith("http") : undefined,
    };
  });
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------
export async function getReviews(): Promise<Review[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback.reviews;

  return (data as DbReview[]).map((row) => ({
    rating: row.rating as 1 | 2 | 3 | 4 | 5,
    quote: row.quote,
    name: row.name,
    location: row.location,
  }));
}

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------
export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback.socialLinks;

  return (data as DbSocialLink[]).map((row) => ({
    label: row.label,
    href: row.href,
    icon: resolveIcon(row.icon) ?? fallback.socialLinks[0].icon,
    ariaLabel: row.aria_label,
  }));
}

// ---------------------------------------------------------------------------
// Catalog (used by /katalog pages — implemented in Phase 7)
// ---------------------------------------------------------------------------
export async function getProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data;
}

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data;
}
