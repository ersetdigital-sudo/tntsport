import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Delete order_status_history first (foreign key)
  const { error: histErr } = await supabase
    .from("order_status_history")
    .delete()
    .eq("order_id", id);

  if (histErr) {
    return NextResponse.json({ error: histErr.message }, { status: 500 });
  }

  // Delete the order
  const { error: orderErr } = await supabase
    .from("orders")
    .delete()
    .eq("order_number", id);

  if (orderErr) {
    return NextResponse.json({ error: orderErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
