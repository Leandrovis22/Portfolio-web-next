// src/components/sub-components/Bento-grid.tsx

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid auto-rows-[20rem] gap-8 max-w-7xl mx-auto",
                className
            )}
        >
            {React.Children.map(children, (child, index) => (
                <div
                    className={cn(
                        "flex",
                        index % 2 === 0 ? "justify-start" : "justify-end"
                    )}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export const BentoGridItem = ({
    title,
    date,
    description,
    header,
    icon,
    reverse,
    externalLink,
    githubLink,
}: {
    title?: string | React.ReactNode;
    date?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: string;
    icon?: React.ReactNode;
    reverse?: boolean;
    externalLink?: string;
    githubLink?: string;
}) => {
    return (
        <div
            className={cn(
                "card hover:shadow-xl shadow-input dark:shadow-none p-4 border border-transparent flex gap-4 justify-between w-[87%]",
                reverse ? "flex-row-reverse" : "flex-row"
            )}
        >
            <Image
                alt="image"
                className="rounded-2xl"
                objectFit="cover"
                width={500}
                height={500}
                objectPosition="center"
                src={header || "/map.png"}
            />
            <div className="w-[65%]">
                {icon}
                <p className="font-bold text-2xl mt-2">{title}</p>
                <p className="font-normal text-base pb-3 text-sm">{date}</p>
                <p className="font-normal text-base">{description}</p>
                <div className="flex gap-2 mt-4">
                    {externalLink && (
                        <a
                            href={externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-500 hover:underline"
                        >
                            <BiLinkExternal /> Ver en sitio
                        </a>
                    )}
                    {githubLink && (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-800 hover:underline"
                        >
                            <FaGithub /> Ver en GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
