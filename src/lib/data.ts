// src/lib/data.ts
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

    // Devolver los datos directamente sin procesamiento de imágenes
    return data;

  } catch (error) {
    console.error('Error in getData(), falling back to static data:', error);
    
    // Usar datos estáticos como fallback
    return siteData as unknown as SiteData;
  }
}
