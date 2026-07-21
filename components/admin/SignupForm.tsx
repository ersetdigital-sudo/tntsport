"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }

    if (!agreed) {
      setError("Anda harus menyetujui Syarat & Ketentuan.");
      return;
    }

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });
      if (error) {
        setError(error.message);
        return;
      }
      router.push("/admin/login");
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
            <h1 className="text-xl font-bold text-white">Buat Akun Baru</h1>
            <p className="text-sm text-gray-400 mt-1">
              Daftar untuk mengelola TNT SPORT
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800/60 text-white rounded-xl pl-10 pr-4 py-3 border border-gray-700 text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
              placeholder="Nama lengkap"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800/60 text-white rounded-xl pl-10 pr-11 py-3 border border-gray-700 text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
              placeholder="Min. 8 karakter"
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type={showConfirm ? "text" : "password"}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-800/60 text-white rounded-xl pl-10 pr-11 py-3 border border-gray-700 text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
              placeholder="Ulangi password"
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer px-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 accent-green-500"
            />
            <span className="text-xs text-gray-400">
              Saya setuju dengan{" "}
              <span className="text-green-400 font-medium hover:text-green-300 transition-colors">
                Syarat & Ketentuan
              </span>
            </span>
          </label>

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
            {pending ? "Membuat Akun…" : "Buat Akun"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Sudah punya akun?{" "}
          <Link
            href="/admin/login"
            className="text-green-400 font-semibold hover:text-green-300 transition-colors"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
