import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware } from '@/lib/authMiddleware';

import { uploadImage } from '@/lib/image-storage';

const prisma = new PrismaClient();

export async function POST(request: Request) {

  const authResponse = await authMiddleware(request);
  if (authResponse) {
      return authResponse;
  }
  async function handleFileUpload(file: File | null, existingUrl: string | null = null): Promise<string> {
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${uuidv4()}-${file.name}`;
      const contentType = file.type || 'application/octet-stream';
      const result = await uploadImage(buffer, fileName, 'portfolio', {
        contentType,
        originalName: file.name,
      });
      return result.secureUrl;
    }
    return existingUrl || '';
  }

  try {
    const formData = await request.formData();
    const body = JSON.parse(formData.get('data') as string);

    const contactCvPdfFile = formData.get('contactCVpdf') as File | null;
    const contactCvPdfUrl = await handleFileUpload(contactCvPdfFile, body.contact.CVpdf);
    const contactData = await prisma.contactData.upsert({
      where: { id: 1 },
      update: {
        ...body.contact,
        CVpdf: contactCvPdfUrl,
      },
      create: {
        ...body.contact,
        CVpdf: contactCvPdfUrl,
      },
    });

    return NextResponse.json({
      message: 'Datos de contacto actualizados con éxito',
      contactData
    }, { status: 200 });

  } catch (error) {
    console.error('Error al actualizar los datos de contacto:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}
