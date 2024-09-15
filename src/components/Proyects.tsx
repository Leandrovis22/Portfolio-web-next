// src/components/Proyects.tsx

import React from "react";
import { BentoGrid, BentoGridItem } from "./sub-components/GridProyects";

const items = [
  {
    title: "Tecnologías que adoro",
    date: "Enero 2023 - Mayo 2023, 250 horas",
    description: "inventore lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore",
    header: "/img3.png",
    externalLink: "https://example.com",
    githubLink: "https://github.com/example"
  },
  {
    title: "Otro Proyecto",
    date: "Junio 2023 - Diciembre 2023, 300 horas",
    description: "am commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore",
    header: "/img5.png",
    externalLink: "https://anotherexample.com",
    githubLink: "https://github.com/anotherexample"
  },
  {
    title: "Más Tecnologías",
    date: "Enero 2024 - Junio 2024, 400 horas",
    description: "inventore lg-1242: lg-1242: lg-1242: lg-1242: lg-1242:lg-1242:lg-1242:lg-1242:lg-1242:",
    header: "/img3.png",
    externalLink: "",
    githubLink: "https://github.com/anotherexample" // Aquí puedes dejar vacío si no hay enlace GitHub
  },{
    title: "Otro Proyecto",
    date: "Junio 2023 - Diciembre 2023, 300 horas",
    description: "am commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elitam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit ededededededed sdsdsdsdsdsdsdsdsdsdddsdsd ededefjfjfjnfdsjfjnfd deded. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore",
    header: "/img5.png",
    externalLink: "https://anotherexample.com",
    githubLink: "https://github.com/anotherexample"
  },
];

export default function Proyects() {
  return (
    <>
      <h5 id="projects" className="pt-8 pb-12 text-accent text-center text-3xl">Proyectos</h5>
      <BentoGrid className="lg-1242:max-w-[75rem] mx-auto pb-10">
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
