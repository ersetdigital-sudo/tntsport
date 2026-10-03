"use client";

/**
 * Shell dashboard bersama (sidebar + topbar + drawer mobile) — dipakai
 * halaman yang bukan dashboard tabel (Kalkulator HPP) supaya tampil sama
 * persis dengan Pesanan/Maklon.
 *
 * Menu di sidebar ini pindah HALAMAN (bukan ganti tab), sama seperti tautan
 * Maklon di PesananDashboard: Link + prefetch supaya kerangka halaman
 * (loading.tsx) tampil seketika begitu diklik.
 */
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

type ActiveKey = "pesanan" | "maklon" | "hpp";

function NavIcon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    pesanan: (
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
    ),
    maklon: (
      <>
        <path d="M20 7l-8-4-8 4v10l8 4 8-4V7z" />
        <path d="M4 7l8 4 8-4M12 11v10" />
      </>
    ),
    jadwal: (
      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
    kirim: (
      <>
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
    customer: (
      <>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    laporan: <path d="M18 20V10M12 20V4M6 20v-6" />,
    hpp: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8M8 11h2m3 0h3M8 16h2m3 0h3" />
      </>
    ),
    setting: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 008.6 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </>
    ),
    notif: (
      <>
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <path d="M16 17l5-5-5-5M21 12H9" />
      </>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || null}
    </svg>
  );
}

export default function DashboardShell({
  active,
  crumb = "Operasional",
  title,
  actions,
  children,
}: {
  /** Menu yang sedang aktif (dapat kelas `on`). */
  active: ActiveKey;
  crumb?: string;
  /** Judul di topbar. */
  title: string;
  /** Aksi tambahan di kanan topbar (mis. tombol "Edit Harga"). */
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/pesanan/auth", { method: "DELETE" });
    window.location.href = "/pesanan/login";
  };

  const navClass = (key: ActiveKey) =>
    `pas-navlink${active === key ? " on" : ""}`;

  const sideNav = (
    <>
      <p className="pas-navsec">Operasional</p>
      <nav className="flex flex-col gap-1">
        <Link className={navClass("pesanan")} href="/pesanan/orders" prefetch>
          <span className="pas-ic"><NavIcon name="pesanan" /></span> Pesanan
        </Link>
        <Link className={navClass("maklon")} href="/pesanan/maklon" prefetch>
          <span className="pas-ic"><NavIcon name="maklon" /></span> Maklon
        </Link>
        <Link className={navClass("hpp")} href="/pesanan/hpp" prefetch>
          <span className="pas-ic"><NavIcon name="hpp" /></span> Kalkulator HPP
        </Link>
        <Link className="pas-navlink" href="/pesanan/orders#jadwal" prefetch>
          <span className="pas-ic"><NavIcon name="jadwal" /></span> Jadwal Produksi
        </Link>
        <Link className="pas-navlink" href="/pesanan/orders#kirim" prefetch>
          <span className="pas-ic"><NavIcon name="kirim" /></span> Pengiriman
        </Link>
      </nav>
      <p className="pas-navsec">Data</p>
      <nav className="flex flex-col gap-1">
        <Link className="pas-navlink" href="/pesanan/orders#customer" prefetch>
          <span className="pas-ic"><NavIcon name="customer" /></span> Customer
        </Link>
        <Link className="pas-navlink" href="/pesanan/orders#laporan" prefetch>
          <span className="pas-ic"><NavIcon name="laporan" /></span> Laporan
        </Link>
        <Link className="pas-navlink" href="/pesanan/orders#notif" prefetch>
          <span className="pas-ic"><NavIcon name="notif" /></span> Notifikasi
        </Link>
        <Link className="pas-navlink" href="/pesanan/orders#setting" prefetch>
          <span className="pas-ic"><NavIcon name="setting" /></span> Pengaturan
        </Link>
      </nav>
    </>
  );

  return (
    <div className="pas-shell">
      <aside className="pas-side">
        <a href="/" className="flex items-center gap-3 px-2 pb-5">
          <img src="/logo-tnt-baru.png" alt="TNT Sport" className="pas-mark w-14 h-14 rounded-[10px] object-contain" />
          <span className="leading-none">
            <span className="block pas-display text-[15px] !text-white">TNT Sport</span>
            <span className="block text-[11px] !text-white/70 mt-[3px]">Admin Panel</span>
          </span>
        </a>
        {sideNav}
        <div className="mt-auto rounded-xl p-3 flex items-center gap-3 bg-white/10 border border-white/10">
          <span className="pas-avatar">AD</span>
          <span className="leading-tight">
            <span className="block text-[13.5px] font-semibold text-white">Admin TNT</span>
            <span className="block text-[11.5px] text-white/65">admin@tntsport.id</span>
          </span>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="pas-topbar">
          <div className="px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
            {/* Logo tidak dipasang di topbar mobile — branding hidup di drawer. */}
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                className="lg:hidden -ml-1.5 shrink-0 p-2.5 rounded-lg border border-[var(--pas-line)] text-[var(--pas-muted)] hover:text-[var(--pas-ink-1)] hover:bg-[var(--pas-surface-2)] transition"
                onClick={() => setShowMobileNav(true)}
                aria-label="Buka menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="min-w-0">
                <p className="text-[11px] text-[var(--pas-muted)] leading-none truncate">{crumb}</p>
                <h1 className="pas-display text-[17px] leading-tight mt-1 truncate">{title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden lg:inline text-[12.5px] text-[var(--pas-muted)]">
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              {actions}
            </div>
          </div>
        </header>

        <main className="px-5 sm:px-8 py-7 sm:py-9 w-full">{children}</main>
      </div>

      {/* ── MOBILE NAV DRAWER ── */}
      <Sheet open={showMobileNav} onOpenChange={setShowMobileNav}>
        <SheetContent
          side="left"
          className="p-5 bg-[#04123F] text-white border-r border-white/10 w-[280px] overflow-y-auto [&>button]:text-white/50 [&>button]:hover:text-white [&>button]:hover:bg-white/10 [&>button]:rounded-lg [&>button]:p-2 [&>button]:transition"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex items-center mb-2">
            <a href="/" className="flex items-center gap-2.5">
              <img src="/logo-tnt-baru.png" alt="TNT Sport" className="w-12 h-12 rounded-[10px] object-contain" />
              <span className="block pas-display text-[15px] !text-white">TNT Sport</span>
            </a>
          </div>
          <div onClick={() => setShowMobileNav(false)}>{sideNav}</div>
          <button
            type="button"
            onClick={handleLogout}
            className="pas-navlink mt-5 w-full text-left"
          >
            <span className="pas-ic"><NavIcon name="logout" /></span> Keluar
          </button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
