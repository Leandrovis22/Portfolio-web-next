import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import firebaseConfig from '../../api/firebaseConfig';
import { authMiddleware } from '@/lib/authMiddleware';

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const prisma = new PrismaClient();

// Función para subir archivo a Firebase y obtener URL de descarga
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
  
      // Actualizar o crear CertificationsData
      const certificationsData = await prisma.certificationsData.upsert({
        where: { id: 1 },
        update: {
          certifications: {
            deleteMany: {}, // Borrar todas las certificaciones existentes
            create: await Promise.all(body.certifications.certifications.map(async (cert: any) => {
              const certImageFile = formData.get(`imageUrl-${cert.title}`) as File | null;
              const imageUrl = await handleFileUpload(certImageFile, cert.imageUrl);
              
              // Si el link está vacío, usar el URL de la imagen
              const link = cert.link || imageUrl;
  
              return {
                imageUrl,
                title: cert.title,
                date: cert.date,
                description: cert.description,
                link, // Usar el link modificado
              };
            })),
          },
        },
        create: {
          certifications: {
            create: await Promise.all(body.certifications.certifications.map(async (cert: any) => {
              const certImageFile = formData.get(`imageUrl-${cert.title}`) as File | null;
              const imageUrl = await handleFileUpload(certImageFile, cert.imageUrl);
  
              // Si el link está vacío, usar el URL de la imagen
              const link = cert.link || imageUrl;
  
              return {
                imageUrl,
                title: cert.title,
                date: cert.date,
                description: cert.description,
                link, // Usar el link modificado
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
  
