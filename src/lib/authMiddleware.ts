import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

type DecodedToken = {
    message: string;
};

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

export async function authMiddleware(request: Request) {
    const decodedToken = await authenticateRequest(request);
    
    if (!decodedToken) {
        return NextResponse.json(
            { error: 'No autorizado' },
            { status: 401 }
        );
    }

    return null;
}
