export async function uploadToCloudinary(
  file: File,
  signedParams: {
    timestamp: number;
    signature: string;
    cloudName: string;
    apiKey: string;
    folder: string;
  }
): Promise<{ url: string; public_id: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signedParams.apiKey);
  formData.append("timestamp", String(signedParams.timestamp));
  formData.append("signature", signedParams.signature);
  formData.append("folder", signedParams.folder);

  console.log("[Cloudinary Upload]", {
    url: `https://api.cloudinary.com/v1_1/${signedParams.cloudName}/image/upload`,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    cloudName: signedParams.cloudName,
    apiKey: signedParams.apiKey,
    timestamp: signedParams.timestamp,
    folder: signedParams.folder,
    hasSignature: !!signedParams.signature,
  });

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${signedParams.cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  console.log("[Cloudinary Response]", {
    status: res.status,
    statusText: res.statusText,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("[Cloudinary Error Body]", errorBody);
    throw new Error("Upload failed");
  }
  const data = await res.json();
  return { url: data.secure_url, public_id: data.public_id };
}
