// src/app/page.tsx
import About from '@/components/About';
import Navbarcomponent from '@/components/Navbar';
import Skills from '@/components/Skills';

function Home() {
  return (
    <>
      <Navbarcomponent/>
      <About />
      <Skills />
      </>
  );
}

export default Home;

