"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getCloudinarySignature } from "@/app/admin/actions/cloudinary";
import { uploadToCloudinary } from "@/lib/cloudinary";
import type { FabricGroupId } from "@/lib/types";

interface FabricEditorProps {
  fabric?: {
    id: string;
    code: string;
    name: string;
    fabric_group: FabricGroupId;
    image_url: string | null;
    description: string | null;
    sort_order: number;
  } | null;
}

const GROUPS: { value: FabricGroupId; label: string }[] = [
  { value: "jacquard", label: "3 Jacquard Kain" },
  { value: "base", label: "Base Kain" },
  { value: "embossed", label: "Embossed Kain" },
];

export function FabricEditor({ fabric }: FabricEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [code, setCode] = useState(fabric?.code ?? "");
  const [name, setName] = useState(fabric?.name ?? "");
  const [group, setGroup] = useState<FabricGroupId>(fabric?.fabric_group ?? "base");
  const [description, setDescription] = useState(fabric?.description ?? "");
  const [imageUrl, setImageUrl] = useState(fabric?.image_url ?? "");
  const [sortOrder, setSortOrder] = useState(fabric?.sort_order ?? 1);

  const isEdit = !!fabric?.id;

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const signedParams = await getCloudinarySignature({ folder: "fabrics" });
      const result = await uploadToCloudinary(file, signedParams);
      setImageUrl(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSave() {
    if (!code.trim()) {
      setError("Kode bahan wajib diisi");
      return;
    }
    if (!name.trim()) {
      setError("Nama bahan wajib diisi");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const supabase = createClient();

        const data = {
          code: code.trim().toUpperCase(),
          name: name.trim().toUpperCase(),
          fabric_group: group,
          description: description.trim() || null,
          image_url: imageUrl || null,
          sort_order: sortOrder,
        };

        if (isEdit) {
          const { error: updateError } = await supabase
            .from("fabrics")
            .update(data)
            .eq("id", fabric.id);
          if (updateError) throw new Error(updateError.message);
        } else {
          const { error: insertError } = await supabase.from("fabrics").insert(data);
          if (insertError) throw new Error(insertError.message);
        }

        router.push("/admin/fabrics");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan");
      }
    });
  }

  async function handleDelete() {
    if (!fabric?.id) return;
    if (!confirm("Yakin hapus bahan ini?")) return;

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase.from("fabrics").delete().eq("id", fabric.id);
        if (error) throw new Error(error.message);
        router.push("/admin/fabrics");
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

      {/* Foto bahan */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-ink">Foto Bahan</label>
        {imageUrl ? (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={name || "Foto bahan"}
              className="h-40 w-40 rounded-xl border border-hairline object-cover"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-danger text-xs text-white"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-hairline-strong text-charcoal transition hover:border-primary hover:text-primary disabled:opacity-50"
          >
            {uploading ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-wide">Upload Foto</span>
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
        <p className="mt-2 text-[10px] text-mute">Foto kain (JPG/PNG/WEBP). Foto kelihatan lebih jelas direkomendasikan.</p>
      </div>

      {/* Code + Name */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">
            Kode Bahan <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="JACQUARD"
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
          <p className="mt-1 text-[10px] text-mute">Contoh: JACQUARD, DRIFIT, EMBOSSED</p>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">
            Nama Bahan <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="LIGHTNING A"
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Group + Sort */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">Kelompok Bahan</label>
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value as FabricGroupId)}
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:border-primary focus:ring-1 focus:ring-primary/30"
          >
            {GROUPS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
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

      {/* Description */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink">Deskripsi</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kain jacquard motif garis petir dengan tekstur anyaman timbul..."
          rows={3}
          className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 border-t border-hairline pt-5">
        <button
          onClick={handleSave}
          disabled={pending || uploading}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Bahan"}
        </button>
        <button
          onClick={() => router.push("/admin/fabrics")}
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
