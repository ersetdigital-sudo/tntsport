"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import {
  Plus,
  Search,
  Package,
  ChevronDown,
  ChevronUp,
  Upload,
  X,
  ExternalLink,
  Clock,
} from "lucide-react";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_LIST,
  ORDER_PHOTO_STAGES,
  type OrderStatus,
} from "@/lib/types";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  product_type: string;
  quantity: number;
  sizes: string;
  custom_name: string;
  custom_number: string;
  design_notes: string;
  current_status: OrderStatus;
  tracking_number: string;
  courier: string;
  delay_reason: string;
  delay_estimated_date: string;
  created_at: string;
  updated_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  order_diterima: "bg-info/10 text-info",
  desain_dikonfirmasi: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  produksi_bahan: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  printing_sublimasi: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  cutting: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  jahit: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  quality_control: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  finishing: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  packing: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  siap_dikirim: "bg-success/10 text-success",
};

export function AdminOrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      !search ||
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search);
    const matchesStatus =
      statusFilter === "all" || o.current_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col gap-xl animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-lg">
        <div>
          <h2 className="text-heading-lg text-ink font-bold">
            Kelola Pesanan
          </h2>
          <p className="text-body-sm text-stone mt-xs">
            {orders.length} pesanan total
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="text-button-md inline-flex h-10 items-center justify-center gap-sm rounded-full bg-primary px-lg text-on-primary hover:bg-secondary transition-colors duration-normal"
        >
          <Plus className="w-4 h-4" />
          Pesanan Baru
        </button>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <CreateOrderForm
          onClose={() => setShowCreateForm(false)}
          onCreated={() => {
            setShowCreateForm(false);
            fetchOrders();
          }}
        />
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-md">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nomor pesanan, nama, atau HP..."
            className="w-full bg-surface-card text-ink rounded-lg pl-10 pr-md py-2.5 border border-hairline text-body-sm placeholder:text-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary dark:bg-surface-dark dark:border-hairline"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-surface-card text-ink rounded-lg px-md py-2.5 border border-hairline text-body-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary dark:bg-surface-dark dark:border-hairline"
        >
          <option value="all">Semua Status</option>
          {ORDER_STATUS_LIST.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {/* Orders List */}
      {loading ? (
        <p className="text-body-sm text-stone">Memuat data...</p>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-surface-card rounded-xl p-xl border border-hairline text-center">
          <Package className="w-10 h-10 text-stone mx-auto mb-md" />
          <p className="text-body-sm text-stone">
            {orders.length === 0
              ? "Belum ada pesanan. Klik 'Pesanan Baru' untuk menambah."
              : "Tidak ada pesanan yang cocok dengan pencarian."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-md">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              expanded={expandedOrder === order.id}
              onToggle={() =>
                setExpandedOrder(
                  expandedOrder === order.id ? null : order.id
                )
              }
              onStatusUpdated={() => {
                fetchOrders();
                setExpandedOrder(null);
              }}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({
  order,
  expanded,
  onToggle,
  onStatusUpdated,
  formatDate,
}: {
  order: Order;
  expanded: boolean;
  onToggle: () => void;
  onStatusUpdated: () => void;
  formatDate: (d: string) => string;
}) {
  return (
    <div className="bg-surface-card rounded-xl border border-hairline overflow-hidden">
      {/* Main row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-md p-lg text-left hover:bg-surface/50 transition-colors"
      >
        <div className="flex items-center gap-md min-w-0 flex-1">
          <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-on-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-body-md text-ink font-bold font-mono truncate">
              {order.order_number}
            </p>
            <p className="text-caption text-stone truncate">
              {order.customer_name} · {order.customer_phone}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-md shrink-0">
          <span
            className={`text-button-sm px-sm py-1 rounded-full ${
              STATUS_COLORS[order.current_status] || "bg-surface text-stone"
            }`}
          >
            {ORDER_STATUS_LABELS[order.current_status]}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-stone" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone" />
          )}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-hairline p-lg bg-surface/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mb-lg">
            <DetailField label="Jenis Produk" value={order.product_type} />
            <DetailField label="Jumlah" value={`${order.quantity} pcs`} />
            <DetailField label="Ukuran" value={order.sizes} />
            <DetailField label="Nama Custom" value={order.custom_name} />
            <DetailField label="Nomor Custom" value={order.custom_number} />
            <DetailField label="Tanggal Order" value={formatDate(order.created_at)} />
            {order.tracking_number && (
              <DetailField label="No. Resi" value={order.tracking_number} />
            )}
            {order.courier && (
              <DetailField label="Ekspedisi" value={order.courier} />
            )}
            {order.design_notes && (
              <DetailField label="Catatan" value={order.design_notes} />
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-md">
            <a
              href={`/track/${order.order_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-button-sm inline-flex items-center gap-sm h-9 px-md rounded-lg border border-hairline bg-white text-charcoal hover:bg-surface transition-colors dark:bg-surface-dark dark:border-hairline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Lihat Halaman Tracking
            </a>
            <StatusUpdateForm
              orderId={order.id}
              currentStatus={order.current_status}
              onUpdated={onStatusUpdated}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-caption text-stone uppercase tracking-wider">{label}</p>
      <p className="text-body-sm text-ink font-semibold mt-0.5">{value || "-"}</p>
    </div>
  );
}

function StatusUpdateForm({
  orderId,
  currentStatus,
  onUpdated,
}: {
  orderId: string;
  currentStatus: OrderStatus;
  onUpdated: () => void;
}) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [note, setNote] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courier, setCourier] = useState("");
  const [delayReason, setDelayReason] = useState("");
  const [delayDate, setDelayDate] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const showPhotoField = ORDER_PHOTO_STAGES.includes(status);
  const showShippingFields = status === "kirim";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        const body: Record<string, any> = { status };
        if (note) body.note = note;
        if (photoUrl) body.photoUrl = photoUrl;
        if (showShippingFields) {
          if (trackingNumber) body.trackingNumber = trackingNumber;
          if (courier) body.courier = courier;
        }
        if (delayReason) body.delayReason = delayReason;
        if (delayDate) body.delayEstimatedDate = delayDate;

        const res = await fetch(`/api/admin/orders/${orderId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Gagal update status");
          return;
        }

        onUpdated();
      } catch {
        setError("Terjadi kesalahan");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="flex flex-col gap-sm">
        <div className="flex flex-wrap gap-sm">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="bg-white text-ink rounded-lg px-md py-2 border border-hairline text-body-sm dark:bg-surface-dark dark:border-hairline flex-1 min-w-[180px]"
          >
            {ORDER_STATUS_LIST.map((s) => (
              <option key={s} value={s}>
                {ORDER_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={pending}
            className="text-button-sm inline-flex h-9 items-center justify-center rounded-lg bg-primary px-md text-on-primary hover:bg-secondary transition-colors disabled:opacity-40"
          >
            {pending ? "Updating..." : "Update Status"}
          </button>
        </div>

        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Catatan (opsional)"
          className="bg-white text-ink rounded-lg px-md py-2 border border-hairline text-body-sm placeholder:text-stone dark:bg-surface-dark dark:border-hairline"
        />

        {showPhotoField && (
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="URL foto (opsional)"
            className="bg-white text-ink rounded-lg px-md py-2 border border-hairline text-body-sm placeholder:text-stone dark:bg-surface-dark dark:border-hairline"
          />
        )}

        {showShippingFields && (
          <div className="flex gap-sm">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Nomor resi"
              className="bg-white text-ink rounded-lg px-md py-2 border border-hairline text-body-sm placeholder:text-stone dark:bg-surface-dark dark:border-hairline flex-1"
            />
            <select
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              className="bg-white text-ink rounded-lg px-md py-2 border border-hairline text-body-sm dark:bg-surface-dark dark:border-hairline"
            >
              <option value="">Ekspedisi</option>
              <option value="JNE">JNE</option>
              <option value="J&T">J&T</option>
              <option value="SiCepat">SiCepat</option>
              <option value="AnterAja">AnterAja</option>
              <option value="TIKI">TIKI</option>
              <option value="Pos">Pos Indonesia</option>
            </select>
          </div>
        )}

        <div className="flex gap-sm">
          <input
            type="text"
            value={delayReason}
            onChange={(e) => setDelayReason(e.target.value)}
            placeholder="Alasan delay (opsional)"
            className="bg-white text-ink rounded-lg px-md py-2 border border-hairline text-body-sm placeholder:text-stone dark:bg-surface-dark dark:border-hairline flex-1"
          />
          <input
            type="date"
            value={delayDate}
            onChange={(e) => setDelayDate(e.target.value)}
            className="bg-white text-ink rounded-lg px-md py-2 border border-hairline text-body-sm dark:bg-surface-dark dark:border-hairline"
          />
        </div>

        {error && (
          <p className="text-caption text-danger">{error}</p>
        )}
      </div>
    </form>
  );
}

function CreateOrderForm({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    productType: "jersey",
    quantity: 1,
    sizes: "",
    customName: "",
    customNumber: "",
    designNotes: "",
  });
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Gagal membuat pesanan");
          return;
        }

        onCreated();
      } catch {
        setError("Terjadi kesalahan");
      }
    });
  }

  function updateField(name: string, value: string | number) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const inputClass =
    "bg-white text-ink rounded-lg px-md py-2.5 border border-hairline-strong text-body-sm placeholder:text-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-1 dark:bg-surface-dark dark:text-on-dark dark:border-hairline w-full";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface-card rounded-2xl p-xl border border-hairline shadow-premium-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-lg">
          <h3 className="text-heading-md text-ink">Pesanan Baru</h3>
          <button
            onClick={onClose}
            className="p-xs text-stone hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          {error && (
            <div className="bg-danger/5 border border-danger/20 rounded-lg px-md py-sm text-caption text-danger">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-caption font-semibold text-ink uppercase tracking-wider">
              Nama Customer *
            </label>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => updateField("customerName", e.target.value)}
              placeholder="Nama lengkap"
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-caption font-semibold text-ink uppercase tracking-wider">
              Nomor HP *
            </label>
            <input
              type="tel"
              value={form.customerPhone}
              onChange={(e) => updateField("customerPhone", e.target.value)}
              placeholder="08123456789"
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-1.5">
              <label className="text-caption font-semibold text-ink uppercase tracking-wider">
                Jenis Produk
              </label>
              <select
                value={form.productType}
                onChange={(e) => updateField("productType", e.target.value)}
                className={inputClass}
              >
                <option value="jersey">Jersey</option>
                <option value="setelan">Setelan</option>
                <option value="jaket">Jaket</option>
                <option value="kaos">Kaos</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-caption font-semibold text-ink uppercase tracking-wider">
                Jumlah (pcs)
              </label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  updateField("quantity", parseInt(e.target.value) || 1)
                }
                min={1}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-caption font-semibold text-ink uppercase tracking-wider">
              Ukuran
            </label>
            <input
              type="text"
              value={form.sizes}
              onChange={(e) => updateField("sizes", e.target.value)}
              placeholder="Contoh: S(5), M(10), L(10), XL(5)"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-1.5">
              <label className="text-caption font-semibold text-ink uppercase tracking-wider">
                Nama Custom
              </label>
              <input
                type="text"
                value={form.customName}
                onChange={(e) => updateField("customName", e.target.value)}
                placeholder="Nama di jersey"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-caption font-semibold text-ink uppercase tracking-wider">
                Nomor Custom
              </label>
              <input
                type="text"
                value={form.customNumber}
                onChange={(e) => updateField("customNumber", e.target.value)}
                placeholder="Nomor di jersey"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-caption font-semibold text-ink uppercase tracking-wider">
              Catatan Desain
            </label>
            <textarea
              value={form.designNotes}
              onChange={(e) => updateField("designNotes", e.target.value)}
              placeholder="Detail desain, warna, referensi, dll."
              rows={3}
              className={inputClass}
            />
          </div>

          <div className="flex gap-sm mt-xs">
            <button
              type="submit"
              disabled={pending}
              className="text-button-md inline-flex h-10 items-center justify-center rounded-full bg-primary px-lg text-on-primary hover:bg-secondary transition-colors duration-normal disabled:opacity-40"
            >
              {pending ? "Membuat..." : "Buat Pesanan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="text-button-md inline-flex h-10 items-center justify-center rounded-full border border-hairline-strong bg-white px-lg text-charcoal hover:bg-surface transition-colors duration-normal dark:bg-surface-dark dark:text-on-dark dark:border-hairline"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
