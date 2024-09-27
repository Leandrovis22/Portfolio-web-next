"use client"
// src/components/Footer.tsx
import React from 'react';
import { Card } from "@nextui-org/react";
import { onLoop } from './sub-components/FooterTextAnimation';

// Define types for the props expected by AnimatedText
interface AnimatedTextProps {
    words: string[];
    text?: string;  // Optional, since it's set inside onLoop
    textClass?: string;  // Optional, since it's set inside onLoop
}

// Create AnimatedText using the onLoop HOC
const AnimatedText = onLoop<AnimatedTextProps>(React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
    ({ text, textClass }, ref) => (
        <span ref={ref} className={`inline-block w-[3rem] text-start whitespace-nowrap ${textClass}`}>
            {text}
        </span>
    )
));

const Footer: React.FC = ( ) => {
    const words = ["Framer Motion.", "Next.js.", "❤️", "Pasión.", "Dedicación."];
    return (
        <footer>
            <Card isBlurred className="h-[4rem] w-full block text-center content-center">
                <p className="text-xs sm:text-sm inline sm:mx-auto">
                    © 2024 Leandro Viscolungo todos los derechos reservados,&nbsp;
                </p>
                <span className="text-xs sm:text-sm inline sm:mx-auto">
                    hecho con&nbsp;<AnimatedText words={words} />
                </span>
            </Card>
        </footer>
    );
}

export default Footer;
