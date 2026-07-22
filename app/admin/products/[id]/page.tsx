import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { ProductEditor } from "@/components/admin/ProductEditor";
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

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!supabaseConfigured()) {
    return <ErrorState title="Supabase Belum Dikonfigurasi" desc="Set environment variables di .env.local" />;
  }

  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  const { data: categories = [] } = await supabase
    .from("product_categories")
    .select("id, name")
    .order("sort_order");

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-heading-md text-ink">Edit Produk</h2>
        <p className="text-body-sm text-charcoal mt-1">
          Edit data produk dan kelola foto jersey.
        </p>
      </div>
      <ProductEditor product={product} categories={categories} />
    </div>
  );
}
