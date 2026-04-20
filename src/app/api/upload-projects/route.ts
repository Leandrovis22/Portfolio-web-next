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
        const dataString = formData.get('data') as string;
        
        if (!dataString) {
            return NextResponse.json({ error: 'No data provided' }, { status: 400 });
        }

        const body = JSON.parse(dataString);
        
        // Debug logging
        console.log('Received body:', JSON.stringify(body, null, 2));
        
        // Check if the projects data exists and has the correct structure
        if (!body.projects || !Array.isArray(body.projects.projects)) {
            console.error('Invalid data structure. Expected body.projects.projects to be an array');
            return NextResponse.json({ error: 'Invalid data structure' }, { status: 400 });
        }

        const projectsData = await prisma.projectsData.upsert({
            where: { id: 1 },
            update: {
                projects: {
                    deleteMany: {},
                    create: await Promise.all(body.projects.projects.map(async (project: any) => {
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
                    create: await Promise.all(body.projects.projects.map(async (project: any) => {
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
        return NextResponse.json({ 
            error: 'Error processing request',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}