import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  STATUS_TO_STAGE,
  triggerStageNotification,
  type NotificationTriggerStatus,
} from "@/lib/fonnte";
import { checkRateLimit } from "@/lib/rate-limit";

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

function statusFromStep(step: number): string {
  return STEPS[Math.min(Math.max(step, 1), 9) - 1] || "desain";
}

/**
 * PATCH /api/pesanan/orders/[id]/status — update tahap produksi dari
 * dashboard Pesanan (id = order_number).
 *
 * Sama seperti endpoint admin: notifikasi WA (Fonnte) dipicu HANYA bila
 * tahap BENAR-BENAR berubah, anti-duplikat lewat unique (order_id, stage),
 * dan kegagalan kirim WA tidak menggagalkan update status.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { current_step, note, courier, tracking_number, is_done, deadline, wo_photos } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Rate limit dasar per order — cegah spam trigger notifikasi.
  if (!checkRateLimit(`stage-update:${id}`, 10, 60_000)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan, coba lagi nanti" },
      { status: 429 }
    );
  }

  // Ambil order dulu — previous_stage dibaca sebelum update, sekalian data
  // customer (nama, no. pesanan, no. HP) untuk pesan WhatsApp.
  const { data: existing, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", id)
    .maybeSingle();

  if (fetchError || !existing) {
    return NextResponse.json(
      { error: "Pesanan tidak ditemukan" },
      { status: 404 }
    );
  }

  const newStage =
    current_step !== undefined
      ? Math.min(Math.max(Number(current_step), 1), 9)
      : null;
  const previousStage =
    existing.current_stage ??
    STATUS_TO_STAGE[existing.current_status as string] ??
    null;

  const updateData: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (current_step !== undefined) {
    updateData.current_stage = newStage;
    if (current_step === 9 && is_done) {
      if (!tracking_number || !courier) {
        return NextResponse.json(
          { error: "Untuk menandai selesai, nomor resi dan ekspedisi harus diisi." },
          { status: 400 }
        );
      }
      updateData.current_status = "selesai";
    } else {
      updateData.current_status = statusFromStep(current_step);
    }
  }
  if (note !== undefined) updateData.design_notes = note;
  if (courier !== undefined) updateData.courier = courier;
  if (tracking_number !== undefined) updateData.tracking_number = tracking_number;
  if (deadline !== undefined) updateData.deadline = deadline || null;
  if (wo_photos !== undefined) updateData.wo_photos = Array.isArray(wo_photos) ? wo_photos : [];

  // Use .update().select().single() to get the updated row back (including UUID id)
  const { data: updatedOrder, error: updateError } = await supabase
    .from("orders")
    .update(updateData)
    .eq("order_number", id)
    .select("id")
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Insert history entry using the UUID from the updated row
  let historyError: string | null = null;
  if (current_step !== undefined && updatedOrder) {
    const statusValue = is_done && current_step === 9 ? "selesai" : statusFromStep(current_step);
    const { error: histErr } = await supabase.from("order_status_history").insert({
      order_id: updatedOrder.id,
      status: statusValue,
      note: note || "",
    });
    if (histErr) {
      historyError = histErr.message;
      console.error("History insert failed:", histErr.message, {
        order_id: updatedOrder.id,
        status: statusValue,
      });
    }
  }

  // Notifikasi WhatsApp — hanya bila tahap berubah.
  const notification: {
    stage: number | null;
    status: "none" | "skipped_same_stage" | NotificationTriggerStatus;
  } = { stage: newStage, status: "none" };

  if (updatedOrder && newStage !== null && newStage !== previousStage) {
    notification.status = await triggerStageNotification(
      supabase,
      updatedOrder.id,
      existing,
      newStage
    );
  } else if (newStage !== null && newStage === previousStage) {
    notification.status = "skipped_same_stage";
  }

  return NextResponse.json({ ok: true, historyError, notification });
}