import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh flex">
      {/* Desktop: Left branding panel (hidden on mobile/tablet) */}
      <div
        className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #030d07 0%, #071a0e 40%, #0a1f14 70%, #052e16 100%)",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Single soft glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-14 xl:px-20">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              }}
            >
              <span className="text-base font-extrabold text-white tracking-tight">
                TNT
              </span>
            </div>
            <div>
              <p className="text-[10px] text-green-500/50 uppercase tracking-[0.2em] font-semibold">
                Admin Panel
              </p>
              <h2 className="text-sm font-bold text-white/90">TNT SPORT</h2>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl xl:text-4xl font-bold text-white leading-snug mb-5">
            Admin Dashboard
            <br />
            <span className="text-white/40">TNT SPORT</span>
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Kelola produk, konten, dan performa toko jersey custom Anda
            dari satu tempat.
          </p>

          {/* Separator line */}
          <div className="w-12 h-px bg-green-500/30 mt-10 mb-8" />

          {/* Key points — compact */}
          <div className="flex flex-col gap-4">
            {[
              "Produk & katalog jersey",
              "Konten landing page",
              "Statistik & performa",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 shrink-0" />
                <span className="text-xs text-gray-500">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Login card (full on mobile, half on desktop) */}
      <div
        className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(34,197,94,0.30) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(22,163,74,0.20) 0%, transparent 50%), linear-gradient(135deg, #052e16 0%, #0a1a0f 30%, #071510 60%, #052e16 100%)",
        }}
      >
        <LoginForm />
      </div>
    </main>
  );
}
