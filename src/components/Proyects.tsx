"use client";

// src/components/Proyects.tsx

import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./sub-components/GridProyects";
import { Button } from "@nextui-org/react";

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
    title: "Tecnologías que adoro",
    date: "Enero 2023 - Mayo 2023, 250 horas",
    description: "inventore lorem ipsum inventore lorem ipsum inventore lorem ipsum inventore lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore lorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore",
    header: "/img3.png",
    externalLink: "https://example.com",
    githubLink: "https://github.com/example"
  },{
    title: "Otro Proyecto",
    date: "Junio 2023 - Diciembre 2023, 300 horas",
    description: "am commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elitam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit ededededededed sdsdsdsdsdsdsdsdsdsdddsdsd ededefjfjfjnfdsjfjnfd deded. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore",
    header: "/img5.png",
    externalLink: "https://anotherexample.com",
    githubLink: "https://github.com/anotherexample"
  },{
    title: "Otro Proyecto",
    date: "Junio 2023 - Diciembre 2023, 300 horas",
    description: "am commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elitam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit ededededededed sdsdsdsdsdsdsdsdsdsdddsdsd ededefjfjfjnfdsjfjnfd deded. Nam commodi, quas magni inventorelorem ipsum dolor sit amet consectetur adipisicing elit. Nam commodi, quas magni inventore",
    header: "/img5.png",
    externalLink: "https://anotherexample.com",
    githubLink: "https://github.com/anotherexample"
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
  const [visibleCount, setVisibleCount] = useState(2); // Mostrar 2 por defecto

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1242) {
        setVisibleCount(3); // Mostrar 3 elementos si la pantalla es mayor o igual a lg-1242
      } else if (width >= 830) {
        setVisibleCount(4); // Mostrar 4 elementos si la pantalla es mayor o igual a md-830
      } else {
        setVisibleCount(2); // Mostrar 2 elementos por defecto para pantallas pequeñas
      }
    };

    // Ajustar la cantidad de elementos visibles al cargar el componente
    handleResize();

    // Ajustar la cantidad de elementos visibles al cambiar el tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpiar el event listener cuando se desmonta el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
    <div id="projects" className="pb-10">
      <h5 className="pt-8 pb-12 text-accent text-center text-3xl">
        Proyectos
      </h5>
      <BentoGrid className="lg-1242:max-w-[75rem] mx-auto pb-10">
        {items.slice(0, visibleCount).map((item, i) => (
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

      {visibleCount < items.length && (
        
        <div className="text-center flex justify-center">
        <Button
          color="primary"
          variant="shadow"
          size="lg"
          className="uppercase flex items-center gap-2"
          onClick={() => setVisibleCount(prev => Math.min(prev + 2, items.length))}
        >
          Mostrar más
        </Button>
      </div>
      )}
      </div>
    </>
  );
}