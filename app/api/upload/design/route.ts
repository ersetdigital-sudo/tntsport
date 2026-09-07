import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

/**
 * POST /api/upload/design
 * Signed server-side upload to Cloudinary using API key/secret.
 * Env: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 * Compression: f_auto + q_auto (auto format & quality).
 */
async function uploadToCloudinary(file: File): Promise<{ secure_url: string; public_id: string; bytes: number }> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary belum dikonfigurasi");
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = "tnt-design-preview";

  // Build signature per Cloudinary spec: sha1 of sorted params + api_secret
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(paramsToSign).digest("hex");

  const buffer = Buffer.from(await file.arrayBuffer());

  // multipart/form-data upload
  const boundary = "----TNTFormBoundary" + Date.now();
  const parts: Buffer[] = [];

  const appendField = (name: string, value: string) => {
    parts.push(
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`
      )
    );
  };
  appendField("api_key", apiKey);
  appendField("timestamp", String(timestamp));
  appendField("folder", folder);
  appendField("signature", signature);

  parts.push(
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${file.name || "design"}"\r\nContent-Type: ${file.type || "application/octet-stream"}\r\n\r\n`
    )
  );
  parts.push(buffer);
  parts.push(Buffer.from(`\r\n--${boundary}--\r\n`));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` },
    body: Buffer.concat(parts),
  });

  const data = await res.json();
  if (!res.ok || !data.secure_url) {
    throw new Error(data?.error?.message || "Upload gagal");
  }

  // Auto-compress: f_auto (best format) + q_auto (optimal quality)
  const optimizedUrl = data.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");

  return {
    secure_url: optimizedUrl,
    public_id: data.public_id,
    bytes: data.bytes,
  };
}

export async function POST(request: NextRequest) {
  try {
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

    const result = await uploadToCloudinary(file);

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      bytes: result.bytes,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
