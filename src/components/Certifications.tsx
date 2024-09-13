"use client";

import React from "react";
import { CertCard } from "./sub-components/CertCard";

export default function Certifications() {
  // Array con 7 objetos que contienen la información de cada CertCard
  const certifications = [
    {
      imageUrl: "/map.png",
      title: "Certificación 1",
      date: "Enero 2023 - Mayo 2023, 250 horas",
      description: "Descripción de la certificación 1",
    },
    {
      imageUrl: "/map.png",
      title: "Certificación 2",
      date: "Febrero 2023 - Junio 2023, 200 horas",
      description: "Descripción de la certificación 2",
    },
    {
      imageUrl: "/map.png",
      title: "Certificación 3",
      date: "Marzo 2023 - Julio 2023, 180 horas",
      description: "Descripción de la certificación 3",
    },
    {
      imageUrl: "/map.png",
      title: "Certificación 4",
      date: "Abril 2023 - Agosto 2023, 220 horas",
      description: "Descripción de la certificación 4",
    },
    {
      imageUrl: "/map.png",
      title: "Certificación 5",
      date: "Mayo 2023 - Septiembre 2023, 240 horas",
      description: "Descripción de la certificación 5",
    },
    {
      imageUrl: "/map.png",
      title: "Certificación 6",
      date: "Junio 2023 - Octubre 2023, 210 horas",
      description: "Descripción de la certificación 6",
    },
    {
      imageUrl: "/map.png",
      title: "Certificación 7",
      date: "Julio 2023 - Noviembre 2023, 230 horas",
      description: "Descripción de la certificación 7",
    },
  ];

  return (
    <div id="certifications" className="">
      <h4 className="py-8 text-accent text-center text-3xl">
        Formación & Certificaciones
      </h4>

      <div className="grid grid-cols-1 md-830:grid-cols-2 lg-1242:grid-cols-3 gap-4 justify-items-center max-w-[17rem] md-830:max-w-[49rem] lg-1242:max-w-[75rem] mx-auto">
        {certifications.map((cert, index) => (
          <CertCard
            key={index}
            imageUrl={cert.imageUrl}
            title={cert.title}
            date={cert.date}
            description={cert.description}
          />
        ))}
      </div>
    </div>
  );
}
