import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh flex">
      {/* Desktop: Left branding panel (hidden on mobile) */}
      <div
        className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(34,197,94,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(22,163,74,0.15) 0%, transparent 50%), linear-gradient(160deg, #041f10 0%, #071a0e 40%, #0a1f14 70%, #052e16 100%)",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial glow accents */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 max-w-xl">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              }}
            >
              <span className="text-xl font-extrabold text-white tracking-tight">
                TNT
              </span>
            </div>
            <div>
              <p className="text-xs text-green-400/60 uppercase tracking-widest font-medium">
                Admin Panel
              </p>
              <h2 className="text-lg font-bold text-white">TNT SPORT</h2>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
            Kelola Bisnis
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)",
              }}
            >
              Dari Satu Tempat
            </span>
          </h1>

          <p className="text-base text-gray-400 leading-relaxed mb-10 max-w-md">
            Dashboard admin TNT SPORT — kelola produk, konten landing page, dan
            pantau performa bisnis jersey custom Anda dalam satu platform.
          </p>

          {/* Value points */}
          <div className="flex flex-col gap-5">
            {[
              {
                icon: "📦",
                title: "Kelola Produk & Katalog",
                desc: "Tambah, edit, dan atur stok jersey dengan mudah",
              },
              {
                icon: "📊",
                title: "Pantau Performa",
                desc: "Lihat statistik penjualan dan metrik bisnis real-time",
              },
              {
                icon: "🎨",
                title: "Konten Landing Page",
                desc: "Atur banner, testimoni, CTA, dan promo dari satu tempat",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
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
            "radial-gradient(ellipse at 30% 20%, rgba(34,197,94,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(22,163,74,0.25) 0%, transparent 50%), linear-gradient(135deg, #052e16 0%, #0a1a0f 30%, #071510 60%, #052e16 100%)",
        }}
      >
        <LoginForm />
      </div>
    </main>
  );
}
