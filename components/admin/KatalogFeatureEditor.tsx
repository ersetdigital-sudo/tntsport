"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getCloudinarySignature } from "@/app/admin/actions/cloudinary";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface KatalogFeature {
  id?: string;
  section: string;
  icon: string | null;
  title: string;
  description: string;
  sort_order: number;
}

interface KatalogFeatureEditorProps {
  feature?: KatalogFeature | null;
}

const LUCIDE_ICONS = [
  "Thermometer", "Palette", "Scissors", "Clock", "Cog", "Droplets",
  "Headphones", "Sparkles", "Star", "Shield", "Zap", "Heart",
  "Award", "Check", "Target", "Layers", "Globe", "Truck",
];

const SVG_ICONS = [
  { name: "Sepak Bola", src: "/dba325f3-aa25-43c1-bf79-c97cac27beb0.svg" },
  { name: "Basket", src: "/b4d1d695-3820-4c3b-9593-2018b49634ab.svg" },
  { name: "Voli", src: "/fdd593d3-725a-4970-9c5b-50346939a377.svg" },
  { name: "Racing", src: "/5dedcffe-5ed1-43c3-99c4-93cb8638a435.svg" },
  { name: "Mancing", src: "/0040a5e9-73c7-4575-a3f3-fc0de36354ac.svg" },
  { name: "Running", src: "/b909ca73-c7d0-47ee-8c6c-4ec4ede8b3f9.svg" },
  { name: "Badminton", src: "/002ba172-c237-4b45-a942-9b370ac9ec58.svg" },
  { name: "Army", src: "/5e3bd6f8-d7f3-4b74-9d7e-a7f21d006754.svg" },
  { name: "Fantasy Club", src: "/378b562a-d8ba-4fd6-b19a-b05c96238007.svg" },
  { name: "Corporate", src: "/9e768942-684b-4bfe-acb8-4f69a788ead6.svg" },
  { name: "WhatsApp", src: "/ff97df23-7887-4ec6-9c5f-07a52fe12325.svg" },
  { name: "Mesin", src: "/a31d0d8a-03fa-4f96-997d-30c2f73614ae.svg" },
  { name: "Tinta", src: "/1a2aef64-2025-4099-a8e3-b39feb08511e.svg" },
  { name: "Layanan", src: "/6266d3d8-3e9e-46b3-a2cf-2d6a5cf908fa.svg" },
];

export function KatalogFeatureEditor({ feature }: KatalogFeatureEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [section, setSection] = useState(feature?.section ?? "feature");
  const [iconType, setIconType] = useState<"lucide" | "upload">(
    feature?.icon?.startsWith("http") ? "upload" : "lucide"
  );
  const [iconName, setIconName] = useState(
    feature?.icon?.startsWith("http") ? "" : (feature?.icon ?? "Thermometer")
  );
  const [iconUrl, setIconUrl] = useState(
    feature?.icon?.startsWith("http") ? feature.icon : ""
  );
  const [title, setTitle] = useState(feature?.title ?? "");
  const [description, setDescription] = useState(feature?.description ?? "");
  const [sortOrder, setSortOrder] = useState(feature?.sort_order ?? 1);

  const isEdit = !!feature?.id;

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const signedParams = await getCloudinarySignature({ folder: "katalog-features" });
      const result = await uploadToCloudinary(file, signedParams);
      setIconUrl(result.url);
      setIconType("upload");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSave() {
    if (!title.trim()) {
      setError("Judul wajib diisi");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const supabase = createClient();

        const iconValue = iconType === "upload" ? iconUrl : iconName;

        const data = {
          section,
          icon: iconValue || null,
          title: title.trim(),
          description: description.trim(),
          sort_order: sortOrder,
        };

        if (isEdit) {
          const { error: updateError } = await supabase
            .from("katalog_features")
            .update(data)
            .eq("id", feature.id);
          if (updateError) throw new Error(updateError.message);
        } else {
          const { error: insertError } = await supabase
            .from("katalog_features")
            .insert(data);
          if (insertError) throw new Error(insertError.message);
        }

        router.push("/admin/katalog-features");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan");
      }
    });
  }

  async function handleDelete() {
    if (!feature?.id) return;
    if (!confirm("Yakin hapus item ini?")) return;

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase.from("katalog_features").delete().eq("id", feature.id);
        if (error) throw new Error(error.message);
        router.push("/admin/katalog-features");
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

      {/* Section select */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink">Tipe Section</label>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:border-primary focus:ring-1 focus:ring-primary/30"
        >
          <option value="feature">Feature Card (4 kartu utama)</option>
          <option value="info">Info Card (3 kartu bawah)</option>
        </select>
      </div>

      {/* Icon selection */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink">Icon</label>
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => setIconType("lucide")}
            className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
              iconType === "lucide"
                ? "bg-primary text-white"
                : "bg-surface border border-hairline text-charcoal hover:border-primary"
            }`}
          >
            Icon Bawaan
          </button>
          <button
            type="button"
            onClick={() => { setIconType("upload"); setIconName(""); }}
            className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
              iconType === "upload"
                ? "bg-primary text-white"
                : "bg-surface border border-hairline text-charcoal hover:border-primary"
            }`}
          >
            Icon Kustom
          </button>
        </div>

        {iconType === "lucide" ? (
          <div className="space-y-4">
            {/* Lucide icons */}
            <div>
              <p className="text-xs font-semibold text-ink mb-2">Icon Lucide</p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {LUCIDE_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setIconName(icon)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 transition ${
                      iconName === icon
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-hairline bg-white text-charcoal hover:border-primary/50 hover:bg-primary/5"
                    }`}
                    title={icon}
                  >
                    <span className="text-sm font-bold">{icon.substring(0, 3)}</span>
                    <span className="text-[8px] text-mute truncate w-full text-center">{icon}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-stone">Dipilih: <strong className="text-ink">{iconName || "Belum ada"}</strong></p>
            </div>

            {/* SVG icons */}
            <div>
              <p className="text-xs font-semibold text-ink mb-2">Icon SVG (Kategori & Lainnya)</p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {SVG_ICONS.map((icon) => (
                  <button
                    key={icon.src}
                    type="button"
                    onClick={() => { setIconName(icon.src); setIconType("upload"); setIconUrl(icon.src); }}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 transition ${
                      iconUrl === icon.src
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-hairline bg-white hover:border-primary/50 hover:bg-primary/5"
                    }`}
                    title={icon.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={icon.src} alt={icon.name} className="h-7 w-7 object-contain" />
                    <span className="text-[8px] text-mute truncate w-full text-center">{icon.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {iconUrl ? (
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconUrl} alt="Icon" className="h-16 w-16 rounded-lg border border-hairline object-contain" />
                <button
                  type="button"
                  onClick={() => { setIconUrl(""); setIconType("lucide"); }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs text-white"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-hairline-strong text-charcoal transition hover:border-primary hover:text-primary disabled:opacity-50"
              >
                {uploading ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    <span className="text-[9px] font-bold">Upload</span>
                  </>
                )}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <p className="mt-1 text-[10px] text-mute">SVG, PNG, atau WEBP. Background transparan lebih bagus.</p>
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink">
          Judul <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Adem & Nyaman"
          className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink">
          Deskripsi <span className="text-danger">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Bahan ringan, menyerap keringat..."
          rows={3}
          className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Sort order */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink">Urutan</label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 border-t border-hairline pt-5">
        <button
          onClick={handleSave}
          disabled={pending || uploading}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Item"}
        </button>
        <button
          onClick={() => router.push("/admin/katalog-features")}
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
