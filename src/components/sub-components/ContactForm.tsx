import { Button, Card, Input, Textarea } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from 'next/dynamic';

const GoogleReCaptchaWrapper = dynamic(() => 
  import('../sub-components/GoogleReCaptchaWrapper').then(mod => mod.default),
  { ssr: false } // Esto es importante
);

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  username: z.string().max(0, "Este campo debe estar vacío"),
});

type FormData = z.infer<typeof formSchema> & { requestId: string };

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const submissionInProgress = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (isSubmitting || submissionInProgress.current) return;

    const currentTime = Date.now();
    if (currentTime - lastSubmitTime < 5000) {
      alert("Por favor, espera un momento antes de enviar otro mensaje.");
      return;
    }

    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setFormData({ ...data, requestId });
    setShowRecaptcha(true);
  };

  const handleRecaptchaVerified = async (token: string) => {
    console.log('reCAPTCHA verified, token received');
    if (!formData || submissionInProgress.current) return;

    submissionInProgress.current = true;
    setIsSubmitting(true);

    try {
      const URL = process.env.NEXT_PUBLIC_BASE_URL;
      
      const response = await fetch(`${URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          reCaptchaToken: token,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setLastSubmitTime(Date.now());
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        const responseData = await response.json();
        if (response.status === 409) {
          return;
        }
        throw new Error(responseData.message || `Error ${response.status}`);
      }
    } catch (error:any) {
      console.error("Error al enviar el formulario:", error);
      alert(`Error al enviar el mensaje: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      setShowRecaptcha(false);
      setFormData(null);
      submissionInProgress.current = false;
    }
  };

  useEffect(() => {
    return () => {
      submissionInProgress.current = false;
    };
  }, []);

  return (
    <>
      <Card className="card w-full h-full sm-570:max-w-[373px] sm-570:max-h-[431px] flex flex-col p-4 justify-center items-center">
        <h2 className="text-2xl font-bold mb-4 text-center text-text">
          Envía un Mensaje
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow flex flex-col space-y-4 overflow-auto w-full"
        >
          <Input
            {...register("name")}
            type="text"
            placeholder="Nombre"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <Input
            {...register("email")}
            type="email"
            placeholder="Correo Electrónico"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            classNames={{
              base: "!mt-[16px]",
            }}
          />
          <Textarea
            {...register("message")}
            placeholder="Mensaje"
            isInvalid={!!errors.message}
            errorMessage={errors.message?.message}
            disableAutosize
            className="!h-[2.5rem] xs-328:!h-full"
            classNames={{
              inputWrapper: "!h-[2.5rem] xs-328:!h-full",
              base: "!mt-[16px]",
              input: "!h-[2.5rem] xs-328:!h-full",
            }}
          />
          <Input
            {...register("username")}
            type="text"
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            style={{
              position: 'absolute',
              opacity: 0,
              height: 0,
              width: 0,
              zIndex: -1,
            }}
          />
          <div className="mt-2 xs-328:mt-4 flex justify-center w-full">
            <Button
              type="submit"
              color={submitSuccess ? "success" : "primary"}
              variant="shadow"
              size="lg"
              radius="full"
              className="flex items-center gap-2 w-1/2"
              isLoading={isSubmitting}
              isDisabled={submissionInProgress.current}
            >
              {submitSuccess ? "¡Enviado!" : "Enviar"}
            </Button>
          </div>
        </form>
      </Card>

      {showRecaptcha && (
  <div className="hidden">
    <GoogleReCaptchaWrapper onVerify={handleRecaptchaVerified} />
  </div>
)}
    </>
  );
}