import path from "path";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

function getR2Client() {
  const endpoint = process.env.R2_ENDPOINT;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing R2 credentials");
  }

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
}

function buildKey(
  publicId: string,
  folder: string | undefined,
  extension: string | undefined
): string {
  const safeFolder = folder ? folder.replace(/^\/+|\/+$/g, "") : "";
  const normalizedPublicId = publicId.replace(/^\/+|\/+$/g, "");
  const currentExt = path.extname(normalizedPublicId);
  const resolvedExt = currentExt || extension || ".bin";
  const baseName = currentExt
    ? normalizedPublicId.slice(0, -currentExt.length)
    : normalizedPublicId;
  const fileName = `${baseName}${resolvedExt}`;

  return safeFolder ? `${safeFolder}/${fileName}` : fileName;
}

function resolveExtension(
  originalName?: string,
  explicitExtension?: string
): string | undefined {
  if (explicitExtension) {
    return explicitExtension.startsWith(".")
      ? explicitExtension
      : `.${explicitExtension}`;
  }

  if (!originalName) return undefined;
  const ext = path.extname(originalName);
  return ext || undefined;
}

export async function uploadToR2(
  buffer: Buffer,
  publicId: string,
  folder = "portfolio",
  options?: { contentType?: string; originalName?: string; extension?: string }
): Promise<UploadResult> {
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;
  if (!bucketName || !publicUrl) {
    throw new Error("Missing R2_BUCKET_NAME or R2_PUBLIC_URL");
  }

  const extension = resolveExtension(options?.originalName, options?.extension);
  const key = buildKey(publicId, folder, extension);

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: options?.contentType || "application/octet-stream",
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  const finalUrl = `${publicUrl}/${key}`;
  return { publicId: key, url: finalUrl, secureUrl: finalUrl };
}

export async function deleteFromR2(publicId: string): Promise<void> {
  const bucketName = process.env.R2_BUCKET_NAME;
  if (!bucketName) throw new Error("Missing R2_BUCKET_NAME");

  const client = getR2Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: publicId,
    })
  );
}

export function getR2Url(publicId: string): string {
  const publicUrl = process.env.R2_PUBLIC_URL;
  if (!publicUrl) throw new Error("Missing R2_PUBLIC_URL");
  return `${publicUrl}/${publicId}`;
}

export async function existsInR2(publicId: string): Promise<boolean> {
  try {
    const bucketName = process.env.R2_BUCKET_NAME;
    if (!bucketName) throw new Error("Missing R2_BUCKET_NAME");

    const client = getR2Client();
    await client.send(
      new HeadObjectCommand({
        Bucket: bucketName,
        Key: publicId,
      })
    );
    return true;
  } catch {
    return false;
  }
}
