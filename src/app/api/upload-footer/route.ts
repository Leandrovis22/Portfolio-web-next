import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Inicializar Prisma
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const body = JSON.parse(formData.get('data') as string);

    // Actualizar o crear FooterData
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
