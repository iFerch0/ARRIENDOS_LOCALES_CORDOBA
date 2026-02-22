'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { PROPERTIES_BY_IDS } from '@/lib/sanity/queries'
import { useFavorites } from '@/lib/hooks/useFavorites'
import PropertyCard from '@/components/property/PropertyCard'
import Skeleton from '@/components/ui/Skeleton'
import type { PropertyCard as PropertyCardType } from '@/lib/sanity/types'

function GridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                    <Skeleton className="h-52 w-full" />
                    <div className="p-4 space-y-2">
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-9 w-full mt-1" />
                    </div>
                </div>
            ))}
        </div>
    )
}

function EmptyState() {
    return (
        <div className="py-20 text-center">
            <Heart className="h-14 w-14 text-neutral-200 mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold text-neutral-900 mb-2">
                Aún no tienes favoritos
            </h2>
            <p className="text-neutral-500 text-sm mb-6 max-w-sm mx-auto">
                Guarda las propiedades que te interesen pulsando el ícono{' '}
                <Heart className="h-3.5 w-3.5 inline text-red-400 fill-current" aria-hidden="true" />{' '}
                en cada tarjeta.
            </p>
            <Link
                href="/arriendos"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 text-sm transition-colors"
            >
                Explorar propiedades
            </Link>
        </div>
    )
}

export default function FavoritesContent() {
    const { favorites, hydrated } = useFavorites()
    const [properties, setProperties] = useState<PropertyCardType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!hydrated) return

        if (favorites.length === 0) {
            setLoading(false)
            return
        }

        client
            .fetch<PropertyCardType[]>(PROPERTIES_BY_IDS, { ids: favorites })
            .then((data) => setProperties(data ?? []))
            .catch(() => setProperties([]))
            .finally(() => setLoading(false))
    }, [favorites, hydrated])

    if (!hydrated || loading) return <GridSkeleton />
    if (favorites.length === 0) return <EmptyState />

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
            ))}
        </div>
    )
}
