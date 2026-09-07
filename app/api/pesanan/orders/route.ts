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

function stepFromStatus(status: string): number {
  const idx = STEPS.indexOf(status);
  return idx >= 0 ? idx + 1 : 1;
}

function statusFromStep(step: number): string {
  return STEPS[Math.min(step, 10) - 1] || "order_diterima";
}

function mapOrder(row: any) {
  return {
    id: row.order_number,
    customer_name: row.customer_name,
    customer_phone: row.customer_phone,
    customer_city: row.customer_city || "",
    product_name: row.product_type || "",
    quantity: row.quantity ? `${row.quantity} pcs` : "-",
    material: row.material || "",
    sizes: row.sizes || "",
    current_step: stepFromStatus(row.current_status),
    note: row.design_notes || "",
    note_time: row.updated_at || "",
    courier: row.courier || "",
    tracking_number: row.tracking_number || "",
    is_done: row.current_status === "selesai" || row.current_status === "siap_dikirim_done",
    created_at: row.created_at,
  };
}

export async function GET() {
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

  return NextResponse.json({ orders: (data || []).map(mapOrder) });
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    id,
    customer_name,
    customer_phone,
    customer_city,
    product_name,
    quantity,
    material,
    sizes,
  } = body;

  if (!id || !customer_name || !customer_phone) {
    return NextResponse.json(
      { error: "Nomor pesanan, nama, dan HP wajib diisi" },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const qtyNum = parseInt(quantity, 10);

  const insertData: Record<string, any> = {
    order_number: id.toUpperCase(),
    customer_name,
    customer_phone,
    product_type: product_name || "",
    quantity: isNaN(qtyNum) ? 1 : qtyNum,
    sizes: sizes || "",
    current_status: "order_diterima",
  };
  // Add optional columns only if provided (DB might not have them yet)
  if (customer_city) insertData.customer_city = customer_city;
  if (material) insertData.material = material;

  const { data, error } = await supabase
    .from("orders")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ order: mapOrder(data) }, { status: 201 });
}
