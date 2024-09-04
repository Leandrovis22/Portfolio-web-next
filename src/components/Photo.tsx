// src/components/Photo.tsx

"use client";

import { delay, motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative dark:bg-[#071952] rounded-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1, duration: 0.4, ease: "easeIn" } }}>
        <div className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px]">
          <Image
            src="/perfil.png"
            priority
            quality={100}
            fill
            alt=""
            className="object-contain rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Photo;
