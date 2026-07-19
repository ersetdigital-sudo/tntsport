import { ComingSoon } from "@/components/admin/ComingSoon";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <ComingSoon
      title="Tambah Produk Baru"
      phase="Phase 6"
      description="Form create produk: nama, slug, deskripsi, harga, kategori, stok status, featured, multiple images, dan varian ukuran dengan stock & price delta."
    />
  );
}
