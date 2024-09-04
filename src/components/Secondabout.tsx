// src/components/Secondabout.tsx

import Gradient from './Gradient'; // Asegúrate de que la ruta sea correcta
import { Button } from '@nextui-org/react';
import { FiDownload } from 'react-icons/fi';
import Photo from './Photo'; // Asegúrate de tener este componente

export default function Secondabout() {
  return (
    <Gradient
      gradientBackgroundStart="rgb(0, 0, 0)"
      gradientBackgroundEnd="rgb(0, 11, 50)"
      firstColor="18, 113, 255"
      secondColor="15, 59, 35"
      thirdColor="100, 220, 255"
      fourthColor="59, 31, 15"
      fifthColor="180, 180, 50"
      pointerColor="140, 100, 255"
      size="50%"
      blendingValue="hard-light"
      interactive={true}
    >
      <section id="secondabout" className=" font-primary relative pt-[4rem] -mt-[4rem]" style={{ zIndex: '1' }}>
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row items-center justify-between xl:mx-[10%] xl:py-[5%]">
            <div className="text-center xl:text-left order-2 xl:order-none">
              <h1 className="text-5xl mb-6">
                Hello 👋<br />
                I'm
                <span className="dark:text-accentdark text-accentlight"> Leandro Viscolungo</span>
              </h1>
              <h2 className="text-4xl mb-6">Fullstack Web Developer</h2>
              <p className="max-w-[580px] mb-9 dark:text-white/80 text-lg">
                I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.
              </p>
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <Button
                  variant="ghost"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  Descargar CV
                  <FiDownload className="text-xl" />
                </Button>
                <div className="mb-8 xl:mb-0">
                 {/*  <Social
                    containerStyles="flex gap-6"
                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  /> */}
                </div>
              </div>
            </div>
            <div className="order-1 xl:order-none mb-8 xl:mb-0">
              <Photo />
            </div>
          </div>
        </div>
      </section>
    </Gradient>
  );
}
