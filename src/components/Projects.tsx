"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import ProyectGrid from "./sub-components/ProyectGrid";

interface Project {
  title: string;
  date: string;
  description: string;
  header: string;
  externalLink: string;
  githubLink: string;
}

interface ProjectsProps {
  data: {
    projects: Project[];
  }
}

export default function Projects({ data }: ProjectsProps) {
  const [visibleCount, setVisibleCount] = useState(2);
  const { projects } = data;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Solo aumentamos el visibleCount si es necesario
      if (width >= 1242) {
        setVisibleCount(prev => Math.max(prev, 3));
      } else if (width >= 830) {
        setVisibleCount(prev => Math.max(prev, 4));
      } else {
        setVisibleCount(prev => Math.max(prev, 2));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 2, projects.length));
  };

  return (
    <section id="projects" className="min-h-screen pb-10">
      <h5 className="md-840:pt-8 pb-6 md-840:pb-12 text-accent text-center text-3xl">
        Proyectos
      </h5>
      
      <ProyectGrid items={projects} visibleCount={visibleCount} />

      {visibleCount < projects.length && (
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
    </section>
  );
}