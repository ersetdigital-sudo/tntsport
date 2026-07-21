import { createClient } from "@/lib/supabase/server";
import { CrudManager, type Field } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  {
    name: "rating",
    label: "Rating (1-5)",
    type: "number",
    required: true,
    default: 5,
  },
  { name: "quote", label: "Ulasan", type: "textarea", required: true, placeholder: "Hasil printingnya rapi banget..." },
  { name: "name", label: "Nama Customer", type: "text", required: true, placeholder: "Dimas Pratama" },
  { name: "identity", label: "Role / Komunitas", type: "text", placeholder: "Kapten Tim Futsal" },
  { name: "location", label: "Lokasi", type: "text", required: true, placeholder: "Jakarta" },
  { name: "sort_order", label: "Urutan", type: "number", default: 1 },
];

/**
 * /admin/reviews — CRUD for customer testimonials.
 */
export default async function ReviewsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <CrudManager
      table="reviews"
      title="Reviews"
      description="Testimoni pelanggan di landing page. Rating, ulasan, nama, role, lokasi."
      fields={fields}
      items={data ?? []}
      renderItem={(item) => ({
        title: `${item.name} — ⭐${item.rating}`,
        subtitle: `${item.identity ? item.identity + " · " : ""}${item.location}`,
      })}
    />
  );
}