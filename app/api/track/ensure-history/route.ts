import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const STEPS = [
  "desain", "layout", "print", "pres", "potong",
  "jahit", "finishing", "packing", "kirim",
];

function stepFromStatus(status: string): number {
  const idx = STEPS.indexOf(status);
  return idx >= 0 ? idx + 1 : 1;
}

/**
 * POST /api/track/ensure-history
 * Body: { orderNumber: "TNT-260907-001", token: "..." }
 *
 * Reads the order's current_status, checks what history entries exist,
 * and INSERTS any missing ones. Returns the complete history.
 * This is a "self-healing" endpoint — it guarantees history is always correct.
 */
export async function POST(request: NextRequest) {
  const { orderNumber, token } = await request.json();

  if (!orderNumber || !token) {
    return NextResponse.json({ error: "Missing orderNumber or token" }, { status: 400 });
  }

  // Verify token
  const { verifyToken } = await import("@/lib/verify-token");
  const session = verifyToken(token);
  if (!session || session.orderId !== orderNumber.toUpperCase()) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Get order
  const { data: order, error: oErr } = await supabase
    .from("orders")
    .select("id, order_number, current_status, created_at")
    .eq("order_number", orderNumber.toUpperCase())
    .single();

  if (oErr || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const currentStep = stepFromStatus(order.current_status);
  if (currentStep <= 1) {
    // At step 1 or unknown — just return existing history
    const { data: history } = await supabase
      .from("order_status_history")
      .select("*")
      .eq("order_id", order.id)
      .order("created_at", { ascending: true });
    return NextResponse.json({ order, history: history || [], inserted: 0 });
  }

  // Get existing history
  const { data: existing } = await supabase
    .from("order_status_history")
    .select("status")
    .eq("order_id", order.id);

  const existingStatuses = new Set((existing ?? []).map((h) => h.status));

  // Insert missing steps
  const toInsert: {
    order_id: string;
    status: string;
    note: string;
    created_at: string;
  }[] = [];

  for (let i = 0; i < currentStep; i++) {
    const stepStatus = STEPS[i];
    if (!existingStatuses.has(stepStatus)) {
      // Generate timestamp: spread from created_at, 5 minutes apart
      const ts = new Date(order.created_at);
      ts.setMinutes(ts.getMinutes() + i * 5);

      const noteMap: Record<string, string> = {
        desain: "Desain sedang dikerjakan",
        layout: "Layout sedang disusun",
        print: "Proses printing/sublimasi",
        pres: "Proses pres transfer",
        potong: "Bahan sedang dipotong",
        jahit: "Proses penjahitan",
        finishing: "Quality control & finishing",
        packing: "Pesanan sedang dikemas",
        kirim: i === currentStep - 1 ? "Sedang diproses untuk pengiriman" : "Proses pengiriman",
      };

      toInsert.push({
        order_id: order.id,
        status: stepStatus,
        note: noteMap[stepStatus] || "Tahap selesai",
        created_at: ts.toISOString(),
      });
    }
  }

  let insertedCount = 0;
  if (toInsert.length > 0) {
    const { error: insErr } = await supabase.from("order_status_history").insert(toInsert);
    if (insErr) {
      console.error("ensure-history insert failed:", insErr.message, toInsert);
      return NextResponse.json({
        order,
        history: [],
        inserted: 0,
        insertError: insErr.message,
      });
    }
    insertedCount = toInsert.length;
  }

  // Return complete history
  const { data: finalHistory } = await supabase
    .from("order_status_history")
    .select("*")
    .eq("order_id", order.id)
    .order("created_at", { ascending: true });

  return NextResponse.json({
    order,
    history: finalHistory || [],
    inserted: insertedCount,
  });
}
