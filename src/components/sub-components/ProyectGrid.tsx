import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@nextui-org/react";

export interface ProjectItem {
  title: string;
  date: string;
  description: string;
  header: string;
  externalLink?: string;
  githubLink?: string;
}

interface ProyectoGridProps {
  items: ProjectItem[];
  visibleCount: number;
}

const ProjectGridItem: React.FC<ProjectItem & { reverse: boolean; index: number }> = ({
  title,
  date,
  description,
  header,
  reverse,
  externalLink,
  githubLink,
  index,
}) => {
  const isLongDescription = description.length > 371;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "flex relative lg-1242:flex h-full",
        index % 2 === 0 ? "justify-start" : "justify-end"
      )}
    >
      <Card
        className={cn(
          "flex items-center lg-1242:items-stretch w-full gap-4 justify-items-center card hover:shadow-xl shadow-input dark:shadow-none p-4 border border-transparent flex-col lg-1242:flex-row gap-4 lg-1242:justify-between lg-1242:w-[87%]",
          reverse ? "lg-1242:flex-row-reverse" : "lg-1242:flex-row"
        )}>


        <Image
          alt="image"
          className="rounded-2xl h-full w-auto max-h-[239px] lg-1242:h-auto lg-1242:max-h-full"
          objectFit="contain" // O usa 'cover' si prefieres que la imagen cubra todo el espacio
          width={500}
          height={500}
          objectPosition="center"
          src={header}
        />

        <div className="lg-1242:relative w-full lg-1242:w-[65%]">
          <p className="font-bold text-2xl mt-2">{title}</p>
          <p className="font-normal text-base pb-3 text-sm">{date}</p>
          <p className={cn("font-normal text-base pb-8 lg-1242:pb-0 w-full", isLongDescription && "md-830:text-sm")}>{description}</p>
          <div className="absolute flex gap-4 bottom-[14px] right-[22px] lg-1242:bottom-[-8px] lg-1242:right-0">
            {externalLink && (
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:underline"
              >
                <div className="inline-flex gap-2">
                  <BiLinkExternal /> Ver en sitio
                </div>
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-800 hover:underline dark:text-blue-500"
              >
                <div className="inline-flex gap-2">
                  <FaGithub /> Ver en GitHub
                </div>
              </a>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const ProyectGrid: React.FC<ProyectoGridProps> = ({ items, visibleCount }) => {
  return (
    <div className={cn(
      "lg-1242:max-w-[75rem] mx-auto max-w-[509px] md-830:max-w-fit px-3 grid mx-auto md-830:grid-cols-2 lg-1242:grid-cols-1 md-830:gap-4 lg-1242:max-w-[535px] lg-1242:auto-rows-[20rem] gap-8 lg-1242:max-w-7xl mx-auto"
    )}>
      <AnimatePresence>
        {items.slice(0, visibleCount).map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className=""
          >
            <ProjectGridItem {...item} reverse={i % 2 !== 0} index={i} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProyectGrid;