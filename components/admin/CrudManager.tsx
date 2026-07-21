"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ICON_NAMES, groupedIcons, resolveIcon, iconLabel } from "@/lib/icon-registry";

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
    "bg-white text-ink rounded-lg px-md py-[10px] border border-hairline-strong text-body-sm placeholder:text-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-1 dark:bg-surface-dark dark:text-on-dark dark:border-hairline w-full";

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
    const groups = groupedIcons();
    const PreviewIcon = resolveIcon(String(value));
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-sm">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseClass}
          >
            <option value="">— Tanpa icon —</option>
            {groups.map((g) => (
              <optgroup key={g.category} label={g.category}>
                {g.items.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {PreviewIcon ? (
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-hairline-strong bg-white text-ink dark:bg-surface-dark dark:text-on-dark dark:border-hairline">
              <PreviewIcon className="h-4.5 w-4.5" />
            </span>
          ) : null}
        </div>
        {value ? (
          <small className="text-caption text-charcoal dark:text-mute">
            Key: {String(value)}
          </small>
        ) : null}
      </div>
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
            <p className="text-body-sm text-charcoal dark:text-on-dark-mute mt-xs">{description}</p>
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
          className="text-caption text-danger border border-danger/30 bg-danger/5 rounded-lg px-md py-sm"
        >
          {error}
        </p>
      ) : null}

      {showForm && editing ? (
        <div className="bg-surface-card rounded-2xl p-xl border border-hairline shadow-premium-sm dark:border-white/10 flex flex-col gap-5">
          <h3 className="text-button-md text-ink">
            {editing.id ? "Edit item" : "Tambah item baru"}
          </h3>
          {fields.map((f) => (
            <label key={f.name} className="flex flex-col gap-1.5">
              <span className="text-caption font-semibold text-ink dark:text-on-dark-mute uppercase tracking-wider">
                {f.label}
                {f.required ? " *" : ""}
              </span>
              <FieldInput
                field={f}
                value={editing[f.name] ?? ""}
                onChange={(v) => updateField(f.name, v)}
              />
              {f.help ? (
                <span className="text-caption text-charcoal dark:text-mute">{f.help}</span>
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
              className="text-button-md inline-flex h-10 items-center justify-center rounded-full border border-hairline-strong bg-white px-lg text-charcoal hover:bg-surface hover:text-ink transition-colors duration-normal dark:bg-surface-dark dark:text-on-dark-mute dark:border-hairline dark:hover:bg-secondary dark:hover:text-on-primary"
            >
              Batal
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-sm">
        {items.length === 0 ? (
          <p className="text-body-sm text-charcoal bg-surface-card rounded-md p-xl border border-hairline">
            Belum ada data. Klik &quot;+ Tambah&quot; untuk membuat.
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
                    <p className="text-caption text-charcoal dark:text-on-dark-mute truncate">
                      {r.subtitle}
                    </p>
                  ) : null}
                </div>
                <div className="flex gap-xs shrink-0">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-button-sm inline-flex h-8 items-center justify-center rounded-md border border-hairline-strong bg-white px-md text-charcoal hover:bg-surface hover:text-ink transition-colors duration-normal dark:bg-surface-dark dark:text-on-dark-mute dark:border-hairline dark:hover:bg-secondary dark:hover:text-on-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-button-sm inline-flex h-8 items-center justify-center rounded-md border border-danger/20 bg-white px-md text-danger hover:bg-danger/5 transition-colors duration-normal dark:bg-surface-dark dark:text-primary dark:border-hairline dark:hover:bg-primary dark:hover:text-on-primary"
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