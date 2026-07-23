"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getCloudinarySignature } from "@/app/admin/actions/cloudinary";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface Testimonial {
  id?: string;
  name: string;
  city: string;
  team: string;
  quote: string;
  image_url: string | null;
  rating: number;
  badge: string;
  sort_order: number;
}

interface TestimonialEditorProps {
  testimonial?: Testimonial | null;
}

export function TestimonialEditor({ testimonial }: TestimonialEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState(testimonial?.name ?? "");
  const [city, setCity] = useState(testimonial?.city ?? "");
  const [team, setTeam] = useState(testimonial?.team ?? "");
  const [quote, setQuote] = useState(testimonial?.quote ?? "");
  const [imageUrl, setImageUrl] = useState(testimonial?.image_url ?? "");
  const [rating, setRating] = useState(testimonial?.rating ?? 5);
  const [badge, setBadge] = useState(testimonial?.badge ?? "Verified Buyer");
  const [sortOrder, setSortOrder] = useState(testimonial?.sort_order ?? 1);

  const isEdit = !!testimonial?.id;

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const signedParams = await getCloudinarySignature({ folder: "testimonials" });
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
    if (!name.trim() || !quote.trim()) {
      setError("Nama dan testimoni wajib diisi");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const supabase = createClient();

        const data = {
          name: name.trim(),
          city: city.trim(),
          team: team.trim(),
          quote: quote.trim(),
          image_url: imageUrl || null,
          rating,
          badge: badge.trim(),
          sort_order: sortOrder,
        };

        if (isEdit) {
          const { error: updateError } = await supabase
            .from("katalog_testimonials")
            .update(data)
            .eq("id", testimonial.id);
          if (updateError) throw new Error(updateError.message);
        } else {
          const { error: insertError } = await supabase
            .from("katalog_testimonials")
            .insert(data);
          if (insertError) throw new Error(insertError.message);
        }

        router.push("/admin/katalog-testimonials");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan");
      }
    });
  }

  async function handleDelete() {
    if (!testimonial?.id) return;
    if (!confirm("Yakin hapus testimoni ini?")) return;

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase.from("katalog_testimonials").delete().eq("id", testimonial.id);
        if (error) throw new Error(error.message);
        router.push("/admin/katalog-testimonials");
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">
            Nama <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rizky Pratama"
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">Kota</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Jakarta Selatan"
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink">Tim / Komunitas</label>
        <input
          type="text"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          placeholder="Tim Futsal Kantor BCA"
          className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink">
          Testimoni <span className="text-danger">*</span>
        </label>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Ceritakan pengalaman customer..."
          rows={4}
          className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Photo upload */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink">Foto Customer (opsional)</label>
        <div className="flex items-start gap-4">
          {imageUrl ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Foto customer" className="h-20 w-20 rounded-full border-2 border-hairline object-cover" />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs text-white"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-hairline-strong text-charcoal transition hover:border-primary hover:text-primary disabled:opacity-50"
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
          <p className="text-[10px] text-mute mt-1">Foto customer (opsional). Kalau kosong, tampil inisial nama.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink focus:border-primary focus:ring-1 focus:ring-primary/30"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{"★".repeat(r)} ({r})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">Badge</label>
          <input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            placeholder="Verified Buyer"
            className="w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
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

      {/* Preview */}
      {name && quote && (
        <div className="rounded-xl border border-hairline bg-surface-card p-4">
          <p className="text-[10px] font-bold text-mute mb-2">PREVIEW</p>
          <div className="flex items-start gap-3">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                {name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-ink">{name}</span>
                {city && <span className="text-[10px] text-mute">- {city}</span>}
              </div>
              <p className="text-xs text-charcoal italic">&ldquo;{quote.substring(0, 80)}...&rdquo;</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 border-t border-hairline pt-5">
        <button
          onClick={handleSave}
          disabled={pending || uploading}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Testimoni"}
        </button>
        <button
          onClick={() => router.push("/admin/katalog-testimonials")}
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
