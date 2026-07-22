import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { KatalogFeatureEditor } from "@/components/admin/KatalogFeatureEditor";
import { ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function ErrorState({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-xxl px-xl text-center">
      <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center mb-lg">
        <ShieldCheck size={28} className="text-warning" />
      </div>
      <h2 className="text-heading-md text-ink mb-sm">{title}</h2>
      <p className="text-body-sm text-charcoal max-w-md">{desc}</p>
    </div>
  );
}

export default async function EditKatalogFeaturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!supabaseConfigured()) {
    return <ErrorState title="Supabase Belum Dikonfigurasi" desc="Set environment variables di .env.local" />;
  }

  const supabase = await createClient();
  const { data: feature, error } = await supabase
    .from("katalog_features")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !feature) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-heading-md text-ink">Edit Keunggulan</h2>
        <p className="text-body-sm text-charcoal mt-1">
          Edit kartu keunggulan di section &quot;Kenapa TNT Sport?&quot;
        </p>
      </div>
      <KatalogFeatureEditor feature={feature} />
    </div>
  );
}
