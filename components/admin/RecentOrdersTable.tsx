import { Badge } from "@/components/Badge";
import { Search, Plus, MoreHorizontal, Inbox } from "lucide-react";

type OrderStatus = "Success" | "Pending" | "Refunded";

export interface Order {
  id: string;
  customer: string;
  product: string;
  status: OrderStatus;
  qty: number;
  unitPrice: string;
  total: string;
}

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

interface RecentOrdersTableProps {
  orders?: Order[];
}

export function RecentOrdersTable({ orders = [] }: RecentOrdersTableProps) {
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

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-xxl px-xl text-center">
          <Inbox size={48} className="text-stone/40 mb-md" />
          <p className="text-body-md text-charcoal font-medium">Belum ada order</p>
          <p className="text-caption text-stone mt-xs">
            Order akan muncul di sini setelah pelanggan melakukan transaksi
          </p>
        </div>
      ) : (
        <>
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
                {orders.map((order) => (
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
              Menampilkan {orders.length} order terbaru
            </p>
            <button
              type="button"
              className="text-button-sm text-secondary hover:text-secondary-strong transition-colors duration-normal uppercase tracking-wider"
            >
              Lihat Semua →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
