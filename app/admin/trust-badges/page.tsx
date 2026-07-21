import { createClient } from "@/lib/supabase/server";
import { CrudManager, type Field } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { name: "label", label: "Label", type: "text", required: true, placeholder: "Bahan Premium" },
  { name: "subtext", label: "Subtext", type: "text", placeholder: "Kualitas terbaik" },
  { name: "icon", label: "Icon", type: "icon" },
  {
    name: "variant",
    label: "Warna",
    type: "select",
    required: true,
    default: "neutral",
    options: [
      { value: "neutral", label: "Neutral" },
      { value: "filled", label: "Filled" },
      { value: "success", label: "Success (hijau)" },
      { value: "warning", label: "Warning (kuning)" },
      { value: "info", label: "Info (biru)" },
    ],
  },
  { name: "sort_order", label: "Urutan", type: "number", default: 1 },
];

/**
 * /admin/trust-badges — CRUD for the trust badge grid on the landing page.
 */
export default async function TrustBadgesAdminPage() {
  const supabase = await createClient();

  let items: Record<string, any>[] = [];
  try {
    const { data, error } = await supabase
      .from("trust_badges")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("trust_badges query error:", error.message);
    } else {
      items = data ?? [];
    }
  } catch (err) {
    console.error("trust_badges fetch failed:", err);
  }

  return (
    <CrudManager
      table="trust_badges"
      title="Trust Badges"
      description="Grid keunggulan di landing page (Bahan Premium, Desain Bebas, Harga Pabrik, dll)."
      fields={fields}
      items={items}
      renderItem={(item) => ({
        title: `${item.label} — ${item.variant}`,
        subtitle: item.subtext ?? "Tanpa subtext",
      })}
    />
  );
}