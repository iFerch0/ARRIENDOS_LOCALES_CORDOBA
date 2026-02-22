'use client'

import { useEffect } from 'react'
import { RefreshCw, Home } from 'lucide-react'

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Registrar en consola para debugging; reemplazar con servicio de errores en producción
        console.error('[Error boundary]', error)
    }, [error])

    return (
        <main className="min-h-[60vh] flex items-center justify-center px-4 py-20">
            <div className="text-center max-w-md">
                <div className="text-6xl mb-6 select-none" aria-hidden="true">⚠️</div>
                <h1 className="font-display text-2xl font-bold text-neutral-900 mb-3">
                    Algo salió mal
                </h1>
                <p className="text-neutral-500 text-sm mb-6 max-w-sm mx-auto">
                    Ocurrió un error inesperado al cargar esta página. Puedes intentar de nuevo o volver al inicio.
                </p>
                {error.digest && (
                    <p className="text-xs text-neutral-400 mb-6 font-mono">
                        Referencia: {error.digest}
                    </p>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 text-sm transition-colors"
                    >
                        <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        Reintentar
                    </button>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 hover:border-primary-300 text-neutral-700 hover:text-primary-600 font-medium px-5 py-2.5 text-sm transition-colors"
                    >
                        <Home className="h-4 w-4" aria-hidden="true" />
                        Ir al inicio
                    </a>
                </div>
            </div>
        </main>
    )
}
