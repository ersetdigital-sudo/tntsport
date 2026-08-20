/**
 * Product catalog data — modular per category.
 * To add new products: just push a new object to the relevant category array.
 * To add a new category: add a new key to CATALOG_PRODUCTS with matching id.
 */

export interface Product {
  id: string;
  catalogue: string;
  image: string;
  alt: string;
}

export interface CategoryProducts {
  id: string;
  label: string;
  products: Product[];
}

import { buildWhatsAppLink } from "@/lib/wa";

export function getWhatsAppLink(categoryLabel: string, catalogue: string, waNumber?: string): string {
  const number = waNumber || "628115491117";
  const message = `Halo TNT SPORT APPAREL, saya tertarik dengan desain *${catalogue}* di kategori *${categoryLabel}*. Bisa info lebih lanjut?`;
  return buildWhatsAppLink(number, message);
}

/*
 * PLACEHOLDER IMAGES
 * Replace these URLs with your actual jersey product images.
 * Each category should have ~10 products.
 * Recommended image size: 800x1000 (portrait) or 800x600 (landscape).
 */

/**
 * Build a stable URL slug for a product — used for the `design` query param
 * (e.g. "TNT Fishing 01" -> "tnt-fishing-01"). Falls back to the raw id
 * when the catalogue name is missing. Accent-insensitive so names like
 * "Jersey Sepak Bola" stay friendly in URLs.
 */
