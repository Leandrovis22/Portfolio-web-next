// src/components/Photo.tsx

"use client";

import { delay, motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 2, duration: 0.4, ease: "easeIn" } }}>
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
  </motion.div>
  );
};

export default Photo;
