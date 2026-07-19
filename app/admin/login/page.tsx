import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

/**
 * /admin/login — the only public route under /admin.
 *
 * Authenticated users are auto-redirected to /admin by the middleware,
 * so reaching this page means the visitor is not yet signed in. The
 * page is a Server Component that renders the client <LoginForm/>.
 */
export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-background px-lg py-section">
      <div className="w-full max-w-sm bg-surface-card rounded-md p-xxl border border-hairline">
        <h1 className="text-heading-md text-ink mb-xs">Admin Login</h1>
        <p className="text-body-sm text-on-dark-mute mb-xl">
          Masuk untuk mengelola konten landing & katalog TCC Jersey.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
