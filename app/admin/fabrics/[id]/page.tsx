import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { FabricEditor } from "@/components/admin/FabricEditor";
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

export default async function EditFabricPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!supabaseConfigured()) {
    return <ErrorState title="Supabase Belum Dikonfigurasi" desc="Set environment variables di .env.local" />;
  }

  const supabase = await createClient();
  const { data: fabric, error } = await supabase
    .from("fabrics")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !fabric) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-heading-md text-ink">Edit Bahan Kain</h2>
        <p className="text-body-sm text-charcoal mt-1">
          Edit detail bahan, ganti foto, atau ubah urutan tampil
        </p>
      </div>
      <FabricEditor fabric={fabric} />
    </div>
  );
}
