// src/lib/data.ts
import { downloadImage } from './downloadImages';
import siteData from '../lib/data.json';

export interface AboutData {
  CVpdf: string;
  imageUrl: string;
  description: string;
}

export interface SkillsData {
  cards: Array<{ title: string; src: string; content: string }>;
  words: string[];
}

export interface CertificationsData {
  certifications: Array<{ imageUrl: string; title: string; date: string; description: string; link: string }>;
}

export interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  header: string;
  externalLink: string;
  githubLink: string;
  projectsDataId: number;
}

export interface ProjectsData {
  projects: Project[];
}

export interface ContactData {
  CVpdf: string;
  githubtext: string;
  githublink: string;
  linkedintext: string;
  linkedinlink: string;
  emailtext: string;
}

export interface FooterData {
  words: string[];
}

export interface SiteData {
  about: AboutData;
  skills: SkillsData;
  certifications: CertificationsData;
  projects: ProjectsData;
  contact: ContactData;
  footer: FooterData;
}

async function processImages(data: SiteData): Promise<SiteData> {
  const downloadAndUpdateImage = async (url: string, prefix: string) => {
    if (url) {
      return await downloadImage(url);
    }
    return url;
  };

  // Crear una copia profunda de los datos para no modificar el original
  const processedData = JSON.parse(JSON.stringify(data));

  // Update About image
  processedData.about.imageUrl = await downloadAndUpdateImage(processedData.about.imageUrl, 'about');

  // Update Skills card images
  for (let card of processedData.skills.cards) {
    card.src = await downloadAndUpdateImage(card.src, 'skill');
  }

  // Update Certifications images
  for (let cert of processedData.certifications.certifications) {
    cert.imageUrl = await downloadAndUpdateImage(cert.imageUrl, 'cert');
  }

  // Update Project header images
  for (let project of processedData.projects.projects) {
    project.header = await downloadAndUpdateImage(project.header, 'project');
  }

  return processedData;
}

export async function getData(): Promise<SiteData> {
  // Verificar si estamos en tiempo de build
  const isBuildTime = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production';

  try {
    let data: SiteData;

    if (isBuildTime) {
      // Durante el build, usar datos estáticos
      console.log('Using static data during build time');
      data = siteData as unknown as SiteData;
    } else {
      // En desarrollo o en tiempo de ejecución, intentar usar la API
      const isProduction = process.env.NODE_ENV === 'production';
      const baseUrl = isProduction ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
      
      console.log('Fetching data from API...', `${baseUrl}/api/data`);
      const response = await fetch(`${baseUrl}/api/data`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        throw new Error('Received empty data from API');
      }
    }
    console.log('Data fetched:', data);
    // Procesar las imágenes independientemente del origen de los datos
    return await processImages(data);

  } catch (error) {
    console.error('Error in getData(), falling back to static data:', error);
    
    // Usar datos estáticos como fallback y procesarlos
    return await processImages(siteData as unknown as SiteData);
  }
}