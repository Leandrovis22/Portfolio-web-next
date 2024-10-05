import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export async function POST(request: Request) {
  try {
    // Extraer la contraseña del cuerpo de la solicitud
    const { password } = await request.json();

    // Validar la contraseña con la clave secreta
    if (password !== process.env.JWT_SECRET_KEY) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Generar token
    const token = jwt.sign(
      { 
        message: 'Autenticación exitosa' // Puedes incluir un mensaje o cualquier información que desees
      },
      process.env.JWT_SECRET_KEY || '',
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      token,
      message: 'Inicio de sesión exitoso' // Mensaje de éxito
    });
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
