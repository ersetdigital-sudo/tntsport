import { TestimonialEditor } from "@/components/admin/TestimonialEditor";

export const dynamic = "force-dynamic";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-heading-md text-ink">Tambah Testimoni</h2>
        <p className="text-body-sm text-charcoal mt-1">
          Tambah testimoni pelanggan baru untuk halaman katalog.
        </p>
      </div>
      <TestimonialEditor />
    </div>
  );
}
