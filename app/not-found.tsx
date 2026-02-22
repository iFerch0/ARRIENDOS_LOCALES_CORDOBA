import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, Search, MessageCircle } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'

export const metadata: Metadata = {
    title: 'Página no encontrada — 404',
    robots: { index: false, follow: false },
}

export default function NotFound() {
    return (
        <>
            <Header />
            <main id="main-content" className="flex-1 pt-16 flex items-center justify-center min-h-[70vh] px-4 py-16">
                <div className="text-center max-w-lg mx-auto">
                    {/* Visual 404 */}
                    <div className="relative inline-block mb-8 select-none" aria-hidden="true">
                        <span className="font-display text-[120px] sm:text-[160px] font-bold text-neutral-100 leading-none">
                            404
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl">
                            🏠
                        </span>
                    </div>

                    <h1 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl mb-3">
                        Esta página no existe
                    </h1>
                    <p className="text-neutral-500 mb-8 max-w-sm mx-auto">
                        La propiedad o sección que buscas no está disponible. Puede que la URL sea incorrecta o que el contenido haya sido removido.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 text-sm transition-colors"
                        >
                            <Home className="h-4 w-4" aria-hidden="true" />
                            Ir al inicio
                        </Link>
                        <Link
                            href="/arriendos"
                            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 hover:border-primary-300 text-neutral-700 hover:text-primary-600 font-medium px-5 py-2.5 text-sm transition-colors"
                        >
                            <Search className="h-4 w-4" aria-hidden="true" />
                            Ver propiedades
                        </Link>
                        <Link
                            href="/contacto"
                            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 hover:border-primary-300 text-neutral-700 hover:text-primary-600 font-medium px-5 py-2.5 text-sm transition-colors"
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            Contactar
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppFloat />
        </>
    )
}
