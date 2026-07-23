"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { CATALOG_PRODUCTS, getWhatsAppLink, type Product } from "@/lib/products";
import { trackViewContent, trackLead } from "@/components/MetaPixel";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

interface CatalogProduct {
  id: string;
  catalogue: string;
  image: string;
  alt: string;
}

interface CatalogCategory {
  id: string;
  label: string;
  products: CatalogProduct[];
}

/* ------------------------------------------------------------------ */
/* Category Icons (SVG images)                                          */
/* ------------------------------------------------------------------ */

const CATEGORY_ICON_MAP: Record<string, string> = {
  // Supabase slugs
  "sepak-bola-futsal": "/dba325f3-aa25-43c1-bf79-c97cac27beb0.svg",
  "voli": "/fdd593d3-725a-4970-9c5b-50346939a377.svg",
  "basket": "/b4d1d695-3820-4c3b-9593-2018b49634ab.svg",
  "mancing": "/0040a5e9-73c7-4575-a3f3-fc0de36354ac.svg",
  "racing": "/5dedcffe-5ed1-43c3-99c4-93cb8638a435.svg",
  "running": "/b909ca73-c7d0-47ee-8c6c-4ec4ede8b3f9.svg",
  "army": "/5e3bd6f8-d7f3-4b74-9d7e-a7f21d006754.svg",
  "badminton": "/002ba172-c237-4b45-a942-9b370ac9ec58.svg",
  "fantasy-club": "/378b562a-d8ba-4fd6-b19a-b05c96238007.svg",
  "instansi-corporate": "/9e768942-684b-4bfe-acb8-4f69a788ead6.svg",
  // Static fallback slugs
  "football": "/dba325f3-aa25-43c1-bf79-c97cac27beb0.svg",
  "volley": "/fdd593d3-725a-4970-9c5b-50346939a377.svg",
  "fishing": "/0040a5e9-73c7-4575-a3f3-fc0de36354ac.svg",
  "fantasy": "/378b562a-d8ba-4fd6-b19a-b05c96238007.svg",
  "corporate": "/9e768942-684b-4bfe-acb8-4f69a788ead6.svg",
};

