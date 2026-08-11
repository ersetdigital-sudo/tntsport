"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  thumb?: string;
}

interface CategoryGroup {
  id: string;
  name: string;
  products: ProductItem[];
}

export function ProductSearchGrid({
  grouped,
  uncategorized,
}: {
  grouped: CategoryGroup[];
  uncategorized: ProductItem[];
}) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const filteredGrouped = useMemo(() => {
    if (!q) return grouped;
    return grouped
      .map((cat) => ({
        ...cat,
        products: cat.products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.slug.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.products.length > 0);
  }, [grouped, q]);

  const filteredUncategorized = useMemo(() => {
    if (!q) return uncategorized;
    return uncategorized.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
    );
  }, [uncategorized, q]);

  const totalResults =
    filteredGrouped.reduce((sum, cat) => sum + cat.products.length, 0) +
    filteredUncategorized.length;

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-20 -mx-4 -mt-4 flex items-center justify-between gap-4 border-b border-hairline bg-background px-4 py-4 md:-mx-8 md:-mt-8 md:px-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-heading-md text-ink">Produk</h2>
          <p className="text-body-sm text-charcoal mt-1">
            Kelola produk jersey per kategori. Upload foto dan atur kode katalog.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-premium-sm transition hover:bg-primary-strong active:scale-[0.98]"
        >
          <span className="text-lg leading-none">+</span>
          Tambah Produk
        </Link>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute pointer-events-none" />
        <input
          type="text"
          placeholder="Cari produk..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-hairline bg-surface py-2.5 pl-9 pr-9 text-sm text-ink placeholder:text-mute focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink transition"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {q && totalResults === 0 && (
        <div className="rounded-2xl border border-hairline bg-surface p-8 text-center">
          <p className="text-charcoal">
            Tidak ada produk yang cocok dengan &quot;{query}&quot;
          </p>
        </div>
      )}

      {!q && filteredGrouped.length === 0 && filteredUncategorized.length === 0 && (
        <div className="rounded-2xl border border-hairline bg-surface p-8 text-center">
          <p className="text-charcoal">Belum ada produk. Klik &quot;Tambah Produk&quot; untuk mulai.</p>
        </div>
      )}

      {filteredGrouped.map((cat) => (
        <div key={cat.id} className="rounded-2xl border border-hairline bg-surface p-5">
          <h3 className="text-sm font-bold text-ink mb-3">
            {cat.name}
            {q && (
              <span className="ml-2 text-xs font-normal text-mute">
                ({cat.products.length})
              </span>
            )}
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 [content-visibility:auto]">
            {cat.products.map((p) => (
              <Link
                key={p.id}
                href={`/admin/products/${p.id}`}
                className="group overflow-hidden rounded-xl border border-hairline transition hover:border-primary hover:shadow-sm"
              >
                <div className="aspect-[4/5] bg-background">
                  {p.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.thumb}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-mute text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-bold text-ink truncate">{p.name}</p>
                  <p className="text-[10px] text-mute">{p.slug}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {filteredUncategorized.length > 0 && (
        <div className="rounded-2xl border border-hairline bg-surface p-5">
          <h3 className="text-sm font-bold text-ink mb-3">
            Tanpa Kategori
            {q && (
              <span className="ml-2 text-xs font-normal text-mute">
                ({filteredUncategorized.length})
              </span>
            )}
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 [content-visibility:auto]">
            {filteredUncategorized.map((p) => (
              <Link
                key={p.id}
                href={`/admin/products/${p.id}`}
                className="group overflow-hidden rounded-xl border border-hairline transition hover:border-primary hover:shadow-sm"
              >
                <div className="aspect-[4/5] bg-background">
                  {p.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.thumb}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-mute text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-bold text-ink truncate">{p.name}</p>
                  <p className="text-[10px] text-mute">{p.slug}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
