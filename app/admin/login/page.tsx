
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
 *
 * Visual design follows the NeedMCP "signup-1" wireframe: a centered
 * registration-style card on a gradient background, with title,
 * icon-prefixed inputs, primary CTA, divider, and social login options.
 */
export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-gradient-brand px-lg py-section">
      <div className="w-full max-w-sm bg-surface-card rounded-xl p-xxl border border-hairline shadow-premium-xl">
        <h1 className="text-heading-lg text-ink text-center mb-xs">
          Welcome Back
        </h1>
        <p className="text-body-sm text-on-dark-mute text-center mb-xxl">
          Masuk ke dashboard admin TNT SPORT
        </p>
        <LoginForm />
      </div>
    </main>
  );
}