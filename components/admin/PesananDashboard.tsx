"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type StepRow = { id: string; name: string; position: number };

const DEFAULT_STEPS: StepRow[] = [
  { id: "", name: "Desain", position: 1 },
  { id: "", name: "Layout", position: 2 },
  { id: "", name: "Print", position: 3 },
  { id: "", name: "Pres", position: 4 },
  { id: "", name: "Potong", position: 5 },
  { id: "", name: "Jahit", position: 6 },
  { id: "", name: "Finishing", position: 7 },
  { id: "", name: "Packing", position: 8 },
  { id: "", name: "Kirim", position: 9 },
];

const STEP_PROGRESS: Record<number, number> = {
  1: 11, 2: 22, 3: 33, 4: 44, 5: 56, 6: 67, 7: 78, 8: 89, 9: 95,
};

function getStepPct(step: number, hasTracking: boolean): number {
  if (step === 9 && hasTracking) return 100;
  return STEP_PROGRESS[step] ?? 0;
}

const LANES = [
  { name: "Desain & Layout", from: 1, to: 2 },
  { name: "Produksi", from: 3, to: 6 },
  { name: "Finishing & Packing", from: 7, to: 8 },
  { name: "Kirim", from: 9, to: 9 },
];

type OrderData = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  product_name: string;
  quantity: string;
  material: string;
  sizes: string;
  products?: { name: string; sizes: { size: string; qty: number }[] }[];
  design_photos?: string[];
  wo_photos?: string[];
  current_step: number;
  note: string;
  note_time: string;
  courier: string;
  tracking_number: string;
  is_done: boolean;
  deadline: string | null;
  created_at: string;
  pct: number;
};

type FilterKey = "all" | "baru" | "produksi" | "kirim" | "selesai";
type ViewKey = "pesanan" | "jadwal" | "kirim" | "customer" | "laporan" | "setting";

const FILTER_LABEL: Record<FilterKey, string> = {
  all: "Semua",
  baru: "Baru",
  produksi: "Produksi",
  kirim: "Siap Dikirim",
  selesai: "Selesai",
};

const VIEW_META: Record<ViewKey, { crumb: string; title: string }> = {
  pesanan: { crumb: "Operasional", title: "Pesanan" },
  jadwal: { crumb: "Operasional", title: "Jadwal Produksi" },
  kirim: { crumb: "Operasional", title: "Pengiriman" },
  customer: { crumb: "Data", title: "Customer" },
  laporan: { crumb: "Data", title: "Laporan" },
  setting: { crumb: "Data", title: "Pengaturan" },
};

function statusOf(o: OrderData, totalSteps: number): FilterKey {
  if (o.is_done) return "selesai";
  if (o.current_step >= totalSteps) return "kirim";
  if (o.current_step <= 1) return "baru";
  return "produksi";
}

function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function deadlineStatus(deadline: string | null, isDone: boolean): { level: "normal" | "warning" | "overdue" | null; diffDays: number } {
  if (!deadline || isDone) return { level: null, diffDays: 0 };
  const now = new Date();
  const dl = new Date(deadline);
  const diffMs = dl.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return { level: "overdue", diffDays };
  if (diffDays <= 2) return { level: "warning", diffDays };
  return { level: "normal", diffDays };
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* SVG nav icons (Feather-style, 24x24 stroke) */
function NavIcon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    pesanan: (
      <>
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
      </>
    ),
    jadwal: (
      <>
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </>
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
    laporan: (
      <>
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </>
    ),
    setting: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 008.6 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || null}
    </svg>
  );
}

