import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ORDER_STATUS_LIST, type OrderStatus } from "@/lib/types";

/**
 * PATCH /api/admin/orders/[id]/status — update order status (admin only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status, note, photoUrl, trackingNumber, courier, delayReason, delayEstimatedDate } = body;

    if (!status || !ORDER_STATUS_LIST.includes(status as OrderStatus)) {
      return NextResponse.json(
        { error: "Status tidak valid" },
        { status: 400 }
      );
    }

    const updateData: Record<string, any> = {
      current_status: status,
      updated_at: new Date().toISOString(),
    };

    if (trackingNumber !== undefined) updateData.tracking_number = trackingNumber;
    if (courier !== undefined) updateData.courier = courier;
    if (delayReason !== undefined) updateData.delay_reason = delayReason;
    if (delayEstimatedDate !== undefined) updateData.delay_estimated_date = delayEstimatedDate;

    const { error: updateError } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Insert status history
    const historyData: Record<string, any> = {
      order_id: id,
      status,
      note: note || "",
    };
    if (photoUrl) historyData.photo_url = photoUrl;

    const { error: historyError } = await supabase
      .from("order_status_history")
      .insert(historyData);

    if (historyError) {
      return NextResponse.json({ error: historyError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
