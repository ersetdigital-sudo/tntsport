"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ICON_NAMES } from "@/lib/icon-registry";

export type FieldType = "text" | "textarea" | "number" | "select" | "icon";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  default?: string | number;
  help?: string;
}

interface CrudManagerProps {
  table: string;
  title: string;
  description?: string;
  fields: Field[];
  items: Record<string, any>[];
  /** Field name(s) to display as the item title. Supports dot notation. */
  titleField?: string;
  /** Field name(s) to display as the item subtitle. Supports dot notation. */
  subtitleField?: string;
  /** @deprecated Use titleField/subtitleField instead. Kept for backward compat. */
  renderItem?: (item: Record<string, any>) => { title: string; subtitle?: string };
  orderColumn?: string;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string | number;
  onChange: (v: string | number) => void;
}) {
  const baseClass =
    "bg-surface-dark text-on-dark rounded-xs px-md py-sm border border-hairline focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 w-full";

  if (field.type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        rows={3}
        className={baseClass}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
        className={baseClass}
      >
        <option value="">— Pilih —</option>
        {field.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "icon") {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={baseClass}
      >
        <option value="">— Tanpa icon —</option>
        {ICON_NAMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={field.type === "number" ? "number" : "text"}
      value={value}
      onChange={(e) =>
        onChange(field.type === "number" ? Number(e.target.value) : e.target.value)
      }
      placeholder={field.placeholder}
      required={field.required}
      className={baseClass}
    />
  );
}

export function CrudManager({
  table,
  title,
  description,
  fields,
  items,
  titleField,
  subtitleField,
  renderItem,
  orderColumn = "sort_order",
}: CrudManagerProps) {
  // Default render: use titleField/subtitleField or fall back to first two fields
  function defaultRenderItem(item: Record<string, any>) {
    const tField = titleField ?? fields[0]?.name ?? "id";
    const sField = subtitleField;
    const t = String(item[tField] ?? "");
    const s = sField ? String(item[sField] ?? "") : undefined;
    return { title: t, subtitle: s };
  }
  const router = useRouter();
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function startNew() {
    const blank: Record<string, any> = {};
    fields.forEach((f) => {
      blank[f.name] = f.default ?? (f.type === "number" ? 0 : "");
    });
    // Default sort_order to max+1
    const maxOrder = items.reduce(
      (max, it) => Math.max(max, Number(it[orderColumn] ?? 0)),
      0
    );
    blank[orderColumn] = maxOrder + 1;
    setEditing(blank);
    setShowForm(true);
  }

  function startEdit(item: Record<string, any>) {
    setEditing({ ...item });
    setShowForm(true);
  }

  function updateField(name: string, value: string | number) {
    setEditing((prev) => (prev ? { ...prev, [name]: value } : prev));
  }

  function save() {
    if (!editing) return;
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { id, ...raw } = editing;
      // Strip virtual display fields (_title, _subtitle, etc.) — not real DB columns
      const data = Object.fromEntries(
        Object.entries(raw).filter(([k]) => !k.startsWith("_"))
      );
      if (id) {
        const { error: err } = await supabase
          .from(table)
          .update(data)
          .eq("id", id);
        if (err) {
          setError(err.message);
          return;
        }
      } else {
        const { error: err } = await supabase.from(table).insert(data);
        if (err) {
          setError(err.message);
          return;
        }
      }
      setShowForm(false);
      setEditing(null);
      router.refresh();
    });
  }

  function remove(id: string) {
    if (!confirm("Yakin hapus item ini?")) return;
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { error: err } = await supabase.from(table).delete().eq("id", id);
      if (err) {
        setError(err.message);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-heading-md text-ink">{title}</h2>
          {description ? (
            <p className="text-body-sm text-on-dark-mute mt-xs">{description}</p>
          ) : null}
        </div>
        {!showForm ? (
          <button
            onClick={startNew}
            className="text-button-md inline-flex h-10 items-center justify-center rounded-full bg-primary px-lg text-on-primary hover:bg-secondary transition-colors duration-normal"
          >
            + Tambah
          </button>
        ) : null}
      </div>

      {error ? (
        <p
          role="alert"
          className="text-caption text-primary border border-primary bg-surface-card rounded-md px-md py-sm"
        >
          {error}
        </p>
      ) : null}

      {showForm && editing ? (
        <div className="bg-surface-card rounded-md p-xl border border-hairline flex flex-col gap-md">
          <h3 className="text-button-md text-ink">
            {editing.id ? "Edit item" : "Tambah item baru"}
          </h3>
          {fields.map((f) => (
            <label key={f.name} className="flex flex-col gap-xs">
              <span className="text-button-sm text-on-dark-mute uppercase tracking-wider">
                {f.label}
                {f.required ? " *" : ""}
              </span>
              <FieldInput
                field={f}
                value={editing[f.name] ?? ""}
                onChange={(v) => updateField(f.name, v)}
              />
              {f.help ? (
                <span className="text-caption text-mute">{f.help}</span>
              ) : null}
            </label>
          ))}
          <div className="flex gap-sm mt-xs">
            <button
              onClick={save}
              disabled={pending}
              className="text-button-md inline-flex h-10 items-center justify-center rounded-full bg-primary px-lg text-on-primary hover:bg-secondary transition-colors duration-normal disabled:opacity-40"
            >
              {pending ? "Menyimpan…" : "Simpan"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setError(null);
              }}
              disabled={pending}
              className="text-button-md inline-flex h-10 items-center justify-center rounded-full bg-surface-dark px-lg text-on-dark-mute hover:bg-secondary hover:text-on-primary transition-colors duration-normal"
            >
              Batal
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-sm">
        {items.length === 0 ? (
          <p className="text-body-sm text-on-dark-mute bg-surface-card rounded-md p-xl border border-hairline">
            Belum ada data. Klik "+ Tambah" untuk membuat.
          </p>
        ) : (
          items.map((item) => {
            const r = renderItem ? renderItem(item) : defaultRenderItem(item);
            return (
              <div
                key={item.id}
                className="bg-surface-card rounded-md p-md border border-hairline flex items-center justify-between gap-md"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-body-md text-ink truncate">{r.title}</p>
                  {r.subtitle ? (
                    <p className="text-caption text-on-dark-mute truncate">
                      {r.subtitle}
                    </p>
                  ) : null}
                </div>
                <div className="flex gap-xs shrink-0">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-button-sm inline-flex h-8 items-center justify-center rounded-md bg-surface-dark px-md text-on-dark-mute hover:bg-secondary hover:text-on-primary transition-colors duration-normal"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-button-sm inline-flex h-8 items-center justify-center rounded-md bg-surface-dark px-md text-primary hover:bg-primary hover:text-on-primary transition-colors duration-normal"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}