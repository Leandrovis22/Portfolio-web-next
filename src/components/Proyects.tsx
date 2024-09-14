// src/components/Proyects.tsx

import React from "react";
import { BentoGrid, BentoGridItem } from "./sub-components/Bento-grid";

const items = [
  {
    title: "Tecnologías que adoro",
    date: "Enero 2023 - Mayo 2023, 250 horas",
    description: "dddadipisicing elit. Nam commodi, quas magni inventore lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore",
    header: "/img3.png",
    externalLink: "https://example.com",
    githubLink: "https://github.com/example"
  },
  {
    title: "Otro Proyecto",
    date: "Junio 2023 - Diciembre 2023, 300 horas",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore",
    header: "/img3.png",
    externalLink: "https://anotherexample.com",
    githubLink: "https://github.com/anotherexample"
  },
  {
    title: "Más Tecnologías",
    date: "Enero 2024 - Junio 2024, 400 horas",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore",
    header: "/img3.png",
    externalLink: "https://github.com/anotherexample",
    githubLink: "" // Aquí puedes dejar vacío si no hay enlace GitHub
  }
];

export function Proyects() {
  return (
    <>
      <h5 className="pt-8 pb-12 text-accent text-center text-3xl">Proyectos</h5>
      <BentoGrid className="max-w-[75rem] mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            date={item.date}
            description={item.description}
            header={item.header}
            reverse={i % 2 !== 0}
            externalLink={item.externalLink}
            githubLink={item.githubLink}
          />
        ))}
      </BentoGrid>
    </>
  );
}
