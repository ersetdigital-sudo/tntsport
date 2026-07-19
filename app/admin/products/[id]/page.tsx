import { ComingSoon } from "@/components/admin/ComingSoon";

export const dynamic = "force-dynamic";

export default function EditProductPage() {
  return (
    <ComingSoon
      title="Edit Produk"
      phase="Phase 6"
      description="Form edit produk existing: update field dasar, tambah/hapus varian ukuran, dan manage multiple gambar via Supabase Storage."
    />
  );
}
