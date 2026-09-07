import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/verify-token";

/**
 * GET /api/track/session?order=TNT-XXXXXX-XXX
 * Validates the signed track_session cookie and returns order data.
 * The cookie must match the requested order.
 */
export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const session = getSessionFromCookie(cookieHeader);

  if (!session) {
    return NextResponse.json({ error: "No valid session" }, { status: 401 });
  }

  const urlOrder = request.nextUrl.searchParams.get("order")?.toUpperCase();
  if (!urlOrder || session.orderId !== urlOrder) {
    return NextResponse.json({ error: "Session does not match this order" }, { status: 403 });
  }

  // Signed cookie proves verification — fetch order directly by ID
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .select("*")
      .eq("id", session.orderId)
      .single();

    if (orderErr || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const { data: history } = await supabase
      .from("order_status_history")
      .select("*")
      .eq("order_id", session.orderId)
      .order("created_at", { ascending: true });

    return NextResponse.json({ order, history: history || [] });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
