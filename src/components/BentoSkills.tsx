import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./Bento-grid";
import Image from "next/image";

export function BentoSkills() {
  return (
    <BentoGrid className="max-w-[60rem] mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Tecnologias que adoro",
    description: "*Actualmente usando",
    header: <Skeleton />,
  },
  {
    title: "Como soy",
    description: "X",
    header: <Skeleton />,
  }];