// src\components\Contact.tsx

"use client";

import { Button, Card, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Contact() {
    const [buttonText, setButtonText] = useState("leandroviscolungo@gmail.com");

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [botField, setBotField] = useState('') // Honeypot field
    const [errors, setErrors] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    })

    const validateEmail = (email: string) => {
        // Validar formato de correo electrónico
        const re = /\S+@\S+\.\S+/
        return re.test(email)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        let valid = true
        let newErrors = { nombre: '', email: '', mensaje: '' }

        // Evitar bots verificando si el campo botField tiene contenido
        if (botField) {
            console.log('Bot detectado')
            return
        }

        // Validaciones de campos
        if (!nombre) {
            newErrors.nombre = 'El nombre es obligatorio'
            valid = false
        }
        if (!email) {
            newErrors.email = 'El correo es obligatorio'
            valid = false
        } else if (!validateEmail(email)) {
            newErrors.email = 'El correo no es válido'
            valid = false
        }
        if (!mensaje) {
            newErrors.mensaje = 'El mensaje es obligatorio'
            valid = false
        }

        if (!valid) {
            setErrors(newErrors)
            return
        }

        // Si es válido, manejar el envío del formulario
        console.log('Formulario enviado:', { nombre, email, mensaje })
    }

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

            <div className="grid h-full z-10">


                <div className="flex flex-col h-full justify-center">
                    <div className="flex flex-row h-fit">
                        <Card className="h-fit w-fit card">
                            <Image src="/mapdark.png" className="rounded-2xl" alt="map image" width={330} height={330} />
                            <p className="text-text pt-[0.75rem] text-center flex justify-center">
                                <FaLocationDot className="text-text size-[1.3rem] align-middle justify-center" />
                                &nbsp;Santa Fe, La Capital, Argentina
                            </p>
                        </Card>
                        <div className="pl-4 flex-1 flex justify-center flex-col gap-5">
                            <div className="flex gap-4">
                                <Button variant="ghost" className="size-[5rem] flex items-center gap-2 w-fit  min-h-[60px]" radius="full" aria-label="Linkedin">
                                    <div className="size-[2.6rem] items-center content-center justify-center flex"><FiDownload className="size-[2.2rem]" /></div> <p className="text-lg">Descargar CV</p>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]"
                                    radius="full"
                                    aria-label="Enviar correo"
                                    onClick={() => window.open('mailto:leandroviscolungo@gmail.com?subject=Contacto desde portafolio', '_blank')}
                                >
                                    <div className="size-[2.6rem] items-center content-center justify-center flex">
                                        <IoIosMail className="size-[2.4rem]" />
                                    </div>
                                    <p className="text-lg">Enviar correo</p>
                                </Button>
                            </div>
                            <Button
                                variant="ghost"
                                className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]"
                                radius="full"
                                aria-label="Correo"
                                onClick={copyToClipboard} // Añadimos la función de copiar
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
                        <div className="w-full max-w-md mx-auto p-6 card rounded-3xl shadow-lg content-center lg:px-8">
                            <h2 className="text-2xl font-bold mb-8 text-center">Enviar un Mensaje</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                <div>
                                    <Textarea
                                        placeholder="Mensaje"
                                        value={mensaje}
                                        onChange={(e) => setMensaje(e.target.value)}
                                        required
                                    />
                                    {errors.mensaje && <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>}
                                </div>
                                {/* Campo honeypot oculto para evitar bots */}
                                <Input
                                    type="text"
                                    className="hidden"
                                    value={botField}
                                    onChange={(e) => setBotField(e.target.value)}
                                    placeholder="Dejar vacío"
                                />
                                <div className="flex justify-center">
                                <Button type="submit" color="primary"
                                    variant="shadow"
                                    size="lg"
                                    className="uppercase flex items-center gap-2 w-1/2">
                                    Enviar
                                </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
