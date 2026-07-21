import { createClient } from "@/lib/supabase/server";
import { CrudManager, type Field } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: Field[] = [
  { name: "label", label: "Label", type: "text", required: true, placeholder: "WhatsApp" },
  { name: "href", label: "Link URL", type: "text", required: true, placeholder: "https://wa.me/..." },
  { name: "icon", label: "Icon", type: "icon", required: true },
  { name: "aria_label", label: "Aria Label (a11y)", type: "text", required: true, placeholder: "TNT SPORT di WhatsApp" },
  { name: "sort_order", label: "Urutan", type: "number", default: 1 },
];

/**
 * /admin/social-links — CRUD for the 5-icon social media grid.
 */
export default async function SocialLinksAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <CrudManager
      table="social_links"
      title="Social Links"
      description="Grid 5 icon social media di landing page (WhatsApp, Instagram, TikTok, Facebook, Maps)."
      fields={fields}
      items={data ?? []}
      renderItem={(item) => ({
        title: `${item.label} — ${item.href}`,
        subtitle: `Icon: ${item.icon}`,
      })}
    />
  );
}