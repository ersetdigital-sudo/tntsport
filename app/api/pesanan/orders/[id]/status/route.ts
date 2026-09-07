import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { status, note, photoUrl, trackingNumber, courier, delayReason, delayEstimatedDate } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const updateData: Record<string, any> = {};
  if (status) updateData.current_status = status;
  if (trackingNumber) updateData.tracking_number = trackingNumber;
  if (courier) updateData.courier = courier;
  if (delayReason) updateData.delay_reason = delayReason;
  if (delayEstimatedDate) updateData.delay_estimated_date = delayEstimatedDate;
  updateData.updated_at = new Date().toISOString();

  const { error: updateError } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Insert status history
  if (status) {
    const { error: historyError } = await supabase
      .from("order_status_history")
      .insert({
        order_id: id,
        status,
        note: note || "",
        photo_url: photoUrl || "",
      });

    if (historyError) {
      console.error("History insert error:", historyError);
    }
  }

  return NextResponse.json({ ok: true });
}
