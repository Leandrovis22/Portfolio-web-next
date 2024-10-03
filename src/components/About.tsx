// src/components/Secondabout.tsx

"use client"

import Gradient from './sub-components/Gradient';
import { Button } from '@nextui-org/react';
import { FiDownload } from 'react-icons/fi';
import Photo from './sub-components/Photo';
import Image from 'next/image';
import { TypingEffect } from './sub-components/TypingEffect';
import { OnAppear } from './sub-components/FooterTextAnimation';
import { motion } from 'framer-motion';

interface AboutProps {
  data: {
    imageUrl: string;
    description: string;
    CVpdf: string;
  }
}


export default function About({ data }: AboutProps) {

  const { imageUrl, description, CVpdf } = data;

  const handleDownload = async () => {
    try {
      // Realiza una solicitud fetch para obtener el archivo PDF desde la URL pasada por props
      const response = await fetch(CVpdf);
      const blob = await response.blob(); // Convierte la respuesta en un Blob
      const url = window.URL.createObjectURL(blob); // Crea una URL temporal para el Blob

      // Crear un enlace invisible para descargar el archivo
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'CV Leandro Viscolungo.pdf'); // Nombre del archivo descargado
      document.body.appendChild(link);
      link.click(); // Forzar el clic en el enlace
      link.parentNode?.removeChild(link); // Eliminar el enlace después de la descarga
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };


  return (
    <Gradient
    >
      <section id="about" className="text-base lg:h-screen font-primary relative pt-[4rem] -mt-[4rem] content-center" style={{ zIndex: '1' }}>
        <div className="h-full w-full max-w-full">

          <div className="h-full flex flex-col lg:flex-row items-center justify-center lg:gap-16 px-[3%] lg:px-[9%] pt-[3%] lg:pt-0">

            <div className="content-center h-full text-center lg:text-left lg:w-full order-2 lg:order-none">
              <h1 className="text-fluid-3xl mb-[0.9rem]">

                <OnAppear as={'span'} className="" delaySegundos={0} texto="Hola 👋" />
                <br />
                <OnAppear as={'span'} className="" delaySegundos={0.3} texto="Soy" />
                <OnAppear as={'span'} className="text-accent" delaySegundos={0.3} texto=" Leandro Viscolungo" />
              </h1>
              <TypingEffect as="h2" speed={0.07} delayStart={0.5} className="text-fluid-2xl mb-6" text="Fullstack Web Developer" />
              <TypingEffect as="p" delayStart={1} className="mb-9 text-fluid-xl lg:text-justify px-4 sm:px-0" text={description} />

              <div className="flex flex-col lg:flex-row items-center lg:gap-8">
                <Button
                  color="primary"
                  variant="shadow"
                  size="lg"
                  radius='full'
                  className="flex items-center gap-2"
                  onClick={handleDownload}
                >
                  Descargar CV
                  <FiDownload className="text-xl" />
                </Button>
              </div>
            </div>

            <div className="contenedorimagen w-[298px] content-center mb-8  lg:mb-0 h-full lg:w-[50%]">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.3, duration: 0.4, ease: "easeIn" } }}>
                <div className="relative dark:bg-primary rounded-full aspect-[1192/1192] max-w-full max-h-full">
                  <div className="h-full w-full circle"></div>
                  <Image
                    src={imageUrl}
                    alt="foto de perfil"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    priority={true}
                  />
                </div>
              </motion.div>
            </div>

          </div>


        </div>
      </section>
    </Gradient>
  );
}
