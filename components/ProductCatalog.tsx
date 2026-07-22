"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { CATALOG_PRODUCTS, getWhatsAppLink, type Product } from "@/lib/products";

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
/* Category Icons (outline/line style, 16px)                            */
/* ------------------------------------------------------------------ */

function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  const props = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className };

  const icons: Record<string, React.JSX.Element> = {
    // Supabase slugs
    "sepak-bola-futsal": (
      <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
    ),
    // Static fallback slugs
    "football": (
      <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
    ),
    "voli": (
      <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2c4.5 4 5 10 0 20" /><path d="M12 2c-4.5 4-5 10 0 20" /><path d="M2 12h20" /></svg>
    ),
    "volley": (
      <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2c4.5 4 5 10 0 20" /><path d="M12 2c-4.5 4-5 10 0 20" /><path d="M2 12h20" /></svg>
    ),
    "basket": (
      <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2v20" /><path d="M2 12h20" /><path d="M4.93 4.93c4.08 2.52 4.08 11.62 0 14.14" /><path d="M19.07 4.93c-4.08 2.52-4.08 11.62 0 14.14" /></svg>
    ),
    "mancing": (
      <svg {...props}><path d="M12 2v8" /><path d="M8 6l4 4 4-4" /><path d="M17 14c0 3-2.5 5-5 5s-5-2-5-5" /><circle cx="12" cy="14" r="1" fill="currentColor" /><path d="M6 20c0-3 2-5 6-8 4 3 6 5 6 8" /></svg>
    ),
    "fishing": (
      <svg {...props}><path d="M12 2v8" /><path d="M8 6l4 4 4-4" /><path d="M17 14c0 3-2.5 5-5 5s-5-2-5-5" /><circle cx="12" cy="14" r="1" fill="currentColor" /><path d="M6 20c0-3 2-5 6-8 4 3 6 5 6 8" /></svg>
    ),
    "racing": (
      <svg {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
    ),
    "running": (
      <svg {...props}><circle cx="14" cy="4" r="2" /><path d="M4 17l3.5-5.5L10 13l4-6 4 3" /><path d="M18 14l-2 6-4-2-2 4" /></svg>
    ),
    "army": (
      <svg {...props}><path d="M12 2l3 5h5l-4 4 1.5 5.5L12 13l-5.5 3.5L8 11 4 7h5z" /></svg>
    ),
    "badminton": (
      <svg {...props}><path d="M12 2v6" /><circle cx="12" cy="10" r="4" /><path d="M8 14l-4 6" /><path d="M16 14l4 6" /><path d="M10 14l-1 6" /><path d="M14 14l1 6" /></svg>
    ),
    "fantasy-club": (
      <svg {...props}><path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7z" /><path d="M12 8v4" /><circle cx="12" cy="15" r="0.5" fill="currentColor" /></svg>
    ),
    "fantasy": (
      <svg {...props}><path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7z" /><path d="M12 8v4" /><circle cx="12" cy="15" r="0.5" fill="currentColor" /></svg>
    ),
    "instansi-corporate": (
      <svg {...props}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22V12h6v10" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /></svg>
    ),
    "corporate": (
      <svg {...props}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22V12h6v10" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /></svg>
    ),
  };

  return icons[slug] ?? (
    <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" /></svg>
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
        className="relative my-auto w-[92vw] max-w-[500px] rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
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
        <div className="border-t border-black/10 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#16a34a]"
                 style={{ fontFamily: "var(--font-mono)" }}>
                {product.catalogue}
              </p>
              <p className="mt-1 text-sm text-[#666]">{categoryLabel}</p>
            </div>
            <a
              href={getWhatsAppLink(categoryLabel, product.catalogue)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#16a34a] px-4 py-2.5 text-xs font-black text-white transition hover:bg-green-500 sm:px-5 sm:text-sm"
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
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl">
      {/* Image */}
      <button
        onClick={() => onSelect(product)}
        className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden bg-[#f7f7f7]"
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
          <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#111] opacity-0 shadow-lg transition group-hover:opacity-100">
            Klik untuk zoom
          </span>
        </div>
      </button>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#16a34a] sm:text-[11px]"
           style={{ fontFamily: "var(--font-mono)" }}>
          {product.catalogue}
        </p>
        <a
          href={getWhatsAppLink(categoryLabel, product.catalogue)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block w-full rounded-full bg-[#0b0b0b] py-2 text-center text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-[#16a34a] sm:py-2.5 sm:text-xs"
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
      <div className="aspect-[4/5] rounded-2xl bg-[#e5e5e5] sm:rounded-3xl" />
      <div className="mt-3 space-y-2 p-1">
        <div className="h-3 w-16 rounded bg-[#e5e5e5]" />
        <div className="h-8 w-full rounded-full bg-[#e5e5e5]" />
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
      {/* Category tabs */}
      <div className="relative mt-5 sm:mt-8">
        <div
          className="flex flex-wrap gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="Kategori katalog jersey"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              className={`catalog-tab inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-bold transition sm:gap-2 sm:px-4 sm:py-2 sm:text-xs ${
                cat.id === activeCategory
                  ? "border-[#16a34a] bg-[#16a34a] text-white shadow-[0_4px_16px_rgba(22,163,74,.25)]"
                  : "border-black/10 bg-[#f7f7f7] text-[#111] hover:border-[#16a34a]"
              }`}
              aria-selected={cat.id === activeCategory}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <CategoryIcon
                slug={cat.id}
                className={cat.id === activeCategory ? "text-white" : "text-[#666]"}
              />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active category info */}
      <div className="mt-4 flex items-center gap-3 sm:mt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#16a34a]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#16a34a] sm:text-[11px]"
              style={{ fontFamily: "var(--font-mono)" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
          {activeCategoryData.label}
        </span>
        <span className="text-[10px] text-[#999] sm:text-xs">
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
