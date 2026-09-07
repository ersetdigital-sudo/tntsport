import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/upload/design
 * Uploads a design preview image to Cloudinary (unsigned, via server proxy).
 * Env: CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET
 * Compression: f_auto + q_auto (Cloudinary auto-compresses & optimizes format).
 */
export async function POST(request: NextRequest) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json(
        { error: "Cloudinary belum dikonfigurasi" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    // Validate type & size (max 10MB)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File harus gambar" }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Maksimal 10MB" }, { status: 400 });
    }

    // Forward to Cloudinary unsigned upload
    const cf = new FormData();
    cf.append("file", file);
    cf.append("upload_preset", uploadPreset);
    cf.append("folder", "tnt-design-preview");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: cf }
    );

    const data = await res.json();

    if (!res.ok || !data.secure_url) {
      return NextResponse.json(
        { error: data?.error?.message || "Upload gagal" },
        { status: 500 }
      );
    }

    // Build optimized URL: f_auto (format) + q_auto (quality) = auto-compress
    const optimizedUrl = data.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_auto/"
    );

    return NextResponse.json({
      url: optimizedUrl,
      publicId: data.public_id,
      bytes: data.bytes,
    });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
