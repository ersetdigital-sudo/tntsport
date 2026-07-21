import type { Metadata } from "next";
import { SignupForm } from "@/components/admin/SignupForm";

export const metadata: Metadata = {
  title: "Daftar Admin",
  robots: { index: false, follow: false },
};

export default function AdminSignupPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-gradient-brand px-lg py-section">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </main>
  );
}
