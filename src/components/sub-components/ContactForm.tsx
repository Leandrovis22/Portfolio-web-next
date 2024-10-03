import { Button, Card, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    } finally {
      setTimeout(() => setIsSubmitting(false), 2000); // Cooldown de 2 segundos
    }
  };

  return (
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
        <div className="mt-2 xs-328:mt-4 flex justify-center w-full">
          <Button
            type="submit"
            color={submitSuccess ? "success" : "primary"}
            variant="shadow"
            size="lg"
            radius="full"
            className="flex items-center gap-2 w-1/2"
            isLoading={isSubmitting}
          >
            {submitSuccess ? "¡Enviado!" : "Enviar"}
          </Button>
        </div>
      </form>
    </Card>
  );
}