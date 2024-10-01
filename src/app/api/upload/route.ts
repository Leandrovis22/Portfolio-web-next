import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import firebaseConfig from '../../../../firebaseConfig';

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

    // Actualizar o crear AboutData
    const aboutImageFile = formData.get('imageUrl') as File | null;
    const cvPdfFile = formData.get('CVpdf') as File | null;
    const aboutImageUrl = await handleFileUpload(aboutImageFile, body.about.imageUrl);
    const cvPdfUrl = await handleFileUpload(cvPdfFile, body.about.CVpdf);
    const aboutData = await prisma.aboutData.upsert({
      where: { id: 1 },
      update: {
        CVpdf: cvPdfUrl,
        imageUrl: aboutImageUrl,
        description: body.about.description,
      },
      create: {
        CVpdf: cvPdfUrl,
        imageUrl: aboutImageUrl,
        description: body.about.description,
      },
    });

    // Actualizar o crear SkillsData
    const skillsData = await prisma.skillsData.upsert({
      where: { id: 1 },
      update: {
        words: body.skills.words,
        cards: {
          deleteMany: {},
          create: await Promise.all(body.skills.cards.map(async (card: any) => {
            const cardImageFile = formData.get(`src-${card.title}`) as File | null;
            const src = await handleFileUpload(cardImageFile, card.src);
            return {
              title: card.title,
              src,
              content: JSON.stringify(card.content),
            };
          })),
        },
      },
      create: {
        words: body.skills.words,
        cards: {
          create: await Promise.all(body.skills.cards.map(async (card: any) => {
            const cardImageFile = formData.get(`src-${card.title}`) as File | null;
            const src = await handleFileUpload(cardImageFile, card.src);
            return {
              title: card.title,
              src,
              content: JSON.stringify(card.content),
            };
          })),
        },
      },
    });

    // Actualizar o crear CertificationsData
    const certificationsData = await prisma.certificationsData.upsert({
      where: { id: 1 },
      update: {
        certifications: {
          deleteMany: {},
          create: await Promise.all(body.certifications.certifications.map(async (cert: any) => {
            const certImageFile = formData.get(`imageUrl-${cert.title}`) as File | null;
            const imageUrl = await handleFileUpload(certImageFile, cert.imageUrl);
            return {
              imageUrl,
              title: cert.title,
              date: cert.date,
              description: cert.description,
              link: cert.link,
            };
          })),
        },
      },
      create: {
        certifications: {
          create: await Promise.all(body.certifications.certifications.map(async (cert: any) => {
            const certImageFile = formData.get(`imageUrl-${cert.title}`) as File | null;
            const imageUrl = await handleFileUpload(certImageFile, cert.imageUrl);
            return {
              imageUrl,
              title: cert.title,
              date: cert.date,
              description: cert.description,
              link: cert.link,
            };
          })),
        },
      },
    });

    // Actualizar o crear ProjectsData
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

    // Actualizar o crear FooterData (sin cambios)
    const footerData = await prisma.footerData.upsert({
      where: { id: 1 },
      update: { words: body.footer.words },
      create: { words: body.footer.words },
    });

    return NextResponse.json({ 
      message: 'Datos del portafolio actualizados con éxito',
      aboutData,
      skillsData,
      certificationsData,
      projectsData,
      contactData,
      footerData
    }, { status: 200 });

  } catch (error) {
    console.error('Error al actualizar los datos del portafolio:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}