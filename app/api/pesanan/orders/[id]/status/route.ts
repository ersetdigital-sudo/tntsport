import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const STEPS = [
  "order_diterima",
  "desain_dikonfirmasi",
  "produksi_bahan",
  "printing",
  "cutting",
  "jahit",
  "quality_control",
  "finishing",
  "packing",
  "siap_dikirim",
];

function statusFromStep(step: number): string {
  return STEPS[Math.min(Math.max(step, 1), 10) - 1] || "order_diterima";
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { current_step, note, courier, tracking_number, is_done } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const updateData: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (current_step !== undefined) {
    updateData.current_status = is_done ? "selesai" : statusFromStep(current_step);
  }
  if (note !== undefined) updateData.design_notes = note;
  if (courier !== undefined) updateData.courier = courier;
  if (tracking_number !== undefined) updateData.tracking_number = tracking_number;

  const { error: updateError } = await supabase
    .from("orders")
    .update(updateData)
    .eq("order_number", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  if (current_step !== undefined) {
    await supabase.from("order_status_history").insert({
      order_id: id,
      status: statusFromStep(current_step),
      note: note || "",
    });
  }

  return NextResponse.json({ ok: true });
}
