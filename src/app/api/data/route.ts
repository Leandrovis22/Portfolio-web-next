import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const about = await prisma.aboutData.findFirst();
    const skills = await prisma.skillsData.findFirst({
      include: {
        cards: true,  // Incluye los datos de las cartas
      },
    });
    const certifications = await prisma.certificationsData.findFirst({
      include: {
        certifications: true,  // Incluye los datos de las certificaciones
      },
    });
    const projects = await prisma.projectsData.findFirst({
      include: {
        projects: true,  // Incluye los datos de los proyectos
      },
    });
    const contact = await prisma.contactData.findFirst();
    const footer = await prisma.footerData.findFirst();

    return NextResponse.json({
      about: {
        CVpdf: about?.CVpdf || '',
        imageUrl: about?.imageUrl || '',
        description: about?.description || '',
      },
      skills: {
        cards: skills?.cards || [],  // Asegúrate de obtener la lista de cards
        words: skills?.words || [],
      },
      certifications: {
        certifications: certifications?.certifications || [],  // Asegúrate de obtener la lista de certificaciones
      },
      projects: {
        projects: projects?.projects || [],  // Asegúrate de obtener la lista de proyectos
      },
      contact: {
        CVpdf: contact?.CVpdf || '',
        githubtext: contact?.githubtext || '',
        githublink: contact?.githublink || '',
        linkedintext: contact?.linkedintext || '',
        linkedinlink: contact?.linkedinlink || '',
        emailtext: contact?.emailtext || '',
      },
      footer: {
        words: footer?.words || [],
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
