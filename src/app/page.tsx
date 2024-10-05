// src/app/page.tsx

import { getData } from '@/lib/data';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Navbarcomponent from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const revalidate = 30; // 3 days in seconds

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Navbarcomponent />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Certifications data={data.certifications} />
      <Projects data={data.projects} />
      <Contact data={data.contact} />
      <Footer data={data.footer} />
    </>
  );
}
