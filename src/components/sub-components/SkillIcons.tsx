// src/components/sub-components/SkillIcons.tsx

"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../lib/use-outside-click";
import { Card } from "@nextui-org/react";

interface CardContent {
  description: string;
}

interface Card {
  title: string;
  src: string;
  content: string;
}

interface SkillIconsProps {
  cards: Card[];
}

export function SkillIcons({ cards }: SkillIconsProps) {
  const [active, setActive] = useState<Card | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };

    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);

  useOutsideClick(ref, () => setActive(null));

  const animationDuration = useMemo(() => `${contentWidth / 50}s`, [contentWidth]);

  const parseContent = useCallback((content: string): CardContent => {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error("Error parsing JSON content:", error);
      return { description: "Error parsing content" };
    }
  }, []);

  const renderCard = useCallback((card: Card, index: number, reverse = false) => (
    <motion.div
      layoutId={`card-${card.title}-${index}${reverse ? '-reverse' : ''}`}
      key={`card-${card.title}-${index}${reverse ? '-reverse' : ''}`}
      onClick={() => setActive(card)}
    >
      <Card className="card !shadow-lg cursor-pointer inline-block mx-4 pb-[7px] mb-[7px]">
        <div className="flex gap-4 flex-col items-center">
          <motion.div layoutId={`image-${card.title}-${index}${reverse ? '-reverse' : ''}`}>
            <Image
              width={100}
              height={100}
              src={card.src}
              alt={card.title}
              unoptimized={true}
              className="h-20 w-20 rounded-lg object-contain"
            />
          </motion.div>
          <div className="content-center">
            <motion.div
              layoutId={`title-${card.title}-${index}${reverse ? '-reverse' : ''}`}
              className="font-medium text-center"
            >
              {card.title}
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  ), []);

  const doubledCards = useMemo(() => [...cards, ...cards], [cards]);

  return (
    <>
      <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 h-full w-full z-10"
        />
      )}
    </AnimatePresence>
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 grid place-items-center z-[100]">
          <motion.button
            key={`button-${active.title}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
            onClick={() => setActive(null)}
          >
            <CloseIcon />
          </motion.button>
          <motion.div
            layoutId={`card-${active.title}`}
            ref={ref}
            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
          >
            <div className="flex flex-col h-full pb-4"> {/* Contenedor flexible */}
              <motion.div layoutId={`image-${active.title}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  unoptimized={true}
                  className="w-full h-[16rem] sm:rounded-tr-lg sm:rounded-tl-lg object-contain pt-4"
                />
              </motion.div>

              <div className="flex flex-col flex-grow overflow-hidden"> {/* Contenedor que crecerá y permitirá scroll */}
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.div
                      layoutId={`title-${active.title}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.div>
                  </div>
                </div>
                <div className="relative flex-grow overflow-auto px-4 pb-4"> {/* Contenedor con scroll */}
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-base"
                  >
                    {parseContent(active.content).description}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

      <div className="px-3 pb-8">
        <h3 className="md-840:pt-8 lg:pt-0 pb-6 md-840:pb-12 text-accent text-center text-3xl">
          Mis Tecnologías & Herramientas favoritas
        </h3>
        <Card className="card hover:bg-ui overflow-hidden mx-auto max-w-[900px]">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className="flex flex-none animate-scroll-right"
              ref={contentRef}
              style={{
                animationDuration,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              {doubledCards.map((card, index) => renderCard(card, index))}
            </div>
          </div>
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className="flex flex-none animate-scroll-left"
              style={{
                animationDuration,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              {doubledCards.reverse().map((card, index) => renderCard(card, index, true))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export const CloseIcon = React.memo(() => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
));