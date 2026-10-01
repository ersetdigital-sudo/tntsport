import { after, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateOrderNumber } from "@/lib/queries-orders";
import { triggerStageNotification } from "@/lib/fonnte";
import { mapOrderRow as mapOrder } from "@/lib/order-map";
import { statusFromStep } from "@/lib/order-status";

// Kirim notifikasi WhatsApp tahap 1 setelah response dikirim (lihat `after()`
// di POST) — Fonnte butuh waktu, dan customer tidak perlu menunggu itu.
export const maxDuration = 30;

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
    wo_photos,
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
    wo_photos: Array.isArray(wo_photos) ? wo_photos : [],
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

  // Foto desain pertama = bukti tahap Desain. Tanpa baris history, halaman
  // customer menampilkan foto desain tanpa tanggal, dan tahap Desain terbaca
  // "belum dikerjakan" walau ordernya memang mulai dari situ.
  const firstStage = statusFromStep(1);
  const designPhoto = Array.isArray(design_photos) ? design_photos[0] : "";
  if (designPhoto) {
    const { error: histErr } = await supabase.from("order_status_history").insert({
      order_id: data.id,
      status: firstStage,
      note: "",
      photo_url: designPhoto,
    });
    if (histErr) {
      // Kegagalan catat history tidak boleh menggagalkan order yang sudah masuk.
      console.error("History insert (create) failed:", histErr.message, { order_id: data.id });
    }
  }

  // Notifikasi tahap 1 ke customer — dikirim SETELAH response, karena
  // kegagalan WhatsApp tidak boleh menggagalkan pembuatan order.
  after(async () => {
    try {
      await triggerStageNotification(supabase, data.id, data, 1);
    } catch (err) {
      console.error(
        "WA notification (create) failed:",
        err instanceof Error ? err.message : err
      );
    }
  });

  return NextResponse.json(
    { order: mapOrder(data), notification: { stage: 1, status: "queued" } },
    { status: 201 }
  );
}
