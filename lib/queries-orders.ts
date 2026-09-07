/**
 * Server-side data access for the order tracking system.
 *
 * Public functions verify customer_phone before returning data.
 * Admin functions require authenticated Supabase client.
 */
import { createClient } from "@/lib/supabase/server";
import type { Order, OrderStatus, OrderStatusHistory } from "@/lib/types";

// ---------------------------------------------------------------------------
// Public — Customer tracking
// ---------------------------------------------------------------------------

/**
 * Verify and fetch an order by order_number + customer_phone.
 * Returns null if not found or phone doesn't match.
 */
export async function getOrderByTracking(
  orderNumber: string,
  phone: string
): Promise<{ order: Order; history: OrderStatusHistory[] } | null> {
  const supabase = await createClient();

  const normalizedPhone = phone.replace(/\D/g, "");

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber.toUpperCase())
    .maybeSingle();

  if (error || !order) return null;

  const orderPhone = (order.customer_phone as string).replace(/\D/g, "");
  if (orderPhone !== normalizedPhone) return null;

  const { data: history } = await supabase
    .from("order_status_history")
    .select("*")
    .eq("order_id", order.id)
    .order("created_at", { ascending: true });

  return {
    order: order as Order,
    history: (history ?? []) as OrderStatusHistory[],
  };
}

// ---------------------------------------------------------------------------
// Admin — Order management
// ---------------------------------------------------------------------------

/** Fetch all orders (admin only). */
export async function getAllOrders(): Promise<Order[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as Order[];
}

/** Fetch a single order by ID (admin only). */
export async function getOrderById(
  id: string
): Promise<{ order: Order; history: OrderStatusHistory[] } | null> {
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !order) return null;

  const { data: history } = await supabase
    .from("order_status_history")
    .select("*")
    .eq("order_id", id)
    .order("created_at", { ascending: true });

  return {
    order: order as Order,
    history: (history ?? []) as OrderStatusHistory[],
  };
}

/** Generate next order number: TNT-YYMMDD-XXX */
export async function generateOrderNumber(): Promise<string> {
  const supabase = await createClient();
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const datePrefix = `TNT-${yy}${mm}${dd}`;

  const { data } = await supabase
    .from("orders")
    .select("order_number")
    .like("order_number", `${datePrefix}-%`)
    .order("order_number", { ascending: false })
    .limit(1);

  let seq = 1;
  if (data && data.length > 0) {
    const last = data[0].order_number;
    const parts = last.split("-");
    const lastNum = parseInt(parts[2], 10);
    if (!isNaN(lastNum)) seq = lastNum + 1;
  }

  return `${datePrefix}-${String(seq).padStart(3, "0")}`;
}
