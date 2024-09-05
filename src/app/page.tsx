// src/app/page.tsx
import About from '@/components/About';
import Navbarcomponent from '@/components/Navbar';
import Secondabout from '@/components/Secondabout';
import Skills from '@/components/Skills';

function Home() {
  return (
    <>
      <Navbarcomponent/>
      <Secondabout />
      <Skills />
      </>
  );
}

export default Home;

