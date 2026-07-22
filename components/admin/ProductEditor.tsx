"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getCloudinarySignature } from "@/app/admin/actions/cloudinary";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface ProductImage {
  id?: string;
  url: string;
  alt: string;
  sort_order: number;
  _uploading?: boolean;
  _progress?: number;
}

interface Category {
  id: string;
  name: string;
}

interface ProductEditorProps {
  product?: {
    id: string;
    name: string;
    slug: string;
    category_id: string | null;
    sort_order: number;
    product_images: { id: string; url: string; alt: string; sort_order: number }[];
  } | null;
  categories: Category[];
}

export function ProductEditor({ product, categories }: ProductEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "");
  const [sortOrder, setSortOrder] = useState(product?.sort_order ?? 1);
  const [images, setImages] = useState<ProductImage[]>(
    product?.product_images?.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      sort_order: img.sort_order,
    })) ?? []
  );

  const isEdit = !!product?.id;

  function handleSlugAutoFill(value: string) {
    setName(value);
    if (!isEdit || !slug) {
      setSlug(
        value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    setError(null);

    try {
      const signedParams = await getCloudinarySignature({ folder: "products" });

      for (const file of Array.from(files)) {
        const tempId = `temp-${Date.now()}-${Math.random()}`;
        setImages((prev) => [
          ...prev,
          { url: "", alt: file.name, sort_order: prev.length, _uploading: true, _progress: 0 },
        ]);

        const result = await uploadToCloudinary(file, signedParams);

        setImages((prev) =>
          prev.map((img) =>
            img._uploading && img.url === ""
              ? { url: result.url, alt: file.name, sort_order: prev.indexOf(img), _uploading: false }
              : img
          )
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index).map((img, i) => ({ ...img, sort_order: i })));
  }

  function moveImage(from: number, to: number) {
    setImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated.map((img, i) => ({ ...img, sort_order: i }));
    });
  }

  async function handleSave() {
    if (!name.trim()) {
      setError("Nama wajib diisi");
      return;
    }
    if (!slug.trim()) {
      setError("Slug wajib diisi");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const supabase = createClient();

        const productData = {
          name: name.trim(),
          slug: slug.trim(),
          category_id: categoryId || null,
          sort_order: sortOrder,
          description: null,
          price: 0,
          stock_status: "in_stock" as const,
          featured: false,
        };

        let productId = product?.id;

        if (isEdit) {
          const { error: updateError } = await supabase
            .from("products")
            .update(productData)
            .eq("id", productId);
          if (updateError) throw new Error(updateError.message);

          // Delete removed images
          const existingIds = images.filter((img) => img.id).map((img) => img.id);
          const { data: currentImages } = await supabase
            .from("product_images")
            .select("id")
            .eq("product_id", productId);

          if (currentImages) {
            const toDelete = currentImages.filter((ci) => !existingIds.includes(ci.id));
            for (const img of toDelete) {
              await supabase.from("product_images").delete().eq("id", img.id);
            }
          }
        } else {
          const { data: newProduct, error: insertError } = await supabase
            .from("products")
            .insert(productData)
            .select("id")
            .single();
          if (insertError) throw new Error(insertError.message);
          productId = newProduct.id;
        }

        // Sync images
        for (const img of images) {
          if (img._uploading) continue;
          if (img.id) {
            await supabase
              .from("product_images")
              .update({ url: img.url, alt: img.alt, sort_order: img.sort_order })
              .eq("id", img.id);
          } else {
            await supabase.from("product_images").insert({
              product_id: productId,
              url: img.url,
              alt: img.alt,
              sort_order: img.sort_order,
            });
          }
        }

        router.push("/admin/products");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan");
      }
    });
  }

  async function handleDelete() {
    if (!product?.id) return;
    if (!confirm("Yakin hapus produk ini? Semua foto akan ikut terhapus.")) return;

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase.from("products").delete().eq("id", product.id);
        if (error) throw new Error(error.message);
        router.push("/admin/products");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menghapus");
      }
    });
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {/* Basic fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">
            Nama / Kode Katalog <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleSlugAutoFill(e.target.value)}
            placeholder="FB-001"
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">
            Slug <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="fb-001"
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">Kategori</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:border-primary focus:ring-1 focus:ring-primary/30"
          >
            <option value="">Pilih kategori...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">Urutan</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-ink">Foto Jersey</label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((img, i) => (
            <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-hairline bg-surface">
              {img._uploading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/50 p-1.5 text-center text-[10px] font-bold text-white backdrop-blur-sm">
                    {img.alt || `Foto ${i + 1}`}
                  </div>
                </>
              )}

              {/* Controls */}
              {!img._uploading && (
                <div className="absolute right-1.5 top-1.5 flex gap-1">
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(i, i - 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white backdrop-blur hover:bg-black/80"
                      title="Geser kiri"
                    >
                      ←
                    </button>
                  )}
                  {i < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(i, i + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white backdrop-blur hover:bg-black/80"
                      title="Geser kanan"
                    >
                      →
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-danger text-xs text-white hover:bg-danger/80"
                    title="Hapus"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-hairline-strong text-charcoal transition hover:border-primary hover:text-primary disabled:opacity-50"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wide">Tambah Foto</span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <p className="mt-2 text-[10px] text-mute">
          Upload foto jersey. Bisa pilih banyak file sekaligus. Klik panah untuk mengurutkan ulang.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 border-t border-hairline pt-5">
        <button
          onClick={handleSave}
          disabled={pending || uploading}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Produk"}
        </button>
        <button
          onClick={() => router.push("/admin/products")}
          disabled={pending}
          className="rounded-full border border-hairline px-6 py-2.5 text-sm font-bold text-charcoal transition hover:border-ink hover:text-ink"
        >
          Batal
        </button>
        {isEdit && (
          <button
            onClick={handleDelete}
            disabled={pending}
            className="ml-auto rounded-full border border-danger/30 px-6 py-2.5 text-sm font-bold text-danger transition hover:bg-danger/10"
          >
            Hapus
          </button>
        )}
      </div>
    </div>
  );
}