export default function PesananDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [openCustomer, setOpenCustomer] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [currentView, setCurrentView] = useState<ViewKey>("pesanan");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [steps, setSteps] = useState<StepRow[]>(DEFAULT_STEPS);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/pesanan/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSteps = useCallback(async () => {
    try {
      const res = await fetch("/api/pesanan/steps");
      if (res.ok) {
        const data = await res.json();
        if (data.steps && data.steps.length > 0) {
          setSteps(data.steps.sort((a: StepRow, b: StepRow) => a.position - b.position));
        }
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchSteps();
  }, [fetchOrders, fetchSteps]);

  useEffect(() => {
    const h = window.location.hash.replace("#", "") as ViewKey;
    if (VIEW_META[h]) setCurrentView(h);
    const onHash = () => {
      const v = window.location.hash.replace("#", "") as ViewKey;
      if (VIEW_META[v]) setCurrentView(v);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  };

  const switchView = (v: ViewKey) => {
    setCurrentView(v);
    window.location.hash = v;
    setShowMobileNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeAll = () => {
    setOpenId(null);
    setShowAdd(false);
    setShowMobileNav(false);
  };

  const meta = VIEW_META[currentView];

  const handleLogout = async () => {
    await fetch("/api/pesanan/auth", { method: "DELETE" });
    router.push("/pesanan/login");
  };

  return (
    <div className="pas-shell">
      {/* ── SIDEBAR ── */}
      <aside className="pas-side">
        <a href="/" className="flex items-center gap-3 px-2 pb-5">
          <span className="pas-mark w-9 h-9 rounded-[10px] grid place-items-center pas-display text-[15px]">
            T
          </span>
          <span className="leading-none">
            <span className="block pas-display text-[15px] !text-white">TNT Sport</span>
            <span className="block text-[11px] !text-white/70 mt-[3px]">
              Admin Panel
            </span>
          </span>
        </a>
        <p className="pas-navsec">Operasional</p>
        <nav className="flex flex-col gap-1">
          {(["pesanan", "jadwal", "kirim"] as ViewKey[]).map((key) => (
            <a
              key={key}
              className={`pas-navlink ${currentView === key ? "on" : ""}`}
              href={`#${key}`}
              onClick={(e) => {
                e.preventDefault();
                switchView(key);
              }}
            >
              <span className="pas-ic"><NavIcon name={key} /></span> {VIEW_META[key].title}
            </a>
          ))}
        </nav>
        <p className="pas-navsec">Data</p>
        <nav className="flex flex-col gap-1">
          {(["customer", "laporan", "setting"] as ViewKey[]).map((key) => (
            <a
              key={key}
              className={`pas-navlink ${currentView === key ? "on" : ""}`}
              href={`#${key}`}
              onClick={(e) => {
                e.preventDefault();
                switchView(key);
              }}
            >
              <span className="pas-ic"><NavIcon name={key} /></span> {VIEW_META[key].title}
            </a>
          ))}
        </nav>
        <div className="mt-auto rounded-xl p-3 flex items-center gap-3 bg-white/10 border border-white/10">
          <span className="pas-avatar">AD</span>
          <span className="leading-tight">
            <span className="block text-[13.5px] font-semibold text-white">Admin TNT</span>
            <span className="block text-[11.5px] text-white/65">
              admin@tntsport.id
            </span>
          </span>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 min-w-0">
        <header className="pas-topbar">
          <div className="px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="pas-mark w-8 h-8 rounded-[9px] grid place-items-center pas-display text-[14px] lg:hidden">
                T
              </span>
              <div className="min-w-0">
                <p className="text-[11px] text-[var(--pas-muted)] leading-none">
                  {meta.crumb}
                </p>
                <h1 className="pas-display text-[17px] leading-tight mt-1 truncate">
                  {meta.title}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden p-2.5 rounded-lg border border-[var(--pas-line)] text-[var(--pas-muted)] hover:text-[var(--pas-ink-1)] hover:bg-[var(--pas-surface-2)] transition"
                onClick={() => setShowMobileNav(true)}
                aria-label="Buka menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="hidden lg:inline text-[12.5px] text-[var(--pas-muted)]">
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              {currentView === "pesanan" && (
                <button
                  onClick={() => setShowAdd(true)}
                  className="pas-btn-accent px-3.5 py-2.5 text-[14px] sm:px-4"
                >
                  <span className="sm:inline">+ </span>Pesanan
                </button>
              )}
              <button
                onClick={handleLogout}
                className="pas-btn-ghost px-3 py-2 text-[13px] text-[var(--pas-muted)]"
              >
                Keluar
              </button>
            </div>
          </div>
        </header>

        <main className="px-5 sm:px-8 py-7 sm:py-9 w-full">
          {openCustomer ? (
            <CustomerDetail
              customerName={openCustomer}
              orders={orders}
              steps={steps}
              onBack={() => setOpenCustomer(null)}
              onOpenOrder={(id) => {
                setOpenCustomer(null);
                setOpenId(id);
              }}
            />
          ) : (
          <>
          {currentView === "pesanan" && (
            <ViewPesanan
              orders={orders}
              filter={filter}
              setFilter={setFilter}
              query={query}
              setQuery={setQuery}
              openDetail={setOpenId}
              steps={steps}
              onDelete={fetchOrders}
              showToast={showToast}
            />
          )}
          {currentView === "jadwal" && <ViewJadwal orders={orders} openDetail={setOpenId} steps={steps} onMoved={fetchOrders} showToast={showToast} />}
          {currentView === "kirim" && <ViewKirim orders={orders} openDetail={setOpenId} steps={steps} />}
          {currentView === "customer" && <ViewCustomer orders={orders} onSelectCustomer={setOpenCustomer} steps={steps} />}
          {currentView === "laporan" && <ViewLaporan orders={orders} />}
          {currentView === "setting" && <ViewSetting showToast={showToast} steps={steps} onStepsSaved={fetchSteps} />}
          </>
          )}
        </main>
      </div>

      {/* ── MOBILE NAV DRAWER ── */}
      {showMobileNav && (
        <div className="pas-sheet open">
          <div className="pas-veil" onClick={() => setShowMobileNav(false)} />
          <div className="pas-panel slide-left p-5">
            {/* Drawer header */}
            <div className="flex items-center justify-between mb-2">
              <a href="/" className="flex items-center gap-2.5">
                <span className="pas-mark w-8 h-8 rounded-[9px] grid place-items-center pas-display text-[13px]">
                  T
                </span>
                <span className="pas-display text-[15px] text-white">TNT Sport</span>
              </a>
              <button
                className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
                onClick={() => setShowMobileNav(false)}
                aria-label="Tutup menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="pas-navsec">Operasional</p>
            <nav className="flex flex-col gap-1">
              {(["pesanan", "jadwal", "kirim"] as ViewKey[]).map((key) => (
                <a
                  key={key}
                  className={`pas-navlink ${currentView === key ? "on" : ""}`}
                  href={`#${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    switchView(key);
                  }}
                >
                  <span className="pas-ic"><NavIcon name={key} /></span> {VIEW_META[key].title}
                </a>
              ))}
            </nav>
            <p className="pas-navsec">Data</p>
            <nav className="flex flex-col gap-1">
              {(["customer", "laporan", "setting"] as ViewKey[]).map((key) => (
                <a
                  key={key}
                  className={`pas-navlink ${currentView === key ? "on" : ""}`}
                  href={`#${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    switchView(key);
                  }}
                >
                  <span className="pas-ic"><NavIcon name={key} /></span> {VIEW_META[key].title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ── DETAIL SHEET ── */}
      {openId && (
        <DetailSheet
          orderId={openId}
          orders={orders}
          onClose={() => setOpenId(null)}
          onSaved={(msg) => {
            fetchOrders();
            setOpenId(null);
            showToast(msg);
          }}
          steps={steps}
        />
      )}

      {/* ── ADD SHEET ── */}
      {showAdd && (
        <div className="pas-sheet open">
          <div className="pas-veil" onClick={closeAll} />
          <div className="pas-panel p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] text-[var(--pas-accent)] font-semibold">
                  Pesanan Baru
                </p>
                <h2 className="pas-display text-[22px] mt-1.5">Tambah Pesanan</h2>
              </div>
              <button className="pas-btn-ghost px-3 py-2 text-sm" onClick={closeAll}>
                Tutup
              </button>
            </div>
            <AddForm
              onSaved={(msg) => {
                fetchOrders();
                closeAll();
                showToast(msg);
              }}
              onCancel={closeAll}
            />
          </div>
        </div>
      )}

      {/* ── BOTTOM FLOATING NAV (mobile) ── */}
      <nav className="pas-bottom-nav lg:hidden">
        {(["pesanan", "jadwal", "kirim", "customer"] as ViewKey[]).map((key) => (
          <button
            key={key}
            className={`pas-bottom-nav-item ${currentView === key ? "on" : ""}`}
            onClick={() => switchView(key)}
            title={VIEW_META[key].title}
          >
            <NavIcon name={key} size={22} />
            {currentView === key && <span className="pas-bottom-nav-dot" />}
          </button>
        ))}
      </nav>

      {/* ── TOAST ── */}
      <div className={`pas-toast ${toast ? "on" : ""}`}>{toast}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VIEW: PESANAN (orders table + KPI + filter)
   ═══════════════════════════════════════════════ */
function ViewPesanan({
  orders,
  filter,
  setFilter,
  query,
  setQuery,
  openDetail,
  steps,
  onDelete,
  showToast,
}: {
  orders: OrderData[];
  filter: FilterKey;
  setFilter: (f: FilterKey) => void;
  query: string;
  setQuery: (q: string) => void;
  openDetail: (id: string) => void;
  steps: StepRow[];
  onDelete: (id: string) => void;
  showToast: (msg: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState<OrderData | null>(null);
  const [deleting, setDeleting] = useState(false);
  const filtered = orders
    .filter((o) => {
      if (filter !== "all" && statusOf(o, steps.length) !== filter) return false;
      if (!query) return true;
      const s = (
        o.id +
        " " +
        o.customer_name +
        " " +
        o.customer_city +
        " " +
        o.product_name
      ).toLowerCase();
      return s.includes(query.toLowerCase());
    })
    .sort((a, b) => (a.id < b.id ? 1 : -1));

  const stats = {
    total: orders.length,
    produksi: orders.filter(
      (o) => statusOf(o, steps.length) === "produksi" || statusOf(o, steps.length) === "baru"
    ).length,
    kirim: orders.filter((o) => statusOf(o, steps.length) === "kirim").length,
    selesai: orders.filter((o) => statusOf(o, steps.length) === "selesai").length,
  };

  // Deadline terdekat dari semua pesanan aktif (belum selesai)
  const nextDeadline = orders
    .filter((o) => o.deadline && !o.is_done)
    .sort((a, b) => (a.deadline! < b.deadline! ? -1 : 1))[0]?.deadline ?? null;
  const deadlineInfo = deadlineStatus(nextDeadline, false);

  // Jumlah pesanan aktif yang deadline-nya lewat atau mendekat (H-2) — perlu perhatian
  const deadlineAlertCount = orders.filter((o) => {
    if (!o.deadline || o.is_done) return false;
    const lvl = deadlineStatus(o.deadline, false).level;
    return lvl === "overdue" || lvl === "warning";
  }).length;
  const hasOverdue = orders.some(
    (o) => !o.is_done && o.deadline && deadlineStatus(o.deadline, false).level === "overdue"
  );
  const hasWarning = orders.some(
    (o) => !o.is_done && o.deadline && deadlineStatus(o.deadline, false).level === "warning"
  );

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    const targetId = confirmDelete.id;
    const targetName = confirmDelete.customer_name;
    try {
      const res = await fetch(`/api/pesanan/orders/${targetId}`, { method: "DELETE" });
      const data: any = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast(data.error || "Gagal menghapus pesanan, coba lagi");
        return;
      }
      setConfirmDelete(null);
      onDelete(targetId);
      showToast(`Pesanan ${targetId} (${targetName}) berhasil dihapus`);
    } catch {
      showToast("Gagal menghapus pesanan, coba lagi");
    } finally {
      setDeleting(false);
    }
  };

  const isDangerousStatus = (o: OrderData) => {
    const st = statusOf(o, steps.length);
    return st === "produksi" || st === "kirim" || st === "selesai";
  };

  return (
    <>
      {/* Delete confirmation dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-5" onClick={() => !deleting && setConfirmDelete(null)}>
          <div className="pas-card p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <p className="pas-display text-[18px]">Hapus Pesanan?</p>
            <p className="text-[14px] text-[var(--pas-muted)] mt-2 leading-relaxed">
              Pesanan <span className="text-[var(--pas-ink-1)] font-semibold pas-num">{confirmDelete.id}</span> ({confirmDelete.customer_name}) akan dihapus permanen dan tidak bisa dikembalikan.
            </p>
            {isDangerousStatus(confirmDelete) && (
              <p className="text-[13px] text-[#9a5d00] mt-3 bg-[#DDB339]/15 border border-[#DDB339]/30 rounded-xl px-4 py-2.5">
                ⚠ Pesanan ini sedang dalam produksi/pengiriman. Hapus hanya jika ini adalah data testing.
              </p>
            )}
            <div className="flex gap-3 mt-5">
              <button
                className="pas-btn flex-1 py-3 text-[13px]"
                onClick={() => setConfirmDelete(null)}
                disabled={deleting}
              >
                Batal
              </button>
              <button
                className="flex-1 py-3 text-[13px] rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Menghapus…" : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* KPI */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        <div className="pas-card pas-kpi pas-bento-kpi p-4 sm:p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Total Pesanan</p>
          <div className="flex items-end gap-2.5 mt-2.5">
            <p className="pas-display pas-num text-[30px] leading-none">{stats.total}</p>
            <span className="pas-delta up mb-0.5">+2 minggu ini</span>
          </div>
        </div>
        <div className="pas-card pas-kpi pas-bento-kpi p-4 sm:p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Sedang Produksi</p>
          <div className="flex items-end gap-2.5 mt-2.5">
            <p className="pas-display pas-num text-[30px] leading-none text-[var(--pas-accent)]">
              {stats.produksi}
            </p>
            <span className="pas-delta flat mb-0.5">on track</span>
          </div>
        </div>
        <div className="pas-card pas-kpi pas-bento-kpi p-4 sm:p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Deadline</p>
          <div className="flex items-end gap-2.5 mt-2.5">
            <p
              className={
                hasOverdue
                  ? "pas-display pas-num text-[30px] leading-none text-red-500"
                  : hasWarning
                    ? "pas-display pas-num text-[30px] leading-none text-[var(--pas-orange)]"
                    : "pas-display pas-num text-[30px] leading-none text-[#8fb0f7]"
              }
            >
              {deadlineAlertCount}
            </p>
            {nextDeadline && deadlineInfo.level && (
              <span
                className={
                  deadlineInfo.level === "overdue"
                    ? "pas-delta mb-0.5 bg-red-100 text-red-600"
                    : "pas-delta mb-0.5 bg-[#CB5639]/10 text-[#CB5639]"
                }
              >
                {deadlineInfo.level === "overdue"
                  ? `lewat ${Math.abs(deadlineInfo.diffDays)}h`
                  : `H-${deadlineInfo.diffDays}`}
              </span>
            )}
          </div>
        </div>
        <div className="pas-card pas-kpi pas-bento-kpi p-4 sm:p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Selesai</p>
          <div className="flex items-end gap-2.5 mt-2.5">
            <p className="pas-display pas-num text-[30px] leading-none">{stats.selesai}</p>
            <span className="pas-delta flat mb-0.5">bulan ini</span>
          </div>
        </div>
      </section>

      {/* toolbar */}
      <section className="mt-7 flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-between">
        <div className="pas-search w-full lg:max-w-[400px]">
          <span className="pas-mag">⌕</span>
          <input
            className="pas-field w-full py-2.5 pr-4 text-[14px]"
            placeholder="Cari pesanan, nama, kota…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="pas-seg pas-bento-chip-scroll">
          {(["all", "baru", "produksi", "kirim", "selesai"] as FilterKey[]).map((f) => (
            <button
              key={f}
              className={`pas-chip pas-bento-chip ${filter === f ? "on" : ""}`}
              onClick={() => setFilter(f)}
            >
              {FILTER_LABEL[f]}
            </button>
          ))}
        </div>
      </section>

      {/* table (desktop) */}
      <section className="pas-card mt-4 p-2 sm:p-4 hidden md:block w-full overflow-x-auto">
        <table className="pas-tbl w-full">
          <thead>
            <tr>
              <th className="w-[18%]">Pesanan</th>
              <th className="w-[18%]">Customer</th>
              <th className="w-[16%]">Produk</th>
              <th className="w-[18%]">Progres</th>
              <th className="w-[10%]">Order</th>
              <th className="w-[10%]">Deadline</th>
              <th className="w-[10%]">Status</th>
              <th className="w-[5%]"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8}>
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <span className="text-[40px] opacity-30">📋</span>
                    <p className="text-[var(--pas-muted)] text-[15px] font-medium">Tidak ada pesanan yang cocok</p>
                    <p className="text-[var(--pas-muted)] text-[13px]">Coba ubah filter atau kata kunci pencarian</p>
                  </div>
                </td>
              </tr>
            )}
            {filtered.map((o) => {
              const st = statusOf(o, steps.length);
              const pct = o.pct;
              const ini = initials(o.customer_name);
              const dlStatus = deadlineStatus(o.deadline, o.is_done);
              return (
                <tr key={o.id} onClick={() => openDetail(o.id)}>
                  <td>
                    <span className="font-semibold pas-num">{o.id}</span>
                    <br />
                    <span className="text-[12.5px] text-[var(--pas-muted)]">{o.quantity}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <span className="pas-avatar">{ini}</span>
                      <span>
                        {o.customer_name}
                        <br />
                        <span className="text-[12.5px] text-[var(--pas-muted)]">
                          {o.customer_city}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="text-[var(--pas-muted)]">{o.product_name}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="pas-mini">
                        <i style={{ width: `${pct}%` }} />
                      </span>
                      <span className="text-[12.5px] text-[var(--pas-muted)] pas-num whitespace-nowrap">
                        {o.current_step}/9
                      </span>
                    </div>
                    <span className="text-[12.5px] text-[var(--pas-muted)]">
                      {steps[o.current_step - 1]?.name || `Tahap ${o.current_step}`}
                    </span>
                  </td>
                  <td className="text-[12.5px] text-[var(--pas-muted)] whitespace-nowrap">
                    {formatDate(o.created_at)}
                  </td>
                  <td className="text-[12.5px] whitespace-nowrap">
                    {o.deadline ? (
                      <span className={
                        dlStatus.level === "overdue" ? "text-red-400" :
                        dlStatus.level === "warning" ? "text-[var(--pas-orange)]" :
                        "text-[var(--pas-muted)]"
                      }>
                        {(dlStatus.level === "overdue" || dlStatus.level === "warning") && (
                          <span className={dlStatus.level === "overdue" ? "pas-dl-overdue inline-block" : "pas-dl-warning inline-block"}>⚠ </span>
                        )}
                        {formatDate(o.deadline)}
                        {dlStatus.level === "warning" && <span className="text-[11px] ml-1 opacity-80">(H-{dlStatus.diffDays})</span>}
                        {dlStatus.level === "overdue" && <span className="text-[11px] ml-1 opacity-80">(lewat {Math.abs(dlStatus.diffDays)}h)</span>}
                      </span>
                    ) : (
                      <span className="text-[var(--pas-muted)]">-</span>
                    )}
                  </td>
                  <td>
                    <span className={`pas-pill ${st}`}>{FILTER_LABEL[st]}</span>
                  </td>
                  <td className="text-right">
                    <button
                      className="text-[var(--pas-muted)] hover:text-red-400 transition p-1.5 rounded-lg hover:bg-red-400/10"
                      title="Hapus pesanan"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete(o);
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* cards (mobile) */}
      <section className="mt-4 flex flex-col gap-3 md:hidden">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-[40px] opacity-30">📋</span>
            <p className="text-[var(--pas-muted)] text-[15px] font-medium">Tidak ada pesanan yang cocok</p>
            <p className="text-[var(--pas-muted)] text-[13px]">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
        {filtered.map((o) => {
          const st = statusOf(o, steps.length);
          const pct = o.pct;
          const ini = initials(o.customer_name);
          const dlStatus = deadlineStatus(o.deadline, o.is_done);
          const stageName = steps[o.current_step - 1]?.name || `Tahap ${o.current_step}`;
          return (
            <div
              key={o.id}
              className="pas-bento-card cursor-pointer"
              onClick={() => openDetail(o.id)}
            >
              {/* Delete button — pojok kanan atas */}
              <button
                className="absolute top-5 right-5 text-[var(--pas-muted)] hover:text-red-400 transition p-1.5 rounded-lg hover:bg-red-400/10"
                title="Hapus"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(o);
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
              </button>

              {/* Baris 1: Nomor pesanan + badge status */}
              <div className="flex items-center justify-between pr-10">
                <p className="font-bold text-[16px] pas-num">{o.id}</p>
                <span className={`pas-pill ${st}`}>{FILTER_LABEL[st]}</span>
              </div>

              {/* Baris 2: Avatar + Nama customer + Jumlah pcs */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="pas-bento-avatar">{ini}</span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium truncate">{o.customer_name}</p>
                    <p className="text-[12px] text-[var(--pas-muted)] truncate">{o.customer_city}</p>
                  </div>
                </div>
                <p className="text-[14px] font-semibold pas-num shrink-0 ml-3">{o.quantity} pcs</p>
              </div>

              {/* Baris 3: Nama produk */}
              <p className="text-[13px] text-[var(--pas-muted)] mt-3">{o.product_name}</p>

              {/* Baris 4: Progress bar + label tahap */}
              <div className="mt-3">
                <span className="pas-mini w-full block">
                  <i style={{ width: `${pct}%` }} />
                </span>
                <p className="text-[12px] text-[var(--pas-muted)] mt-1.5 pas-num">
                  {o.current_step}/9 <span className="text-[var(--pas-ink-1)] font-medium">{stageName}</span>
                </p>
              </div>

              {/* Divider */}
              <div className="pas-bento-divider"></div>

              {/* Baris 5: Tanggal order + Deadline */}
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-[var(--pas-muted)]">Order: {formatDate(o.created_at)}</p>
                {o.deadline ? (
                  <p className={
                    dlStatus.level === "overdue" ? "text-[12px] text-red-400 font-medium" :
                    dlStatus.level === "warning" ? "text-[12px] text-[var(--pas-orange)] font-medium" :
                    "text-[12px] text-[var(--pas-muted)]"
                  }>
                    {(dlStatus.level === "overdue" || dlStatus.level === "warning") && (
                      <span className={dlStatus.level === "overdue" ? "pas-dl-overdue inline-block" : "pas-dl-warning inline-block"}>⚠ </span>
                    )}
                    Deadline: {formatDate(o.deadline)}
                    {dlStatus.level === "warning" && <span className="text-[11px] ml-1 opacity-80">(H-{dlStatus.diffDays})</span>}
                    {dlStatus.level === "overdue" && <span className="text-[11px] ml-1 opacity-80">(lewat {Math.abs(dlStatus.diffDays)}h)</span>}
                  </p>
                ) : (
                  <p className="text-[12px] text-[var(--pas-muted)]">Deadline: -</p>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════
   VIEW: JADWAL PRODUKSI (kanban lanes)
   ═══════════════════════════════════════════════ */
const LANE_KEYS = ["desain", "produksi", "finishing", "kirim"] as const;
const LANE_COLORS: Record<string, string> = {
  desain: "var(--lane-desain)",
  produksi: "var(--lane-produksi)",
  finishing: "var(--lane-finishing)",
  kirim: "var(--lane-kirim)",
};

function ViewJadwal({
  orders,
  openDetail,
  steps,
  onMoved,
  showToast,
}: {
  orders: OrderData[];
  openDetail: (id: string) => void;
  steps: StepRow[];
  onMoved: () => void;
  showToast: (msg: string) => void;
}) {
  const active = orders.filter((o) => !o.is_done);

  function barClass(pct: number) {
    if (pct >= 100) return "done";
    if (pct >= 66) return "high";
    if (pct >= 33) return "mid";
    return "low";
  }

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overLane, setOverLane] = useState<string | null>(null);

  async function handleDrop(orderId: string, laneKey: string) {
    const laneIdx = LANE_KEYS.indexOf(laneKey as any);
    if (laneIdx < 0) return;
    const targetStep = LANES[laneIdx].from;
    const order = orders.find((o) => o.id === orderId);
    if (!order || order.current_step === targetStep) return;
    const prevStep = order.current_step;
    try {
      const res = await fetch(`/api/pesanan/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_step: targetStep }),
      });
      const data: any = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast(data.error || "Gagal memindahkan pesanan, coba lagi");
        return;
      }
      onMoved();
      const laneName = LANES[laneIdx].name;
      showToast(`${orderId} dipindah ke ${laneName}`);
    } catch {
      showToast("Gagal memindahkan pesanan, coba lagi");
    }
  }

  return (
    <>
      <p className="text-[14px] text-[var(--pas-muted)] mb-5">
        Papan produksi — pesanan dikelompokkan per fase. Klik kartu untuk update tahap.
      </p>

      {(["desktop", "mobile"] as const).map((variant) => (
        <div key={variant} className={variant === "desktop" ? "pas-board hidden md:flex" : "flex flex-col md:hidden"}>
          {LANES.map((lane, i) => {
            const key = LANE_KEYS[i];
            const items = active.filter((o) => o.current_step >= lane.from && o.current_step <= lane.to);
            const isOver = overLane === `${variant}:${key}`;
            return (
              <div
                key={`${variant}:${lane.name}`}
                className={`pas-lane ${isOver ? "pas-lane-over" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (draggingId) setOverLane(`${variant}:${key}`);
                }}
                onDragLeave={() => setOverLane((v) => (v === `${variant}:${key}` ? null : v))}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/plain") || draggingId;
                  setOverLane(null);
                  setDraggingId(null);
                  if (id) handleDrop(id, key);
                }}
                onTouchMove={(e) => {
                  if (!draggingId) return;
                  const touch = e.touches[0];
                  const el = document.elementFromPoint(touch.clientX, touch.clientY);
                  const laneEl = el?.closest("[data-lane-key]") as HTMLElement | null;
                  const k = laneEl?.dataset.laneKey || null;
                  setOverLane(k ? `${variant}:${k}` : null);
                }}
                onTouchEnd={(e) => {
                  const touch = e.changedTouches[0];
                  const el = document.elementFromPoint(touch.clientX, touch.clientY);
                  const laneEl = el?.closest("[data-lane-key]") as HTMLElement | null;
                  const k = laneEl?.dataset.laneKey || null;
                  const id = draggingId;
                  setOverLane(null);
                  setDraggingId(null);
                  if (id && k) handleDrop(id, k);
                }}
                data-lane-key={key}
              >
                <div className="pas-lane-head">
                  <span className="pas-lane-title">
                    <span className="pas-lane-dot" style={{ background: LANE_COLORS[key] }} />
                    {lane.name}
                  </span>
                  <span className="pas-lane-count">{items.length}</span>
                </div>
                <div className="pas-lane-body" data-lane-key={key}>
                  {items.length === 0 ? (
                    <div className="pas-lane-empty">
                      <div className="pas-lane-empty-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M9 12h6M12 9v6" />
                        </svg>
                      </div>
                      <p className="pas-lane-empty-text">Belum ada pesanan</p>
                      <p className="pas-lane-empty-sub">Pesanan akan muncul di sini</p>
                    </div>
                  ) : (
                    items.map((o) => {
                      const pct = Math.round((o.current_step / 10) * 100);
                      const ini = initials(o.customer_name);
                      const stepName = steps[o.current_step - 1]?.name || `Tahap ${o.current_step}`;
                      const isDragging = draggingId === o.id;
                      return (
                        <div
                          key={o.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", o.id);
                            e.dataTransfer.effectAllowed = "move";
                            setDraggingId(o.id);
                          }}
                          onDragEnd={() => { setDraggingId(null); setOverLane(null); }}
                          onTouchStart={() => setDraggingId(o.id)}
                          onClick={() => { if (!isDragging) openDetail(o.id); }}
                          className={`pas-order-card ${isDragging ? "pas-dragging" : ""}`}
                          data-lane={key}
                          style={{ opacity: isDragging ? 0.55 : 1, touchAction: "none" }}
                        >
                          <div className="pas-card-top">
                            <div className="flex items-center gap-2.5">
                              <span className="pas-card-avatar">{ini}</span>
                              <span className="pas-card-id">{o.id}</span>
                            </div>
                            <span className="pas-card-pcs">{o.quantity}</span>
                          </div>
                          <div className="pas-card-body">
                            <p className="pas-card-customer">{o.customer_name}</p>
                            <p className="pas-card-product">{o.product_name}</p>
                          </div>
                          <div className="pas-card-progress">
                            <div className="pas-card-bar">
                              <div className={`pas-card-bar-fill ${barClass(pct)}`} style={{ width: `${pct}%` }} />
                            </div>
                            <span className="pas-card-pct">{pct}%</span>
                          </div>
                          <div className="pas-card-step">
                            <span className="pas-card-step-dot" />
                            {stepName}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════
   VIEW: PENGIRIMAN
   ═══════════════════════════════════════════════ */
function ViewKirim({
  orders,
  openDetail,
  steps,
}: {
  orders: OrderData[];
  openDetail: (id: string) => void;
  steps: StepRow[];
}) {
  const siap = orders.filter((o) => o.current_step >= steps.length);

  return (
    <>
      <p className="text-[14px] text-[var(--pas-muted)] mb-5">
        Pesanan tahap 10 — lengkapi ekspedisi dan nomor resi supaya tampil ke customer.
      </p>
      {siap.length === 0 ? (
        <p className="text-[14px] text-[var(--pas-muted)]">
          Belum ada pesanan yang siap dikirim.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {siap.map((o) => (
            <div key={o.id} className="pas-card p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold pas-num">{o.id}</p>
                  <p className="text-[13px] text-[var(--pas-muted)] mt-0.5">
                    {o.customer_name} · {o.customer_city} · {o.customer_phone}
                  </p>
                </div>
                <span className={`pas-pill ${statusOf(o, steps.length)}`}>
                  {FILTER_LABEL[statusOf(o, steps.length)]}
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 mt-4 text-[13.5px]">
                <div>
                  <p className="text-[12px] text-[var(--pas-muted)]">Isi Paket</p>
                  <p className="mt-1">
                    {o.product_name} · {o.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-[var(--pas-muted)]">Ekspedisi</p>
                  <p className="mt-1">
                    {o.courier || (
                      <span className="text-[var(--pas-muted)]">belum diisi</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-[var(--pas-muted)]">No. Resi</p>
                  <p className="mt-1 pas-num">
                    {o.tracking_number || (
                      <span className="text-[var(--pas-muted)]">belum diisi</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="pas-btn-ghost px-4 py-2 text-[13.5px]"
                  onClick={() => openDetail(o.id)}
                >
                  Isi / Ubah Resi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════
   VIEW: CUSTOMER DETAIL (per-customer page)
   ═══════════════════════════════════════════════ */
function CustomerDetail({
  customerName,
  orders,
  steps,
  onBack,
  onOpenOrder,
}: {
  customerName: string;
  orders: OrderData[];
  steps: StepRow[];
  onBack: () => void;
  onOpenOrder: (id: string) => void;
}) {
  const customerOrders = orders.filter((o) => o.customer_name === customerName);
  const first = customerOrders[0];
  const totalPcs = customerOrders.reduce((a, o) => a + (parseInt(o.quantity, 10) || 0), 0);
  const aktif = customerOrders.filter((o) => !o.is_done).length;

  return (
    <>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[13px] text-[var(--pas-muted)] hover:text-[var(--pas-ink-1)] transition mb-5"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Kembali ke Daftar Customer
      </button>

      {/* Contact info card */}
      <div className="pas-card p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="pas-avatar text-[18px] w-12 h-12 flex items-center justify-center">{initials(customerName)}</span>
          <div className="flex-1 min-w-0">
            <p className="pas-display text-[18px]">{customerName}</p>
            <p className="text-[13px] text-[var(--pas-muted)] mt-1">{first?.customer_city || "-"}</p>
            <p className="text-[13px] text-[var(--pas-muted)] pas-num mt-0.5">{first?.customer_phone || "-"}</p>
          </div>
          <span className={`pas-pill ${aktif > 0 ? "produksi" : "selesai"}`}>
            {aktif > 0 ? `${aktif} aktif` : "selesai"}
          </span>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-[var(--pas-line)]">
          <div>
            <p className="text-[12px] text-[var(--pas-muted)]">Total Pesanan</p>
            <p className="pas-display text-[22px] mt-1">{customerOrders.length}</p>
          </div>
          <div>
            <p className="text-[12px] text-[var(--pas-muted)]">Total PCS</p>
            <p className="pas-display text-[22px] mt-1">{totalPcs}</p>
          </div>
        </div>
      </div>

      {/* Order history */}
      <div className="pas-card mt-4 p-2 sm:p-4 overflow-x-auto">
        <p className="text-[13px] text-[var(--pas-muted)] px-3 pt-2 pb-3">Riwayat Pesanan</p>
        {customerOrders.length === 0 ? (
          <p className="text-[13px] text-[var(--pas-muted)] px-3 pb-4">Belum ada pesanan.</p>
        ) : (
          <table className="pas-tbl w-full">
            <thead>
              <tr>
                <th>Nomor Pesanan</th>
                <th>Produk</th>
                <th>Tanggal</th>
                <th>Progres</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((o) => {
                const st = statusOf(o, steps.length);
                return (
                  <tr
                    key={o.id}
                    className="cursor-pointer hover:bg-[var(--pas-surface-2)] transition"
                    onClick={() => onOpenOrder(o.id)}
                  >
                    <td className="pas-num font-semibold">{o.id}</td>
                    <td>{o.product_name || "-"}</td>
                    <td className="text-[var(--pas-muted)]">{formatDate(o.created_at)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="pas-mini" style={{ width: 60 }}>
                          <i style={{ width: `${o.pct}%` }} />
                        </span>
                        <span className="text-[12px] text-[var(--pas-muted)]">{o.pct}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`pas-pill ${st}`}>{FILTER_LABEL[st]}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {/* Mobile card list */}
        {customerOrders.length > 0 && (
          <div className="flex flex-col gap-2 sm:hidden px-1 pb-2">
            {customerOrders.map((o) => {
              const st = statusOf(o, steps.length);
              return (
                <div
                  key={o.id}
                  className="pas-card p-3.5 cursor-pointer hover:bg-[var(--pas-surface-2)] transition"
                  onClick={() => onOpenOrder(o.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[14px] pas-num">{o.id}</p>
                      <p className="text-[12px] text-[var(--pas-muted)] mt-0.5">{o.product_name || "-"}</p>
                      <p className="text-[12px] text-[var(--pas-muted)]">{formatDate(o.created_at)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`pas-pill ${st}`}>{FILTER_LABEL[st]}</span>
                      <span className="text-[11px] text-[var(--pas-muted)]">{o.pct}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   VIEW: CUSTOMER
   ═══════════════════════════════════════════════ */
function ViewCustomer({
  orders,
  onSelectCustomer,
  steps,
}: {
  orders: OrderData[];
  onSelectCustomer: (name: string) => void;
  steps: StepRow[];
}) {
  const map: Record<string, { city: string; phone: string; orders: string[]; aktif: number }> = {};
  orders.forEach((o) => {
    const k = o.customer_name;
    if (!map[k]) map[k] = { city: o.customer_city, phone: o.customer_phone, orders: [], aktif: 0 };
    map[k].orders.push(o.id);
    if (!o.is_done) map[k].aktif++;
  });

  return (
    <>
      <p className="text-[14px] text-[var(--pas-muted)] mb-5">
        Daftar customer beserta jumlah pesanan yang pernah masuk.
      </p>

      {/* table (desktop) */}
      <div className="pas-card p-2 sm:p-4 overflow-x-auto hidden md:block">
        <table className="pas-tbl">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Nomor HP</th>
              <th>Total Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(map).map((k) => {
              const c = map[k];
              return (
                <tr key={k} onClick={() => onSelectCustomer(k)}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <span className="pas-avatar">{initials(k)}</span>
                      <span>
                        {k}
                        <br />
                        <span className="text-[12.5px] text-[var(--pas-muted)]">{c.city}</span>
                      </span>
                    </div>
                  </td>
                  <td className="pas-num text-[var(--pas-muted)]">{c.phone}</td>
                  <td className="pas-num">{c.orders.length}</td>
                  <td>
                    {c.aktif ? (
                      <span className="pas-pill produksi">{c.aktif} aktif</span>
                    ) : (
                      <span className="pas-pill selesai">selesai</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* cards (mobile) */}
      <div className="flex flex-col gap-3 md:hidden">
        {Object.keys(map).length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-[40px] opacity-30">👤</span>
            <p className="text-[var(--pas-muted)] text-[15px] font-medium">Belum ada customer</p>
          </div>
        )}
        {Object.keys(map).map((k) => {
          const c = map[k];
          return (
            <div
              key={k}
              className="pas-bento-card cursor-pointer"
              onClick={() => onSelectCustomer(k)}
            >
              {/* Baris 1: Avatar + Nama + Badge status */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="pas-bento-avatar">{initials(k)}</span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold truncate">{k}</p>
                    <p className="text-[12px] text-[var(--pas-muted)] truncate">{c.city}</p>
                  </div>
                </div>
                {c.aktif ? (
                  <span className="pas-pill produksi shrink-0">{c.aktif} aktif</span>
                ) : (
                  <span className="pas-pill selesai shrink-0">selesai</span>
                )}
              </div>

              {/* Baris 2: Nomor HP */}
              <div className="flex items-center gap-2 mt-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--pas-muted)] shrink-0">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <p className="text-[13px] text-[var(--pas-muted)] pas-num">{c.phone || "-"}</p>
              </div>

              {/* Baris 3: Total Order */}
              <div className="mt-3 pt-3 border-t border-[var(--pas-line)]">
                <p className="text-[12px] text-[var(--pas-muted)] uppercase tracking-wider font-semibold">Total Order</p>
                <p className="pas-display text-[22px] mt-0.5">{c.orders.length}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   VIEW: LAPORAN
   ═══════════════════════════════════════════════ */
function ViewLaporan({ orders }: { orders: OrderData[] }) {
  const byStage = LANES.map((l) => ({
    name: l.name,
    n: orders.filter(
      (o) => o.current_step >= l.from && o.current_step <= l.to && !o.is_done
    ).length,
  }));
  const max = Math.max(...byStage.map((b) => b.n), 1);
  const pcs = orders.reduce((a, o) => {
    const n = parseInt(o.quantity, 10);
    return a + (isNaN(n) ? 0 : n);
  }, 0);
  const weeks = [3, 5, 4, 6, 4, 7, 6];
  const wmax = Math.max(...weeks);

  return (
    <>
      <p className="text-[14px] text-[var(--pas-muted)] mb-5">
        Ringkasan operasional (angka contoh untuk mockup).
      </p>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="pas-card p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Order per minggu</p>
          <div className="flex items-end gap-2 mt-4" style={{ height: 110 }}>
            {weeks.map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-2" style={{ flex: 1 }}>
                <div
                  style={{
                    width: "100%",
                    height: `${(v / wmax) * 90}px`,
                    background: "var(--pas-accent)",
                    opacity: i === weeks.length - 1 ? 1 : 0.45,
                    borderRadius: "6px 6px 0 0",
                  }}
                />
                <span className="text-[11px] text-[var(--pas-muted)]">M{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pas-card p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Beban per fase produksi</p>
          <div className="flex flex-col gap-3 mt-4">
            {byStage.map((b) => (
              <div key={b.name} className="flex items-center gap-3">
                <span className="text-[13px] w-[130px] text-[var(--pas-muted)] flex-none">
                  {b.name}
                </span>
                <span
                  className="pas-mini"
                  style={{ flex: 1, width: "auto", height: 9 }}
                >
                  <i style={{ width: `${(b.n / max) * 100}%` }} />
                </span>
                <span className="pas-num text-[13px] w-6 text-right">{b.n}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pas-card p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Total item diproduksi</p>
          <p className="pas-display pas-num text-[30px] mt-2">{pcs} pcs</p>
          <p className="text-[12.5px] text-[var(--pas-muted)] mt-1">
            dari {orders.length} pesanan aktif &amp; selesai
          </p>
        </div>
        <div className="pas-card p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Rata-rata waktu produksi</p>
          <p className="pas-display pas-num text-[30px] mt-2">8 hari</p>
          <p className="text-[12.5px] text-[var(--pas-muted)] mt-1">
            target SLA 7–10 hari kerja
          </p>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   VIEW: PENGATURAN
   ═══════════════════════════════════════════════ */
function ViewSetting({
  showToast,
  steps,
  onStepsSaved,
}: {
  showToast: (msg: string) => void;
  steps: StepRow[];
  onStepsSaved: () => void;
}) {
  const [editSteps, setEditSteps] = useState<{ name: string; position: number }[]>(
    () => steps.map((s) => ({ name: s.name, position: s.position }))
  );
  const [savingSteps, setSavingSteps] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  // Token Fonnte (notifikasi WhatsApp) — token penuh tidak pernah dirender/dikirim ke client
  const [fonnteToken, setFonnteToken] = useState("");
  const [fonnteTarget, setFonnteTarget] = useState("");
  const [fonnteHasToken, setFonnteHasToken] = useState(false);
  const [fonnteLast4, setFonnteLast4] = useState<string | null>(null);
  const [savingFonnte, setSavingFonnte] = useState(false);
  const [testingFonnte, setTestingFonnte] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings/fonnte")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setFonnteHasToken(!!d.hasToken);
          setFonnteLast4(d.tokenLast4 ?? null);
        }
      })
      .catch(() => {
        // silent
      });
  }, []);

  const saveFonnteToken = async () => {
    const value = fonnteToken.trim();
    if (!value) {
      showToast("Token tidak boleh kosong");
      return;
    }
    setSavingFonnte(true);
    try {
      const res = await fetch("/api/admin/settings/fonnte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Gagal menyimpan token");
        return;
      }
      setFonnteToken("");
      setFonnteHasToken(true);
      setFonnteLast4(data.tokenLast4);
      showToast("Token Fonnte tersimpan (terenkripsi)");
    } catch {
      showToast("Gagal menyimpan token");
    } finally {
      setSavingFonnte(false);
    }
  };

  const testFonnte = async () => {
    if (!fonnteTarget.trim()) {
      showToast("Isi nomor HP tujuan untuk pesan uji");
      return;
    }
    setTestingFonnte(true);
    try {
      const res = await fetch("/api/admin/settings/fonnte/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: fonnteTarget.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Gagal kirim pesan uji");
        return;
      }
      showToast("Pesan uji terkirim. Cek WhatsApp Anda");
    } catch {
      showToast("Gagal kirim pesan uji");
    } finally {
      setTestingFonnte(false);
    }
  };

  useEffect(() => {
    setEditSteps(steps.map((s) => ({ name: s.name, position: s.position })));
  }, [steps]);

  const addStep = () => {
    const nextPos = editSteps.length + 1;
    setEditSteps([...editSteps, { name: "", position: nextPos }]);
  };

  const removeStep = (idx: number) => {
    if (editSteps.length <= 2) {
      showToast("Minimal harus ada 2 tahap");
      return;
    }
    setConfirmDelete(idx);
  };

  const confirmRemoveStep = () => {
    if (confirmDelete === null) return;
    const updated = editSteps.filter((_, i) => i !== confirmDelete);
    updated.forEach((s, i) => (s.position = i + 1));
    setEditSteps(updated);
    setConfirmDelete(null);
  };

  const updateName = (idx: number, name: string) => {
    const updated = [...editSteps];
    updated[idx] = { ...updated[idx], name };
    setEditSteps(updated);
  };

  const moveStep = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= editSteps.length) return;
    const updated = [...editSteps];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    updated.forEach((s, i) => (s.position = i + 1));
    setEditSteps(updated);
  };

  const saveSteps = async () => {
    const names = editSteps.map((s) => s.name.trim());
    if (names.some((n) => !n)) {
      showToast("Nama tahap tidak boleh kosong");
      return;
    }
    if (new Set(names).size !== names.length) {
      showToast("Nama tahap tidak boleh duplikat");
      return;
    }
    setSavingSteps(true);
    try {
      const res = await fetch("/api/pesanan/steps", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          steps: editSteps.map((s, i) => ({ name: s.name.trim(), position: i + 1 })),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        showToast(data.error || "Gagal menyimpan");
        return;
      }
      showToast("Tahap produksi tersimpan");
      onStepsSaved();
    } catch {
      showToast("Gagal menyimpan");
    } finally {
      setSavingSteps(false);
    }
  };

  return (
    <>
      <p className="text-[14px] text-[var(--pas-muted)] mb-5">
        Pengaturan toko dan alur produksi.
      </p>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="pas-card p-5">
          <p className="font-semibold text-[15px]">Profil Toko</p>
          <label className="block mt-4">
            <span className="text-[13px] text-[var(--pas-muted)]">Nama Toko</span>
            <input
              className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
              defaultValue="TNT Sport Apparel"
            />
          </label>
          <label className="block mt-3">
            <span className="text-[13px] text-[var(--pas-muted)]">WhatsApp Admin</span>
            <input
              className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px] pas-num"
              defaultValue="6281234567890"
            />
          </label>
          <label className="block mt-3">
            <span className="text-[13px] text-[var(--pas-muted)]">Jam Operasional</span>
            <input
              className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
              defaultValue="Senin–Sabtu · 09.00–17.00 WIB"
            />
          </label>
          <button
            className="pas-btn-accent w-full py-3 text-[14px] mt-4"
            onClick={() => showToast("Pengaturan disimpan")}
          >
            Simpan
          </button>
        </div>
        <div className="pas-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[15px]">Tahap Produksi</p>
              <p className="text-[12.5px] text-[var(--pas-muted)] mt-1">
                {editSteps.length} tahap — drag atau gunakan tombol ↑↓ untuk ubah urutan.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-4">
            {editSteps.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 py-2 px-3 rounded-lg border border-[var(--pas-line-2)] bg-[var(--pas-surface)]"
              >
                <span className="pas-num w-5 text-[12px] text-[var(--pas-muted)] shrink-0">
                  {i + 1}
                </span>
                <input
                  className="flex-1 min-w-0 bg-transparent text-[14px] outline-none border-none"
                  value={s.name}
                  onChange={(e) => updateName(i, e.target.value)}
                  placeholder="Nama tahap…"
                />
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    className="pas-btn-ghost px-1.5 py-1 text-[13px] disabled:opacity-30"
                    disabled={i === 0}
                    onClick={() => moveStep(i, -1)}
                    title="Geser ke atas"
                  >
                    ↑
                  </button>
                  <button
                    className="pas-btn-ghost px-1.5 py-1 text-[13px] disabled:opacity-30"
                    disabled={i === editSteps.length - 1}
                    onClick={() => moveStep(i, 1)}
                    title="Geser ke bawah"
                  >
                    ↓
                  </button>
                  <button
                    className="pas-btn-ghost px-1.5 py-1 text-[13px] text-red-400 hover:text-red-300"
                    onClick={() => removeStep(i)}
                    title="Hapus tahap"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-3 text-[13px] text-[var(--pas-accent)] hover:underline"
            onClick={addStep}
          >
            + Tambah Tahap
          </button>

          <button
            className="pas-btn-accent w-full py-3 text-[14px] mt-4"
            disabled={savingSteps}
            onClick={saveSteps}
          >
            {savingSteps ? "Menyimpan…" : "Simpan Tahap Produksi"}
          </button>
        </div>
      </div>

      {/* Notifikasi WhatsApp (Fonnte) */}
      <div className="pas-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-[15px]">Notifikasi WhatsApp (Fonnte)</p>
            <p className="text-[12.5px] text-[var(--pas-muted)] mt-1">
              Terkirim otomatis ke customer saat tahap produksi diubah. Token disimpan terenkripsi (AES-256-GCM).
            </p>
          </div>
          <span
            className={`pas-pill shrink-0 ${fonnteHasToken ? "produksi" : "selesai"}`}
          >
            {fonnteHasToken
              ? `Tersimpan ·•••${fonnteLast4 ?? ""}`
              : "Belum di-set"}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mt-5">
          <label className="block">
            <span className="text-[13px] text-[var(--pas-muted)]">Token Fonnte</span>
            <div className="flex gap-2 mt-1.5">
              <input
                type="password"
                autoComplete="off"
                className="pas-field flex-1 min-w-0 px-4 py-2.5 text-[14px]"
                placeholder={
                  fonnteHasToken && fonnteLast4
                    ? `••••••••••••${fonnteLast4} (isi untuk mengganti)`
                    : "Token dari dashboard Fonnte"
                }
                value={fonnteToken}
                onChange={(e) => setFonnteToken(e.target.value)}
              />
              <button
                className="pas-btn-accent px-4 py-2.5 text-[13px] shrink-0"
                disabled={savingFonnte}
                onClick={saveFonnteToken}
              >
                {savingFonnte ? "Menyimpan…" : "Simpan"}
              </button>
            </div>
          </label>

          <label className="block">
            <span className="text-[13px] text-[var(--pas-muted)]">Uji Koneksi</span>
            <div className="flex gap-2 mt-1.5">
              <input
                type="tel"
                className="pas-field flex-1 min-w-0 px-4 py-2.5 text-[14px] pas-num"
                placeholder="No. HP admin (0812... atau 62812...)"
                value={fonnteTarget}
                onChange={(e) => setFonnteTarget(e.target.value)}
              />
              <button
                className="pas-btn-ghost px-4 py-2.5 text-[13px] shrink-0"
                disabled={testingFonnte}
                onClick={testFonnte}
              >
                {testingFonnte ? "Mengirim…" : "Test Kirim"}
              </button>
            </div>
          </label>
        </div>
        <p className="text-[12px] text-[var(--pas-muted)] mt-3">
          Dapatkan token di dashboard Fonnte (fonnte.com). Token tidak pernah ditampilkan penuh dan tidak pernah di-log.
        </p>
      </div>

      {/* Delete confirmation modal */}
      {confirmDelete !== null && (
        <div className="pas-sheet open">
          <div className="pas-veil" onClick={() => setConfirmDelete(null)} />
          <div className="pas-panel p-5" style={{ maxWidth: 380, margin: "auto" }}>
            <p className="font-semibold text-[15px]">Hapus Tahap?</p>
            <p className="text-[13px] text-[var(--pas-muted)] mt-2">
              Tahap <strong>"{editSteps[confirmDelete]?.name}"</strong> akan dihapus. Pesanan yang sedang berada di tahap ini akan kehilangan referensi tahap.
            </p>
            <div className="flex gap-3 mt-5">
              <button
                className="pas-btn-ghost flex-1 py-2.5 text-[13px]"
                onClick={() => setConfirmDelete(null)}
              >
                Batal
              </button>
              <button
                className="flex-1 py-2.5 text-[13px] font-semibold rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                onClick={confirmRemoveStep}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════
   DETAIL SHEET
   ═══════════════════════════════════════════════ */
function DetailSheet({
  orderId,
  orders,
  onClose,
  onSaved,
  steps,
}: {
  orderId: string;
  orders: OrderData[];
  onClose: () => void;
  onSaved: (msg: string) => void;
  steps: StepRow[];
}) {
  const order = orders.find((o) => o.id === orderId);
  const [step, setStep] = useState(order?.current_step ?? 1);
  const [note, setNote] = useState(order?.note || "");
  const [courier, setCourier] = useState(order?.courier || "");
  const [resi, setResi] = useState(order?.tracking_number || "");
  const [deadline, setDeadline] = useState(order?.deadline ? order.deadline.slice(0, 10) : "");
  const [woPhotos, setWoPhotos] = useState<string[]>(order?.wo_photos || []);
  const [uploadingWo, setUploadingWo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [kirimError, setKirimError] = useState("");
  const [zoomUrl, setZoomUrl] = useState<string | null>(null);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState({ x: 0, y: 0 });
  const zoomPinchRef = useRef<{ d: number; s: number } | null>(null);
  const zoomDragRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!zoomUrl) return;
    setZoomOpen(true);
    setZoomScale(1);
    setZoomOffset({ x: 0, y: 0 });
  }, [zoomUrl]);
  useEffect(() => {
    if (!zoomUrl) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomUrl(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomUrl]);
  useEffect(() => {
    if (!zoomUrl) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [zoomUrl]);

  useEffect(() => {
    if (order) {
      setStep(order.current_step);
      setNote(order.note || "");
      setCourier(order.courier || "");
      setResi(order.tracking_number || "");
      setDeadline(order.deadline ? order.deadline.slice(0, 10) : "");
      setWoPhotos(order.wo_photos || []);
    }
  }, [order]);

  const handleWoUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) { setKirimError("File harus gambar"); return; }
    if (file.size > 10 * 1024 * 1024) { setKirimError("Maksimal 10MB"); return; }
    setUploadingWo(true);
    setKirimError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      console.log("[Detail WO] file", file.name, file.type, file.size);
      const res = await fetch("/api/upload/design", { method: "POST", body: fd });
      const text = await res.text();
      console.log("[Detail WO] resp", res.status, text.slice(0, 600));
      let data: any = {};
      try { data = JSON.parse(text); } catch { data = { error: text.slice(0, 300) }; }
      if (!res.ok) { setKirimError(data.error || "Upload gagal"); console.error("[Detail WO] failed", data); return; }
      setWoPhotos((prev) => [...prev, data.url]);
    } catch (e) { console.error("[Detail WO] exception", e); setKirimError("Upload gagal"); } finally { setUploadingWo(false); }
  };

  if (!order) return null;

  const hasTracking = !!(courier && resi);
  const st =
    order.is_done
      ? "selesai"
      : step >= 9
        ? "kirim"
        : step <= 1
          ? "baru"
          : "produksi";

  const pct = getStepPct(step, hasTracking);

  const save = async () => {
    setKirimError("");
    if (step === 9 && (!courier || !resi)) {
      setKirimError("Untuk tahap Kirim, nomor resi dan ekspedisi harus diisi.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/pesanan/orders/${order.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_step: step,
          note,
          courier,
          tracking_number: resi,
          deadline: deadline || undefined,
          wo_photos: woPhotos,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setKirimError(data.error || "Gagal menyimpan");
        return;
      }
      onSaved("Perubahan tersimpan");
    } catch {
      onSaved("Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const markDone = async () => {
    setKirimError("");
    if (!courier || !resi) {
      setKirimError("Untuk menandai selesai, nomor resi dan ekspedisi harus diisi.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/pesanan/orders/${order.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_step: 9,
          is_done: true,
          note,
          courier,
          tracking_number: resi,
          wo_photos: woPhotos,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setKirimError(data.error || "Gagal menyimpan");
        return;
      }
      onSaved("Pesanan ditandai selesai");
    } catch {
      onSaved("Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pas-sheet open">
      <div className="pas-veil" onClick={onClose} />
      <div className="pas-panel p-5 sm:p-7">
        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="pas-avatar w-11 h-11 text-[15px] flex items-center justify-center shrink-0">
              {initials(order.customer_name)}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="pas-display text-[22px] leading-none">{order.id}</h2>
                <span className={`pas-pill ${st}`}>{FILTER_LABEL[st]}</span>
              </div>
              <p className="text-[13.5px] text-[var(--pas-muted)] mt-1.5 truncate">
                {order.customer_name} · {order.customer_city}
              </p>
              <p className="text-[13px] text-[var(--pas-muted)] pas-num">{order.customer_phone}</p>
            </div>
          </div>
          <button
            className="pas-btn-ghost px-3 py-2 text-sm text-[var(--pas-muted)] hover:text-[var(--pas-ink-1)] shrink-0"
            onClick={onClose}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── PROGRESS ── */}
        <div className="mt-5 p-4 rounded-2xl bg-[var(--pas-surface-2)] border border-[var(--pas-line)]">
          <div className="flex items-center justify-between">
            <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Progress Produksi</p>
            <p className="pas-display text-[16px] pas-num">{pct}%</p>
          </div>
          <span className="pas-bar mt-2.5" style={{ display: "block" }}>
            <i style={{ width: `${pct}%` }} />
          </span>
          <p className="text-[12.5px] text-[var(--pas-muted)] mt-2">
            Tahap sekarang: <span className="text-[var(--pas-ink-1)] font-medium">{steps[step - 1]?.name || `Tahap ${step}`}</span>
          </p>
        </div>

        {/* ── INFO GRID ── */}
        <div className="pas-card p-4 mt-4 grid grid-cols-2 gap-y-4 text-[14px]">
          {(order.products?.length ?? 0) > 0 ? (
            order.products!.map((p, pi) => (
              <div key={pi} className="col-span-2 rounded-xl border border-[var(--pas-line)] p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[14px]">{p.name}</p>
                  <span className="text-[12px] text-[var(--pas-muted)] pas-num">
                    {p.sizes.reduce((a, s) => a + (s.qty || 0), 0)} pcs
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {p.sizes.map((s, si) => (
                    <span
                      key={si}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium bg-[var(--pas-surface-2)] border border-[var(--pas-line)] text-[var(--pas-ink-1)]"
                    >
                      <span className="font-semibold">{s.size}</span>
                      <span className="text-[var(--pas-muted)] text-[11px]">·</span>
                      <span className="text-[var(--pas-muted)]">{s.qty}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <>
              <div>
                <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Produk</p>
                <p className="mt-1">{order.product_name}</p>
              </div>
              <div>
                <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Jumlah</p>
                <p className="mt-1">{order.quantity}</p>
              </div>
              <div>
                <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Ukuran</p>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {order.sizes
                    ? order.sizes.split(",").map((s, i) => {
                        const trimmed = s.trim();
                        const match = trimmed.match(/^([A-Za-z]+)\(?(\d*)\)?$/);
                        const label = match ? match[1] : trimmed;
                        const count = match && match[2] ? match[2] : null;
                        return (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium bg-[var(--pas-surface-2)] border border-[var(--pas-line)] text-[var(--pas-ink-1)]"
                          >
                            <span className="font-semibold">{label}</span>
                            {count && (
                              <>
                                <span className="text-[var(--pas-muted)] text-[11px]">·</span>
                                <span className="text-[var(--pas-muted)]">{count}</span>
                              </>
                            )}
                          </span>
                        );
                      })
                    : <span className="text-[var(--pas-muted)]">-</span>}
                </div>
              </div>
            </>
          )}
          <div>
            <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Tanggal Order</p>
            <p className="mt-1">{formatDate(order.created_at)}</p>
          </div>
          <div>
            <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Deadline</p>
            <p className="mt-1">{deadline ? formatDate(deadline) : "-"}</p>
          </div>
          <div>
            <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Status Produksi</p>
            <p className="mt-1">{steps[step - 1]?.name || `Tahap ${step}`}</p>
          </div>
          <div>
            <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Progress</p>
            <p className="mt-1">{pct}%</p>
          </div>
          {step === 9 && (courier || resi) && (
            <>
              <div>
                <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Ekspedisi</p>
                <p className="mt-1">{courier || "-"}</p>
              </div>
              <div>
                <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Nomor Resi</p>
                <p className="mt-1">{resi || "-"}</p>
              </div>
            </>
          )}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Preview Design</p>
              <div className="flex flex-wrap gap-2.5 mt-1.5">
                {(order.design_photos?.length ?? 0) > 0 ? order.design_photos!.map((url, i) => (
                  <button key={i} type="button" onClick={() => setZoomUrl(url)} className="group relative w-[76px] h-[76px] rounded-xl overflow-hidden border border-[var(--pas-line)] hover:border-[var(--pas-accent)] transition" title="Klik untuk memperbesar" aria-label={`Perbesar design ${i + 1}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Design ${i + 1}`} className="w-full h-full object-cover" />
                    <span className="pointer-events-none absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/55 text-white border border-white/15 opacity-90">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M11 8v6M8 11h6" /></svg>
                    </span>
                  </button>
                )) : <span className="text-[13px] text-[var(--pas-muted)]">Belum ada preview</span>}
              </div>
            </div>
            <div>
              <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">WO</p>
              <div className="flex flex-wrap gap-2.5 mt-1.5">
                {woPhotos.map((url, i) => (
                  <div key={i} className="relative w-[76px] h-[76px] rounded-xl overflow-hidden border border-[var(--pas-line)] group">
                    <button type="button" onClick={() => setZoomUrl(url)} className="w-full h-full" title="Klik untuk memperbesar" aria-label={`Perbesar WO ${i + 1}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`WO ${i + 1}`} className="w-full h-full object-cover" />
                      <span className="pointer-events-none absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/55 text-white border border-white/15 opacity-90">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M11 8v6M8 11h6" /></svg>
                      </span>
                    </button>
                    <button type="button" onClick={() => setWoPhotos((p) => p.filter((_, j) => j !== i))} className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-red-500 text-white text-[11px] leading-none border border-white shadow opacity-0 group-hover:opacity-100 transition" title="Hapus foto WO" aria-label="Hapus foto WO">×</button>
                  </div>
                ))}
                <label className="w-[76px] h-[76px] grid place-items-center rounded-xl border-2 border-dashed border-[var(--pas-line)] hover:border-[var(--pas-accent)] cursor-pointer transition text-[var(--pas-muted)] hover:text-[var(--pas-ink-1)]">
                  <input type="file" accept="image/*" className="hidden" disabled={uploadingWo} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleWoUpload(f); e.currentTarget.value = ""; }} />
                  <span className="text-[22px] leading-none">{uploadingWo ? "…" : "+"}</span>
                </label>
              </div>
              <p className="text-[11px] text-[var(--pas-muted)] mt-1.5">Admin only • tidak terlihat customer</p>
            </div>
          </div>
        </div>

        <p className="pas-stencil text-[9px] text-[var(--pas-muted)] mt-6">
          Update Tahap Produksi
        </p>
        <div className="mt-2 flex flex-col gap-1">
          {steps.map((s, i) => {
            const cls = i + 1 < step ? "done" : i + 1 === step ? "cur" : "";
            return (
              <button
                key={i}
                className={`pas-stepbtn ${cls}`}
                onClick={() => setStep(i + 1)}
              >
                <span className="pas-num">{i + 1}</span>
                {s.name}
              </button>
            );
          })}
        </div>

        <p className="pas-stencil text-[9px] text-[var(--pas-muted)] mt-6">
          Catatan untuk Customer
        </p>
        <textarea
          rows={3}
          className="pas-field w-full px-4 py-3 mt-2 text-[14px]"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="p-4 mt-4 rounded-2xl bg-[var(--pas-surface-2)] border border-[var(--pas-line)]">
          <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Data Pengiriman</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <input
              className="pas-field px-3 py-2.5 text-[14px]"
              placeholder="Ekspedisi (JNE — REG)"
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
            />
            <input
              className="pas-field px-3 py-2.5 text-[14px]"
              placeholder="No. Resi"
              value={resi}
              onChange={(e) => setResi(e.target.value)}
            />
          </div>
          {step < 9 && (
            <p className="text-[12px] text-[var(--pas-muted)] mt-2">
              Tampil ke customer setelah tahap 9 (Kirim).
            </p>
          )}
        </div>

        <div className="p-4 mt-4 rounded-2xl bg-[var(--pas-surface-2)] border border-[var(--pas-line)]">
          <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Tanggal Deadline</p>
          <input
            type="date"
            className="pas-field w-full px-3 py-2.5 mt-2 text-[14px]"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        {kirimError && (
          <p className="text-[13px] text-red-600 mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
            {kirimError}
          </p>
        )}

        <div className="flex gap-3 mt-5 pb-2">
          <button
            className="pas-btn-accent flex-1 py-3.5 text-[12px]"
            onClick={save}
            disabled={saving}
          >
            {saving ? "Menyimpan…" : "Simpan Perubahan"}
          </button>
          <button
            className="pas-btn-ghost px-4 text-sm text-[var(--pas-muted)]"
            onClick={markDone}
            disabled={saving}
          >
            Tandai Selesai
          </button>
        </div>
      </div>
      {zoomUrl && (
        <div
          className={`fixed inset-0 z-[80] grid place-items-center p-4 sm:p-6 bg-black/90 backdrop-blur-[2px] transition duration-200 ${zoomOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => { setZoomOpen(false); setTimeout(() => setZoomUrl(null), 200); }}
          onTouchMove={(e) => {
            if (zoomPinchRef.current && e.touches.length === 2) {
              e.preventDefault();
              const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
              const ratio = d / zoomPinchRef.current.d;
              setZoomScale(Math.min(4, Math.max(1, zoomPinchRef.current.s * ratio)));
            }
          }}
          onTouchStart={(e) => {
            if (e.touches.length === 2) {
              const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
              zoomPinchRef.current = { d, s: zoomScale };
            } else if (e.touches.length === 1 && zoomScale > 1) {
              zoomDragRef.current = { x: e.touches[0].clientX - zoomOffset.x, y: e.touches[0].clientY - zoomOffset.y };
            }
          }}
          onTouchEnd={() => { zoomPinchRef.current = null; zoomDragRef.current = null; if (zoomScale < 1) setZoomScale(1); }}
          role="dialog"
          aria-modal="true"
          aria-label="Preview desain diperbesar"
        >
          <button type="button" onClick={(e) => { e.stopPropagation(); setZoomOpen(false); setTimeout(() => setZoomUrl(null), 200); }} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white border border-white/15 hover:bg-white/20 transition z-10" aria-label="Tutup">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoomUrl} alt="Preview desain diperbesar" onClick={(e) => e.stopPropagation()} onWheel={(e) => { e.preventDefault(); const delta = e.deltaY > 0 ? -0.12 : 0.12; setZoomScale((s) => Math.min(4, Math.max(1, s + delta))); }} onTouchMove={(e) => { if (zoomDragRef.current && e.touches.length === 1 && zoomScale > 1) setZoomOffset({ x: e.touches[0].clientX - zoomDragRef.current.x, y: e.touches[0].clientY - zoomDragRef.current.y }); }} draggable={false} className={`max-w-[90vw] max-h-[90vh] object-contain select-none transition duration-200 ${zoomOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`} style={{ transform: `translate(${zoomOffset.x}px, ${zoomOffset.y}px) scale(${zoomScale})`, touchAction: "none" }} />
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[12px] text-white/60 text-center px-4">Tap luar gambar / Esc untuk tutup • Pinch/scroll untuk zoom</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ADD FORM
   ═══════════════════════════════════════════════ */
function AddForm({
  onSaved,
  onCancel,
}: {
  onSaved: (msg: string) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    deadline: "",
    created_at: new Date().toISOString().slice(0, 10),
  });
  const DEFAULT_PRODUCTS = ["Atasan Lengan Pendek", "Atasan Lengan Panjang", "Setelan Lengan Pendek", "Setelan Lengan Panjang"];
  const [productOptions, setProductOptions] = useState<string[]>(DEFAULT_PRODUCTS);
  const [designPhotos, setDesignPhotos] = useState<string[]>([]);
  const [woPhotos, setWoPhotos] = useState<string[]>([]);
  const [uploadingDesign, setUploadingDesign] = useState(false);
  const [uploadingWo, setUploadingWo] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Multi-product rows: each product has its own name and qty
  const [productRows, setProductRows] = useState<
    { product: string; custom: boolean; qty: string }[]
  >([
    { product: "", custom: false, qty: "" },
  ]);

  // Total qty across all products (auto-computed)
  const totalQty = productRows.reduce(
    (acc, p) => acc + (parseInt(p.qty, 10) || 0),
    0
  );

  // Load saved custom product options
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("pas_product_options") || "[]");
      if (Array.isArray(saved) && saved.length > 0) {
        setProductOptions(Array.from(new Set([...DEFAULT_PRODUCTS, ...saved])));
      }
    } catch {
      // silent
    }
  }, []);

  const updateProductRow = (rowIdx: number, patch: Partial<typeof productRows[0]>) =>
    setProductRows((rows) => rows.map((r, i) => (i === rowIdx ? { ...r, ...patch } : r)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate: at least one product row with a name and qty
    const validRows = productRows.filter(
      (p) => p.product.trim() && p.qty.trim()
    );
    if (!form.customer_name || !form.customer_phone || validRows.length === 0) {
      setError("Isi nama, HP, dan minimal 1 produk dengan jumlahnya.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      // Build structured products + backward-compat fields
      const products = validRows.map((p) => ({
        name: p.product.trim(),
        sizes: [{ size: "ALL", qty: parseInt(p.qty, 10) || 0 }],
      }));
      const totalPcs = products.reduce((a, p) => a + p.sizes.reduce((x, s) => x + s.qty, 0), 0);
      const combinedNames = products.map((p) => p.name).join(", ");
      const combinedSizes = products
        .flatMap((p) => p.sizes.map((s) => `${p.name}/${s.size}(${s.qty})`))
        .join(", ");

      const res = await fetch("/api/pesanan/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.customer_name,
          customer_phone: form.customer_phone,
          product_name: combinedNames,
          quantity: totalPcs > 0 ? String(totalPcs) : "-",
          sizes: combinedSizes,
          products,
          design_photos: designPhotos,
          wo_photos: woPhotos,
          deadline: form.deadline || undefined,
          created_at: form.created_at ? new Date(form.created_at).toISOString() : undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal menyimpan");
        return;
      }
      // Persist custom products to saved options (localStorage)
      const newProducts = validRows
        .map((p) => p.product.trim())
        .filter((n) => n && !productOptions.includes(n));
      if (newProducts.length > 0) {
        try {
          const saved = JSON.parse(localStorage.getItem("pas_product_options") || "[]");
          const merged = Array.from(new Set([...saved, ...DEFAULT_PRODUCTS, ...newProducts]));
          localStorage.setItem("pas_product_options", JSON.stringify(merged));
          setProductOptions(merged);
        } catch {
          setProductOptions((o) => [...o, ...newProducts]);
        }
      }
      onSaved("Pesanan ditambahkan");
    } catch {
      setError("Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <div className="pas-card p-3.5 bg-[var(--pas-surface-2)]">
        <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Nomor Pesanan</p>
        <p className="text-[14px] mt-1 text-[var(--pas-muted)] leading-relaxed">
          Nomor order digenerate otomatis saat disimpan
          <span className="text-[var(--pas-muted)]"> (format: TNTYYMMDDXXXX)</span>
        </p>
      </div>
      <label className="block">
        <span className="text-[13px] text-[var(--pas-muted)]">Nama Customer</span>
        <input
          required
          className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
          placeholder="Nama"
          value={form.customer_name}
          onChange={set("customer_name")}
        />
      </label>
      <label className="block">
        <span className="text-[13px] text-[var(--pas-muted)]">Nomor HP</span>
        <input
          required
          className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
          placeholder="0812xxxxxxx"
          value={form.customer_phone}
          onChange={set("customer_phone")}
        />
      </label>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[var(--pas-muted)]">Produk</span>
          {totalQty > 0 && (
            <span className="text-[12px] text-[var(--pas-accent)] font-semibold pas-num">
              Total: {totalQty} pcs
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-1.5">
          {productRows.map((pRow, pi) => {
            return (
              <div
                key={pi}
                className="flex items-center gap-2 rounded-xl border border-[var(--pas-line)] p-3 bg-[var(--pas-surface-2)]"
              >
                {/* Product selector */}
                {pRow.custom ? (
                  <input
                    autoFocus
                    className="pas-field flex-1 px-4 py-2.5 text-[15px]"
                    placeholder="Nama produk custom"
                    value={pRow.product}
                    onChange={(e) => updateProductRow(pi, { product: e.target.value })}
                  />
                ) : (
                  <select
                    className="pas-field flex-1 px-4 py-2.5 text-[15px] appearance-none"
                    value={pRow.product}
                    onChange={(e) => {
                      if (e.target.value === "__custom__") {
                        updateProductRow(pi, { custom: true, product: "" });
                      } else {
                        updateProductRow(pi, { product: e.target.value });
                      }
                    }}
                  >
                    <option value="" disabled>
                      Pilih produk…
                    </option>
                    {productOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                    <option value="__custom__">+ Tambah sendiri…</option>
                  </select>
                )}
                {/* Qty */}
                <input
                  className="pas-field w-[84px] px-3 py-2.5 text-[15px]"
                  placeholder="Qty"
                  inputMode="numeric"
                  value={pRow.qty}
                  onChange={(e) => updateProductRow(pi, { qty: e.target.value })}
                />
                {pRow.custom && (
                  <button
                    type="button"
                    className="pas-btn-ghost px-2.5 py-2 text-[12px] shrink-0"
                    title="Kembali ke daftar pilihan"
                    onClick={() => updateProductRow(pi, { custom: false, product: "" })}
                  >
                    List
                  </button>
                )}
                {productRows.length > 1 && (
                  <button
                    type="button"
                    className="p-2 rounded-lg text-[var(--pas-muted)] hover:text-red-400 hover:bg-red-400/10 transition shrink-0"
                    title="Hapus produk ini"
                    onClick={() => setProductRows((rows) => rows.filter((_, idx) => idx !== pi))}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="pas-btn-ghost w-full py-2.5 text-[13px] mt-2"
          onClick={() =>
            setProductRows((rows) => [
              ...rows,
              { product: "", custom: false, qty: "" },
            ])
          }
        >
          + Tambah Produk
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="text-[13px] text-[var(--pas-muted)]">Preview Design</span>
        <div className="flex flex-wrap gap-2.5 mt-1.5">
          {designPhotos.map((url, i) => (
            <div key={i} className="relative w-[76px] h-[76px] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Design ${i + 1}`} className="w-full h-full object-cover rounded-xl border border-[var(--pas-line)]" />
              <button type="button" className="absolute top-1 right-1 w-[22px] h-[22px] rounded-full bg-black/70 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition" title="Hapus foto" onClick={() => setDesignPhotos((ps) => ps.filter((_, idx) => idx !== i))}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
          <button type="button" className="w-[76px] h-[76px] rounded-xl border border-dashed border-[var(--pas-line)] grid place-items-center text-[var(--pas-muted)] hover:text-[var(--pas-accent)] hover:border-[var(--pas-accent)] transition" title="Upload foto desain" disabled={uploadingDesign} onClick={() => document.getElementById("design-photo-input")?.click()}>
            {uploadingDesign ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-3.2-6.9" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>}
          </button>
        </div>
        <input id="design-photo-input" type="file" accept="image/*" multiple className="hidden" onChange={async (e) => {
            const files = Array.from(e.target.files || []);
            e.target.value = "";
            if (files.length === 0) return;
            setUploadingDesign(true);
            try {
              for (const file of files) {
                console.log("[upload Design] file", file.name, file.type, file.size);
                const fd = new FormData();
                fd.append("file", file);
                const res = await fetch("/api/upload/design", { method: "POST", body: fd });
                const text = await res.text();
                console.log("[upload Design] resp", res.status, text.slice(0, 600));
                let data: any = {};
                try { data = JSON.parse(text); } catch { data = { error: text.slice(0, 300) }; }
                if (!res.ok) { setError(data.error || "Upload gagal"); console.error("[upload Design] failed", data); return; }
                setDesignPhotos((ps) => [...ps, data.url]);
              }
            } catch (e) { console.error("[upload Design] exception", e); setError("Upload gagal. Coba lagi."); } finally { setUploadingDesign(false); }
          }}
        />
      </div>
      <div>
        <span className="text-[13px] text-[var(--pas-muted)]">WO</span>
        <p className="text-[11px] text-[var(--pas-muted)] -mt-0.5">Admin only</p>
        <div className="flex flex-wrap gap-2.5 mt-1.5">
          {woPhotos.map((url, i) => (
            <div key={i} className="relative w-[76px] h-[76px] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`WO ${i + 1}`} className="w-full h-full object-cover rounded-xl border border-[var(--pas-line)]" />
              <button type="button" className="absolute top-1 right-1 w-[22px] h-[22px] rounded-full bg-black/70 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition" title="Hapus foto WO" onClick={() => setWoPhotos((ps) => ps.filter((_, idx) => idx !== i))}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
          <button type="button" className="w-[76px] h-[76px] rounded-xl border border-dashed border-[var(--pas-line)] grid place-items-center text-[var(--pas-muted)] hover:text-[var(--pas-accent)] hover:border-[var(--pas-accent)] transition" title="Upload foto WO" disabled={uploadingWo} onClick={() => document.getElementById("wo-photo-input")?.click()}>
            {uploadingWo ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-3.2-6.9" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>}
          </button>
        </div>
        <input id="wo-photo-input" type="file" accept="image/*" multiple className="hidden" onChange={async (e) => {
            const files = Array.from(e.target.files || []);
            e.target.value = "";
            if (files.length === 0) return;
            setUploadingWo(true);
            try {
              for (const file of files) {
                console.log("[upload Wo] file", file.name, file.type, file.size);
                const fd = new FormData();
                fd.append("file", file);
                const res = await fetch("/api/upload/design", { method: "POST", body: fd });
                const text = await res.text();
                console.log("[upload Wo] resp", res.status, text.slice(0, 600));
                let data: any = {};
                try { data = JSON.parse(text); } catch { data = { error: text.slice(0, 300) }; }
                if (!res.ok) { setError(data.error || "Upload gagal"); console.error("[upload Wo] failed", data); return; }
                setWoPhotos((ps) => [...ps, data.url]);
              }
            } catch (e) { console.error("[upload Wo] exception", e); setError("Upload gagal. Coba lagi."); } finally { setUploadingWo(false); }
          }}
        />
      </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-[13px] text-[var(--pas-muted)]">Tanggal Order</span>
          <input
            type="date"
            className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
            value={form.created_at}
            onChange={set("created_at")}
          />
        </label>
        <label className="block">
          <span className="text-[13px] text-[var(--pas-muted)]">Tanggal Deadline</span>
          <input
            type="date"
            className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
            value={form.deadline}
            onChange={set("deadline")}
          />
        </label>
      </div>
      {error && <p className="text-[13px] text-[#f87171]">{error}</p>}
      <button className="pas-btn-accent w-full py-3.5 text-[15px]" disabled={saving}>
        {saving ? "Menyimpan…" : "Simpan Pesanan"}
      </button>
    </form>
  );
}
