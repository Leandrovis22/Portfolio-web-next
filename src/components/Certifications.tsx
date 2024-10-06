"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CertCard } from "./sub-components/CertCard";
import { Button } from "@nextui-org/react";

interface Certification {
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  link: string;
}

interface CertificationsProps {
  data: {
    certifications: Certification[];
  }
}

export default function Certifications({ data }: CertificationsProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const certifications = data.certifications;

  useEffect(() => {
    const handleResize = () => {
      // Solo ajustamos el visibleCount si es necesario aumentarlo
      if (window.innerWidth < 1242 && window.innerWidth >= 830) {
        setVisibleCount(prev => Math.max(prev, 4));
      } else {
        setVisibleCount(prev => Math.max(prev, 3));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, certifications.length));
  };

  return (
    <section id="certifications" className="min-h-screen">
      <h4 className="md-840:pt-8 pb-6 md-840:pb-12 text-accent text-center text-3xl">
        Formación & Certificaciones
      </h4>

      <div className="pb-10 max-w-[17rem] md-830:max-w-[49rem] lg-1242:max-w-[75rem] mx-auto">
        <div className="grid grid-cols-1 md-830:grid-cols-2 lg-1242:grid-cols-3 gap-4 justify-items-center">
          {certifications.slice(0, visibleCount).map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <CertCard
                imageUrl={cert.imageUrl}
                title={cert.title}
                date={cert.date}
                description={cert.description}
                link={cert.link}
              />
            </motion.div>
          ))}
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
    </section>
  );
}