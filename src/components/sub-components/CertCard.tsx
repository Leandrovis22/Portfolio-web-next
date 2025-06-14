"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BiLinkExternal } from "react-icons/bi";

export const CertCard = ({
  imageUrl,
  title,
  date,
  description,
  link,
  childrenClassName,
  imageClassName,
  className,
}: {
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  link: string;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right" | string
  >("left");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isTouchDevice);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current || isMobile) return;

    const direction = getDirection(event, ref.current);
    switch (direction) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  const handleClick = () => {
    if (isMobile) {
      setIsClicked(!isClicked);
    }
  };

  const showOverlay = isMobile ? isClicked : isHovered;

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={ref}
      className={cn(
        "size-[19rem] xs-436:size-96 bg-transparent rounded-lg overflow-hidden group/card relative",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="relative h-full w-full"
          initial="initial"
          animate={showOverlay ? "show" : "initial"}
          whileHover={!isMobile ? direction : undefined}
          exit="exit"
        >
          <motion.div
            className="absolute inset-0 w-full h-full bg-black/65 z-10 transition duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: showOverlay ? 1 : 0 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            variants={variants}
            className="h-full w-full relative bg-gray-50 dark:bg-black"
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            <Image
              alt="image"
              className={cn(
                "h-full w-full object-cover scale-[1.15]",
                imageClassName
              )}
              width="1000"
              height="1000"
              src={imageUrl}
            />
          </motion.div>
          <motion.div
            variants={textVariants}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className={cn(
              "text-white absolute inset-0 z-20 flex flex-col items-center p-4 top-[1rem]",
              childrenClassName
            )}
          >
            <p className="font-bold text-xl xs-436:text-2xl text-center">{title}</p>
            <p className="font-normal text-sm xs-436:text-base text-center">{date}</p>
            <p className="font-normal text-sm xs-436:text-base text-center pt-2">{description}</p>

            {showOverlay && link !== "null" && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:underline mt-2"
              >
                Ver certificado <BiLinkExternal />
              </a>
            )}

          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const variants = {
  initial: {
    x: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 0,
    y: 0,
  },
  top: {
    y: 20,
  },
  bottom: {
    y: -20,
  },
  left: {
    x: 20,
  },
  right: {
    x: -20,
  },
};

const textVariants = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  exit: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
  },
  top: {
    y: -5,
    opacity: 1,
  },
  bottom: {
    y: 5,
    opacity: 1,
  },
  left: {
    x: -5,
    opacity: 1,
  },
  right: {
    x: 5,
    opacity: 1,
  },
};
