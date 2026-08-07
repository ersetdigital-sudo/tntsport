import { FabricEditor } from "@/components/admin/FabricEditor";

export const dynamic = "force-dynamic";

export default function NewFabricPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-heading-md text-ink">Tambah Bahan Kain</h2>
        <p className="text-body-sm text-charcoal mt-1">
          Tambah pilihan bahan baru di section &quot;Pilih bahannya&quot;
        </p>
      </div>
      <FabricEditor />
    </div>
  );
}
