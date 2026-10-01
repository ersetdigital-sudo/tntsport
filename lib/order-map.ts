/**
 * Pemetaan baris tabel `orders` (jersey) → bentuk yang dikirim ke dashboard.
 *
 * Dipindah ke sini karena sekarang dipakai DUA tempat: endpoint
 * `/api/pesanan/orders` dan pembacaan awal di server (`lib/pesanan-server.ts`).
 * Dulu fungsinya cuma ada di dalam route, jadi render server tidak bisa memakai
 * pemetaan yang sama tanpa menyalinnya — dan salinan seperti itu pasti
 * menyimpang suatu saat.
 *
 * Isi pemetaannya tidak diubah sama sekali dari versi aslinya.
 */
import { isOrderCompleted, progressPercentFromStatus, stepFromStatus } from "@/lib/order-status";

export function mapOrderRow(row: any) {
  const hasTracking = !!(row.tracking_number && row.courier);
  const step = stepFromStatus(row.current_status);
  const pct = progressPercentFromStatus(row.current_status, hasTracking);
  return {
    id: row.order_number,
    customer_name: row.customer_name,
    customer_phone: row.customer_phone,
    customer_city: row.customer_city || "",
    product_name: row.product_type || "",
    quantity: row.quantity ? `${row.quantity} pcs` : "-",
    material: row.material || "",
    sizes: row.sizes || "",
    design_photos: Array.isArray(row.design_photos) ? row.design_photos.map((p: any) =>
      typeof p === "string" ? p : p.url || ""
    ).filter(Boolean) : [],
    wo_photos: Array.isArray(row.wo_photos) ? row.wo_photos.map((p: any) => typeof p === "string" ? p : p.url || "").filter(Boolean) : [],
    products: Array.isArray(row.products) ? row.products : [],
    current_step: step,
    note: row.design_notes || "",
    note_time: row.updated_at || "",
    courier: row.courier || "",
    tracking_number: row.tracking_number || "",
    is_done: isOrderCompleted(row.current_status) || (step === 11 && hasTracking),
    deadline: row.deadline || null,
    created_at: row.created_at,
    pct,
  };
}
