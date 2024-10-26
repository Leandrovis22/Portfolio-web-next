import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware } from '@/lib/authMiddleware';

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