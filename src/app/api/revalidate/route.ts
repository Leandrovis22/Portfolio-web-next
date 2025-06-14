// src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        revalidatePath('/')
        return NextResponse.json({
            revalidated: true,
            timestamp: new Date().toISOString()
        })
    } catch (err) {
        console.error('Error revalidating:', err)
        return NextResponse.json(
            { error: 'Error revalidating' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        revalidatePath('/')
        return NextResponse.json({
            revalidated: true,
            message: 'Cache revalidated successfully',
            timestamp: new Date().toISOString()
        })
    } catch (err) {
        console.error('Error revalidating:', err)
        return NextResponse.json(
            { error: 'Error revalidating' },
            { status: 500 }
        )
    }
}