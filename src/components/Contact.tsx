"use client";

import { Button, Card, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { useTheme } from "next-themes";
import EmailCopyButton from "./sub-components/EmailButton";
import Footer from "./Footer";

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
        <div id="contact" className="lg-1080:h-screen-footer relative overflow-x-clip flex flex-col flex-grow">

            {/* <div className="absolute h-[400px] w-[1600px] bottom-[-4rem] left-1/2 -translate-x-1/2 dark:bg-secondary [mask-image:radial-gradient(64%_78%_at_bottom_center,black,transparent)] z-0"></div>
 */}

            <div className="flex-1">

                <div className="flex flex-col h-full">

                    <h6 className="pt-8 pb-12 lg-1080:pb-0 text-accent text-center text-fluid-3xl flex-shrink-0">
                        Contacto
                    </h6>

                    <div className="bg-secondary  items-center justify-center flex flex-col sm-590:flex-row flex-grow h-full w-full gap-5 z-10 px-4 lg-1080:px-[5%]">

                        <div className="flex sm-590:justify-end justify-center items-center h-[80%]">

                            <div className="w-full h-full max-h-[600px] aspect-[346/400]">


                                <Card className="card w-full h-full flex flex-col justify-center items-center p-4">
                                    <div className="relative w-full h-full overflow-hidden rounded-3xl">
                                        <Image
                                            src={imageSrc}
                                            alt="map image"
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-3xl"
                                        />
                                    </div>

                                    <p className="text-text text-sm pt-4 text-center flex items-center justify-center">
                                        <FaLocationDot className="text-text text-xl mr-1" />
                                        Santa Fe, La Capital, Argentina
                                    </p>
                                </Card>
                            </div>

                        </div>


                        <div className="px-4 lg-1080:px-0 items-center justify-center hidden lg-1080:flex">
                            <div className="flex items-center flex-col gap-5 w-fit">
                                <div className="flex gap-4">
                                    <Button variant="ghost" className="flex items-center gap-2 w-fit h-full min-h-[60px]" radius="full" aria-label="Linkedin">
                                        <div className="size-[2.6rem] items-center content-center justify-center flex">
                                            <FiDownload className="size-[2.2rem]" /></div> <p className="text-fluid-lg">Descargar CV</p>
                                    </Button>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="h-full flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]"
                                    radius="full"
                                    aria-label="Correo"
                                    onClick={copyToClipboard}
                                >
                                    <div className="size-[2.6rem] items-center content-center justify-center flex"><IoIosMail className="size-[2.4rem]" /></div> <p className="text-fluid-lg">{buttonText}</p>
                                </Button>
                                <Button variant="ghost" className="h-full flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]" radius="full" aria-label="Linkedin">
                                    <div className="size-[2.6rem] items-center content-center justify-center flex"><BsLinkedin className="size-[1.9rem]" /> </div> <p className="text-fluid-lg">leandroviscolungo</p>
                                </Button>
                                <Button variant="ghost" className="h-full flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]" radius="full" aria-label="Github">
                                    <div className="size-[2.6rem] items-center content-center justify-center flex"><BsGithub className="size-[2.2rem]" /> </div> <p className="text-fluid-lg">Leandrovis22</p>
                                </Button>
                            </div>
                        </div>


{/* <div className="flex-1 flex sm-590:justify-start justify-center items-center min-w-0">
                    <div className="w-full max-w-[346px] 2xl:max-w-[470px] aspect-[0.9]"> */}

                        <div className="flex-1 lg-1080:flex-none flex sm-590:justify-start justify-center items-center min-w-0 lg-1080:h-[80%]">
                            <div className="w-full lg-1080:h-full max-w-[346px] lg-1080:max-w-none aspect-[346/400] lg-1080:max-h-[600px]">

                                <Card className="card w-full h-full flex flex-col p-4 justify-center items-center">
                                    <h2 className="text-2xl font-bold mb-4 text-center">Envia un Mensaje</h2>
                                    <div className="flex-grow flex flex-col space-y-4 overflow-auto w-full">
                                        <Input
                                            type="text"
                                            placeholder="Nombre"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
                                        />
                                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                                        <Input
                                            type="email"
                                            placeholder="Correo Electrónico"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            classNames={{
                                                base: "!mt-[16px]",
                                            }}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                        <Textarea
                                            placeholder="Mensaje"
                                            value={mensaje}
                                            onChange={(e) => setMensaje(e.target.value)}
                                            required
                                            disableAutosize
                                            className="!h-full"
                                            classNames={{
                                                inputWrapper: "!h-full",
                                                base: "!mt-[16px]",
                                                input: "!h-full",
                                            }}
                                        />
                                        {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje}</p>}
                                        <Input
                                            type="text"
                                            className="hidden"
                                            value={botField}
                                            onChange={(e) => setBotField(e.target.value)}
                                            placeholder="Dejar vacío"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-center w-full">
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="shadow"
                                            size="lg"
                                            className="uppercase w-1/2"
                                        >
                                            Enviar
                                        </Button>
                                    </div>
                                </Card>
                            </div>

                        </div>


                    </div>

                    {/* botones en small */}

                    <div className=" lg-1080:hidden py-[1.25rem] flex justify-center flex-wrap flex-row gap-5 w-fit">
                        <div className="flex gap-4">
                            <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit min-h-[60px]" radius="full" aria-label="Linkedin">
                                <div className="size-[2.6rem] items-center content-center justify-center flex">
                                    <FiDownload className="size-[2.2rem]" /></div> <p className="text-lg">Descargar CV</p>
                            </Button>
                        </div>
                        <EmailCopyButton emailId="myEmailId" />
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