export function productDesignKey(p: { catalogue?: string; id?: string }): string {
  const slug = (p.catalogue ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || (p.id ?? "");
}

/**
 * Locate a product (and its owning category) across a catalog by either the
 * raw `id` or the readable `design` slug. Returns null when not found.
 */
export function findProductByDesignKey<T extends { id: string; catalogue?: string }>(
  catalog: { id: string; products: T[] }[],
  key: string
): { categoryId: string; product: T } | null {
  for (const cat of catalog) {
    for (const product of cat.products) {
      if (product.id === key || productDesignKey(product) === key) {
        return { categoryId: cat.id, product };
      }
    }
  }
  return null;
}
export const CATALOG_PRODUCTS: CategoryProducts[] = [
  {
    id: "football",
    label: "Sepak Bola / Futsal",
    products: [
      { id: "fb-1", catalogue: "FB-001", image: "/products/placeholder.svg", alt: "Jersey Futsal Design 1" },
      { id: "fb-2", catalogue: "FB-002", image: "/products/placeholder.svg", alt: "Jersey Futsal Design 2" },
      { id: "fb-3", catalogue: "FB-003", image: "/products/placeholder.svg", alt: "Jersey Futsal Design 3" },
      { id: "fb-4", catalogue: "FB-004", image: "/products/placeholder.svg", alt: "Jersey Futsal Design 4" },
      { id: "fb-5", catalogue: "FB-005", image: "/products/placeholder.svg", alt: "Jersey Futsal Design 5" },
      { id: "fb-6", catalogue: "FB-006", image: "/products/placeholder.svg", alt: "Jersey Futsal Design 6" },
      { id: "fb-7", catalogue: "FB-007", image: "/products/placeholder.svg", alt: "Jersey Futsal Design 7" },
      { id: "fb-8", catalogue: "FB-008", image: "/products/placeholder.svg", alt: "Jersey Futsal Design 8" },
      { id: "fb-9", catalogue: "FB-009", image: "/products/placeholder.svg", alt: "Jersey Futsal Design 9" },
      { id: "fb-10", catalogue: "FB-010", image: "/products/placeholder.svg", alt: "Jersey Futsal Design 10" },
    ],
  },
  {
    id: "volley",
    label: "Voli",
    products: [
      { id: "vl-1", catalogue: "VL-001", image: "/products/placeholder.svg", alt: "Jersey Voli Design 1" },
      { id: "vl-2", catalogue: "VL-002", image: "/products/placeholder.svg", alt: "Jersey Voli Design 2" },
      { id: "vl-3", catalogue: "VL-003", image: "/products/placeholder.svg", alt: "Jersey Voli Design 3" },
      { id: "vl-4", catalogue: "VL-004", image: "/products/placeholder.svg", alt: "Jersey Voli Design 4" },
      { id: "vl-5", catalogue: "VL-005", image: "/products/placeholder.svg", alt: "Jersey Voli Design 5" },
      { id: "vl-6", catalogue: "VL-006", image: "/products/placeholder.svg", alt: "Jersey Voli Design 6" },
      { id: "vl-7", catalogue: "VL-007", image: "/products/placeholder.svg", alt: "Jersey Voli Design 7" },
      { id: "vl-8", catalogue: "VL-008", image: "/products/placeholder.svg", alt: "Jersey Voli Design 8" },
      { id: "vl-9", catalogue: "VL-009", image: "/products/placeholder.svg", alt: "Jersey Voli Design 9" },
      { id: "vl-10", catalogue: "VL-010", image: "/products/placeholder.svg", alt: "Jersey Voli Design 10" },
    ],
  },
  {
    id: "basket",
    label: "Basket",
    products: [
      { id: "bk-1", catalogue: "BK-001", image: "/products/placeholder.svg", alt: "Jersey Basket Design 1" },
      { id: "bk-2", catalogue: "BK-002", image: "/products/placeholder.svg", alt: "Jersey Basket Design 2" },
      { id: "bk-3", catalogue: "BK-003", image: "/products/placeholder.svg", alt: "Jersey Basket Design 3" },
      { id: "bk-4", catalogue: "BK-004", image: "/products/placeholder.svg", alt: "Jersey Basket Design 4" },
      { id: "bk-5", catalogue: "BK-005", image: "/products/placeholder.svg", alt: "Jersey Basket Design 5" },
      { id: "bk-6", catalogue: "BK-006", image: "/products/placeholder.svg", alt: "Jersey Basket Design 6" },
      { id: "bk-7", catalogue: "BK-007", image: "/products/placeholder.svg", alt: "Jersey Basket Design 7" },
      { id: "bk-8", catalogue: "BK-008", image: "/products/placeholder.svg", alt: "Jersey Basket Design 8" },
      { id: "bk-9", catalogue: "BK-009", image: "/products/placeholder.svg", alt: "Jersey Basket Design 9" },
      { id: "bk-10", catalogue: "BK-010", image: "/products/placeholder.svg", alt: "Jersey Basket Design 10" },
    ],
  },
  {
    id: "fishing",
    label: "Fishing",
    products: [
      { id: "mn-1", catalogue: "Marlin Strike", image: "/products/placeholder.svg", alt: "Jersey fishing desain Marlin Strike" },
      { id: "mn-2", catalogue: "Ocean Wave", image: "/products/placeholder.svg", alt: "Jersey fishing desain Ocean Wave" },
      { id: "mn-3", catalogue: "Deep Blue", image: "/products/placeholder.svg", alt: "Jersey fishing desain Deep Blue" },
      { id: "mn-4", catalogue: "Sunset Cast", image: "/products/placeholder.svg", alt: "Jersey fishing desain Sunset Cast" },
      { id: "mn-5", catalogue: "Tuna Hunter", image: "/products/placeholder.svg", alt: "Jersey fishing desain Tuna Hunter" },
      { id: "mn-6", catalogue: "Reef Camo", image: "/products/placeholder.svg", alt: "Jersey fishing desain Reef Camo" },
      { id: "mn-7", catalogue: "Night Spot", image: "/products/placeholder.svg", alt: "Jersey fishing desain Night Spot" },
      { id: "mn-8", catalogue: "Coral Reef", image: "/products/placeholder.svg", alt: "Jersey fishing desain Coral Reef" },
      { id: "mn-9", catalogue: "Sailfish", image: "/products/placeholder.svg", alt: "Jersey fishing desain Sailfish" },
      { id: "mn-10", catalogue: "Storm Sea", image: "/products/placeholder.svg", alt: "Jersey fishing desain Storm Sea" },
      { id: "mn-11", catalogue: "Aqua Line", image: "/products/placeholder.svg", alt: "Jersey fishing desain Aqua Line" },
      { id: "mn-12", catalogue: "Black Water", image: "/products/placeholder.svg", alt: "Jersey fishing desain Black Water" },
      { id: "mn-13", catalogue: "Golden Hour", image: "/products/placeholder.svg", alt: "Jersey fishing desain Golden Hour" },
      { id: "mn-14", catalogue: "Snapper Pro", image: "/products/placeholder.svg", alt: "Jersey fishing desain Snapper Pro" },
      { id: "mn-15", catalogue: "Wild Current", image: "/products/placeholder.svg", alt: "Jersey fishing desain Wild Current" },
      { id: "mn-16", catalogue: "Shark Bite", image: "/products/placeholder.svg", alt: "Jersey fishing desain Shark Bite" },
      { id: "mn-17", catalogue: "Blue Horizon", image: "/products/placeholder.svg", alt: "Jersey fishing desain Blue Horizon" },
      { id: "mn-18", catalogue: "Silver Scale", image: "/products/placeholder.svg", alt: "Jersey fishing desain Silver Scale" },
      { id: "mn-19", catalogue: "Kingfish", image: "/products/placeholder.svg", alt: "Jersey fishing desain Kingfish" },
      { id: "mn-20", catalogue: "River Trail", image: "/products/placeholder.svg", alt: "Jersey fishing desain River Trail" },
    ],
  },
  {
    id: "running",
    label: "Running",
    products: [
      { id: "rn-1", catalogue: "TNT-RUN 01", image: "/landing/jersey-running/fb2db85b-08bb-4b93-b864-51e7c9ef1d6f.png", alt: "Desain jersey running custom TNT-RUN 01 TNT SPORT APPAREL" },
      { id: "rn-2", catalogue: "TNT-RUN 02", image: "/landing/jersey-running/dbdeafa3-cd6e-4cf9-88c8-c82f9fb58b52.png", alt: "Desain jersey running custom TNT-RUN 02 TNT SPORT APPAREL" },
      { id: "rn-3", catalogue: "TNT-RUN 03", image: "/landing/jersey-running/7a6defe2-581f-47e1-ab28-59935679f37b.png", alt: "Desain jersey running custom TNT-RUN 03 TNT SPORT APPAREL" },
      { id: "rn-4", catalogue: "TNT-RUN 04", image: "/landing/jersey-running/5e1c3a72-24fa-40c7-8937-755ec655d1b2.png", alt: "Desain jersey running custom TNT-RUN 04 TNT SPORT APPAREL" },
      { id: "rn-5", catalogue: "TNT-RUN 05", image: "/landing/jersey-running/46ab597b-86bb-4d23-a725-119aa2be5a40.png", alt: "Desain jersey running custom TNT-RUN 05 TNT SPORT APPAREL" },
      { id: "rn-6", catalogue: "TNT-RUN 06", image: "/landing/jersey-running/29df33d4-935e-4911-b33e-f2c1880ee74b.png", alt: "Desain jersey running custom TNT-RUN 06 TNT SPORT APPAREL" },
    ],
  },
  {
    id: "army",
    label: "Army",
    products: [
      { id: "ar-1", catalogue: "AR-001", image: "/products/placeholder.svg", alt: "Jersey Army Design 1" },
      { id: "ar-2", catalogue: "AR-002", image: "/products/placeholder.svg", alt: "Jersey Army Design 2" },
      { id: "ar-3", catalogue: "AR-003", image: "/products/placeholder.svg", alt: "Jersey Army Design 3" },
      { id: "ar-4", catalogue: "AR-004", image: "/products/placeholder.svg", alt: "Jersey Army Design 4" },
      { id: "ar-5", catalogue: "AR-005", image: "/products/placeholder.svg", alt: "Jersey Army Design 5" },
      { id: "ar-6", catalogue: "AR-006", image: "/products/placeholder.svg", alt: "Jersey Army Design 6" },
      { id: "ar-7", catalogue: "AR-007", image: "/products/placeholder.svg", alt: "Jersey Army Design 7" },
      { id: "ar-8", catalogue: "AR-008", image: "/products/placeholder.svg", alt: "Jersey Army Design 8" },
      { id: "ar-9", catalogue: "AR-009", image: "/products/placeholder.svg", alt: "Jersey Army Design 9" },
      { id: "ar-10", catalogue: "AR-010", image: "/products/placeholder.svg", alt: "Jersey Army Design 10" },
    ],
  },
  {
    id: "badminton",
    label: "Badminton",
    products: [
      { id: "bd-1", catalogue: "BD-001", image: "/products/placeholder.svg", alt: "Jersey Badminton Design 1" },
      { id: "bd-2", catalogue: "BD-002", image: "/products/placeholder.svg", alt: "Jersey Badminton Design 2" },
      { id: "bd-3", catalogue: "BD-003", image: "/products/placeholder.svg", alt: "Jersey Badminton Design 3" },
      { id: "bd-4", catalogue: "BD-004", image: "/products/placeholder.svg", alt: "Jersey Badminton Design 4" },
      { id: "bd-5", catalogue: "BD-005", image: "/products/placeholder.svg", alt: "Jersey Badminton Design 5" },
      { id: "bd-6", catalogue: "BD-006", image: "/products/placeholder.svg", alt: "Jersey Badminton Design 6" },
      { id: "bd-7", catalogue: "BD-007", image: "/products/placeholder.svg", alt: "Jersey Badminton Design 7" },
      { id: "bd-8", catalogue: "BD-008", image: "/products/placeholder.svg", alt: "Jersey Badminton Design 8" },
      { id: "bd-9", catalogue: "BD-009", image: "/products/placeholder.svg", alt: "Jersey Badminton Design 9" },
      { id: "bd-10", catalogue: "BD-010", image: "/products/placeholder.svg", alt: "Jersey Badminton Design 10" },
    ],
  },
  {
    id: "fantasy",
    label: "Fantasy Club",
    products: [
      { id: "fc-1", catalogue: "FC-001", image: "/products/placeholder.svg", alt: "Jersey Fantasy Club Design 1" },
      { id: "fc-2", catalogue: "FC-002", image: "/products/placeholder.svg", alt: "Jersey Fantasy Club Design 2" },
      { id: "fc-3", catalogue: "FC-003", image: "/products/placeholder.svg", alt: "Jersey Fantasy Club Design 3" },
      { id: "fc-4", catalogue: "FC-004", image: "/products/placeholder.svg", alt: "Jersey Fantasy Club Design 4" },
      { id: "fc-5", catalogue: "FC-005", image: "/products/placeholder.svg", alt: "Jersey Fantasy Club Design 5" },
      { id: "fc-6", catalogue: "FC-006", image: "/products/placeholder.svg", alt: "Jersey Fantasy Club Design 6" },
      { id: "fc-7", catalogue: "FC-007", image: "/products/placeholder.svg", alt: "Jersey Fantasy Club Design 7" },
      { id: "fc-8", catalogue: "FC-008", image: "/products/placeholder.svg", alt: "Jersey Fantasy Club Design 8" },
      { id: "fc-9", catalogue: "FC-009", image: "/products/placeholder.svg", alt: "Jersey Fantasy Club Design 9" },
      { id: "fc-10", catalogue: "FC-010", image: "/products/placeholder.svg", alt: "Jersey Fantasy Club Design 10" },
    ],
  },
  {
    id: "corporate",
    label: "Instansi/Corporate",
    products: [
      { id: "cr-1", catalogue: "CR-001", image: "/products/placeholder.svg", alt: "Jersey Corporate Design 1" },
      { id: "cr-2", catalogue: "CR-002", image: "/products/placeholder.svg", alt: "Jersey Corporate Design 2" },
      { id: "cr-3", catalogue: "CR-003", image: "/products/placeholder.svg", alt: "Jersey Corporate Design 3" },
      { id: "cr-4", catalogue: "CR-004", image: "/products/placeholder.svg", alt: "Jersey Corporate Design 4" },
      { id: "cr-5", catalogue: "CR-005", image: "/products/placeholder.svg", alt: "Jersey Corporate Design 5" },
      { id: "cr-6", catalogue: "CR-006", image: "/products/placeholder.svg", alt: "Jersey Corporate Design 6" },
      { id: "cr-7", catalogue: "CR-007", image: "/products/placeholder.svg", alt: "Jersey Corporate Design 7" },
      { id: "cr-8", catalogue: "CR-008", image: "/products/placeholder.svg", alt: "Jersey Corporate Design 8" },
      { id: "cr-9", catalogue: "CR-009", image: "/products/placeholder.svg", alt: "Jersey Corporate Design 9" },
      { id: "cr-10", catalogue: "CR-010", image: "/products/placeholder.svg", alt: "Jersey Corporate Design 10" },
    ],
  },
];
