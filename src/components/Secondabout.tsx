// src/components/Secondabout.tsx

import Gradient from './Gradient'; // Asegúrate de que la ruta sea correcta
import { Button } from '@nextui-org/react';
import { FiDownload } from 'react-icons/fi';
import Photo from './Photo'; // Asegúrate de tener este componente

export default function Secondabout() {
  return (
    <Gradient
      // gradientBackgroundStart="rgb(0, 0, 0)"
      // gradientBackgroundEnd="rgb(0, 11, 50)"
    >
      <section id="about" className="text-base lg:h-screen font-primary relative pt-[4rem] -mt-[4rem] content-center" style={{ zIndex: '1' }}>
        <div className="container mx-auto h-full">
          <div className="h-full flex flex-col lg:flex-row items-center justify-center lg:gap-16 lg:px-[5%] py-[5%]">
            <div className="content-center h-full text-center lg:text-left order-2 lg:order-none">
              <h1 className="text-5xl mb-6">
                Hello 👋<br />
                I'm
                <span className="dark:text-accentdark text-accentlight"> Leandro Viscolungo</span>
              </h1>
              <h2 className="text-4xl mb-6">Fullstack Web Developer</h2>
              <p className="max-w-[580px] mb-9 dark:text-white/80 text-lg">
                I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aliquid harum ipsa, aliquam tempore in, quisquam sit rem tenetur culpa eligendi voluptatum odit natus dolorum doloribus repudiandae, blanditiis laborum nesciunt.
                fugit cumque eveniet reprehenderit omnis? Ducimus, hic fugit. Illum, delectus.
              </p>
              <div className="flex flex-col lg:flex-row items-center lg:gap-8">
                <Button
                  variant="ghost"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  Descargar CV
                  <FiDownload className="text-xl" />
                </Button>
                <div className="mb-8 lg:mb-0">
                  {/*  <Social
                    containerStyles="flex gap-6"
                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  /> */}
                </div>
              </div>
            </div>
            <div className="content-center order-1 lg:order-none mb-8 lg:mb-0 lg:w-[400px]">
              <Photo />
            </div>
          </div>
        </div>
      </section>
    </Gradient>
  );
}
