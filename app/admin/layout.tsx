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

  // Skip auth guard for the login page itself — otherwise we get an
  // infinite redirect loop (login page → redirect to login → ...).
  const isLoginPage = pathname === "/admin/login";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLoginPage) {
    redirect("/admin/login");
  }

  // On the login page, render children without the admin shell.
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto flex max-w-[1440px] flex-col md:flex-row px-lg md:px-xxl">
        <aside className="py-lg md:py-xl md:pr-xl">
          <AdminSidebar />
        </aside>

        <div className="flex-1 min-w-0 py-lg md:py-xl">
          <AdminHeader title="Admin" email={user?.email} />
          <div className="mt-xl">{children}</div>
        </div>
      </div>
    </div>
  );
}