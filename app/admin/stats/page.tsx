import { createClient } from "@/lib/supabase/server";
import { CrudManager, type Field } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { name: "value", label: "Value", type: "text", required: true, placeholder: "350K+" },
  { name: "label", label: "Label", type: "text", required: true, placeholder: "Order Selesai" },
  { name: "icon", label: "Icon", type: "icon" },
  { name: "sort_order", label: "Urutan", type: "number", default: 1 },
];

/**
 * /admin/stats — CRUD for the 4 stat cards on the landing page.
 */
export default async function StatsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("stats")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <CrudManager
      table="stats"
      title="Stats"
      description="4 kartu statistik di landing page (Order Selesai, Rating, dll)."
      fields={fields}
      items={data ?? []}
      renderItem={(item) => ({
        title: `${item.value} — ${item.label}`,
        subtitle: item.icon ? `Icon: ${item.icon}` : "Tanpa icon",
      })}
    />
  );
}