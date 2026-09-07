"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

type StepRow = { id: string; name: string; position: number };

const DEFAULT_STEPS: StepRow[] = [
  { id: "", name: "Order Diterima", position: 1 },
  { id: "", name: "Desain Dikonfirmasi", position: 2 },
  { id: "", name: "Produksi Bahan", position: 3 },
  { id: "", name: "Printing / Sublimasi", position: 4 },
  { id: "", name: "Cutting", position: 5 },
  { id: "", name: "Jahit", position: 6 },
  { id: "", name: "Quality Control", position: 7 },
  { id: "", name: "Finishing", position: 8 },
  { id: "", name: "Packing", position: 9 },
  { id: "", name: "Siap Dikirim", position: 10 },
];

const LANES = [
  { name: "Antre & Desain", from: 1, to: 2 },
  { name: "Produksi", from: 3, to: 6 },
  { name: "QC & Finishing", from: 7, to: 9 },
  { name: "Siap Dikirim", from: 10, to: 10 },
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
  current_step: number;
  note: string;
  note_time: string;
  courier: string;
  tracking_number: string;
  is_done: boolean;
  created_at: string;
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

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function PesananDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
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
            <span className="block pas-display text-[15px]">TNT Sport</span>
            <span className="block text-[11px] text-[var(--pas-muted)] mt-[3px]">
              Admin Panel
            </span>
          </span>
        </a>
        <p className="pas-navsec">Operasional</p>
        <nav className="flex flex-col gap-1">
          {(
            [
              ["pesanan", "▤", "Pesanan"],
              ["jadwal", "◷", "Jadwal Produksi"],
              ["kirim", "➜", "Pengiriman"],
            ] as [ViewKey, string, string][]
          ).map(([key, icon, label]) => (
            <a
              key={key}
              className={`pas-navlink ${currentView === key ? "on" : ""}`}
              href={`#${key}`}
              onClick={(e) => {
                e.preventDefault();
                switchView(key);
              }}
            >
              <span className="pas-ic">{icon}</span> {label}
            </a>
          ))}
        </nav>
        <p className="pas-navsec">Data</p>
        <nav className="flex flex-col gap-1">
          {(
            [
              ["customer", "☺", "Customer"],
              ["laporan", "◧", "Laporan"],
              ["setting", "⚙", "Pengaturan"],
            ] as [ViewKey, string, string][]
          ).map(([key, icon, label]) => (
            <a
              key={key}
              className={`pas-navlink ${currentView === key ? "on" : ""}`}
              href={`#${key}`}
              onClick={(e) => {
                e.preventDefault();
                switchView(key);
              }}
            >
              <span className="pas-ic">{icon}</span> {label}
            </a>
          ))}
        </nav>
        <div className="mt-auto pas-card p-3 flex items-center gap-3">
          <span className="pas-avatar">AD</span>
          <span className="leading-tight">
            <span className="block text-[13.5px] font-semibold">Admin TNT</span>
            <span className="block text-[11.5px] text-[var(--pas-muted)]">
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
            <div className="flex items-center gap-2.5">
              <button
                className="pas-btn-ghost px-3 py-2 text-[13px] lg:hidden"
                onClick={() => setShowMobileNav(true)}
              >
                Menu
              </button>
              <span className="hidden sm:inline text-[12.5px] text-[var(--pas-muted)]">
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              {currentView === "pesanan" && (
                <button
                  onClick={() => setShowAdd(true)}
                  className="pas-btn-accent px-4 py-2.5 text-[14px]"
                >
                  + Pesanan
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
          {currentView === "pesanan" && (
            <ViewPesanan
              orders={orders}
              filter={filter}
              setFilter={setFilter}
              query={query}
              setQuery={setQuery}
              openDetail={setOpenId}
              steps={steps}
            />
          )}
          {currentView === "jadwal" && <ViewJadwal orders={orders} openDetail={setOpenId} steps={steps} />}
          {currentView === "kirim" && <ViewKirim orders={orders} openDetail={setOpenId} steps={steps} />}
          {currentView === "customer" && <ViewCustomer orders={orders} openDetail={setOpenId} />}
          {currentView === "laporan" && <ViewLaporan orders={orders} />}
          {currentView === "setting" && <ViewSetting showToast={showToast} steps={steps} onStepsSaved={fetchSteps} />}
        </main>
      </div>

      {/* ── MOBILE NAV ── */}
      {showMobileNav && (
        <div className="pas-sheet open">
          <div className="pas-veil" onClick={closeAll} />
          <div
            className="pas-panel p-5"
            style={{
              left: 0,
              right: "auto",
              width: "min(280px, 86%)",
              borderLeft: "none",
              borderRight: "1px solid var(--pas-line)",
            }}
          >
            <p className="pas-navsec">Operasional</p>
            <nav className="flex flex-col gap-1">
              {(
                [
                  ["pesanan", "▤", "Pesanan"],
                  ["jadwal", "◷", "Jadwal Produksi"],
                  ["kirim", "➜", "Pengiriman"],
                ] as [ViewKey, string, string][]
              ).map(([key, icon, label]) => (
                <a
                  key={key}
                  className={`pas-navlink ${currentView === key ? "on" : ""}`}
                  href={`#${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    switchView(key);
                  }}
                >
                  <span className="pas-ic">{icon}</span> {label}
                </a>
              ))}
            </nav>
            <p className="pas-navsec">Data</p>
            <nav className="flex flex-col gap-1">
              {(
                [
                  ["customer", "☺", "Customer"],
                  ["laporan", "◧", "Laporan"],
                  ["setting", "⚙", "Pengaturan"],
                ] as [ViewKey, string, string][]
              ).map(([key, icon, label]) => (
                <a
                  key={key}
                  className={`pas-navlink ${currentView === key ? "on" : ""}`}
                  href={`#${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    switchView(key);
                  }}
                >
                  <span className="pas-ic">{icon}</span> {label}
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
}: {
  orders: OrderData[];
  filter: FilterKey;
  setFilter: (f: FilterKey) => void;
  query: string;
  setQuery: (q: string) => void;
  openDetail: (id: string) => void;
  steps: StepRow[];
}) {
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

  return (
    <>
      {/* KPI */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        <div className="pas-card pas-kpi p-4 sm:p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Total Pesanan</p>
          <div className="flex items-end gap-2.5 mt-2.5">
            <p className="pas-display pas-num text-[30px] leading-none">{stats.total}</p>
            <span className="pas-delta up mb-0.5">+2 minggu ini</span>
          </div>
        </div>
        <div className="pas-card pas-kpi p-4 sm:p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Sedang Produksi</p>
          <div className="flex items-end gap-2.5 mt-2.5">
            <p className="pas-display pas-num text-[30px] leading-none text-[var(--pas-accent)]">
              {stats.produksi}
            </p>
            <span className="pas-delta flat mb-0.5">on track</span>
          </div>
        </div>
        <div className="pas-card pas-kpi p-4 sm:p-5">
          <p className="text-[13px] text-[var(--pas-muted)]">Siap Dikirim</p>
          <div className="flex items-end gap-2.5 mt-2.5">
            <p className="pas-display pas-num text-[30px] leading-none text-[#8fb0f7]">
              {stats.kirim}
            </p>
            <span className="pas-delta flat mb-0.5">perlu resi</span>
          </div>
        </div>
        <div className="pas-card pas-kpi p-4 sm:p-5">
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
        <div className="overflow-x-auto -mx-1 px-1">
          <div className="pas-seg">
            {(["all", "baru", "produksi", "kirim", "selesai"] as FilterKey[]).map((f) => (
              <button
                key={f}
                className={`pas-chip ${filter === f ? "on" : ""}`}
                onClick={() => setFilter(f)}
              >
                {FILTER_LABEL[f]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* table (desktop) */}
      <section className="pas-card mt-4 p-2 sm:p-4 hidden md:block w-full overflow-x-auto">
        <table className="pas-tbl w-full">
          <thead>
            <tr>
              <th className="w-[20%]">Pesanan</th>
              <th className="w-[25%]">Customer</th>
              <th className="w-[25%]">Produk</th>
              <th className="w-[20%]">Progres</th>
              <th className="w-[10%]">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5}>
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
              const pct = Math.round((o.current_step / steps.length) * 100);
              const ini = initials(o.customer_name);
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
                        {o.current_step}/10
                      </span>
                    </div>
                    <span className="text-[12.5px] text-[var(--pas-muted)]">
                      {steps[o.current_step - 1]?.name || `Tahap ${o.current_step}`}
                    </span>
                  </td>
                  <td>
                    <span className={`pas-pill ${st}`}>{FILTER_LABEL[st]}</span>
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
          const pct = Math.round((o.current_step / steps.length) * 100);
          return (
            <button
              key={o.id}
              className="pas-card p-4 text-left"
              onClick={() => openDetail(o.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[15px] pas-num">{o.id}</p>
                  <p className="text-[13px] text-[var(--pas-muted)] mt-0.5">
                    {o.customer_name} · {o.customer_city}
                  </p>
                </div>
                <span className={`pas-pill ${st}`}>{FILTER_LABEL[st]}</span>
              </div>
              <p className="text-[13px] text-[var(--pas-muted)] mt-3">
                {o.product_name} · {o.quantity}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="pas-mini" style={{ flex: 1, width: "auto" }}>
                  <i style={{ width: `${pct}%` }} />
                </span>
                <span className="text-[12px] text-[var(--pas-muted)]">
                  {o.current_step}/10
                </span>
              </div>
            </button>
          );
        })}
      </section>

      <p className="text-[12px] text-[var(--pas-muted)] mt-6">
        Data tersimpan di database — perubahan langsung terlihat customer.
      </p>
    </>
  );
}

/* ═══════════════════════════════════════════════
   VIEW: JADWAL PRODUKSI (kanban lanes)
   ═══════════════════════════════════════════════ */
function ViewJadwal({
  orders,
  openDetail,
  steps,
}: {
  orders: OrderData[];
  openDetail: (id: string) => void;
  steps: StepRow[];
}) {
  const active = orders.filter((o) => !o.is_done);

  return (
    <>
      <p className="text-[14px] text-[var(--pas-muted)] mb-5">
        Papan produksi — pesanan dikelompokkan per fase. Klik kartu untuk update tahap.
      </p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 overflow-x-auto">
        {LANES.map((lane) => {
          const items = active.filter(
            (o) => o.current_step >= lane.from && o.current_step <= lane.to
          );
          return (
            <div key={lane.name} className="flex flex-col gap-2.5 min-w-[230px]">
              <div className="flex items-center justify-between px-1">
                <p className="text-[13px] font-semibold">{lane.name}</p>
                <span className="pas-delta flat">{items.length}</span>
              </div>
              {items.length === 0 ? (
                <p className="text-[12.5px] text-[var(--pas-muted)] px-1 py-6 text-center">
                  Kosong
                </p>
              ) : (
                items.map((o) => {
                  const pct = Math.round((o.current_step / 10) * 100);
                  return (
                    <button
                      key={o.id}
                      className="pas-card p-3.5 w-full text-left"
                      onClick={() => openDetail(o.id)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-[13.5px] pas-num">{o.id}</span>
                        <span className="text-[11.5px] text-[var(--pas-muted)] pas-num">
                          {o.current_step}/10
                        </span>
                      </div>
                      <p className="text-[12.5px] text-[var(--pas-muted)] mt-1">
                        {o.customer_name} · {o.quantity}
                      </p>
                      <p className="text-[12.5px] mt-2">{steps[o.current_step - 1]?.name || `Tahap ${o.current_step}`}</p>
                      <span className="pas-mini mt-2" style={{ width: "100%", display: "block" }}>
                        <i style={{ width: `${pct}%` }} />
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
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
   VIEW: CUSTOMER
   ═══════════════════════════════════════════════ */
function ViewCustomer({
  orders,
  openDetail,
}: {
  orders: OrderData[];
  openDetail: (id: string) => void;
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
      <div className="pas-card p-2 sm:p-4 overflow-x-auto">
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
                <tr key={k} onClick={() => openDetail(c.orders[0])}>
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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (order) {
      setStep(order.current_step);
      setNote(order.note || "");
      setCourier(order.courier || "");
      setResi(order.tracking_number || "");
    }
  }, [order]);

  if (!order) return null;

  const st =
    order.is_done
      ? "selesai"
      : step >= 10
        ? "kirim"
        : step <= 1
          ? "baru"
          : "produksi";

  const pct = Math.round((step / steps.length) * 100);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`/api/pesanan/orders/${order.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_step: step,
          note,
          courier,
          tracking_number: resi,
        }),
      });
      onSaved("Perubahan tersimpan");
    } catch {
      onSaved("Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const markDone = async () => {
    setSaving(true);
    try {
      await fetch(`/api/pesanan/orders/${order.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_step: 10,
          is_done: true,
          note,
          courier,
          tracking_number: resi,
        }),
      });
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="pas-stencil text-[9px] text-[var(--pas-accent)]">
              {FILTER_LABEL[st]}
            </p>
            <h2 className="pas-display text-[24px] mt-2">{order.id}</h2>
            <p className="text-[14px] text-[var(--pas-muted)] mt-1">
              {order.customer_name} · {order.customer_city} · {order.customer_phone}
            </p>
          </div>
          <button
            className="pas-btn-ghost px-3 py-2 text-sm text-[var(--pas-muted)]"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>

        <div className="pas-card p-4 mt-5 grid grid-cols-2 gap-y-3 text-[14px]">
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
          <div>
            <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Bahan</p>
            <p className="mt-1">{order.material || "-"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <span className="pas-bar" style={{ flex: 1 }}>
            <i style={{ width: `${pct}%` }} />
          </span>
          <span className="pas-display text-[14px]">{pct}%</span>
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

        <div className="pas-card p-4 mt-4">
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
          {step < 10 && (
            <p className="text-[12px] text-[var(--pas-muted)] mt-2">
              Tampil ke customer setelah tahap 10 (Siap Dikirim).
            </p>
          )}
        </div>

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
    id: "",
    customer_name: "",
    customer_city: "",
    customer_phone: "",
    product_name: "",
    quantity: "",
    material: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.id ||
      !form.customer_name ||
      !form.customer_city ||
      !form.customer_phone ||
      !form.product_name
    ) {
      setError("Semua field wajib diisi.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/pesanan/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: form.id.toUpperCase(),
          customer_name: form.customer_name,
          customer_city: form.customer_city,
          customer_phone: form.customer_phone,
          product_name: form.product_name,
          quantity: form.quantity || "-",
          material: form.material || "-",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal menyimpan");
        return;
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
      <label className="block">
        <span className="text-[13px] text-[var(--pas-muted)]">Nomor Pesanan</span>
        <input
          required
          className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
          placeholder="TNT-260907-003"
          value={form.id}
          onChange={set("id")}
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
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
          <span className="text-[13px] text-[var(--pas-muted)]">Kota</span>
          <input
            required
            className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
            placeholder="Bandung"
            value={form.customer_city}
            onChange={set("customer_city")}
          />
        </label>
      </div>
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
      <label className="block">
        <span className="text-[13px] text-[var(--pas-muted)]">Produk</span>
        <input
          required
          className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
          placeholder="Jersey Full Print"
          value={form.product_name}
          onChange={set("product_name")}
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-[13px] text-[var(--pas-muted)]">Jumlah</span>
          <input
            className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
            placeholder="18 pcs"
            value={form.quantity}
            onChange={set("quantity")}
          />
        </label>
        <label className="block">
          <span className="text-[13px] text-[var(--pas-muted)]">Bahan</span>
          <input
            className="pas-field w-full px-4 py-2.5 mt-1.5 text-[15px]"
            placeholder="Dryfit Milano"
            value={form.material}
            onChange={set("material")}
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
