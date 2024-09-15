// src/app/page.tsx

import Proyects from '@/components/Proyects';
import Certifications from '@/components/Certifications';
import Navbarcomponent from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
function Home() {
  return (
    <>
          <Navbarcomponent />
          {/* <About /> */}
          <Skills />
          <Certifications />
          <Proyects />
      </>
  );
}

export default Home;

