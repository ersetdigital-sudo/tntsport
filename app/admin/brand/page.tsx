import { createClient } from "@/lib/supabase/server";
import { BrandEditor } from "@/components/admin/BrandEditor";

export const dynamic = "force-dynamic";

/**
 * /admin/brand — edit the single brand row (name, tagline, WhatsApp, etc).
 */
export default async function BrandAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("brand")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (!data) {
    return (
      <p className="text-body-md text-charcoal dark:text-on-dark-mute">
        Brand belum di-setup. Jalankan SQL migration dulu.
      </p>
    );
  }

  return <BrandEditor brand={data} />;
}