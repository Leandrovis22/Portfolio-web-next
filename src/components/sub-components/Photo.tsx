// src/components/Photo.tsx

"use client";

import { delay, motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4, ease: "easeIn" } }}>
      <div className="relative dark:bg-primary rounded-full aspect-[1192/1192] max-w-full max-h-full">
                <div className="h-full w-full circle"></div>
                <Image
                  src="/perfil.png"
                  alt="foto de perfil"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  priority={true}
                />
              </div>
    </motion.div>
  );
};

export default Photo;
