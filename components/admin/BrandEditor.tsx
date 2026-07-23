"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface BrandEditorProps {
  brand: {
    name: string;
    accent_word: string;
    monogram: string;
    tagline: string;
    url: string;
    description: string;
    whatsapp_number: string;
    logo_path: string;
    meta_pixel_id: string;
    meta_pixel_enabled: boolean;
  };
}

export function BrandEditor({ brand }: BrandEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState(brand);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(field: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function save() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const supabase = createClient();
      const { error: err } = await supabase
        .from("brand")
        .update(form)
        .eq("id", 1);
      if (err) {
        setError(err.message);
        return;
      }
      setSaved(true);
      router.refresh();
    });
  }

  const inputClass =
    "bg-white text-ink rounded-lg px-md py-[10px] border border-hairline-strong text-body-sm placeholder:text-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-1 dark:bg-surface-dark dark:text-on-dark dark:border-hairline dark:placeholder:text-on-dark-mute w-full";
  const labelClass = "text-caption font-semibold text-ink dark:text-on-dark-mute uppercase tracking-wider";

  return (
    <div className="flex flex-col gap-lg">
      <div className="bg-surface-card rounded-2xl p-xl border border-hairline shadow-premium-sm dark:border-white/10 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Nama Brand</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
              placeholder="TNT SPORT"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Accent Word</span>
            <input
              type="text"
              value={form.accent_word}
              onChange={(e) => update("accent_word", e.target.value)}
              className={inputClass}
              placeholder="SPORT"
            />
            <small className="text-caption text-charcoal dark:text-mute">Kata yang di-highlight di nama brand</small>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Monogram</span>
            <input
              type="text"
              value={form.monogram}
              onChange={(e) => update("monogram", e.target.value)}
              className={inputClass}
              placeholder="TNT"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Nomor WhatsApp</span>
            <input
              type="text"
              value={form.whatsapp_number}
              onChange={(e) => update("whatsapp_number", e.target.value)}
              className={inputClass}
              placeholder="6281234567890"
            />
            <small className="text-caption text-charcoal dark:text-mute">Format: 62xxx (tanpa tanda + atau spasi)</small>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Logo Path</span>
            <input
              type="text"
              value={form.logo_path}
              onChange={(e) => update("logo_path", e.target.value)}
              className={inputClass}
              placeholder="/logo.jpg"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Tagline</span>
          <textarea
            value={form.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            rows={2}
            className={inputClass}
            placeholder="Pabrik Jersey Custom Full Printing..."
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Description (SEO)</span>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className={inputClass}
            placeholder="Deskripsi brand untuk SEO..."
          />
        </label>

        {/* Meta Pixel Settings */}
        <div className="border-t border-hairline dark:border-white/10 pt-6">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-body-md font-bold text-ink dark:text-on-dark">Meta Pixel</h3>
            {form.meta_pixel_id && form.meta_pixel_enabled ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-bold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Pixel Aktif
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-stone/15 px-2.5 py-1 text-[10px] font-bold text-stone">
                Pixel Nonaktif
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Pixel ID</span>
              <input
                type="text"
                value={form.meta_pixel_id}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  update("meta_pixel_id", val);
                }}
                className={inputClass}
                placeholder="123456789012345"
              />
              <small className="text-caption text-charcoal dark:text-mute">
                Dapatkan Pixel ID dari Meta Events Manager
              </small>
            </label>

            <label className="flex flex-col gap-1.5 justify-center">
              <span className={labelClass}>Status</span>
              <button
                type="button"
                onClick={() => update("meta_pixel_enabled", !form.meta_pixel_enabled)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                  form.meta_pixel_enabled ? "bg-success" : "bg-stone/30"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    form.meta_pixel_enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <small className="text-caption text-charcoal dark:text-mute">
                {form.meta_pixel_enabled ? "Pixel akan dimuat di semua halaman" : "Pixel tidak dimuat"}
              </small>
            </label>
          </div>
        </div>

        {error ? (
          <p
            role="alert"
            className="text-caption text-danger border border-danger/30 bg-danger/5 rounded-lg px-md py-sm"
          >
            {error}
          </p>
        ) : null}

        <div className="flex items-center gap-md">
          <button
            onClick={save}
            disabled={pending}
            className="text-button-md inline-flex h-10 items-center justify-center rounded-full bg-primary px-lg text-on-primary hover:bg-secondary transition-colors duration-normal disabled:opacity-40"
          >
            {pending ? "Menyimpan…" : "Simpan Perubahan"}
          </button>
          {saved ? (
            <span className="text-caption text-success">✓ Tersimpan</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}