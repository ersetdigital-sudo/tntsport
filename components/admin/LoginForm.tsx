"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * LoginForm — email + password sign-in via Supabase Auth.
 *
 * On success, redirects to the `next` search param (or `/admin`).
 * Errors from Supabase (invalid credentials, etc.) are surfaced inline
 * under the form. Uses `useTransition` so the submit button shows a
 * pending state without blocking the UI.
 */
export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      // Refresh server data (middleware will set the session cookie) and
      // navigate to the protected destination.
      router.refresh();
      router.replace(next);
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-lg w-full">
      <label className="flex flex-col gap-xs">
        <span className="text-button-sm text-on-dark-mute uppercase tracking-wider">
          Email
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-surface-dark text-on-dark rounded-xs px-md py-sm border border-hairline focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
          placeholder="admin@tccjersey.id"
        />
      </label>

      <label className="flex flex-col gap-xs">
        <span className="text-button-sm text-on-dark-mute uppercase tracking-wider">
          Password
        </span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-surface-dark text-on-dark rounded-xs px-md py-sm border border-hairline focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
          placeholder="••••••••"
        />
      </label>

      {error ? (
        <p
          role="alert"
          className="text-caption text-primary border border-primary bg-surface-card rounded-md px-md py-sm"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="text-button-md inline-flex h-11 items-center justify-center rounded-full bg-primary px-lg text-on-primary hover:bg-secondary transition-colors duration-normal disabled:opacity-40 disabled:hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
      >
        {pending ? "Masuk…" : "Masuk"}
      </button>
    </form>
  );
}
