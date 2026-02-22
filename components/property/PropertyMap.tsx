'use client'

import dynamic from 'next/dynamic'
import Skeleton from '@/components/ui/Skeleton'
import type { GeoPoint } from '@/lib/sanity/types'

// Leaflet usa APIs del DOM, no puede ejecutarse en el servidor
const MapLeaflet = dynamic(() => import('./MapLeaflet'), {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" />,
})

interface PropertyMapProps {
    location: GeoPoint
    title: string
}

export default function PropertyMap({ location, title }: PropertyMapProps) {
    return (
        <div>
            <h2 className="font-display text-xl font-semibold text-neutral-900 mb-4">
                Ubicación
            </h2>
            <div className="h-64 rounded-2xl overflow-hidden border border-neutral-200">
                <MapLeaflet location={location} title={title} />
            </div>
            <p className="mt-2 text-xs text-neutral-400">
                La ubicación es aproximada para proteger la privacidad del inmueble.
            </p>
        </div>
    )
}
