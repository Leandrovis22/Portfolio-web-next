// src/components/Photo.tsx

"use client";

import { delay, motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="relative w-[298px] h-[298px] lg:w-full lg:pb-[100%] bg-primary rounded-full">
    <Image
      src="/perfil.png" // Cambia a la ruta de tu imagen
      alt="foto de perfil"
      layout="fill" // Se asegura que la imagen ocupe todo el espacio del contenedor
      objectFit="cover" // Mantiene la relación de aspecto
      className="rounded-full"
      priority={true}
    />
  </div>
  );
};

export default Photo;
