import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import firebaseConfig from '../../../../firebaseConfig';
import { authMiddleware } from '@/lib/authMiddleware';

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const prisma = new PrismaClient();

async function uploadFileToFirebase(file: Buffer, fileName: string, contentType: string): Promise<string> {
  const storageRef = ref(storage, `portfolio/${fileName}`);
  await uploadBytes(storageRef, file, { contentType });
  return getDownloadURL(storageRef);
}

export async function POST(request: Request) {
  // Primero, autenticar la solicitud
  const authResponse = await authMiddleware(request);
  if (authResponse) {
      return authResponse; // Retorna la respuesta de error si la autenticación falla
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

    // Actualizar o crear ContactData
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
