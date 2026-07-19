import { ComingSoon } from "@/components/admin/ComingSoon";

export const dynamic = "force-dynamic";

export default function BrandAdminPage() {
  return (
    <ComingSoon
      title="Brand Identity"
      phase="Phase 5"
      description="Form untuk edit nama brand, tagline, nomor WhatsApp, URL situs, dan logo. Saat ini masih memakai data seed dari migration SQL."
    />
  );
}
