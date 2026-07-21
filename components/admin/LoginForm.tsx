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
      window.location.href = next;
    });
  }

  return (
    <div className="w-full max-w-[420px] sm:max-w-[440px] lg:max-w-[440px] mx-auto">
      {/* Card — mobile: centered compact; desktop: clean premium */}
      <div
        className="rounded-2xl p-7 sm:p-9 lg:p-10"
        style={{
          backgroundColor: "rgba(16, 24, 32, 0.95)",
          boxShadow:
            "0 32px 64px rgba(0,0,0,0.5), 0 12px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo & Title — centered on all breakpoints */}
        <div className="flex flex-col items-center gap-3 mb-7 lg:mb-8">
          <div
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            }}
          >
            <span className="text-base lg:text-lg font-extrabold text-white tracking-tight">
              TNT
            </span>
          </div>
          <div className="text-center">
            <h1 className="text-lg lg:text-xl font-bold text-white">
              Masuk ke TNT SPORT
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Kelola dashboard admin Anda
            </p>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-2.5 mb-5 lg:mb-6">
          {/* Google */}
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full py-2.5 lg:py-3 px-4 rounded-xl border border-gray-700/80 bg-gray-800/40 text-white text-sm font-medium hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Lanjutkan dengan Google
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full py-2.5 lg:py-3 px-4 rounded-xl border border-gray-700/80 bg-gray-800/40 text-white text-sm font-medium hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Lanjutkan dengan Facebook
          </button>

          {/* Apple */}
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full py-2.5 lg:py-3 px-4 rounded-xl border border-gray-700/80 bg-gray-800/40 text-white text-sm font-medium hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Lanjutkan dengan Apple
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-5 lg:mb-6">
          <div className="flex-1 h-px bg-gray-700/60" />
          <span className="text-[11px] text-gray-600 font-medium uppercase tracking-wider">
            atau
          </span>
          <div className="flex-1 h-px bg-gray-700/60" />
        </div>

        {/* Email/Password Form */}
        {!showEmailForm ? (
          <button
            type="button"
            onClick={() => setShowEmailForm(true)}
            className="w-full py-3 lg:py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg"
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
            Masuk dengan Password
          </button>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3.5 lg:gap-4">
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800/50 text-white rounded-xl pl-10 pr-4 py-2.5 lg:py-3 border border-gray-700/80 text-sm placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 transition-colors"
                placeholder="Email"
              />
            </div>

            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800/50 text-white rounded-xl pl-10 pr-11 py-2.5 lg:py-3 border border-gray-700/80 text-sm placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 transition-colors"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
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
              className="w-full py-3 lg:py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg disabled:opacity-50"
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
        <p className="text-xs text-gray-500 text-center mt-5 lg:mt-6">
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
