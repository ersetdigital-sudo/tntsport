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
    <div className="flex flex-col items-center gap-xl w-full">
      {/* Logo & Title */}
      <div className="flex flex-col items-center gap-md mb-md">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            TNT
          </span>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Buat Akun Baru</h1>
          <p className="text-sm text-white/70 mt-xs">
            Daftar untuk mengelola TNT SPORT
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-md w-full">
        {/* Name */}
        <div className="relative">
          <User
            size={16}
            className="absolute left-md top-1/2 -translate-y-1/2 text-white/50"
          />
          <input
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm text-white rounded-xl pl-xl pr-md py-3.5 border border-white/20 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            placeholder="Nama lengkap"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-md top-1/2 -translate-y-1/2 text-white/50"
          />
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm text-white rounded-xl pl-xl pr-md py-3.5 border border-white/20 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            placeholder="Email"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock
            size={16}
            className="absolute left-md top-1/2 -translate-y-1/2 text-white/50"
          />
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm text-white rounded-xl pl-xl pr-xxl py-3.5 border border-white/20 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            placeholder="Min. 8 karakter"
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-md top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Lock
            size={16}
            className="absolute left-md top-1/2 -translate-y-1/2 text-white/50"
          />
          <input
            type={showConfirm ? "text" : "password"}
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm text-white rounded-xl pl-xl pr-xxl py-3.5 border border-white/20 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            placeholder="Ulangi password"
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-md top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Terms checkbox */}
        <label className="flex items-start gap-sm cursor-pointer px-xs">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-xxs h-4 w-4 rounded border-white/30 accent-white"
          />
          <span className="text-xs text-white/60">
            Saya setuju dengan{" "}
            <span className="text-white font-medium hover:underline">
              Syarat & Ketentuan
            </span>
          </span>
        </label>

        {error ? (
          <p
            role="alert"
            className="text-xs text-red-300 bg-red-500/20 border border-red-500/30 rounded-lg px-md py-sm"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3.5 px-lg rounded-full bg-white text-green-700 text-sm font-bold hover:bg-white/90 transition-colors shadow-lg disabled:opacity-50"
        >
          {pending ? "Membuat Akun…" : "Buat Akun"}
        </button>
      </form>

      {/* Login link */}
      <p className="text-sm text-white/60">
        Sudah punya akun?{" "}
        <Link
          href="/admin/login"
          className="text-white font-semibold hover:underline"
        >
          Masuk
        </Link>
      </p>
    </div>
  );
}
