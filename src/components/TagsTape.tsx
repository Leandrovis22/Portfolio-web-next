// src/components/TagsTape.tsx

'use client'

import { Card } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react'

const words = ["Responsive", "Funcional", "Seguro", "Interactivo", "Mantenible", "Escalable", "Moderno", "De Vanguardia", "Al Instante", "Creativo", "Innovador", "UX/UI", "English", "Debugged", "Automatizado", "Desarrollo Constante"];

export const TagsTape = () => {
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="py-8 xl:py-16 overflow-hidden">

      <Card className="card -rotate-3 -mx-1" style={{ borderRadius: 0 }}>

        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div
            className="flex flex-none gap-4 py-3 animate-scroll"
            ref={contentRef}
            style={{
              animationDuration: `${contentWidth / 50}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          >
            {[...words, ...words].map((word, index) => (
              <div key={`${word}-${index}`} className="inline-flex gap-4 items-center">
                <span className="text-text font-extrabold text-sm whitespace-nowrap">
                  {word}
                </span>
                <span className="size-6 text-text -rotate-12">🏆</span>
              </div>
            ))}
          </div>
        </div>
        </Card>
    </div>
  );
};