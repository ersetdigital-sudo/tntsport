import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main
      className="min-h-dvh flex items-center justify-center px-4 py-8 sm:px-6"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(34,197,94,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(22,163,74,0.25) 0%, transparent 50%), linear-gradient(135deg, #052e16 0%, #0a1a0f 30%, #071510 60%, #052e16 100%)",
      }}
    >
      <LoginForm />
    </main>
  );
}
