import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { MAP_PROPERTIES } from '@/lib/sanity/queries'
import { SITE_URL } from '@/lib/utils/constants'
import MapWrapper from '@/components/map/MapWrapper'
import type { MapProperty } from '@/lib/sanity/types'

export const metadata: Metadata = {
    title: 'Mapa de Propiedades',
    description:
        'Explora todas las casas, apartamentos y locales en arriendo en Montería en un mapa interactivo con OpenStreetMap.',
    alternates: { canonical: `${SITE_URL}/mapa` },
}

const LEGEND = [
    { label: 'Casa', color: '#2563EB' },
    { label: 'Apartamento', color: '#7C3AED' },
    { label: 'Local', color: '#059669' },
    { label: 'Oficina', color: '#D97706' },
    { label: 'Apartaestudio', color: '#DB2777' },
    { label: 'Finca', color: '#16A34A' },
]

export default async function MapaPage() {
    let properties: MapProperty[] = []
    try {
        properties = await sanityFetch<MapProperty[]>(MAP_PROPERTIES)
    } catch {
        // Mostrar mapa vacío si Sanity no responde
    }

    return (
        <main aria-label="Mapa de propiedades" className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
            {/* Barra superior */}
            <div className="flex-none px-4 py-3 flex items-center justify-between gap-4 bg-white border-b border-neutral-200 sm:px-6">
                <div>
                    <h1 className="font-display text-lg font-bold text-neutral-900 leading-tight">
                        Mapa de propiedades
                    </h1>
                    <p className="text-xs text-neutral-500 mt-0.5">
                        {properties.length}{' '}
                        {properties.length === 1 ? 'propiedad' : 'propiedades'} con ubicación
                    </p>
                </div>
                <a
                    href="/arriendos"
                    className="flex-none text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                    ← Catálogo
                </a>
            </div>

            {/* Leyenda de colores */}
            <div className="flex-none px-4 py-2 flex flex-wrap gap-x-5 gap-y-1.5 bg-neutral-50 border-b border-neutral-100 sm:px-6">
                {LEGEND.map(({ label, color }) => (
                    <span key={label} className="flex items-center gap-1.5 text-xs text-neutral-600">
                        <span
                            className="h-3 w-3 flex-shrink-0 rounded-full"
                            style={{ background: color }}
                            aria-hidden="true"
                        />
                        {label}
                    </span>
                ))}
            </div>

            {/* Mapa */}
            <div className="flex-1 min-h-0">
                <MapWrapper properties={properties} />
            </div>
        </main>
    )
}
