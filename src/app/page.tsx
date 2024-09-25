// src/app/page.tsx

import Proyects from '@/components/Proyects';
import Certifications from '@/components/Certifications';
import Navbarcomponent from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Component from '@/components/componenttest';
function Home() {
  return (
    <>
          <Navbarcomponent />
          {/* <About />
          <Skills />
          <Certifications /> */}
          <Proyects />
          {/* <Contact />
          */}
          <Component />
          <Footer /> 
      </>
  );
}

export default Home;

