// src/app/page.tsx

import Card from '@/components/card';
import Certifications from '@/components/Certifications';
import Navbarcomponent from '@/components/Navbar';
import Secondabout from '@/components/Secondabout';
import Skills from '@/components/Skills';

function Home() {
  return (
    <>
      <Navbarcomponent />
      <Secondabout />
      <Skills />
      <Certifications />
      <Card />
      </>
  );
}

export default Home;

