import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export async function POST(request: Request) {
  try {

    const { password } = await request.json();

    if (password !== process.env.JWT_SECRET_KEY) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = jwt.sign(
      { 
        message: 'Autenticación exitosa'
      },
      process.env.JWT_SECRET_KEY || '',
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      token,
      message: 'Inicio de sesión exitoso'
    });
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
