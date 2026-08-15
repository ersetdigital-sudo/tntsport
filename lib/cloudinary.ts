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

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${signedParams.cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return { url: data.secure_url, public_id: data.public_id };
}
