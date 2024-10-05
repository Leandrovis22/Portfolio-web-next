import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import firebaseConfig from '@root/firebaseConfig';
import { authMiddleware } from '@root/src/lib/authMiddleware';

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const prisma = new PrismaClient();


// Función auxiliar para subir archivos a Firebase
async function uploadFileToFirebase(file: Buffer, fileName: string, contentType: string): Promise<string> {
    const storageRef = ref(storage, `portfolio/${fileName}`);
    await uploadBytes(storageRef, file, { contentType });

    await new Promise(resolve => setTimeout(resolve, 1000));

    let downloadURL = '';
    for (let attempts = 0; attempts < 5; attempts++) {
        try {
            downloadURL = await getDownloadURL(storageRef);
            if (downloadURL) break;
        } catch (error) {
            console.error('Error al obtener la URL:', error);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    if (!downloadURL) {
        throw new Error('No se pudo obtener la URL de la imagen después de varios intentos.');
    }

    return downloadURL;
}

export async function POST(request: Request) {
  // Primero, autenticar la solicitud
  const authResponse = await authMiddleware(request);
  if (authResponse) {
      return authResponse; // Retorna la respuesta de error si la autenticación falla
  }

    // Si la autenticación es exitosa, proceder con la lógica existente
    async function handleFileUpload(file: File | null, existingUrl: string | null = null): Promise<string | null> {
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = `${uuidv4()}-${file.name}`;
            const contentType = file.type;
            return uploadFileToFirebase(buffer, fileName, contentType);
        }
        return existingUrl;
    }

    try {
        const formData = await request.formData();
        const body = JSON.parse(formData.get('data') as string);
        const response: any = {};

        if (body.about) {
            const aboutImageFile = formData.get('imageUrl') as File | null;
            const cvPdfFile = formData.get('CVpdf') as File | null;

            const updateData: any = {};
            
            if (aboutImageFile) {
                updateData.imageUrl = await handleFileUpload(aboutImageFile, body.about.imageUrl);
            }
            if (cvPdfFile) {
                updateData.CVpdf = await handleFileUpload(cvPdfFile, body.about.CVpdf);
            }
            if (body.about.description !== undefined) {
                updateData.description = body.about.description;
            }

            if (Object.keys(updateData).length > 0) {
                const aboutData = await prisma.aboutData.upsert({
                    where: { id: 1 },
                    update: updateData,
                    create: {
                        ...updateData,
                        description: updateData.description || '',
                        imageUrl: updateData.imageUrl || '',
                        CVpdf: updateData.CVpdf || ''
                    },
                });
                response.aboutData = aboutData;
            }
        }

        return NextResponse.json({ 
            message: 'Datos actualizados con éxito',
            ...response
        }, { status: 200 });

    } catch (error) {
        console.error('Error al actualizar los datos:', error);
        return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
    }
}