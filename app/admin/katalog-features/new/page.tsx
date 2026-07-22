import { KatalogFeatureEditor } from "@/components/admin/KatalogFeatureEditor";

export const dynamic = "force-dynamic";

export default function NewKatalogFeaturePage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-heading-md text-ink">Tambah Keunggulan</h2>
        <p className="text-body-sm text-charcoal mt-1">
          Tambah kartu keunggulan baru di section &quot;Kenapa TNT Sport?&quot;
        </p>
      </div>
      <KatalogFeatureEditor />
    </div>
  );
}
