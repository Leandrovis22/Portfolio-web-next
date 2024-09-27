// src/components/Secondabout.tsx

import Gradient from './sub-components/Gradient';
import { Button } from '@nextui-org/react';
import { FiDownload } from 'react-icons/fi';
import Photo from './sub-components/Photo';

interface AboutProps {
  data: {
    // Define la estructura de tus datos aquí
  }
}

export default function About({ data }: AboutProps) {


  return (
    <Gradient
    >
      <section id="about" className="text-base lg:h-screen font-primary relative pt-[4rem] -mt-[4rem] content-center" style={{ zIndex: '1' }}>
        <div className="h-full w-full max-w-full">

          <div className="h-full flex flex-col lg:flex-row items-center justify-center lg:gap-16 px-[3%] lg:px-[9%] pt-[3%] lg:pt-0">

            <div className="content-center h-full text-center lg:text-left lg:w-full order-2 lg:order-none">
              <h1 className="text-fluid-3xl mb-[0.9rem]">
                Hola 👋<br />
                Soy
                <span className="text-accent"> Leandro Viscolungo</span>
              </h1>
              <h2 className="text-fluid-2xl mb-6">Fullstack Web Developer</h2>
              <p className="mb-9 text-fluid-xl text-justify px-4 sm:px-0">
                I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aliquid harum ipsa, aliquam tempore in, quisquam sit rem tenetur culpa eligendi voluptatum odit natus dolorum doloribus repudiandae, blanditiis laborum nesciunt.
                fugit cumque eveniet reprehenderit omnis? Ducimus, hic fugit. Illum, delectus.
              </p>
              <div className="flex flex-col lg:flex-row items-center lg:gap-8">
                <Button
                  color="primary"
                  variant="shadow"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  Descargar CV
                  <FiDownload className="text-xl" />
                </Button>
              </div>
            </div>

            <div className="contenedorimagen w-[298px] content-center mb-8  lg:mb-0 h-full lg:w-[50%]">
              <Photo />
            </div>

          </div>


        </div>
      </section>
    </Gradient>
  );
}
