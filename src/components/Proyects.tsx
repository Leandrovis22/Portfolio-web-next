// Proyects.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import ProyectGrid from "./sub-components/ProyectGrid";


export default function Proyects() {
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1242) {
        setVisibleCount(3);
      } else if (width >= 830) {
        setVisibleCount(4);
      } else {
        setVisibleCount(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="projects" className="">
      <h5 className="pt-8 pb-12 text-accent text-center text-3xl">Proyectos</h5>
      <ProyectGrid items={items} visibleCount={visibleCount} />

      {visibleCount < items.length && (
        <div className="text-center flex justify-center py-10">
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
  );
}

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