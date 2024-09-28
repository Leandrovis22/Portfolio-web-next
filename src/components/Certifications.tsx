// src/components/Certifications.tsx

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CertCard } from "./sub-components/CertCard";
import { Button } from "@nextui-org/react";

interface CertificationsProps {
  data: {
    // Define la estructura de tus datos aquí
  }
}
export default function Certifications({ data }: CertificationsProps) {
  const certifications = [
    {
      imageUrl: "/maplight.png",
      title: "Certificación 1",
      date: "Enero 2023 - Mayo 2023, 250 horas",
      description: "Descripción de la certificación 1...",
      link: "https://certificado1.com", // Agrega el link aquí
    },
    {
      imageUrl: "/maplight.png",
      title: "Certificación 2",
      date: "Febrero 2023 - Junio 2023, 200 horas",
      description: "Descripción de la certificación 2",
      link: "https://certificado2.com", // Y aquí
    }, {
      imageUrl: "/maplight.png",
      title: "Certificación 3",
      date: "Enero 2023 - Mayo 2023, 250 horas",
      description: "Descripción de la certificación 1...",
      link: "https://certificado1.com", // Agrega el link aquí
    },
    {
      imageUrl: "/maplight.png",
      title: "Certificación 4",
      date: "Febrero 2023 - Junio 2023, 200 horas",
      description: "Descripción de la certificación 2",
      link: "https://certificado2.com", // Y aquí
    }, {
      imageUrl: "/maplight.png",
      title: "Certificación 5",
      date: "Enero 2023 - Mayo 2023, 250 horas",
      description: "Descripción de la certificación 1...",
      link: "https://certificado1.com", // Agrega el link aquí
    },
    {
      imageUrl: "/maplight.png",
      title: "Certificación 6",
      date: "Febrero 2023 - Junio 2023, 200 horas",
      description: "Descripción de la certificación 2",
      link: "https://certificado2.com", // Y aquí
    }, {
      imageUrl: "/maplight.png",
      title: "Certificación 7",
      date: "Enero 2023 - Mayo 2023, 250 horas",
      description: "Descripción de la certificación 1...",
      link: "https://certificado1.com", // Agrega el link aquí
    },
    {
      imageUrl: "/maplight.png",
      title: "Certificación 8",
      date: "Febrero 2023 - Junio 2023, 200 horas",
      description: "Descripción de la certificación 2",
      link: "https://certificado2.com", // Y aquí
    },];

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    // Función que ajusta la cantidad de CertCards visibles dependiendo del ancho de la pantalla
    const handleResize = () => {
      if (window.innerWidth < 1242 && window.innerWidth >= 830) {
        setVisibleCount(4); // Mostrar 4 CertCards
      } else {
        setVisibleCount(3); // Por defecto mostrar 3 CertCards
      }
    };

    // Llama a la función al cargar el componente
    handleResize();

    // Añade un event listener para ajustar el número de CertCards cuando se cambia el tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpia el event listener cuando se desmonta el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 3, certifications.length)
    );
  };

  return (
    <div id="certifications" className="">
      <h4 className="md-840:pt-8 pb-6 md-840:pb-12 text-accent text-center text-3xl">
        Formación & Certificaciones
      </h4>

      <div className="pb-10 max-w-[17rem] md-830:max-w-[49rem] lg-1242:max-w-[75rem] mx-auto">
        <div className="grid grid-cols-1 md-830:grid-cols-2 lg-1242:grid-cols-3 gap-4 justify-items-center">
          <AnimatePresence>
            {certifications.slice(0, visibleCount).map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Add delay for staggered effect
              >
                <CertCard
                  imageUrl={cert.imageUrl}
                  title={cert.title}
                  date={cert.date}
                  description={cert.description}
                  link={cert.link} // Pasamos el link aquí
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {visibleCount < certifications.length && (
          <div className="text-center flex justify-center pt-10">
            <Button
              color="primary"
              variant="shadow"
              size="lg"
              radius='full'
              className="flex items-center gap-2"
              onClick={handleShowMore}
            >
              Mostrar más
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
