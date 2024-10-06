// src/lib/data.ts
import fs from 'fs';
import path from 'path';
import { downloadImage } from './downloadImages';
import siteData from './data.json';

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
  const downloadAndUpdateImage = async (url: string) => {
    if (url) {
      return await downloadImage(url);
    }
    return url;
  };

  // Crear una copia profunda de los datos para no modificar el original
  const processedData: SiteData = JSON.parse(JSON.stringify(data));

  // Update About image
  processedData.about.imageUrl = await downloadAndUpdateImage(processedData.about.imageUrl);

  // Update Skills card images
  for (let card of processedData.skills.cards) {
    card.src = await downloadAndUpdateImage(card.src);
  }

  // Update Certifications images
  for (let cert of processedData.certifications.certifications) {
    cert.imageUrl = await downloadAndUpdateImage(cert.imageUrl);
  }

  // Update Project header images
  for (let project of processedData.projects.projects) {
    project.header = await downloadAndUpdateImage(project.header);
  }

  return processedData;
}

export async function getData(): Promise<SiteData> {
  const isBuildTime = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production';
  const processedDataPath = path.join(process.cwd(), 'public', 'processed-data.json');

  let data: SiteData;

  if (isBuildTime) {
    console.log('Build time: Processing data and images...');
    data = siteData as SiteData;
    data = await processImages(data);
    
    // Guarda los datos procesados en un archivo JSON
    fs.writeFileSync(processedDataPath, JSON.stringify(data));
    console.log('Data processed and saved.');
  } else {
    console.log('Runtime: Loading processed data...');
    if (fs.existsSync(processedDataPath)) {
      const rawData = fs.readFileSync(processedDataPath, 'utf-8');
      data = JSON.parse(rawData);
    } else {
      console.log('Processed data not found. Using and processing static data...');
      data = siteData as SiteData;
      data = await processImages(data);
    }
  }

  return data;
}