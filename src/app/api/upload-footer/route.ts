import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '@/lib/authMiddleware';

const prisma = new PrismaClient();

export async function POST(request: Request) {

  const authResponse = await authMiddleware(request);
  if (authResponse) {
      return authResponse;
  }
  try {
    const formData = await request.formData();
    const body = JSON.parse(formData.get('data') as string);

    const footerData = await prisma.footerData.upsert({
      where: { id: 1 },
      update: { words: body.footer.words },
      create: { words: body.footer.words },
    });

    return NextResponse.json({
      message: 'Datos del footer actualizados con éxito',
      footerData
    }, { status: 200 });

  } catch (error) {
    console.error('Error al actualizar los datos del footer:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}
