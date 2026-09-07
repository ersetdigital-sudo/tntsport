"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import {
  Plus,
  Search,
  Package,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
  LogOut,
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

export default function PesananOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/pesanan/orders");
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

  function handleLogout() {
    document.cookie = "pesanan_auth=; path=/; max-age=0";
    window.location.href = "/pesanan/login";
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Top bar */}
      <header className="border-b border-[#26282e] px-5 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-lg bg-[#3ee86b] text-black grid place-items-center trk-display text-[15px]">
            T
          </span>
          <div>
            <span className="block trk-display text-[14px] tracking-tight text-white">
              TNT SPORT
            </span>
            <span className="block trk-stencil text-[9px] text-[#9aa0aa] mt-[2px]">
              Panel Pesanan
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="trk-btn-ghost px-3 py-2 text-[13px] text-[#9aa0aa] hover:text-white flex items-center gap-2"
        >
          <LogOut size={14} />
          Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="trk-display text-[32px] sm:text-[40px] text-white">
              Kelola Pesanan<span className="text-[#3ee86b]">.</span>
            </h1>
            <p className="text-[14px] text-[#6b7280] mt-1">
              {orders.length} pesanan total
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="trk-btn-accent px-5 py-3 text-[14px] flex items-center gap-2"
          >
            <Plus size={16} />
            Pesanan Baru
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nomor pesanan, nama, atau HP..."
              className="trk-field w-full pl-10 pr-4 py-3 text-[14px]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="trk-field px-4 py-3 text-[14px] min-w-[160px]"
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
          <p className="text-[14px] text-[#6b7280]">Memuat data...</p>
        ) : filteredOrders.length === 0 ? (
          <div className="trk-card p-10 text-center">
            <Package className="w-10 h-10 text-[#6b7280] mx-auto mb-4" />
            <p className="text-[14px] text-[#6b7280]">
              {orders.length === 0
                ? "Belum ada pesanan. Klik 'Pesanan Baru' untuk menambah."
                : "Tidak ada pesanan yang cocok dengan pencarian."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
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
      </main>

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
    </div>
  );
}

