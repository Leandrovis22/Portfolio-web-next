// src/components/componenttest.tsx

"use client"

import { Button, Card, Input, Textarea } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import Image from 'next/image';
import { FiDownload } from 'react-icons/fi';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';


const ResponsiveButton = ({ icon: Icon, text, onClick, ariaLabel, isSmallScreen }) => (
  <Button
    variant="ghost"
    className={`flex items-center justify-start gap-2 w-fit h-full min-h-[60px] px-3 ${isSmallScreen ? 'min-w-[5rem]' : ''}`}
    radius="full"
    aria-label={ariaLabel}
    onClick={onClick}
    startContent={<Icon size={isSmallScreen ? 34 : 50} />} // Ajusta el tamaño del icono según el tamaño de la pantalla
  >
    <p className={`text-[1rem] sm:text-base lg:text-lg xl:text-xl md-840:truncate ${isSmallScreen ? 'text-lg' : ''}`}>{text}</p>
  </Button>
);

const AspectRatioBox = ({ children, className, justifyClass }) => (
  <div className={`relative w-full h-full ${className}`}>
    <div className="md-840:absolute inset-0">
      <div className={`w-full h-full flex items-center ${justifyClass}`}>
        <div
          className={`



            flex items-center justify-center w-full h-full max-h max-w aspect-[346/400] sm-570:aspect-auto


            sm-570:h-[414px] sm-570:max-h-[calc((100vw-4rem)*400/346/2)] sm-570:max-w-[calc((100vh)*346/400)]
            md-840:h-full md-840:max-h-[calc((100vw-4rem)*400/346/3)] md-840:max-w-[calc((100vh-6.5rem-96.2px-2rem)*346/400)]
          `}
        >
          {children}
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => {


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

    <div className=''>
      <h6 className="pt-8 pb-12 md-840:pb-0 text-accent text-center text-3xl flex-shrink-0">
        Contacto
      </h6>

      <div className="w-full h-full py-4 px-8 sm-570:px-4 md-840:h-[calc(100vh-6.5rem-96.2px)] ">
        <div className="h-full w-full flex gap-4 sm-570:flex-row flex-col">
          <AspectRatioBox className="flex-1" justifyClass="justify-end">




            <Card className="card w-full h-full sm-570:max-w-[445px] sm-570:max-h-[514px] flex flex-col justify-center items-center p-4">
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



          </AspectRatioBox>
          <AspectRatioBox className="flex-1 hidden md-840:block" justifyClass="justify-center">



            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col gap-3 w-full max-w-md items-center">
                <ResponsiveButton
                  icon={FiDownload}
                  text="Descargar CV"
                  onClick={null}
                  ariaLabel="Descargar CV"
                  isSmallScreen={false}
                />

                <Button
                  variant="ghost"
                  className={`flex items-center justify-start gap-2 h-full min-h-[60px] px-3`}
                  radius="full"
                  aria-label="Correo"
                  onClick={copyToClipboard}
                  startContent={<IoIosMail size={50} />} // Ajusta el tamaño del icono según el tamaño de la pantalla
                >
                  <p className={`w-[219.78px] text-[1rem] lg:w-[247.25px] sm:text-base lg:text-lg xl:text-xl md-840:truncate`}>{buttonText}</p>
                </Button>

                <ResponsiveButton
                  icon={BsLinkedin}
                  text="leandroviscolungo"
                  onClick={null}
                  ariaLabel="Linkedin"
                  isSmallScreen={false}
                />
                <ResponsiveButton
                  icon={BsGithub}
                  text="Leandrovis22"
                  onClick={null}
                  ariaLabel="Github"
                  isSmallScreen={false}
                />
              </div>
            </div>


          </AspectRatioBox>
          <AspectRatioBox className="flex-1" justifyClass="justify-start">




            <Card className="card w-full h-full sm-570:max-w-[445px] sm-570:max-h-[514px] flex flex-col p-4 justify-center items-center">
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



          </AspectRatioBox>
        </div>
      </div>

      <div className="sm-570:px-4 pb-4 w-full h-full flex items-center md-840:hidden">
        <div className="flex-wrap justify-center flex flex-col sm-570:flex-row gap-3 w-full items-center">

          <ResponsiveButton
            icon={FiDownload}
            text="Descargar CV"
            onClick={null}
            ariaLabel="Descargar CV"
            isSmallScreen={true} // Cambia según el tamaño de pantalla real
          />

          <Button
            variant="ghost"
            className="flex items-center justify-start gap-2 h-full min-h-[60px] px-3"
            radius="full"
            aria-label="Correo"
            onClick={copyToClipboard}
            startContent={<IoIosMail size={34} />}
          >
            <p className="w-[219.78px] text-[1rem] sm:text-base lg:text-lg xl:text-xl overflow-hidden whitespace-nowrap text-ellipsis">
              {buttonText}
            </p>
          </Button>

          <ResponsiveButton
            icon={BsLinkedin}
            text="leandroviscolungo"
            onClick={null}
            ariaLabel="Linkedin"
            isSmallScreen={true} // Cambia según el tamaño de pantalla real
          />
          <ResponsiveButton
            icon={BsGithub}
            text="Leandrovis22"
            onClick={null}
            ariaLabel="Github"
            isSmallScreen={true} // Cambia según el tamaño de pantalla real
          />

        </div>
      </div>

    </div>
  );
};

export default Contact;