// src/lib/data.ts

import siteData from './fallbackdata.json';

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
  const isBuildTime = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production';

  let data: SiteData;

  if (isBuildTime) {

    console.log('Using build-time data...');
    data = siteData as SiteData;

  } else {

    console.log('Using server-side data...');

    try {

      const baseUrl = process.env.VERCEL_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/data`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data from server: ${response.status} ${response.statusText}`);
      }

      data = await response.json() as SiteData;

    } catch (error) {

      console.error('Failed to fetch data from server:', error);
      console.warn('Falling back to build-time data...');

      data = siteData as SiteData;

    }

  }

  return data;
}
