import { Suspense } from 'react';
import { getData } from '@/lib/data';
import Proyects from '@/components/Proyects';
import Certifications from '@/components/Certifications';
import Navbarcomponent from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const revalidate = 259200; // 3 days in seconds

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Navbarcomponent />
      <Suspense fallback={<div>Loading...</div>}>
        <About data={data.about} />
        <Skills data={data.skills} />
        <Certifications data={data.certifications} />
        <Proyects data={data.projects} />
        <Contact data={data.contact} />
      </Suspense>
      <Footer data={data.footer} />
    </>
  );
}