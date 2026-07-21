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
  };
}

export function BrandEditor({ brand }: BrandEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState(brand);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(field: keyof typeof form, value: string) {
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
    "bg-surface-dark text-on-dark rounded-xs px-md py-sm border border-hairline focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 w-full";
  const labelClass = "text-button-sm text-on-dark-mute uppercase tracking-wider";

  return (
    <div className="flex flex-col gap-lg">
      <div className="bg-surface-card rounded-md p-xl border border-hairline flex flex-col gap-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <label className="flex flex-col gap-xs">
            <span className={labelClass}>Nama Brand</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
              placeholder="TNT SPORT"
            />
          </label>
          <label className="flex flex-col gap-xs">
            <span className={labelClass}>Accent Word</span>
            <input
              type="text"
              value={form.accent_word}
              onChange={(e) => update("accent_word", e.target.value)}
              className={inputClass}
              placeholder="SPORT"
            />
            <small className="text-caption text-mute">Kata yang di-highlight di nama brand</small>
          </label>
          <label className="flex flex-col gap-xs">
            <span className={labelClass}>Monogram</span>
            <input
              type="text"
              value={form.monogram}
              onChange={(e) => update("monogram", e.target.value)}
              className={inputClass}
              placeholder="TNT"
            />
          </label>
          <label className="flex flex-col gap-xs">
            <span className={labelClass}>URL Situs</span>
            <input
              type="text"
              value={form.url}
              onChange={(e) => update("url", e.target.value)}
              className={inputClass}
              placeholder="https://tntsport.id"
            />
          </label>
          <label className="flex flex-col gap-xs">
            <span className={labelClass}>Nomor WhatsApp</span>
            <input
              type="text"
              value={form.whatsapp_number}
              onChange={(e) => update("whatsapp_number", e.target.value)}
              className={inputClass}
              placeholder="6281234567890"
            />
            <small className="text-caption text-mute">Format: 62xxx (tanpa tanda + atau spasi)</small>
          </label>
          <label className="flex flex-col gap-xs">
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

        <label className="flex flex-col gap-xs">
          <span className={labelClass}>Tagline</span>
          <textarea
            value={form.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            rows={2}
            className={inputClass}
            placeholder="Pabrik Jersey Custom Full Printing..."
          />
        </label>

        <label className="flex flex-col gap-xs">
          <span className={labelClass}>Description (SEO)</span>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className={inputClass}
            placeholder="Deskripsi brand untuk SEO..."
          />
        </label>

        {error ? (
          <p
            role="alert"
            className="text-caption text-primary border border-primary bg-surface-card rounded-md px-md py-sm"
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