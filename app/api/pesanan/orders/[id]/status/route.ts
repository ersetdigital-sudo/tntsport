import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const STEPS = [
  "desain",
  "layout",
  "print",
  "pres",
  "potong",
  "jahit",
  "finishing",
  "packing",
  "kirim",
];

function statusFromStep(step: number): string {
  return STEPS[Math.min(Math.max(step, 1), 9) - 1] || "desain";
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { current_step, note, courier, tracking_number, is_done, deadline } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const updateData: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (current_step !== undefined) {
    // Jaga konsistensi current_stage dengan current_status (tanpa trigger notifikasi
    // — notifikasi hanya dipicu dari endpoint admin).
    updateData.current_stage = Math.min(Math.max(Number(current_step), 1), 9);
    if (current_step === 9 && is_done) {
      if (!tracking_number || !courier) {
        return NextResponse.json(
          { error: "Untuk menandai selesai, nomor resi dan ekspedisi harus diisi." },
          { status: 400 }
        );
      }
      updateData.current_status = "selesai";
    } else {
      updateData.current_status = statusFromStep(current_step);
    }
  }
  if (note !== undefined) updateData.design_notes = note;
  if (courier !== undefined) updateData.courier = courier;
  if (tracking_number !== undefined) updateData.tracking_number = tracking_number;
  if (deadline !== undefined) updateData.deadline = deadline || null;

  // Use .update().select().single() to get the updated row back (including UUID id)
  const { data: updatedOrder, error: updateError } = await supabase
    .from("orders")
    .update(updateData)
    .eq("order_number", id)
    .select("id")
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Insert history entry using the UUID from the updated row
  let historyError: string | null = null;
  if (current_step !== undefined && updatedOrder) {
    const statusValue = is_done && current_step === 9 ? "selesai" : statusFromStep(current_step);
    const { error: histErr } = await supabase.from("order_status_history").insert({
      order_id: updatedOrder.id,
      status: statusValue,
      note: note || "",
    });
    if (histErr) {
      historyError = histErr.message;
      console.error("History insert failed:", histErr.message, {
        order_id: updatedOrder.id,
        status: statusValue,
      });
    }
  }

  return NextResponse.json({ ok: true, historyError });
}