function STATUS_COLORS(status: string): string {
  const map: Record<string, string> = {
    order_diterima: "bg-[rgba(59,130,246,.2)] text-[#60a5fa]",
    desain_dikonfirmasi: "bg-[rgba(168,85,247,.2)] text-[#c084fc]",
    produksi_bahan: "bg-[rgba(245,158,11,.2)] text-[#fbbf24]",
    printing_sublimasi: "bg-[rgba(6,182,212,.2)] text-[#22d3ee]",
    cutting: "bg-[rgba(249,115,22,.2)] text-[#fb923c]",
    jahit: "bg-[rgba(236,72,153,.2)] text-[#f472b6]",
    quality_control: "bg-[rgba(16,185,129,.2)] text-[#34d399]",
    finishing: "bg-[rgba(99,102,241,.2)] text-[#818cf8]",
    packing: "bg-[rgba(20,184,166,.2)] text-[#2dd4bf]",
    siap_dikirim: "bg-[rgba(62,232,107,.2)] text-[#3ee86b]",
  };
  return map[status] || "bg-[rgba(107,114,128,.2)] text-[#9ca3af]";
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
    <div className="trk-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[rgba(255,255,255,.03)] transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-lg bg-[rgba(62,232,107,.15)] flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-[#3ee86b]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] text-white font-bold font-mono truncate">
              {order.order_number}
            </p>
            <p className="text-[13px] text-[#6b7280] truncate">
              {order.customer_name} · {order.customer_phone}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-[12px] font-semibold px-3 py-1 rounded-full ${STATUS_COLORS(
              order.current_status
            )}`}
          >
            {ORDER_STATUS_LABELS[order.current_status]}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-[#6b7280]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#6b7280]" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[#26282e] p-5 bg-[rgba(255,255,255,.02)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <DetailField label="Jenis Produk" value={order.product_type} />
            <DetailField label="Jumlah" value={`${order.quantity} pcs`} />
            <DetailField label="Ukuran" value={order.sizes} />
            <DetailField label="Nama Custom" value={order.custom_name} />
            <DetailField label="Nomor Custom" value={order.custom_number} />
            <DetailField
              label="Tanggal Order"
              value={formatDate(order.created_at)}
            />
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

          <StatusUpdateForm
            orderId={order.id}
            currentStatus={order.current_status}
            onUpdated={onStatusUpdated}
          />
        </div>
      )}
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="trk-stencil text-[10px] text-[#6b7280] uppercase tracking-wider">
        {label}
      </p>
      <p className="text-[14px] text-white font-semibold mt-1">
        {value || "-"}
      </p>
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
  const showShippingFields = status === "siap_dikirim";

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

        const res = await fetch(`/api/pesanan/orders/${orderId}/status`, {
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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="trk-field px-3 py-2.5 text-[14px] flex-1 min-w-[180px]"
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
            className="trk-btn-accent px-5 py-2.5 text-[13px] disabled:opacity-40"
          >
            {pending ? "Updating..." : "Update Status"}
          </button>
        </div>

        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Catatan (opsional)"
          className="trk-field px-3 py-2.5 text-[14px]"
        />

        {showPhotoField && (
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="URL foto (opsional)"
            className="trk-field px-3 py-2.5 text-[14px]"
          />
        )}

        {showShippingFields && (
          <div className="flex gap-3">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Nomor resi"
              className="trk-field px-3 py-2.5 text-[14px] flex-1"
            />
            <select
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              className="trk-field px-3 py-2.5 text-[14px]"
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

        <div className="flex gap-3">
          <input
            type="text"
            value={delayReason}
            onChange={(e) => setDelayReason(e.target.value)}
            placeholder="Alasan delay (opsional)"
            className="trk-field px-3 py-2.5 text-[14px] flex-1"
          />
          <input
            type="date"
            value={delayDate}
            onChange={(e) => setDelayDate(e.target.value)}
            className="trk-field px-3 py-2.5 text-[14px]"
          />
        </div>

        {error && (
          <p className="text-[13px] text-[#ff8b83]">{error}</p>
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
        const res = await fetch("/api/pesanan/orders", {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="trk-card p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="trk-display text-[22px] text-white">Pesanan Baru</h3>
          <button
            onClick={onClose}
            className="p-2 text-[#6b7280] hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <p className="text-[13px] rounded-xl border border-[rgba(255,59,47,.45)] bg-[rgba(255,59,47,.1)] text-[#ff8b83] px-4 py-3">
              {error}
            </p>
          )}

          <div>
            <label className="trk-stencil text-[10px] text-[#9aa0aa]">
              Nama Customer *
            </label>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => updateField("customerName", e.target.value)}
              placeholder="Nama lengkap"
              required
              className="trk-field w-full mt-2 px-4 py-3 text-[14px]"
            />
          </div>

          <div>
            <label className="trk-stencil text-[10px] text-[#9aa0aa]">
              Nomor HP *
            </label>
            <input
              type="tel"
              value={form.customerPhone}
              onChange={(e) => updateField("customerPhone", e.target.value)}
              placeholder="08123456789"
              required
              className="trk-field w-full mt-2 px-4 py-3 text-[14px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="trk-stencil text-[10px] text-[#9aa0aa]">
                Jenis Produk
              </label>
              <select
                value={form.productType}
                onChange={(e) => updateField("productType", e.target.value)}
                className="trk-field w-full mt-2 px-4 py-3 text-[14px]"
              >
                <option value="jersey">Jersey</option>
                <option value="setelan">Setelan</option>
                <option value="jaket">Jaket</option>
                <option value="kaos">Kaos</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="trk-stencil text-[10px] text-[#9aa0aa]">
                Jumlah (pcs)
              </label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  updateField("quantity", parseInt(e.target.value) || 1)
                }
                min={1}
                className="trk-field w-full mt-2 px-4 py-3 text-[14px]"
              />
            </div>
          </div>

          <div>
            <label className="trk-stencil text-[10px] text-[#9aa0aa]">
              Ukuran
            </label>
            <input
              type="text"
              value={form.sizes}
              onChange={(e) => updateField("sizes", e.target.value)}
              placeholder="S(5), M(10), L(10), XL(5)"
              className="trk-field w-full mt-2 px-4 py-3 text-[14px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="trk-stencil text-[10px] text-[#9aa0aa]">
                Nama Custom
              </label>
              <input
                type="text"
                value={form.customName}
                onChange={(e) => updateField("customName", e.target.value)}
                placeholder="Nama di jersey"
                className="trk-field w-full mt-2 px-4 py-3 text-[14px]"
              />
            </div>
            <div>
              <label className="trk-stencil text-[10px] text-[#9aa0aa]">
                Nomor Custom
              </label>
              <input
                type="text"
                value={form.customNumber}
                onChange={(e) => updateField("customNumber", e.target.value)}
                placeholder="Nomor di jersey"
                className="trk-field w-full mt-2 px-4 py-3 text-[14px]"
              />
            </div>
          </div>

          <div>
            <label className="trk-stencil text-[10px] text-[#9aa0aa]">
              Catatan Desain
            </label>
            <textarea
              value={form.designNotes}
              onChange={(e) => updateField("designNotes", e.target.value)}
              placeholder="Detail desain, warna, referensi, dll."
              rows={3}
              className="trk-field w-full mt-2 px-4 py-3 text-[14px] resize-none"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={pending}
              className="trk-btn-accent flex-1 py-3 text-[14px] disabled:opacity-40"
            >
              {pending ? "Membuat..." : "Buat Pesanan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="trk-btn-ghost flex-1 py-3 text-[14px] text-[#9aa0aa] hover:text-white border border-[#26282e]"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
