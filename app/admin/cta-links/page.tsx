import { createClient } from "@/lib/supabase/server";
import { CrudManager, type Field } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { name: "title", label: "Title", type: "text", required: true, placeholder: "Chat WhatsApp" },
  { name: "description", label: "Description", type: "text", required: true, placeholder: "Gratis konsultasi..." },
  { name: "href", label: "Link URL", type: "text", placeholder: "https://wa.me/..." },
  {
    name: "accent",
    label: "Warna",
    type: "select",
    required: true,
    default: "neutral",
    options: [
      { value: "whatsapp", label: "WhatsApp (hijau)" },
      { value: "primary", label: "Primary (hijau brand)" },
      { value: "warning", label: "Warning (kuning)" },
      { value: "neutral", label: "Neutral (abu)" },
    ],
  },
  { name: "icon", label: "Icon", type: "icon" },
  { name: "sort_order", label: "Urutan", type: "number", default: 1 },
];

export default async function CTALinksAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("cta_links")
    .select("*")
    .order("sort_order", { ascending: true });

  const items = (data ?? []).map((item) => ({
    ...item,
    _title: item.title,
    _subtitle: `${item.accent} · ${item.href ?? "no link"}`,
  }));

  return (
    <CrudManager
      table="cta_links"
      title="CTA Links"
      description="Tombol CTA di landing page (Chat WhatsApp, Katalog, Promo, dll)."
      fields={fields}
      items={items}
      titleField="_title"
      subtitleField="_subtitle"
    />
  );
}
