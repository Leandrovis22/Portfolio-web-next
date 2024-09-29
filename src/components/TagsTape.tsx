'use client';

import { Card } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';

const words = [
  "Responsive", "Funcional", "Seguro", "Interactivo", "Mantenible",
  "Escalable", "Moderno", "De Vanguardia", "Al Instante", "Creativo",
  "Innovador", "UX/UI", "Debugged", "Automatizado", "Desarrollo Constante"
];

export const TagsTape = React.memo(() => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState('0s');

  useEffect(() => {
    if (contentRef.current) {
      const duration = `${contentRef.current.offsetWidth / 50}s`;
      setAnimationDuration(duration);
      contentRef.current.style.animationDuration = duration;
    }
  }, []); // The empty dependency array ensures this runs only on mount

  return (
    <div className="py-8 xl:py-16 overflow-hidden">
      <Card className="card -rotate-3 -mx-1" style={{ borderRadius: 0 }}>
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div
            className="flex flex-none gap-4 py-3 animate-scroll"
            ref={contentRef}
            style={{
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDirection: 'reverse',
            }}
          >
            {[...words, ...words].map((word, index) => (
              <span key={`${word}-${index}`} className="text-text font-extrabold text-sm whitespace-nowrap">
                {word} 🏆
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
});
