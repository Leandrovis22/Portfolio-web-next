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
                "max-w-[509px] md-830:max-w-fit px-3 grid mx-auto md-830:grid-cols-2 lg-1242:grid-cols-1 md-830:gap-4    lg-1242:max-w-[535px] lg-1242:auto-rows-[20rem] gap-8 lg-1242:max-w-7xl mx-auto",
                className
            )}
        >
            {React.Children.map(children, (child, index) => (
                <div
                    className={cn(
                        "flex relative lg-1242:flex",
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
    const descriptionText = typeof description === 'string' ? description : '';
    const isLongDescription = descriptionText.length > 371;

    return (
        <div
            className={cn(
                "flex items-center lg-1242:items-stretch w-full gap-4 justify-items-center card hover:shadow-xl shadow-input dark:shadow-none p-4 border border-transparent flex-col lg-1242:flex-row gap-4 lg-1242:justify-between lg-1242:w-[87%]",
                reverse ? "lg-1242:flex-row-reverse" : "lg-1242:flex-row"
            )}
        >
            <Image
                alt="image"
                className="rounded-2xl max-h-[239px] lg-1242:max-h-fit" // Añadir esta clase para establecer la altura máxima
                objectFit="cover"
                width={500}
                height={500}
                objectPosition="center"
                src={header || "/map.png"}
            />
            <div className="lg-1242:relative w-full lg-1242:w-[65%]">
                {icon}
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
                                <BiLinkExternal /> Ver en sitio</div>
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
                                <FaGithub /> Ver en GitHub</div>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
