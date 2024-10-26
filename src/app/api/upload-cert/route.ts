import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware } from '@root/src/lib/authMiddleware';
import { adminStorage } from '@/lib/firebaseAdmin';

const prisma = new PrismaClient();

async function uploadFileToFirebase(file: Buffer, fileName: string, contentType: string): Promise<string> {
  const fileUpload = adminStorage.file(`portfolio/${fileName}`);
  
  const blobStream = fileUpload.createWriteStream({
      metadata: {
          contentType: contentType,
      },
      resumable: false
  });

  return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
          reject(error);
      });

      blobStream.on('finish', async () => {

          await fileUpload.makePublic();
          
          const publicUrl = `https://storage.googleapis.com/${adminStorage.name}/${fileUpload.name}`;
          resolve(publicUrl);
      });

      blobStream.end(file);
  });
}

export async function POST(request: Request) {

  const authResponse = await authMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  async function handleFileUpload(file: File | null, existingUrl: string | null = null): Promise<string> {
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${uuidv4()}-${file.name}`;
      const contentType = file.type;
      return uploadFileToFirebase(buffer, fileName, contentType);
    }
    return existingUrl || '';
  }

  try {
    const formData = await request.formData();
    const body = JSON.parse(formData.get('data') as string);

    const certificationsData = await prisma.certificationsData.upsert({
      where: { id: 1 },
      update: {
        certifications: {
          deleteMany: {}, 
          create: await Promise.all(body.certifications.certifications.map(async (cert: any) => {
            const certImageFile = formData.get(`imageUrl-${cert.title}`) as File | null;
            const imageUrl = await handleFileUpload(certImageFile, cert.imageUrl);
            
            const link = cert.link || imageUrl;

            return {
              imageUrl,
              title: cert.title,
              date: cert.date,
              description: cert.description,
              link,
            };
          })),
        },
      },
      create: {
        certifications: {
          create: await Promise.all(body.certifications.certifications.map(async (cert: any) => {
            const certImageFile = formData.get(`imageUrl-${cert.title}`) as File | null;
            const imageUrl = await handleFileUpload(certImageFile, cert.imageUrl);

            const link = cert.link || imageUrl;

            return {
              imageUrl,
              title: cert.title,
              date: cert.date,
              description: cert.description,
              link,
            };
          })),
        },
      },
    });

    return NextResponse.json({ 
      message: 'Certificaciones actualizadas con éxito',
      certificationsData,
    }, { status: 200 });

  } catch (error) {
    console.error('Error al actualizar las certificaciones:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}