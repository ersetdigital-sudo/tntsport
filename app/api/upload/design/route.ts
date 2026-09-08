import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/upload/design
 * Uploads design preview image to Cloudinary using an UNSIGNED upload preset.
 * Env needed: CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET
 * Compression: f_auto + q_auto (auto format & quality via URL transform).
 */
export async function POST(request: NextRequest) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    console.log("[upload/design] env", { hasCloudName: !!cloudName, hasPreset: !!uploadPreset, cloudNameLen: cloudName?.length || 0 });
    if (!cloudName || !uploadPreset) {
      console.error("[upload/design] missing env");
      return NextResponse.json(
        { error: `Cloudinary belum dikonfigurasi (cloud=${!!cloudName} preset=${!!uploadPreset}) — set CLOUDINARY_CLOUD_NAME + CLOUDINARY_UPLOAD_PRESET di Vercel` },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File harus gambar" }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Maksimal 10MB" }, { status: 400 });
    }

    // Forward to Cloudinary unsigned upload endpoint
    const cf = new FormData();
    cf.append("file", file);
    cf.append("upload_preset", uploadPreset);
    cf.append("folder", "tnt-design-preview");

    console.log("[upload/design] uploading", { name: file.name, type: file.type, bytes: file.size, cloudName, preset: uploadPreset });
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: cf }
    );

    const data = await res.json();
    console.log("[upload/design] cloudinary resp", res.status, JSON.stringify(data).slice(0, 600));

    if (!res.ok || !data.secure_url) {
      console.error("Cloudinary upload failed:", res.status, data);
      return NextResponse.json(
        { error: data?.error?.message || `Upload gagal (Cloudinary ${res.status}: ${JSON.stringify(data).slice(0,300)})` },
        { status: 500 }
      );
    }

    // Auto-compress: f_auto (best format) + q_auto (optimal quality)
    const optimizedUrl = data.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_auto/"
    );

    return NextResponse.json({
      url: optimizedUrl,
      publicId: data.public_id,
      bytes: data.bytes,
    });
  } catch (e: any) {
    console.error("Upload design exception:", e?.message || e);
    return NextResponse.json({ error: `Terjadi kesalahan server: ${e?.message || "unknown"}` }, { status: 500 });
  }
}
