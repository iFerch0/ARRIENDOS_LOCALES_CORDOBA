import { Suspense } from 'react'
import PropertyCard from './PropertyCard'
import { PropertyCardSkeleton } from '@/components/ui/Skeleton'
import Pagination from '@/components/ui/Pagination'
import type { PropertyCard as PropertyCardType } from '@/lib/sanity/types'

interface PropertyGridProps {
    properties: PropertyCardType[]
    totalCount: number
    currentPage: number
    perPage: number
}

export default function PropertyGrid({ properties, totalCount, currentPage, perPage }: PropertyGridProps) {
    const totalPages = Math.ceil(totalCount / perPage)

    if (properties.length === 0) {
        return (
            <div className="py-20 text-center">
                <p className="text-5xl mb-4" aria-hidden="true">🔍</p>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    No encontramos propiedades
                </h3>
                <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                    Prueba ajustando los filtros de búsqueda o elimina algunos para ver más resultados.
                </p>
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>

            <Suspense>
                <Pagination currentPage={currentPage} totalPages={totalPages} />
            </Suspense>
        </div>
    )
}

/** Skeleton del grid para loading.tsx */
export function PropertyGridSkeleton({ count = 9 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
            ))}
        </div>
    )
}