function CategoryIcon({ slug, isActive }: { slug: string; isActive: boolean }) {
  const src = CATEGORY_ICON_MAP[slug];
  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className={`h-5 w-5 shrink-0 object-contain transition ${
        isActive ? "opacity-100" : "opacity-70 invert"
      }`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Zoom Preview Modal                                                   */
/* ------------------------------------------------------------------ */

function ZoomModal({
  product,
  categoryLabel,
  onClose,
}: {
  product: CatalogProduct;
  categoryLabel: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-[92vw] max-w-[500px] rounded-2xl bg-[#131611] shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image — no fixed aspect ratio, let image size naturally */}
        <div className="relative w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.alt}
            className="block h-auto w-full object-contain"
            style={{ maxHeight: "70vh" }}
          />
        </div>

        {/* Info bar */}
        <div className="border-t border-white/10 bg-[#131611] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#00aa13]"
                 style={{ fontFamily: "var(--font-mono)" }}>
                {product.catalogue}
              </p>
              <p className="mt-1 text-sm text-[#a7ad9e]">{categoryLabel}</p>
            </div>
            <a
              href={getWhatsAppLink(categoryLabel, product.catalogue)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead(product.catalogue)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#00aa13] px-4 py-2.5 text-xs font-black text-[#080a07] transition hover:bg-[#00c317] sm:px-5 sm:text-sm"
            >
              Order Sekarang
            </a>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 sm:h-9 sm:w-9"
          aria-label="Tutup"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product Card                                                         */
/* ------------------------------------------------------------------ */

function ProductCard({
  product,
  categoryLabel,
  onSelect,
}: {
  product: CatalogProduct;
  categoryLabel: string;
  onSelect: (product: CatalogProduct) => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#131611] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[#00aa13]/35 sm:rounded-3xl">
      {/* Image */}
      <button
        onClick={() => {
          trackViewContent(product.catalogue, categoryLabel);
          onSelect(product);
        }}
        className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden bg-[#181c15]"
      >
        <Image
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
          <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#080a07] opacity-0 shadow-lg transition group-hover:opacity-100">
            Klik untuk zoom
          </span>
        </div>
      </button>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#00aa13] sm:text-[11px]"
           style={{ fontFamily: "var(--font-mono)" }}>
          {product.catalogue}
        </p>
        <a
          href={getWhatsAppLink(categoryLabel, product.catalogue)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLead(product.catalogue)}
          className="mt-2 block w-full rounded-full bg-[#00aa13] py-2 text-center text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-[#00c317] sm:py-2.5 sm:text-xs"
        >
          Pilih Desain Ini
        </a>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Loading Skeleton                                                     */
/* ------------------------------------------------------------------ */

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] rounded-2xl bg-[#1a1e17] sm:rounded-3xl" />
      <div className="mt-3 space-y-2 p-1">
        <div className="h-3 w-16 rounded bg-[#1a1e17]" />
        <div className="h-8 w-full rounded-full bg-[#1a1e17]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Catalog Component                                               */
/* ------------------------------------------------------------------ */

interface ProductCatalogProps {
  categories?: CatalogCategory[];
}

export function ProductCatalog({ categories: propCategories }: ProductCatalogProps) {
  // Use prop data if provided, otherwise fall back to static data
  const categories: CatalogCategory[] = propCategories ?? CATALOG_PRODUCTS.map((cat) => ({
    id: cat.id,
    label: cat.label,
    products: cat.products.map((p) => ({
      id: p.id,
      catalogue: p.catalogue,
      image: p.image,
      alt: p.alt,
    })),
  }));

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [zoomedProduct, setZoomedProduct] = useState<CatalogProduct | null>(null);

  const activeCategoryData = categories.find((c) => c.id === activeCategory) ?? categories[0];

  const handleCategoryChange = useCallback((categoryId: string) => {
    if (categoryId === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(categoryId);
    setTimeout(() => setIsLoading(false), 300);
  }, [activeCategory]);

  if (!activeCategoryData) return null;

  return (
    <>
      {/* Category tabs — 2x2 grid on mobile */}
      <div className="relative mt-5 sm:mt-8">
        <div
          className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5"
          role="tablist"
          aria-label="Kategori katalog jersey"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              className={`catalog-tab flex min-h-[44px] items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-[10px] font-black uppercase leading-tight transition duration-200 sm:rounded-full sm:px-4 sm:py-2 sm:text-xs ${
                cat.id === activeCategory
                  ? "border-[#00aa13] bg-[#00aa13] text-[#080a07] shadow-[0_10px_30px_rgba(0,170,19,.16)]"
                  : "border-white/10 bg-[#181c15] text-[#b9beaf] hover:border-[#00aa13]/50 hover:bg-[#1a1e17]"
              }`}
              aria-selected={cat.id === activeCategory}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <CategoryIcon
                slug={cat.id}
                isActive={cat.id === activeCategory}
              />
              <span className="truncate">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active category info */}
      <div className="mt-4 flex items-center gap-3 sm:mt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#00aa13]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00aa13] sm:text-[11px]"
              style={{ fontFamily: "var(--font-mono)" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#00aa13]" />
          {activeCategoryData.label}
        </span>
        <span className="text-[10px] text-[#a7ad9e] sm:text-xs">
          {activeCategoryData.products.length} desain tersedia
        </span>
      </div>

      {/* Product grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)
          : activeCategoryData.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryLabel={activeCategoryData.label}
                onSelect={setZoomedProduct}
              />
            ))
        }
      </div>

      {/* Zoom modal */}
      {zoomedProduct && (
        <ZoomModal
          product={zoomedProduct}
          categoryLabel={activeCategoryData.label}
          onClose={() => setZoomedProduct(null)}
        />
      )}
    </>
  );
}
