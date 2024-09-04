// src/app/page.tsx
import About from '@/components/About';
import Gradient from '@/components/Gradient';
import Navbarcomponent from '@/components/Navbar';
import Skills from '@/components/Skills';

function Home() {
  return (
    <>
      <Navbarcomponent/>
      <About />
      <Skills />
      <Gradient />
      </>
  );
}

export default Home;

