import { createClient } from "@/lib/supabase/server";
import { CrudManager, type Field } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { name: "value", label: "Value", type: "text", required: true, placeholder: "350K+" },
  { name: "label", label: "Label", type: "text", required: true, placeholder: "Order Selesai" },
  { name: "icon", label: "Icon", type: "icon" },
  { name: "sort_order", label: "Urutan", type: "number", default: 1 },
];

export default async function StatsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("stats")
    .select("*")
    .order("sort_order", { ascending: true });

  const items = (data ?? []).map((item) => ({
    ...item,
    _title: `${item.value} — ${item.label}`,
    _subtitle: item.icon ? `Icon: ${item.icon}` : "Tanpa icon",
  }));

  return (
    <CrudManager
      table="stats"
      title="Stats"
      description="4 kartu statistik di landing page (Order Selesai, Rating, dll)."
      fields={fields}
      items={items}
      titleField="_title"
      subtitleField="_subtitle"
    />
  );
}
