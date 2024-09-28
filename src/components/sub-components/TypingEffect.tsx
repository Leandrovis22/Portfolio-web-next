"use client"

import * as React from 'react';
import { motion, useInView, useAnimate } from 'framer-motion';

interface TypingEffectProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  delayStart?: number; // Nueva prop para controlar el retraso inicial
  speed?: number;
}

export function TypingEffect({ 
  text = 'Typing Effect', 
  as: Component = 'span', 
  className = '',
  delayStart = 0, // Valor por defecto de 0 segundos
  speed = 0.009
}: TypingEffectProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { opacity: 1 },
        { duration: 0.1, delay: (index) => delayStart + index * speed }
      );
    }
  }, [isInView, animate, delayStart]);

  return (
    <Component
      ref={ref}
      className={className}
    >
      <span ref={scope}>
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </Component>
  );
}