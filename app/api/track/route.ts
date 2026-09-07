import { NextRequest, NextResponse } from "next/server";
import { getOrderByTracking } from "@/lib/queries-orders";

/**
 * POST /api/track
 * Verify order number + phone and return order data + history.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderNumber, phone } = body;

    if (!orderNumber || !phone) {
      return NextResponse.json(
        { error: "Nomor pesanan dan nomor HP wajib diisi" },
        { status: 400 }
      );
    }

    const result = await getOrderByTracking(orderNumber, phone);

    if (!result) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan atau nomor HP tidak cocok" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
