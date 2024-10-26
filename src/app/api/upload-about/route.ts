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