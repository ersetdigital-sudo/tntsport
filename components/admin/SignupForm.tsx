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
    <form onSubmit={onSubmit} className="flex flex-col gap-lg w-full">
      {/* Name */}
      <label className="flex flex-col gap-xs">
        <span className="text-button-sm text-on-dark-mute uppercase tracking-wider">
          Nama Lengkap
        </span>
        <div className="relative">
          <User
            size={16}
            className="absolute left-md top-1/2 -translate-y-1/2 text-stone"
          />
          <input
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-surface-dark text-on-dark rounded-xs pl-xl pr-md py-sm border border-hairline focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            placeholder="Nama lengkap"
          />
        </div>
      </label>

      {/* Email */}
      <label className="flex flex-col gap-xs">
        <span className="text-button-sm text-on-dark-mute uppercase tracking-wider">
          Email
        </span>
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-md top-1/2 -translate-y-1/2 text-stone"
          />
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface-dark text-on-dark rounded-xs pl-xl pr-md py-sm border border-hairline focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            placeholder="admin@tnt-sport.com"
          />
        </div>
      </label>

      {/* Password */}
      <label className="flex flex-col gap-xs">
        <span className="text-button-sm text-on-dark-mute uppercase tracking-wider">
          Password
        </span>
        <div className="relative">
          <Lock
            size={16}
            className="absolute left-md top-1/2 -translate-y-1/2 text-stone"
          />
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-dark text-on-dark rounded-xs pl-xl pr-xxl py-sm border border-hairline focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            placeholder="Min. 8 karakter"
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-md top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </label>

      {/* Confirm Password */}
      <label className="flex flex-col gap-xs">
        <span className="text-button-sm text-on-dark-mute uppercase tracking-wider">
          Konfirmasi Password
        </span>
        <div className="relative">
          <Lock
            size={16}
            className="absolute left-md top-1/2 -translate-y-1/2 text-stone"
          />
          <input
            type={showConfirm ? "text" : "password"}
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-surface-dark text-on-dark rounded-xs pl-xl pr-xxl py-sm border border-hairline focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            placeholder="Ulangi password"
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-md top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors"
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </label>

      {/* Terms checkbox */}
      <label className="flex items-start gap-sm cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-xxs h-4 w-4 rounded border-hairline accent-primary"
        />
        <span className="text-caption text-on-dark-mute">
          Saya setuju dengan{" "}
          <span className="text-secondary font-medium cursor-pointer hover:underline">
            Syarat & Ketentuan
          </span>
        </span>
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
        {pending ? "Membuat Akun…" : "Buat Akun"}
      </button>

      <p className="text-caption text-on-dark-mute text-center">
        Sudah punya akun?{" "}
        <Link
          href="/admin/login"
          className="text-secondary font-medium hover:underline"
        >
          Masuk
        </Link>
      </p>
    </form>
  );
}
