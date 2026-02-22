import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Webhook de Sanity para ISR.
 * Configurar en Sanity: Settings → API → Webhooks
 * URL: https://tudominio.com.co/api/revalidate?secret=SANITY_REVALIDATE_SECRET
 * Trigger: on document create/update/delete
 */
export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret')

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
        return NextResponse.json({ message: 'Secreto inválido' }, { status: 401 })
    }

    try {
        const body = await req.json() as { _type?: string; slug?: { current?: string } }
        const { _type, slug } = body

        switch (_type) {
            case 'property':
                revalidatePath('/arriendos', 'layout')
                if (slug?.current) {
                    // Revalidar la ruta de detalle en todos los tipos posibles
                    revalidatePath(`/arriendos/casas/${slug.current}`)
                    revalidatePath(`/arriendos/locales/${slug.current}`)
                    revalidatePath(`/arriendos/apartamentos/${slug.current}`)
                }
                break

            case 'neighborhood':
                revalidatePath('/arriendos', 'layout')
                if (slug?.current) {
                    revalidatePath(`/arriendos/barrio/${slug.current}`)
                }
                break

            case 'blogPost':
                revalidatePath('/blog', 'layout')
                if (slug?.current) {
                    revalidatePath(`/blog/${slug.current}`)
                }
                break

            case 'siteSettings':
                revalidatePath('/', 'layout')
                break

            default:
                revalidatePath('/', 'layout')
        }

        return NextResponse.json({ revalidated: true, timestamp: Date.now() })
    } catch {
        return NextResponse.json({ message: 'Error procesando el webhook' }, { status: 500 })
    }
}
