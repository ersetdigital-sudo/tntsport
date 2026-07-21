import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-gradient-brand px-lg py-section">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}
