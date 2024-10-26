// src/components/sub-components/FooterTextAnimation.tsx

"use client"

import React, { useEffect, useState, useRef, forwardRef } from "react";
import type { ComponentType } from "react";

const WORD_DISPLAY_TIME = 4000; 
const ANIMATION_SPEED = 100; 
const letters = "abcdefghijklmnopqrstuvwxyz-.,+*!?@&%/=";

export function onLoop<P extends object>(Component: ComponentType<P>) {
  return forwardRef<HTMLElement, P & { words: string[] }>((props, ref) => {
      const { words, ...rest } = props;
      const [currentWordIndex, setCurrentWordIndex] = useState(0);
      const [iteration, setIteration] = useState(0);
      const [isFullyRevealed, setIsFullyRevealed] = useState(false);
      const intersectionRef = useRef<HTMLElement | null>(null);

      const encrypt = (iteration: number, word: string) => {
          return word.split('').map((char, index) =>
              index < iteration ? char : letters[Math.floor(Math.random() * letters.length)]
          ).join('');
      };

      useEffect(() => {
          let animationInterval: NodeJS.Timeout | null = null;
          let displayTimeout: NodeJS.Timeout | null = null;

          const animate = () => {
              setIteration((prev) => {
                  if (prev >= words[currentWordIndex].length) {
                      setIsFullyRevealed(true);
                      if (animationInterval) clearInterval(animationInterval);
                      return prev;
                  }
                  return prev + 1;
              });
          };

          const moveToNextWord = () => {
              setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
              setIteration(0);
              setIsFullyRevealed(false);
          };

          animationInterval = setInterval(animate, ANIMATION_SPEED);
          displayTimeout = setTimeout(moveToNextWord, WORD_DISPLAY_TIME + (words[currentWordIndex].length * ANIMATION_SPEED));

          return () => {
              if (animationInterval) clearInterval(animationInterval);
              if (displayTimeout) clearTimeout(displayTimeout);
          };
      }, [currentWordIndex, words]);

      const encryptedText = encrypt(iteration, words[currentWordIndex]);
      const textClass = !isFullyRevealed ? "text-accent" : "";

      return (
          <Component
              ref={(node: HTMLElement | null) => {

                  intersectionRef.current = node;
                  if (typeof ref === 'function') {
                      ref(node);
                  } else if (ref) {
                      (ref as React.MutableRefObject<HTMLElement | null>).current = node;
                  }
              }}
              {...rest as P}
              text={isFullyRevealed ? words[currentWordIndex] : encryptedText}
              textClass={textClass}
          />
      );
  });
}

interface OnAppearProps {
  texto: string;
  className?: string;
  delaySegundos?: number;
  as?: React.ElementType;
}

export const OnAppear: React.FC<OnAppearProps> = ({
  texto,
  className,
  delaySegundos = 0,
  as: Component = 'span'
}) => {
  const [textoCodificado, setTextoCodificado] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const intersectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasStarted) {
            setHasStarted(true);
          }
        } else {
          setIsVisible(false);
          if (hasStarted) {
            setIteration(0);
          }
        }
      });
    });

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isVisible || !hasStarted) return;

    const timer = setTimeout(() => {
      const animateText = () => {
        setIteration((prev) => {
          const newIteration = prev + 1.3;
          return newIteration >= texto.length ? texto.length : newIteration;
        });
      };

      const interval = setInterval(animateText, 100);

      return () => clearInterval(interval);
    }, delaySegundos * 1000);

    return () => clearTimeout(timer);
  }, [isVisible, delaySegundos, texto, hasStarted]);

  useEffect(() => {
    const encryptText = () => {
      const encrypted = texto.split('').map((char, index) => {
        if (index < Math.floor(iteration)) {
          return texto[index];
        }
        return letters.includes(char.toLowerCase())
          ? letters[Math.floor(Math.random() * letters.length)]
          : char;
      }).join('');
      setTextoCodificado(encrypted);
    };

    if (isVisible && hasStarted) {
      encryptText();
    } else {
      const espaciosEnBlanco = texto.replace(/./g, '.'); 
      setTextoCodificado(espaciosEnBlanco);
    }
  }, [texto, iteration, isVisible, hasStarted]);

  return (
    <Component
      ref={intersectionRef}
      className={className}
      style={{
        opacity: hasStarted ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      {textoCodificado}
    </Component>
  );
};