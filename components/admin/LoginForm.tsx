"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
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
      router.refresh();
      router.replace(next);
    });
  }

  return (
    <div className="w-full max-w-[460px] mx-auto">
      {/* Card */}
      <div
        className="rounded-2xl p-8 sm:p-10"
        style={{
          backgroundColor: "rgba(16, 24, 32, 0.92)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            }}
          >
            <span className="text-lg font-extrabold text-white tracking-tight">
              TNT
            </span>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">
              Masuk ke TNT SPORT
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Kelola dashboard admin Anda
            </p>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl border border-gray-700 bg-gray-800/50 text-white text-sm font-medium hover:bg-gray-700/60 hover:border-gray-600 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Lanjutkan dengan Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl border border-gray-700 bg-gray-800/50 text-white text-sm font-medium hover:bg-gray-700/60 hover:border-gray-600 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Lanjutkan dengan Facebook
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl border border-gray-700 bg-gray-800/50 text-white text-sm font-medium hover:bg-gray-700/60 hover:border-gray-600 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Lanjutkan dengan Apple
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-xs text-gray-500 font-medium">atau</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Email/Password Form */}
        {!showEmailForm ? (
          <button
            type="button"
            onClick={() => setShowEmailForm(true)}
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "white",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(135deg, #16a34a 0%, #15803d 100%)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)")
            }
          >
            Masuk dengan Password
          </button>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800/60 text-white rounded-xl pl-10 pr-4 py-3 border border-gray-700 text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
                placeholder="Email"
              />
            </div>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800/60 text-white rounded-xl pl-10 pr-11 py-3 border border-gray-700 text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error ? (
              <p
                role="alert"
                className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg, #16a34a 0%, #15803d 100%)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)")
              }
            >
              {pending ? "Masuk…" : "Masuk"}
            </button>
          </form>
        )}

        {/* Sign up link */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Belum punya akun?{" "}
          <Link
            href="/admin/signup"
            className="text-green-400 font-semibold hover:text-green-300 transition-colors"
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
