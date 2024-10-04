// src/lib/data.ts

import { downloadImage } from './downloadImages';

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

export interface ProjectsData {
  projects: Array<{ title: string; date: string; description: string; header: string; externalLink: string; githubLink: string }>;
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

export async function getData(): Promise<{
  about: AboutData;
  skills: SkillsData;
  certifications: CertificationsData;
  projects: ProjectsData;
  contact: ContactData;
  footer: FooterData;
}> {
  try {

    const URL = process.env.BASE_URL || 'http://localhost:3000';

    console.log('Fetching data from API...');
    const response = await fetch(`${URL}/api/data`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      console.error('Error fetching data:', response.status, response.statusText);
      throw new Error('Error fetching data');
    }

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      console.error('Received empty data from API');
      throw new Error('Received empty data from API');
    }

    // Download and update image URLs
    const downloadAndUpdateImage = async (url: string, prefix: string) => {
      if (url) {
        return await downloadImage(url);
      }
      return url;
    };

    // Update About image
    data.about.imageUrl = await downloadAndUpdateImage(data.about.imageUrl, 'about');

    // Update Skills card images
    for (let card of data.skills.cards) {
      card.src = await downloadAndUpdateImage(card.src, 'skill');
    }

    // Update Certifications images
    for (let cert of data.certifications.certifications) {
      cert.imageUrl = await downloadAndUpdateImage(cert.imageUrl, 'cert');
    }

    return {
      about: {
        CVpdf: data.about?.CVpdf || '',
        imageUrl: data.about?.imageUrl || '',
        description: data.about?.description || ''
      },
      skills: {
        cards: data.skills?.cards || [],
        words: data.skills?.words || []
      },
      certifications: {
        certifications: data.certifications?.certifications || []
      },
      projects: {
        projects: data.projects?.projects || []
      },
      contact: {
        CVpdf: data.contact?.CVpdf || '',
        githubtext: data.contact?.githubtext || '',
        githublink: data.contact?.githublink || '',
        linkedintext: data.contact?.linkedintext || '',
        linkedinlink: data.contact?.linkedinlink || '',
        emailtext: data.contact?.emailtext || ''
      },
      footer: {
        words: data.footer?.words || []
      }
    };
  } catch (error) {
    console.error('Error in getData():', error);
    throw error;
  }
}