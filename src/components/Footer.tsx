// src/components/Footer.tsx
"use client"
import React from 'react';
import { Card } from "@nextui-org/react";
import { onLoop } from './sub-components/FooterTextAnimation';

interface AnimatedTextProps {
    words: string[];
    text?: string; 
    textClass?: string; 
}

const AnimatedText = onLoop<AnimatedTextProps>(React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
    ({ text, textClass }, ref) => (
        <span ref={ref} className={`inline-block w-[3rem] text-start whitespace-nowrap ${textClass}`}>
            {text}
        </span>
    )
));

interface FooterProps {
    data: {
        words: string[];
    };
}

const Footer: React.FC<FooterProps> = ({ data }: FooterProps) => {

const {words} = data

    //const words = ["Framer Motion.", "Next.js.", "❤️", "Pasión.", "Dedicación."];
    return (
        <footer>
            <Card isBlurred className="h-[4rem] w-full block text-center content-center px-4">
                <p className="text-xs sm:text-sm inline sm:mx-auto ">
                    © 2024 Leandro Viscolungo todos los derechos reservados,&nbsp;
                </p>
                <span className="text-xs sm:text-sm xs-357:block sm-570:inline sm:mx-auto">
                    hecho con&nbsp;<AnimatedText words={words} />
                </span>
            </Card>
        </footer>
    );
}

export default Footer;
