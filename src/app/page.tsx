// src/app/page.tsx

import Proyects from '@/components/Proyects';
import Certifications from '@/components/Certifications';
import Navbarcomponent from '@/components/Navbar';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
function Home() {
  return (
    <>
          <Navbarcomponent />
          {/* <About />
          <Skills />
          <Certifications /> */}
          <Proyects />
          <Contact />
          <Footer />
      </>
  );
}

export default Home;

