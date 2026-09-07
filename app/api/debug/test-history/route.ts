import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/debug/test-history
 * Body: { orderNumber: "TNT-260907-001" }
 * Directly tests: can we insert into order_status_history?
 */
export async function POST(request: NextRequest) {
  const { orderNumber } = await request.json();
  if (!orderNumber) {
    return NextResponse.json({ error: "Provide orderNumber" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1. Get order
  const { data: order, error: oErr } = await supabase
    .from("orders")
    .select("id, order_number, current_status")
    .eq("order_number", orderNumber.toUpperCase())
    .single();

  if (oErr || !order) {
    return NextResponse.json({ step: "fetch_order", error: oErr?.message ?? "not found" });
  }

  // 2. Count existing history
  const { count, error: cErr } = await supabase
    .from("order_status_history")
    .select("*", { count: "exact", head: true })
    .eq("order_id", order.id);

  // 3. List existing history
  const { data: existing, error: eErr } = await supabase
    .from("order_status_history")
    .select("id, status, note, created_at")
    .eq("order_id", order.id)
    .order("created_at", { ascending: true });

  // 4. Try to INSERT a test row
  const testStatus = "layout";
  const testNote = "DEBUG_TEST_" + Date.now();
  const { data: insertData, error: insErr } = await supabase
    .from("order_status_history")
    .insert({
      order_id: order.id,
      status: testStatus,
      note: testNote,
    })
    .select();

  // 5. Delete the test row if it was inserted
  if (!insErr && insertData && insertData.length > 0) {
    await supabase
      .from("order_status_history")
      .delete()
      .eq("id", insertData[0].id);
  }

  // 6. Try inserting ALL missing steps for this order
  const STEPS = ["desain", "layout", "print", "pres", "potong", "jahit", "finishing", "packing", "kirim"];
  const stepIdx = STEPS.indexOf(order.current_status);
  const backfillResults: { status: string; ok: boolean; error: string | null }[] = [];

  if (stepIdx >= 0) {
    const existingStatuses = new Set((existing ?? []).map((h) => h.status));
    for (let i = 0; i <= stepIdx; i++) {
      if (!existingStatuses.has(STEPS[i])) {
        const backfillTime = new Date(order.id ? Date.now() : Date.now());
        backfillTime.setMinutes(backfillTime.getMinutes() + i * 5);
        const { error: bfErr } = await supabase.from("order_status_history").insert({
          order_id: order.id,
          status: STEPS[i],
          note: i === stepIdx ? "Status terkini (auto-backfill)" : "Tahap selesai (auto-backfill)",
          created_at: backfillTime.toISOString(),
        });
        backfillResults.push({
          status: STEPS[i],
          ok: !bfErr,
          error: bfErr?.message ?? null,
        });
      }
    }
  }

  // 7. Re-fetch history after backfill
  const { data: finalHistory } = await supabase
    .from("order_status_history")
    .select("id, status, note, created_at")
    .eq("order_id", order.id)
    .order("created_at", { ascending: true });

  return NextResponse.json({
    order: { id: order.id, order_number: order.order_number, current_status: order.current_status },
    historyCountBefore: count ?? 0,
    historyBefore: existing ?? [],
    testInsert: { ok: !insErr, error: insErr?.message ?? null },
    backfillResults,
    historyCountAfter: finalHistory?.length ?? 0,
    historyAfter: finalHistory ?? [],
  });
}
