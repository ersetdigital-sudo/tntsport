import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendFonnteMessage, normalizeAndValidatePhone } from "@/lib/fonnte";
import { ORDER_STATUS_LABELS } from "@/lib/types";

const CRON_SECRET = process.env.CRON_SECRET || "";

/** Get current time in WIB (Asia/Jakarta, UTC+7) using Intl */
function getWibNow(): { hours: number; minutes: number; iso: string } {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const hours = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minutes = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
  return { hours, minutes, iso };
}

export async function POST(req: Request) {
  return GET(req);
}

export async function GET(req: Request) {
  const auth = req.headers.get("x-cron-secret");
  const url = new URL(req.url);
  const secretParam = url.searchParams.get("secret");
  const fromDashboard = req.headers.get("x-from-dashboard") === "true";

  const secretValue = auth || secretParam;

  if (!fromDashboard && (!CRON_SECRET || secretValue !== CRON_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(
    supabaseUrl,
    serviceKey || anonKey,
    serviceKey ? { auth: { persistSession: false } } : undefined
  );

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

  // Cek enabled & waktu (skip jika test dari dashboard)
  if (!fromDashboard) {
    if (!enabled) {
      return NextResponse.json({ message: "Notifikasi deadline dinonaktifkan" });
    }

    const wib = getWibNow();
    const [cfgH, cfgM] = time.split(":").map(Number);
    const currentMinutes = wib.hours * 60 + wib.minutes;
    const targetMinutes = cfgH * 60 + cfgM;
    const diffMin = Math.abs(currentMinutes - targetMinutes);

    // ±5 menit tolerance (cron tiap 5 menit, buffer untuk delay GitHub Actions)
    if (diffMin > 5) {
      return NextResponse.json({
        message: `Belum waktunya. Setting: ${time} WIB, sekarang: ${String(wib.hours).padStart(2, "0")}:${String(wib.minutes).padStart(2, "0")} WIB`,
      });
    }
  }

  const overridePhones = req.headers.get("x-override-phones");
  const effectivePhonesStr = overridePhones ?? phonesStr;
  const days = daysStr.split(",").map(Number).filter((d: number) => d >= 0);
  const phones = effectivePhonesStr.split(",").map((p: string) => p.trim()).filter(Boolean);

  if (phones.length === 0) {
    return NextResponse.json({ error: "Nomor HP admin belum diatur" }, { status: 400 });
  }

  // 2. Cari order dengan deadline mendekati
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: orders, error: ordersErr } = await supabase
    .from("orders")
    .select(`
      id, order_number, customer_name, customer_phone,
      current_status, current_stage,
      deadline, products, quantity, product_type,
      deadline_notified_at
    `)
    .not("deadline", "is", null);

  if (ordersErr) {
    return NextResponse.json({ error: ordersErr.message }, { status: 500 });
  }

  const toNotify: any[] = [];
  for (const order of orders) {
    if (order.current_status === "selesai") continue;

    // Dedup: skip jika sudah notif dalam 12 jam terakhir (kecuali test dashboard)
    if (!fromDashboard && order.deadline_notified_at) {
      const lastNotified = new Date(order.deadline_notified_at).getTime();
      const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
      if (lastNotified > twelveHoursAgo) continue;
    }

    const deadlineDate = new Date(order.deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil(
      (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (days.includes(diffDays) && diffDays >= 0) {
      toNotify.push({ ...order, diffDays });
    }
  }

  if (toNotify.length === 0) {
    return NextResponse.json({ message: "Tidak ada order yang mendekati deadline" });
  }

  // 3. Kirim WA ke semua admin + dedup + tracking
  const results: any[] = [];
  const notifiedOrderIds: string[] = [];

  for (const order of toNotify) {
    const stageName =
      ORDER_STATUS_LABELS[order.current_status as keyof typeof ORDER_STATUS_LABELS] ||
      `Tahap ${order.current_stage}`;
    const product = order.products?.length
      ? order.products[0].name
      : order.product_type || "-";
    const qty = order.products?.length
      ? order.products.reduce(
          (a: number, p: any) =>
            a + p.sizes.reduce((x: number, s: any) => x + (s.qty || 0), 0),
          0
        )
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
Pesan ini dikirim otomatis oleh sistem.`;

    let anySent = false;
    for (const phone of phones) {
      const normalized = normalizeAndValidatePhone(phone);
      if (!normalized) {
        results.push({ order: order.order_number, phone, status: "invalid_phone" });
        continue;
      }

      // Retry: max 2 attempts
      let result = await sendFonnteMessage(normalized, message);
      if (!result.success) {
        await new Promise((r) => setTimeout(r, 2000));
        result = await sendFonnteMessage(normalized, message);
      }

      results.push({
        order: order.order_number,
        phone: normalized,
        status: result.success ? "sent" : "failed",
        response: result.response,
      });

      // Log to notification_logs
      await supabase.from("notification_logs").insert({
        order_id: order.id,
        order_number: order.order_number,
        phone: normalized,
        status: result.success ? "sent" : "failed",
        error: result.success ? null : result.response || "Unknown error",
        diff_days: order.diffDays,
      });

      if (result.success) anySent = true;
    }

    // Dedup: record setelah berhasil kirim (skip untuk test dashboard)
    if (anySent && !fromDashboard) {
      notifiedOrderIds.push(order.id);
    }
  }

  // Batch update deadline_notified_at (dedup tracking)
  if (notifiedOrderIds.length > 0) {
    const nowIso = new Date().toISOString();
    await supabase
      .from("orders")
      .update({ deadline_notified_at: nowIso })
      .in("id", notifiedOrderIds);
  }

  return NextResponse.json({
    message: "Notifikasi deadline terkirim",
    total_orders: toNotify.length,
    results,
  });
}
