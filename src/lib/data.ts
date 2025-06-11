// src/lib/data.ts

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

  let data: SiteData;

    try {

      const isProduction = process.env.NODE_ENV === 'production';
      console.log(`isProduction: ${isProduction}, NEXT_PUBLIC_BASE_URL: ${process.env.NEXT_PUBLIC_BASE_URL}`);
      const baseUrl = isProduction ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : 'http://localhost:3000';
      
      const response = await fetch(`${baseUrl}/api/data`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data from server: ${response.status} ${response.statusText}`);
      }

      data = await response.json() as SiteData;

    } catch (error) {

      console.error('Failed to fetch data from server:', error);
      throw error;
    }

  return data;
}
