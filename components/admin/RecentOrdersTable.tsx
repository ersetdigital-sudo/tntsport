import { Badge } from "@/components/Badge";
import { Search, Plus, MoreHorizontal } from "lucide-react";

/**
 * RecentOrdersTable — recent transactions panel following the
 * dashboard-sidebar-overview wireframe.
 *
 * Columns: ID, Customer, Product, Status, Qty, Unit Price, Total, Actions.
 * Status uses the existing Badge component (success/warning/danger).
 * On-brand TNT SPORT: solid surface card, premium shadow, brand accents.
 */

type OrderStatus = "Success" | "Pending" | "Refunded";

interface Order {
  id: string;
  customer: string;
  product: string;
  status: OrderStatus;
  qty: number;
  unitPrice: string;
  total: string;
}

const ORDERS: Order[] = [
  {
    id: "#04910",
    customer: "Ryan Korsgaard",
    product: "Jersey Home TNT Sport",
    status: "Success",
    qty: 12,
    unitPrice: "Rp 345.000",
    total: "Rp 4.140.000",
  },
  {
    id: "#04911",
    customer: "Madelyn Lubin",
    product: "Jersey Away Pro 2025",
    status: "Success",
    qty: 20,
    unitPrice: "Rp 298.000",
    total: "Rp 5.960.000",
  },
  {
    id: "#04912",
    customer: "Abram Bergson",
    product: "Training Kit Eco",
    status: "Pending",
    qty: 22,
    unitPrice: "Rp 175.000",
    total: "Rp 3.850.000",
  },
  {
    id: "#04913",
    customer: "Phillip Mango",
    product: "Green Leaf Jersey",
    status: "Refunded",
    qty: 24,
    unitPrice: "Rp 195.000",
    total: "Rp 1.950.000",
  },
];

const statusVariant: Record<OrderStatus, "success" | "warning" | "danger"> = {
  Success: "success",
  Pending: "warning",
  Refunded: "danger",
};

const statusLabel: Record<OrderStatus, string> = {
  Success: "Lunas",
  Pending: "Pending",
  Refunded: "Refund",
};

export function RecentOrdersTable() {
  return (
    <div className="bg-surface-card border border-hairline rounded-xl shadow-premium-md overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-md p-xl border-b border-hairline">
        <div>
          <h3 className="text-heading-md text-ink">Order Terbaru</h3>
          <p className="text-caption text-stone mt-xs">
            Transaksi terkini dari pelanggan TNT SPORT
          </p>
        </div>
        <div className="flex items-center gap-md">
          <div className="relative hidden sm:block">
            <Search
              size={14}
              className="absolute left-md top-1/2 -translate-y-1/2 text-stone"
            />
            <input
              type="text"
              placeholder="Cari order..."
              className="h-9 w-44 md:w-56 pl-xl pr-md bg-surface text-ink rounded-md border border-hairline text-body-sm outline-none transition-colors duration-normal focus:border-primary placeholder:text-stone"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-xs bg-secondary text-on-primary text-button-md rounded-md px-md py-sm hover:bg-secondary-strong transition-colors duration-normal"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Tambah Order</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-hairline">
              {["ID", "Customer", "Produk", "Status", "Qty", "Harga", "Total", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="text-button-sm text-stone uppercase tracking-wider px-xl py-md whitespace-nowrap"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((order) => (
              <tr
                key={order.id}
                className="border-b border-hairline last:border-b-0 hover:bg-surface transition-colors duration-normal"
              >
                <td className="px-xl py-md text-code-sm text-charcoal whitespace-nowrap">
                  {order.id}
                </td>
                <td className="px-xl py-md text-body-sm text-ink font-medium whitespace-nowrap">
                  {order.customer}
                </td>
                <td className="px-xl py-md text-body-sm text-charcoal whitespace-nowrap">
                  {order.product}
                </td>
                <td className="px-xl py-md whitespace-nowrap">
                  <Badge variant={statusVariant[order.status]}>
                    {statusLabel[order.status]}
                  </Badge>
                </td>
                <td className="px-xl py-md text-body-sm text-charcoal whitespace-nowrap">
                  {order.qty}
                </td>
                <td className="px-xl py-md text-body-sm text-charcoal whitespace-nowrap">
                  {order.unitPrice}
                </td>
                <td className="px-xl py-md text-body-sm text-ink font-semibold whitespace-nowrap">
                  {order.total}
                </td>
                <td className="px-xl py-md whitespace-nowrap">
                  <button
                    type="button"
                    aria-label={`Aksi untuk order ${order.id}`}
                    className="p-xs text-stone hover:text-ink transition-colors duration-normal"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-xl border-t border-hairline">
        <p className="text-caption text-stone">
          Menampilkan {ORDERS.length} order terbaru
        </p>
        <button
          type="button"
          className="text-button-sm text-secondary hover:text-secondary-strong transition-colors duration-normal uppercase tracking-wider"
        >
          Lihat Semua →
        </button>
      </div>
    </div>
  );
}