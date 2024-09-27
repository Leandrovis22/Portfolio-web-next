"use client"

// src/components/FooterTextAnimation.tsx

import type { ComponentType } from "react"
import { useEffect, useState, useRef } from "react"

// Loop only
const loopDelay = 700
const initDelay = 100

// Do not configure
const letters = "abcdefghijklmnopqrstuvwxyz-.,+*!?@&%/="

export function onLoop(Component): ComponentType {
    return (props) => {
        const words = props.words;  // Añadimos las palabras desde las props
        const [currentWordIndex, setCurrentWordIndex] = useState(0);
        const [iteration, setIteration] = useState(0);
        const [delayTime, setDelayTime] = useState(loopDelay);
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

            if (iteration >= length) {
                setTimeout(() => {
                    setIteration(0);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);  // Cambiamos a la siguiente palabra
                }, delayTime);
            }

            return result;
        };

        useEffect(() => {
            let interval = null;

            interval = setTimeout(() => {
                setIteration((prev) => prev + 1);
                interval = setInterval(() => {
                    setIteration((prev) => prev + 1);
                }, 50);
            }, initDelay);

            return () => clearInterval(interval);
        }, [currentWordIndex]);

        return (
            <Component
                ref={intersectionRef}
                {...props}
                text={encrypt(iteration, words[currentWordIndex])}  // Pasamos la palabra actual
            />
        );
    };
}
