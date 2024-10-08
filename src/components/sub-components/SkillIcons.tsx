"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

const parseContent = (content: string): CardContent => {
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Error parsing JSON content:", error);
    return { description: "Error parsing content" };
  }
};

const SkillCard = React.memo(({ card, index, onClick, reverse = false }: {
  card: Card;
  index: number;
  onClick: () => void;
  reverse?: boolean;
}) => (
  <motion.div
    layoutId={`card-${card.title}-${index}${reverse ? '-reverse' : ''}`}
    onClick={onClick}
    style={{ flex: '0 0 auto' }}
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
        <motion.div
          layoutId={`title-${card.title}-${index}${reverse ? '-reverse' : ''}`}
          className="font-medium text-center"
        >
          {card.title}
        </motion.div>
      </div>
    </Card>
  </motion.div>
));

export function SkillIcons({ cards }: SkillIconsProps) {
  const [active, setActive] = useState<Card | null>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);

  useOutsideClick(activeCardRef, () => setActive(null));

  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };

    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  const animationDuration = `${contentWidth / 50}s`;

  // Crear dos arrays sincronizados pero desplazados
  const createSyncedArrays = useCallback(() => {
    const doubledCards = [...cards, ...cards];
    const halfLength = cards.length;
    
    const topRow = doubledCards;
    const bottomRow = [...doubledCards.slice(halfLength), ...doubledCards.slice(0, halfLength)];
    
    return { topRow, bottomRow };
  }, [cards]);

  const { topRow, bottomRow } = createSyncedArrays();

  return (
    <div className="px-3 pb-8" ref={containerRef}>
      <h3 className="md-840:pt-8 lg:pt-0 pb-6 md-840:pb-12 text-accent text-center text-3xl">
        Mis Tecnologías & Herramientas favoritas
      </h3>
      
      <Card className="card hover:bg-ui overflow-hidden mx-auto max-w-[900px]">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div 
            ref={contentRef}
            className={`flex ${isVisible ? 'animate-scroll-right' : ''}`} 
            style={{ animationDuration }}
          >
            {topRow.map((card, index) => (
              <SkillCard
                key={`${card.title}-${index}`}
                card={card}
                index={index}
                onClick={() => setActive(card)}
              />
            ))}
          </div>
        </div>
        
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div 
            className={`flex ${isVisible ? 'animate-scroll-left' : ''}`}
            style={{ animationDuration }}
          >
            {bottomRow.map((card, index) => (
              <SkillCard
                key={`${card.title}-${index}-reverse`}
                card={card}
                index={index}
                onClick={() => setActive(card)}
                reverse
              />
            ))}
          </div>
        </div>
      </Card>
      
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-10"
            />
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.div
                layoutId={`card-${active.title}`}
                ref={activeCardRef}
                className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-2 right-2 lg:hidden z-10 bg-white rounded-full h-6 w-6 flex items-center justify-center"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>
                
                <div className="flex flex-col h-full">
                  <motion.div layoutId={`image-${active.title}`}>
                    <Image
                      priority
                      width={200}
                      height={200}
                      src={active.src}
                      alt={active.title}
                      unoptimized={true}
                      className="w-full h-[16rem] object-contain pt-4"
                    />
                  </motion.div>
                  
                  <div className="flex flex-col flex-grow p-4 overflow-auto">
                    <motion.div layoutId={`title-${active.title}`} className="font-bold mb-4">
                      {active.title}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {parseContent(active.content).description}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const CloseIcon = React.memo(() => (
  <svg
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
  </svg>
));