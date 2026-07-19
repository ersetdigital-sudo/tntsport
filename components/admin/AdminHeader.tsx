"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * AdminHeader — top bar with the page title and a sign-out button.
 *
 * Logout calls Supabase Auth then refreshes so middleware clears the
 * session cookie and redirects to /admin/login.
 */
export function AdminHeader({
  title,
  email,
}: {
  title: string;
  email?: string | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function signOut() {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.refresh();
      router.replace("/admin/login");
    });
  }

  return (
    <header className="flex items-center justify-between gap-lg border-b border-hairline py-lg">
      <h1 className="text-heading-md text-ink">{title}</h1>
      <div className="flex items-center gap-md">
        {email ? (
          <span className="text-caption text-on-dark-mute hidden sm:inline">
            {email}
          </span>
        ) : null}
        <button
          type="button"
          onClick={signOut}
          disabled={pending}
          className="text-button-md inline-flex h-9 items-center justify-center rounded-full bg-surface-dark px-md text-on-dark-mute hover:bg-secondary hover:text-on-primary transition-colors duration-normal disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
        >
          {pending ? "Keluar…" : "Keluar"}
        </button>
      </div>
    </header>
  );
}
