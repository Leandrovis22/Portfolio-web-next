import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const processedRequests = new Set();

setInterval(() => processedRequests.clear(), 3600000);

async function verifyRecaptcha(token: string) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set');
      return false;
    }

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      {
        method: 'POST',
      }
    );
    
    const data = await response.json();
    console.log('reCAPTCHA verification response:', data);
    
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request:any) {
  try {
    const { name, email, message, username, reCaptchaToken, requestId } = await request.json();

    if (processedRequests.has(requestId)) {
      return NextResponse.json({ message: "Solicitud duplicada" }, { status: 409 });
    }

    if (username) {
      return NextResponse.json({ message: "Spam detected" }, { status: 400 });
    }

    const isRecaptchaValid = await verifyRecaptcha(reCaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json({ message: "reCAPTCHA verification failed" }, { status: 400 });
    }

    processedRequests.add(requestId);

    const msg = {
      to: process.env.SENDGRID_TO_EMAIL,
      from: `${name} <${process.env.SENDGRID_FROM_EMAIL}>`,
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Mensaje: ${message}
      `,
      html: `
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: "Mensaje enviado correctamente" });
  } catch (error:any) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ message: "Error interno del servidor", error: error.message }, { status: 500 });
  }
}