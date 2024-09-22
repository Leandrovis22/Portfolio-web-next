// src/components/Secondabout.tsx

import Gradient from './sub-components/Gradient'; // Asegúrate de que la ruta sea correcta
import { Button } from '@nextui-org/react';
import { FiDownload } from 'react-icons/fi';
import Photo from './sub-components/Photo'; // Asegúrate de tener este componente
import Image from 'next/image';

export default function About() {
  return (
    <Gradient
    // gradientBackgroundStart="rgb(0, 0, 0)"
    // gradientBackgroundEnd="rgb(0, 11, 50)"
    >
      <section id="about" className="text-base lg:h-screen font-primary relative pt-[4rem] -mt-[4rem] content-center" style={{ zIndex: '1' }}>
        <div className="h-full w-full max-w-full"> {/* Cambiado aquí */}

          <div className="h-full flex flex-col lg:flex-row items-center justify-center lg:gap-16 px-[3%]">

            <div className="content-center h-full text-center lg:text-left lg:w-full order-2 lg:order-none"> {/* Cambiado aquí */}
              <h1 className="text-3xl mb-6">
                Hola 👋<br />
                Soy
                <span className="text-accent"> Leandro Viscolungo</span>
              </h1>
              <h2 className="text-2xl mb-6">Fullstack Web Developer</h2>
              <p className="mb-9 text-xl text-justify px-4 sm:px-0">
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
                <div className="mb-8 lg:mb-0">
                  {/* Social component can go here */}
                </div>
              </div>
            </div>

            <div className="contenedorimagen w-[298px] content-center mb-8  lg:mb-0 h-full lg:w-[57%]"> {/* Cambiado aquí */}
              <div className="relative dark:bg-primary rounded-full aspect-[1192/1192] max-w-full max-h-full">
                <div className="h-full w-full circle"></div>
                <Image
                  src="/perfil.png" // Cambia a la ruta de tu imagen
                  alt="foto de perfil"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  priority={true}
                />
              </div>
            </div>

          </div>


        </div>
      </section>
    </Gradient>
  );
}
