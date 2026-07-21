import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

/**
 * Admin layout — guards every /admin/* route (except /admin/login,
 * which has its own layout-free page).
 *
 * The middleware already redirects unauthenticated visitors to the
 * login page, but we double-check here on the server: middleware runs
 * on the edge and might not have refreshed the session yet, while this
 * layout runs in the Node runtime where getUser() is authoritative.
 *
 * If the user is signed in, we pass their email to the header and
 * render the sidebar + content shell.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";

  // Skip auth guard for public auth pages — otherwise we get an
  // infinite redirect loop (login page → redirect to login → ...).
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/signup";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isAuthPage) {
    redirect("/admin/login");
  }

  // On auth pages, render children without the admin shell.
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="flex min-h-dvh">
        {/* Sidebar — fixed full-height rail on desktop, horizontal on mobile */}
        <aside className="md:w-64 md:shrink-0 md:border-r md:border-hairline bg-surface-card">
          <AdminSidebar email={user?.email} />
        </aside>

        {/* Main content — header + scrollable page body */}
        <div className="flex-1 min-w-0 flex flex-col">
          <AdminHeader title="Admin" email={user?.email} />
          <main className="flex-1 overflow-y-auto p-lg md:p-xxl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}