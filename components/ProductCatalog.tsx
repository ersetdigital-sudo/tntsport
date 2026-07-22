"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { CATALOG_PRODUCTS, getWhatsAppLink, type Product } from "@/lib/products";

const CATEGORIES = CATALOG_PRODUCTS.map((cat) => ({
  id: cat.id,
  label: cat.label,
}));

/* ------------------------------------------------------------------ */
/* Zoom Preview Modal                                                   */
/* ------------------------------------------------------------------ */

function ZoomModal({
  product,
  categoryLabel,
  onClose,
}: {
  product: Product;
  categoryLabel: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-[4/5] w-[85vw] max-w-[500px] overflow-hidden">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 85vw, 500px"
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
  product: Product;
  categoryLabel: string;
  onSelect: (product: Product) => void;
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

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomedProduct, setZoomedProduct] = useState<Product | null>(null);

  const activeCategoryData = CATALOG_PRODUCTS.find((c) => c.id === activeCategory)!;

  const handleCategoryChange = useCallback((categoryId: string) => {
    if (categoryId === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(categoryId);
    // Simulate brief loading for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  }, [activeCategory]);

  return (
    <>
      {/* Category tabs */}
      <div className="mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5" role="tablist" aria-label="Kategori katalog jersey">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            className={`catalog-tab rounded-full border px-3 py-1.5 text-[10px] font-bold transition sm:px-4 sm:py-2 sm:text-xs ${
              cat.id === activeCategory
                ? "border-[#16a34a] bg-[#16a34a] text-white shadow-[0_4px_16px_rgba(22,163,74,.25)]"
                : "border-black/10 bg-[#f7f7f7] text-[#111] hover:border-[#16a34a]"
            }`}
            aria-selected={cat.id === activeCategory}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
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
