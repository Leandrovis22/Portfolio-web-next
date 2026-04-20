import { uploadToR2, deleteFromR2, getR2Url } from "./r2";

function ensureR2Provider() {
  const provider = process.env.IMAGE_STORAGE_PROVIDER
    ?.toLowerCase()
    .trim()
    .replace(/["']/g, "");
  if (provider !== "r2") {
    throw new Error("IMAGE_STORAGE_PROVIDER must be r2");
  }
}

export async function uploadImage(
  buffer: Buffer,
  publicId: string,
  folder = "portfolio",
  options?: { contentType?: string; originalName?: string; extension?: string }
) {
  ensureR2Provider();
  return uploadToR2(buffer, publicId, folder, options);
}

export async function deleteImage(publicId: string) {
  ensureR2Provider();
  await deleteFromR2(publicId);
}

export async function getImageUrl(publicId: string) {
  ensureR2Provider();
  return getR2Url(publicId);
}
