import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Tipo para el token decodificado
type DecodedToken = {
    message: string;
    // Añade aquí otros campos que necesites del token
};

// Middleware de autenticación
export async function authenticateRequest(request: Request): Promise<DecodedToken | null> {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return null;
    }

    try {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY is not set');
        }

        return verify(token, process.env.JWT_SECRET_KEY) as DecodedToken;
    } catch (error) {
        return null;
    }
}

// Middleware para manejar la autenticación en las rutas
export async function authMiddleware(request: Request) {
    const decodedToken = await authenticateRequest(request);
    
    if (!decodedToken) {
        return NextResponse.json(
            { error: 'No autorizado' },
            { status: 401 }
        );
    }

    // Si la autenticación es exitosa, continuar con la solicitud
    return null; // Continúa con la lógica de la ruta
}
