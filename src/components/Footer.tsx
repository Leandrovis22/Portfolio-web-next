"use client"

// src/components/Footer.tsx

import { Card } from "@nextui-org/react";
import { onLoop } from './FooterTextAnimation';

const AnimatedText = onLoop(({ text }) => (
    <span className="inline-block w-[2.1rem] text-start whitespace-nowrap">{text}</span>
));

export default function Footer() {
    const words = ["Framer", "Next", "❤️", "Pasión", "Dedicación"];  // Array de palabras

    return (
        <footer>
            <Card isBlurred className="h-[4rem] w-full block text-center content-center">
                <p className="text-xs sm:text-sm inline sm:block sm:mx-auto">
                    © 2024 Leandro Viscolungo todos los derechos reservados,&nbsp;
                </p>
                <span className="text-xs sm:text-sm block sm:mx-auto">
                    hecho con&nbsp;<AnimatedText words={words} /> {/* Agregamos la animación aquí */}
                </span>
               
            </Card>
        </footer>
    );
}
