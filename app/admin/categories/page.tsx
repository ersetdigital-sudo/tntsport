import { ComingSoon } from "@/components/admin/ComingSoon";

export const dynamic = "force-dynamic";

export default function CategoriesAdminPage() {
  return (
    <ComingSoon
      title="Kategori Produk"
      phase="Phase 6"
      description="CRUD untuk kategori produk dengan support multi-level (parent/child). Tree view untuk organisasi kategori jersey (Futsal, Bola, Training, dst)."
    />
  );
}
