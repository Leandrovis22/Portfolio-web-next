'use client';

import { Card } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';

interface TagTapeProps {
  words: string[];
}

export const TagsTape: React.FC<TagTapeProps> = React.memo(({ words }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState('0s');

  useEffect(() => {
    if (contentRef.current) {
      const duration = `${contentRef.current.offsetWidth / 50}s`;
      setAnimationDuration(duration);
      contentRef.current.style.animationDuration = duration;
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
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDirection: 'reverse',
            }}
          >
            {[...words, ...words].map((word, index) => (
              <div key={`${word}-${index}`} className="inline-flex gap-4 items-center">
                <span className="text-text font-medium text-sm whitespace-nowrap">
                  {word}
                </span>
                <span className="text-sm -rotate-12">🏆</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
});