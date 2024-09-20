"use client";

import { Button, Card, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { useTheme } from "next-themes";

export default function Contact() {

    const { theme } = useTheme(); // Obtiene el tema actual

    const imageSrc = theme === "dark" ? "/mapdark.png" : "/maplight.png";

    const [buttonText, setButtonText] = useState("leandroviscolungo@gmail.com");

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [botField, setBotField] = useState(''); // Honeypot field
    const [errors, setErrors] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let valid = true;
        let newErrors = { nombre: '', email: '', mensaje: '' };

        if (botField) {
            console.log('Bot detectado');
            return;
        }

        if (!nombre) {
            newErrors.nombre = 'El nombre es obligatorio';
            valid = false;
        }
        if (!email) {
            newErrors.email = 'El correo es obligatorio';
            valid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'El correo no es válido';
            valid = false;
        }
        if (!mensaje) {
            newErrors.mensaje = 'El mensaje es obligatorio';
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        console.log('Formulario enviado:', { nombre, email, mensaje });
    };

    const copyToClipboard = () => {
        const email = "leandroviscolungo@gmail.com";
        navigator.clipboard.writeText(email)
            .then(() => {
                setButtonText("¡Correo copiado!");
                setTimeout(() => setButtonText("leandroviscolungo@gmail.com"), 1700);
            })
            .catch(() => {
                setButtonText("Error al copiar");
                setTimeout(() => setButtonText("leandroviscolungo@gmail.com"), 1700);
            });
    };

    return (
        <div id="contact" className=" lg:h-screen-footer relative overflow-x-clip flex flex-col flex-grow">

            <div className="absolute h-[400px] w-[1600px] bottom-[-4rem] left-1/2 -translate-x-1/2 dark:bg-secondary [mask-image:radial-gradient(64%_78%_at_bottom_center,black,transparent)] z-0"></div>

            <h6 className="pt-8 pb-12 text-accent text-center text-3xl">
                Contacto
            </h6>

            <div className="md:flex-row flex-col flex h-fit lg:gap-0 gap-5 lg:h-full z-10 px-4 lg:px-[5%] 2xl-1800:mx-[10%]">


                
                 <div className="flex-1 flex flex-col justify-center items-center">
                    
                    <Card className="w-fit h-fit card">
                        <div className="max-w-[279px]">
                        <Image src={imageSrc} className="rounded-3xl" alt="map image" width={1726} height={1726} />
                        </div>
                        <p className="text-text text-sm pt-[0.75rem] text-center flex justify-center">
                            <FaLocationDot className="text-text size-[1.3rem] align-middle justify-center" />
                            &nbsp;Santa Fe, La Capital, Argentina
                        </p>
                    </Card>
                    
                </div> 

                {/* 
                <div className="flex-1 px-4 items-center justify-center hidden lg:flex">
                    <div className="flex items-center flex-col gap-5 w-fit">
                        <div className="flex gap-4">
                            <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit min-h-[60px]" radius="full" aria-label="Linkedin">
                                <div className="size-[2.6rem] items-center content-center justify-center flex">
                                    <FiDownload className="size-[2.2rem]" /></div> <p className="text-lg">Descargar CV</p>
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]"
                            radius="full"
                            aria-label="Correo"
                            onClick={copyToClipboard}
                        >
                            <div className="size-[2.6rem] items-center content-center justify-center flex"><IoIosMail className="size-[2.4rem]" /></div> <p className="text-lg">{buttonText}</p>
                        </Button>
                        <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]" radius="full" aria-label="Linkedin">
                            <div className="size-[2.6rem] items-center content-center justify-center flex"><BsLinkedin className="size-[1.9rem]" /> </div> <p className="text-lg">leandroviscolungo</p>
                        </Button>
                        <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]" radius="full" aria-label="Github">
                            <div className="size-[2.6rem] items-center content-center justify-center flex"><BsGithub className="size-[2.2rem]" /> </div> <p className="text-lg">Leandrovis22</p>
                        </Button>
                    </div>
                </div>
                */}
                
                <div className="flex-1 flex flex-col h-full justify-center items-center">
                    <div className="max-w-[304.6px] max-h-[337.4px] w-full h-auto aspect-[0.9] mx-auto">

                        <div className="h-full card rounded-3xl shadow-lg p-4 flex flex-col">
                            <h2 className="text-2xl font-bold mb-4 text-center">Enviar un Mensaje</h2>

                            
                            <div className="flex-grow flex flex-col space-y-4 overflow-auto min-h-0">
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                                </div>
                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Correo Electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div className="flex-1 h-full">
                                    <Textarea
                                        placeholder="Mensaje"
                                        value={mensaje}
                                        onChange={(e) => setMensaje(e.target.value)}
                                        required
                                        disableAutosize
                                        className="h-full"
                                        classNames={{
                                            inputWrapper: "!h-full",  // Aplica la altura directamente al input-wrapper
                                        }}
                                    />
                                    {errors.mensaje && <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>}
                                </div>

                                <Input
                                    type="text"
                                    className="hidden"
                                    value={botField}
                                    onChange={(e) => setBotField(e.target.value)}
                                    placeholder="Dejar vacío"
                                />
                            </div>

                            
                            <div className="mt-4 flex justify-center">
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="shadow"
                                    size="lg"
                                    className="uppercase flex items-center gap-2 w-1/2"
                                >
                                    Enviar
                                </Button>
                            </div>
                        </div>

                    </div>
                </div> 


            </div>



            <div className="h-full content-center lg:hidden">
                {/* Botones de contacto para pantalla menor a lg */}
                <div className=" px-4 flex">
                    <div className="flex justify-center flex-wrap flex-row gap-5 w-fit">
                        <div className="flex gap-4">
                            <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit min-h-[60px]" radius="full" aria-label="Linkedin">
                                <div className="size-[2.6rem] items-center content-center justify-center flex">
                                    <FiDownload className="size-[2.2rem]" /></div> <p className="text-lg">Descargar CV</p>
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]"
                            radius="full"
                            aria-label="Correo"
                            onClick={copyToClipboard}
                        >
                            <div className="size-[2.6rem] items-center content-center justify-center flex"><IoIosMail className="size-[2.4rem]" /></div> <p className="text-lg">{buttonText}</p>
                        </Button>
                        <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]" radius="full" aria-label="Linkedin">
                            <div className="size-[2.6rem] items-center content-center justify-center flex"><BsLinkedin className="size-[1.9rem]" /> </div> <p className="text-lg">leandroviscolungo</p>
                        </Button>
                        <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]" radius="full" aria-label="Github">
                            <div className="size-[2.6rem] items-center content-center justify-center flex"><BsGithub className="size-[2.2rem]" /> </div> <p className="text-lg">Leandrovis22</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
