import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import firebaseConfig from '@/app/api/firebaseConfig';
import { authMiddleware } from '@/lib/authMiddleware';

// Initialize Firebase
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

    // Handle Projects Data
    const projectsData = await prisma.projectsData.upsert({
      where: { id: 1 },
      update: {
        projects: {
          deleteMany: {},
          create: await Promise.all(body.projects.proyects.map(async (project: any) => {
            const projectImageFile = formData.get(`header-${project.title}`) as File | null;
            const header = await handleFileUpload(projectImageFile, project.header);
            return {
              title: project.title,
              date: project.date,
              description: project.description,
              header,
              externalLink: project.externalLink,
              githubLink: project.githubLink,
            };
          })),
        },
      },
      create: {
        projects: {
          create: await Promise.all(body.projects.proyects.map(async (project: any) => {
            const projectImageFile = formData.get(`header-${project.title}`) as File | null;
            const header = await handleFileUpload(projectImageFile, project.header);
            return {
              title: project.title,
              date: project.date,
              description: project.description,
              header,
              externalLink: project.externalLink,
              githubLink: project.githubLink,
            };
          })),
        },
      },
    });

    return NextResponse.json({ 
      message: 'Project data updated successfully',
      projectsData
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating project data:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}