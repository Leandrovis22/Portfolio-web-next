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

export async function getData(): Promise<{
  about: AboutData;
  skills: SkillsData;
  certifications: CertificationsData;
  projects: ProjectsData;
  contact: ContactData;
  footer: FooterData;
}> {
  try {
/* 
    const isProduction = process.env.NODE_ENV === 'production';

    const URL = isProduction ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
     */
    const URL = `https://${process.env.VERCEL_URL}`;

    console.log('URL:', URL);
    if (!URL) {
      throw new Error('URL is not set');
    }

    console.log('Fetching data from API...', `${URL}/api/data`);
    const response = await fetch(`${URL}/api/data`);

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      console.error('Error fetching data:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Unexpected content type:', contentType);
      const text = await response.text();
      console.error('Response body:', text);
      throw new Error('Received non-JSON response');
    }

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error('Error parsing JSON:', error);
      const text = await response.text();
      console.error('Response body:', text);
      throw new Error('Failed to parse JSON response');
    }

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

    // Update Project header images
    for (let project of data.projects.projects) {
      project.header = await downloadAndUpdateImage(project.header, 'project');
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
    
    // Provide fallback data during build
    return {
      about: {
        CVpdf: '',
        imageUrl: '',
        description: 'Default description'
      },
      skills: {
        cards: [],
        words: []
      },
      certifications: {
        certifications: []
      },
      projects: {
        projects: []
      },
      contact: {
        CVpdf: '',
        githubtext: '',
        githublink: '',
        linkedintext: '',
        linkedinlink: '',
        emailtext: ''
      },
      footer: {
        words: []
      }
    };
  }
}