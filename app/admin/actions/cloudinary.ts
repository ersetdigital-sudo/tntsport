"use server";

import crypto from "crypto";

export async function getCloudinarySignature(params: {
  folder?: string;
}) {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = params.folder ?? "products";

  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + process.env.CLOUDINARY_API_SECRET!)
    .digest("hex");

  return {
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    folder,
  };
}
