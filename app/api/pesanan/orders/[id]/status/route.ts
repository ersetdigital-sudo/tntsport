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
    // Kirim validation: need tracking_number + courier to be "done"
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

  const { error: updateError } = await supabase
    .from("orders")
    .update(updateData)
    .eq("order_number", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  if (current_step !== undefined) {
    // Look up UUID from order_number for history insert
    const { data: orderRow } = await supabase
      .from("orders")
      .select("id")
      .eq("order_number", id)
      .single();

    if (orderRow) {
      const { error: histErr } = await supabase.from("order_status_history").insert({
        order_id: orderRow.id,
        status: is_done && current_step === 9 ? "selesai" : statusFromStep(current_step),
        note: note || "",
      });
      if (histErr) console.error("History insert failed:", histErr.message);
    }
  }

  return NextResponse.json({ ok: true });
}
