import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/subscribe
 * Suscribe un email a notificaciones de nuevas propiedades.
 * Usa Resend (https://resend.com) si RESEND_API_KEY está configurado.
 *
 * Variables de entorno necesarias:
 *   RESEND_API_KEY      — Clave API de Resend (ej: re_xxx)
 *   RESEND_AUDIENCE_ID  — ID de la audience en Resend
 */
export async function POST(req: NextRequest) {
    let email: string | undefined
    try {
        const body = await req.json()
        email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : undefined
    } catch {
        return NextResponse.json({ error: 'Cuerpo de solicitud inválido' }, { status: 400 })
    }

    if (!email || !email.includes('@') || email.length < 5) {
        return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.RESEND_AUDIENCE_ID

    // Sin Resend configurado: aceptar silenciosamente (útil en desarrollo)
    if (!apiKey || !audienceId) {
        if (process.env.NODE_ENV === 'development') {
            console.log('[subscribe] Resend no configurado. Email recibido:', email)
        }
        return NextResponse.json({ ok: true })
    }

    try {
        const res = await fetch('https://api.resend.com/audiences/' + audienceId + '/contacts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })

        if (!res.ok) {
            const error = await res.text()
            console.error('[subscribe] Resend error:', res.status, error)
            return NextResponse.json({ error: 'Error al registrar el email' }, { status: 500 })
        }

        return NextResponse.json({ ok: true })
    } catch (err) {
        console.error('[subscribe] Error de red:', err)
        return NextResponse.json({ error: 'Error de conexión' }, { status: 503 })
    }
}
