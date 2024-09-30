// src/lib/data.ts

export interface AboutData {
  CVpdf: string;
  imageUrl: string;
  description: string;
}

export interface SkillsData {
  cards: Array<{ title: string; src: string; content: () => JSX.Element }>;
  words: string[];
}

export interface CertificationsData {
  certifications: Array<{ imageUrl: string; title: string; date: string; description: string; link: string }>;
}

export interface ProjectsData {
  proyects: Array<{ title: string; date: string; description: string; header: string; externalLink: string; githubLink: string }>;
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

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data`);
  
  if (!response.ok) {
    console.log(response)
    throw new Error('Error fetching data');
  }

  const data = await response.json();

  return {
    about: {
      CVpdf: data.about.CVpdf,
      imageUrl: data.about.imageUrl,
      description: data.about.description
    },
    skills: {
      cards: data.skills.cards,
      words: data.skills.words
    },
    certifications: {
      certifications: data.certifications
    },
    projects: {
      proyects: data.projects
    },
    contact: {
      CVpdf: data.contact.CVpdf,
      githubtext: data.contact.githubtext,
      githublink: data.contact.githublink,
      linkedintext: data.contact.linkedintext,
      linkedinlink:  data.contact.linkedinlink,
      emailtext: data.contact.emailtext
    },
    footer: {
      words: data.footer.words}
  };
}


