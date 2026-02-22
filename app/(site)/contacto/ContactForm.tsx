'use client'

import { useState } from 'react'
import { WHATSAPP_PHONE } from '@/lib/utils/constants'
import { MessageCircle } from 'lucide-react'

export default function ContactForm() {
    const [nombre, setNombre] = useState('')
    const [mensaje, setMensaje] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const texto = nombre
            ? `Hola, soy ${nombre}. ${mensaje || 'Me interesa conocer sus propiedades en arriendo.'}`
            : mensaje || 'Hola, me interesa conocer sus propiedades en arriendo.'
        const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(texto)}`
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Nombre
                </label>
                <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition"
                />
            </div>

            <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Mensaje <span className="text-neutral-400">(opcional)</span>
                </label>
                <textarea
                    id="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={4}
                    placeholder="Cuéntanos qué tipo de propiedad buscas, barrio de preferencia, presupuesto..."
                    className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition resize-none"
                />
            </div>

            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20b558] text-white font-semibold py-3 px-6 transition-colors"
            >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Enviar por WhatsApp
            </button>

            <p className="text-xs text-neutral-500 text-center">
                Al enviar serás redirigido a WhatsApp para continuar la conversación.
            </p>
        </form>
    )
}
