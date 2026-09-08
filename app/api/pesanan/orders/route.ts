import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateOrderNumber } from "@/lib/queries-orders";

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

function stepFromStatus(status: string): number {
  const idx = STEPS.indexOf(status);
  return idx >= 0 ? idx + 1 : 1;
}

function statusFromStep(step: number): string {
  return STEPS[Math.min(Math.max(step, 1), 9) - 1] || "desain";
}

function mapOrder(row: any) {
  const hasTracking = !!(row.tracking_number && row.courier);
  const step = stepFromStatus(row.current_status);
  let pct: number;
  if (step === 9 && hasTracking) {
    pct = 100;
  } else {
    const fixed: Record<number, number> = { 1: 11, 2: 22, 3: 33, 4: 44, 5: 56, 6: 67, 7: 78, 8: 89, 9: 95 };
    pct = fixed[step] ?? 0;
  }
  return {
    id: row.order_number,
    customer_name: row.customer_name,
    customer_phone: row.customer_phone,
    customer_city: row.customer_city || "",
    product_name: row.product_type || "",
    quantity: row.quantity ? `${row.quantity} pcs` : "-",
    material: row.material || "",
    sizes: row.sizes || "",
    design_photos: Array.isArray(row.design_photos) ? row.design_photos.map((p: any) =>
      typeof p === "string" ? p : p.url || ""
    ).filter(Boolean) : [],
    products: Array.isArray(row.products) ? row.products : [],
    current_step: step,
    note: row.design_notes || "",
    note_time: row.updated_at || "",
    courier: row.courier || "",
    tracking_number: row.tracking_number || "",
    is_done: row.current_status === "selesai" || (step === 9 && hasTracking),
    deadline: row.deadline || null,
    created_at: row.created_at,
    pct,
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
    deadline,
    created_at,
    design_photos,
    products,
  } = body;

  if (!customer_name || !customer_phone) {
    return NextResponse.json(
      { error: "Nama customer dan HP wajib diisi" },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Auto-generate order number if not provided
  let orderNumber = id ? String(id).trim().toUpperCase() : "";
  if (!orderNumber) {
    try {
      orderNumber = await generateOrderNumber();
    } catch {
      return NextResponse.json(
        { error: "Gagal generate nomor order, coba lagi" },
        { status: 500 }
      );
    }
  }

  const qtyNum = parseInt(quantity, 10);

  const insertData: Record<string, any> = {
    order_number: orderNumber,
    customer_name,
    customer_phone,
    product_type: product_name || "",
    quantity: isNaN(qtyNum) ? 1 : qtyNum,
    sizes: sizes || "",
    current_status: "desain",
    current_stage: 1,
    design_photos: design_photos || [],
    products: Array.isArray(products) ? products : [],
  };
  if (customer_city) insertData.customer_city = customer_city;
  if (material) insertData.material = material;
  if (deadline) insertData.deadline = deadline;
  if (created_at) insertData.created_at = created_at;

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
