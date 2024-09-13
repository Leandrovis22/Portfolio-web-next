"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../lib/use-outside-click";

export function SkillIcons() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);

  useOutsideClick(ref, () => setActive(null));

  const animationDuration = `${contentWidth / 50}s`;

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-contain"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="px-3 pb-8">
        
      <h3 className="mt-0 lg:mt-[-1%] pt-8 lg:pt-0 text-accent text-center pb-8 text-3xl">Mis Tecnologías & Herramientas favoritas</h3>
        <div className="hover:bg-ui overflow-hidden mx-auto max-w-[900px] card">
          <div className="mb-8">
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
                {[...cards, ...cards].map((card, index) => (
                  <motion.div
                    layoutId={`card-${card.title}-${id}-${index}`}
                    key={`card-${card.title}-${id}-${index}`}
                    onClick={() => setActive(card)}
                    className="card cursor-pointer inline-block mx-4 pb-[7px] mb-[7px]"
                  >
                    <div className="flex gap-4 flex-col items-center">
                      <motion.div layoutId={`image-${card.title}-${id}-${index}`}>
                        <Image
                          width={100}
                          height={100}
                          src={card.src}
                          alt={card.title}
                          className="h-20 w-20 rounded-lg object-contain"
                        />
                      </motion.div>
                      <div className="content-center">
                        <motion.h3
                          layoutId={`title-${card.title}-${id}-${index}`}
                          className="font-medium text-center"
                        >
                          {card.title}
                        </motion.h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div
                className="flex flex-none animate-scroll-left"
                style={{
                  animationDuration,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                }}
              >
                {[...cards, ...cards].reverse().map((card, index) => (
                  <motion.div
                    layoutId={`card-${card.title}-${id}-reverse-${index}`}
                    key={`card-${card.title}-${id}-reverse-${index}`}
                    onClick={() => setActive(card)}
                    className="card cursor-pointer inline-block mx-4 pb-[7px] mb-[7px]"
                  >
                    <div className="flex gap-4 flex-col items-center">
                      <motion.div layoutId={`image-${card.title}-${id}-reverse-${index}`}>
                        <Image
                          width={100}
                          height={100}
                          src={card.src}
                          alt={card.title}
                          className="h-20 w-20 rounded-lg object-contain"
                        />
                      </motion.div>
                      <div className="content-center">
                        <motion.h3
                          layoutId={`title-${card.title}-${id}-reverse-${index}`}
                          className="font-medium text-center"
                        >
                          {card.title}
                        </motion.h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
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
  );
};

const cards = [
  {
    title: "React",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    content: () => {
      return (
        <p>
          React is a JavaScript library for building user interfaces.
        </p>
      );
    },
  },
  {
    title: "Node.js",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    content: () => {
      return (
        <p>
          Node.js is a runtime environment for executing JavaScript code server-side.
        </p>
      );
    },
  },
  {
    title: "Express",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    content: () => {
      return (
        <p>
          Express is a minimal and flexible Node.js web application framework.
        </p>
      );
    },
  },
  {
    title: "MongoDB",
    src: "https://w7.pngwing.com/pngs/429/921/png-transparent-mongodb-plain-wordmark-logo-icon-thumbnail.png",
    content: () => {
      return (
        <p>
          MongoDB is a document-based NoSQL database used for scalable applications.
        </p>
      );
    },
  },
  {
    title: "MySQL",
    src: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg",
    content: () => {
      return (
        <p>
          MySQL is a popular open-source relational database management system.
        </p>
      );
    },
  },
  {
    title: "Docker",
    src: "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png",
    content: () => {
      return (
        <p>
          Docker is a platform for developing, shipping, and running applications in containers.
        </p>
      );
    },
  },
  {
    title: "Kubernetes",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
    content: () => {
      return (
        <p>
          Kubernetes is an open-source platform for automating the deployment, scaling, and management of containerized applications.
        </p>
      );
    },
  },
  {
    title: "AWS",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    content: () => {
      return (
        <p>
          AWS is a cloud computing platform providing a variety of infrastructure services.
        </p>
      );
    },
  },
  {
    title: "TypeScript",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    content: () => {
      return (
        <p>
          TypeScript is a strongly typed programming language that builds on JavaScript.
        </p>
      );
    },
  },
];
