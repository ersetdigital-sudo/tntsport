import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

function checkAuth() {
  return true; // Cookie checked by layout
}

export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    customerName,
    customerPhone,
    productType,
    quantity,
    sizes,
    customName,
    customNumber,
    designNotes,
  } = body;

  if (!customerName || !customerPhone) {
    return NextResponse.json(
      { error: "Nama dan HP wajib diisi" },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Generate order number
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const datePart = `${yy}${mm}${dd}`;

  // Get latest order number for today
  const { data: latest } = await supabase
    .from("orders")
    .select("order_number")
    .like("order_number", `TNT-${datePart}-%`)
    .order("order_number", { ascending: false })
    .limit(1);

  let seq = 1;
  if (latest && latest.length > 0) {
    const lastNum = latest[0].order_number.split("-")[2];
    seq = parseInt(lastNum, 10) + 1;
  }

  const orderNumber = `TNT-${datePart}-${String(seq).padStart(3, "0")}`;

  const { data, error } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_name: customerName,
      customer_phone: customerPhone,
      product_type: productType || "jersey",
      quantity: quantity || 1,
      sizes: sizes || "",
      custom_name: customName || "",
      custom_number: customNumber || "",
      design_notes: designNotes || "",
      current_status: "order_diterima",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
