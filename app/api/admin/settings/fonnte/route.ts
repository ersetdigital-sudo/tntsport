import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  decryptSecret,
  encryptSecret,
  encryptionKeyConfigured,
} from "@/lib/fonnte-crypto";
import { FONNTE_TOKEN_KEY } from "@/lib/fonnte";

/**
 * GET /api/admin/settings/fonnte — info token (masked, admin only).
 * Response HANYA berisi `hasToken` + `tokenLast4` — token penuh TIDAK PERNAH
 * dikirim ke client/browser.
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", FONNTE_TOKEN_KEY)
    .maybeSingle();

  if (!data?.value) {
    return NextResponse.json({
      hasToken: false,
      tokenLast4: null,
      encryptionKeyConfigured: encryptionKeyConfigured(),
    });
  }

  let tokenLast4: string | null = null;
  try {
    tokenLast4 = decryptSecret(data.value).slice(-4);
  } catch {
    // Key belum di-set atau data korup — jangan bocorkan isi payload.
    tokenLast4 = null;
  }

  return NextResponse.json({
    hasToken: tokenLast4 !== null,
    tokenLast4,
    encryptionKeyConfigured: encryptionKeyConfigured(),
  });
}

/**
 * POST /api/admin/settings/fonnte — simpan token Fonnte (admin only).
 * Token DIENKRIPSI (AES-256-GCM) sebelum masuk DB dan TIDAK PERNAH di-log.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!encryptionKeyConfigured()) {
    return NextResponse.json(
      {
        error:
          "SETTINGS_ENCRYPTION_KEY belum di-set di environment server. Tambahkan ke .env.local lalu deploy ulang.",
      },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token.trim() : "";

  if (!token) {
    return NextResponse.json(
      { error: "Token tidak boleh kosong" },
      { status: 400 }
    );
  }

  // Enkripsi di server — plaintext token tidak pernah meninggalkan server.
  const encrypted = encryptSecret(token);

  const { error } = await supabase.from("app_settings").upsert(
    {
      key: FONNTE_TOKEN_KEY,
      value: encrypted,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );

  if (error) {
    // Jangan log isi token; cukup message error DB.
    console.error("app_settings upsert failed:", error.message);
    return NextResponse.json(
      { error: "Gagal menyimpan pengaturan" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    tokenLast4: token.slice(-4),
  });
}