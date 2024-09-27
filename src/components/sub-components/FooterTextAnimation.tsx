"use client"

// src/components/FooterTextAnimation.tsx

import type { ComponentType } from "react"
import { useEffect, useState, useRef } from "react"

const WORD_DISPLAY_TIME = 4000; // 5 seconds
const ANIMATION_SPEED = 100; // 50ms between each letter reveal
const letters = "abcdefghijklmnopqrstuvwxyz-.,+*!?@&%/="

export function onLoop(Component): ComponentType {
    return (props) => {
        const words = props.words;
        const [currentWordIndex, setCurrentWordIndex] = useState(0);
        const [iteration, setIteration] = useState(0);
        const [isFullyRevealed, setIsFullyRevealed] = useState(false);
        const intersectionRef = useRef(null);

        const encrypt = (iteration: number, word: string) => {
            const length = word.length;
            let result = "";

            for (let i = 0; i < length; i++) {
                const letter = word[i];
                if (i < iteration) {
                    result += letter;
                } else {
                    result += letters[Math.floor(Math.random() * letters.length)];
                }
            }

            return result;
        };

        useEffect(() => {
            let animationInterval: NodeJS.Timeout | null = null;
            let displayTimeout: NodeJS.Timeout | null = null;

            const animate = () => {
                setIteration((prev) => {
                    if (prev >= words[currentWordIndex].length) {
                        // Word is fully revealed
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

            // Start the animation
            animationInterval = setInterval(animate, ANIMATION_SPEED);

            // Set up the timeout for moving to the next word
            displayTimeout = setTimeout(() => {
                moveToNextWord();
            }, WORD_DISPLAY_TIME + (words[currentWordIndex].length * ANIMATION_SPEED));

            return () => {
                if (animationInterval) clearInterval(animationInterval);
                if (displayTimeout) clearTimeout(displayTimeout);
            };
        }, [currentWordIndex, words]);

        const encryptedText = encrypt(iteration, words[currentWordIndex]);
        const textClass = !isFullyRevealed ? "text-accent" : ""; // Aplica la clase si no está completamente revelado

        return (
            <Component
                ref={intersectionRef}
                {...props}
                text={isFullyRevealed ? words[currentWordIndex] : encryptedText}
                textClass={textClass} // Pasa la clase como prop
            />
        );
    };
}
