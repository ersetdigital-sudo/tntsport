import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendFonnteMessage, normalizeAndValidatePhone } from "@/lib/fonnte";
import { ORDER_STATUS_LABELS } from "@/lib/types";

const CRON_SECRET = process.env.CRON_SECRET || "";

export async function GET(req: Request) {
  const auth = req.headers.get("x-cron-secret");
  const fromDashboard = req.headers.get("x-from-dashboard") === "true";
  // Izinkan akses jika secret cocok (dari cron) atau dari dashboard (test manual)
  if (!fromDashboard && (!CRON_SECRET || auth !== CRON_SECRET)) {
    return NextResponse.json({
      error: "Unauthorized",
      debug: {
        headerReceived: auth !== null,
        headerLength: auth?.length ?? 0,
        envLength: CRON_SECRET.length,
        matchAfterTrim: (auth?.trim() ?? "") === CRON_SECRET.trim(),
      },
    }, { status: 401 });
  }

  const supabase = await createClient();

  // 1. Ambil setting notif
  const { data: settings, error: settingsErr } = await supabase
    .from("app_settings")
    .select("key, value")
    .in("key", [
      "deadline_notif_enabled",
      "deadline_notif_time",
      "deadline_notif_days",
      "deadline_notif_phones",
    ]);

  if (settingsErr) {
    return NextResponse.json({ error: settingsErr.message }, { status: 500 });
  }

  const get = (key: string) => settings?.find((s) => s.key === key)?.value || null;

  const enabled = get("deadline_notif_enabled") === "true";
  const time = get("deadline_notif_time") || "08:00";
  const daysStr = get("deadline_notif_days") || "3,2,1";
  const phonesStr = get("deadline_notif_phones") || "";

  // Skip cek enabled & waktu jika test dari dashboard atau cron
  if (!fromDashboard) {
    if (!enabled) {
      return NextResponse.json({ message: "Notifikasi deadline dinonaktifkan" });
    }
  }

  const days = daysStr.split(",").map(Number).filter((d: number) => d >= 0);
  const phones = phonesStr.split(",").map((p: string) => p.trim()).filter(Boolean);

  if (phones.length === 0 && !fromDashboard) {
    return NextResponse.json({ error: "Nomor HP admin belum diatur" }, { status: 400 });
  }

  // Untuk test dari dashboard, jika phones kosong, gunakan phone dari param atau return error
  if (phones.length === 0 && fromDashboard) {
    return NextResponse.json({ error: "Nomor HP admin belum diatur. Simpan di Pengaturan dulu." }, { status: 400 });
  }

  // 2. Cari order dengan deadline mendekati
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const ordersQuery = supabase
    .from("orders")
    .select(`
      id, order_number, customer_name, customer_phone,
      current_status, current_stage,
      deadline, products, quantity, product_type
    `)
    .not("deadline", "is", null);

  const { data: orders, error: ordersErr } = await ordersQuery;

  if (ordersErr) {
    return NextResponse.json({ error: ordersErr.message }, { status: 500 });
  }

  const toNotify: any[] = [];
  for (const order of orders) {
    // is_done di-compute: current_status === 'selesai'
    if (order.current_status === "selesai") continue;

    const deadlineDate = new Date(order.deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (days.includes(diffDays) && diffDays >= 0) {
      toNotify.push({ ...order, diffDays });
    }
  }

  if (toNotify.length === 0) {
    return NextResponse.json({ message: "Tidak ada order yang mendekati deadline" });
  }

  // 3. Kirim WA ke semua admin
  const results = [];
  for (const order of toNotify) {
    const stageName = ORDER_STATUS_LABELS[order.current_status as keyof typeof ORDER_STATUS_LABELS] || `Tahap ${order.current_stage}`;
    const product = order.products?.length ? order.products[0].name : order.product_type || "-";
    const qty = order.products?.length
      ? order.products.reduce((a: number, p: any) => a + p.sizes.reduce((x: number, s: any) => x + (s.qty || 0), 0), 0)
      : order.quantity || "-";

    const message = `⚠️ PERINGATAN DEADLINE PESANAN

Halo Admin,

Pesanan berikut mendekati deadline:

Nomor: ${order.order_number}
Customer: ${order.customer_name}
Produk: ${product} (${qty} pcs)
Tahap: ${stageName} (${order.current_stage}/11)
Deadline: ${new Date(order.deadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
Sisa: ${order.diffDays === 0 ? "Hari ini" : order.diffDays + " hari lagi"}

Segera tindak lanjuti.

Link: https://www.tntsportapparel.id/pesanan/orders
---
Pesan ini dikirim setiap hari sampai deadline terlewati.`;

    for (const phone of phones) {
      const normalized = normalizeAndValidatePhone(phone);
      if (!normalized) {
        results.push({ order: order.order_number, phone, status: "invalid_phone" });
        continue;
      }
      const result = await sendFonnteMessage(normalized, message);
      results.push({
        order: order.order_number,
        phone: normalized,
        status: result.success ? "sent" : "failed",
        response: result.response,
      });
    }
  }

  return NextResponse.json({
    message: "Notifikasi deadline terkirim",
    total_orders: toNotify.length,
    results,
  });
}