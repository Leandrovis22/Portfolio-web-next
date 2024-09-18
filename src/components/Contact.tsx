// src\components\Contact.tsx

"use client";

import { Button, Card } from "@nextui-org/react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Contact() {
    const [buttonText, setButtonText] = useState("leandroviscolungo@gmail.com");

    const copyToClipboard = () => {
        const email = "leandroviscolungo@gmail.com";
        navigator.clipboard.writeText(email)
            .then(() => {
                setButtonText("¡Correo copiado!");
                setTimeout(() => setButtonText("leandroviscolungo@gmail.com"), 1700); // Cambia el texto de vuelta después de 1.7 segundos
            })
            .catch(() => {
                setButtonText("Error al copiar");
                setTimeout(() => setButtonText("leandroviscolungo@gmail.com"), 1700); // Cambia el texto de vuelta después de 1.7 segundos
            });
    };

    return (
        <div id="contact" className="h-screen-footer relative overflow-x-clip flex flex-col flex-grow">

            <div className="absolute h-[400px] w-[1600px] bottom-[-4rem] left-1/2 -translate-x-1/2 dark:bg-secondary [mask-image:radial-gradient(64%_78%_at_bottom_center,black,transparent)] z-0">
            </div>

            <h6 className="pt-8 pb-12 text-accent text-center text-3xl">
                Contacto
            </h6>

            <div className="grid grid-cols-1 md:grid-cols-7 h-full z-10">
                <form className="md:col-span-3" action=""></form>

                <div className="flex flex-col h-full md:col-span-4 pt-4">
                    <div className="flex flex-row h-fit">
                        <Card className="h-fit w-fit card">
                            <Image src="/mapdark.png" className="rounded-2xl" alt="map image" width={330} height={330} />
                            <p className="text-text pt-[0.75rem] text-center flex justify-center">
                                <FaLocationDot className="text-text size-[1.3rem] align-middle justify-center" />
                                &nbsp;Santa Fe, La Capital, Argentina
                            </p>
                        </Card>
                        <div className="pl-4 flex-1 flex justify-center flex-col gap-5">

                            <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]" radius="full" aria-label="Linkedin">
                                <FiDownload className="text-[1.9rem] !max-w-fit" /> <p className="text-lg">Descargar CV</p>
                            </Button>
                            <Button
                                variant="ghost"
                                className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]"
                                radius="full"
                                aria-label="Correo"
                                onClick={copyToClipboard} // Añadimos la función de copiar
                            >
                                <IoIosMail className="text-[2.4rem] !max-w-fit" /> <p className="text-lg">{buttonText}</p>
                            </Button>
                            <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]" radius="full" aria-label="Linkedin">
                                <BsLinkedin className="text-[1.9rem] !max-w-fit" /> <p className="text-lg">leandroviscolungo</p>
                            </Button>
                            <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]" radius="full" aria-label="Github">
                                <BsGithub className="text-4xl !max-w-fit" /> <p className="text-lg">Leandrovis22</p>
                            </Button>
                           
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
