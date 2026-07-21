import type { Metadata } from "next";
import { SignupForm } from "@/components/admin/SignupForm";

export const metadata: Metadata = {
  title: "Daftar Admin",
  robots: { index: false, follow: false },
};

export default function AdminSignupPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-gradient-brand px-lg py-section">
      <div className="w-full max-w-sm bg-surface-card rounded-xl p-xxl border border-hairline shadow-premium-xl">
        <h1 className="text-heading-lg text-ink text-center mb-xs">
          Buat Akun Admin
        </h1>
        <p className="text-body-sm text-on-dark-mute text-center mb-xxl">
          Daftar untuk mengelola TNT SPORT
        </p>
        <SignupForm />
      </div>
    </main>
  );
}
