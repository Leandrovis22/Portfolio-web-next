"use client"

import React, { useEffect, useState, useRef, forwardRef } from "react"
import type { ComponentType } from "react"

const WORD_DISPLAY_TIME = 4000; // 4 seconds
const ANIMATION_SPEED = 100; // 100ms between each letter reveal
const letters = "abcdefghijklmnopqrstuvwxyz-.,+*!?@&%/="

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
                    // Forward the ref to both the internal ref and the one passed from the parent
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