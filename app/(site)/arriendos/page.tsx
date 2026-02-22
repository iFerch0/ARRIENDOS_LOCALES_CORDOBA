import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { FILTERED_PROPERTIES, PROPERTIES_COUNT, ALL_NEIGHBORHOODS } from '@/lib/sanity/queries'
import { PROPERTIES_PER_PAGE } from '@/lib/utils/constants'
import PropertyGrid, { PropertyGridSkeleton } from '@/components/property/PropertyGrid'
import Filters from '@/components/search/Filters'
import ActiveFilters from '@/components/search/ActiveFilters'
import type { PropertyCard, Neighborhood } from '@/lib/sanity/types'

export const metadata: Metadata = {
    title: 'Propiedades en Arriendo en Montería',
    description: 'Explora casas, apartamentos y locales comerciales en arriendo en Montería, Córdoba. Filtra por barrio, precio y tipo de inmueble.',
    alternates: { canonical: '/arriendos' },
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function parseSearchParams(sp: Record<string, string | string[] | undefined>) {
    const s = (key: string) => (Array.isArray(sp[key]) ? sp[key][0] : sp[key]) as string | undefined
    const pagina = Math.max(1, parseInt(s('pagina') ?? '1') || 1)
    const tipo = s('tipo') || null
    const barrio = s('barrio') || null
    const habitaciones = s('habitaciones') ? parseInt(s('habitaciones')!) : null
    let precioMin: number | null = null
    let precioMax: number | null = null
    const precio = s('precio')
    if (precio) {
        const [minStr, maxStr] = precio.split('-')
        precioMin = parseInt(minStr) || null
        precioMax = maxStr ? parseInt(maxStr) : null
    }
    return { pagina, tipo, barrio, habitaciones, precioMin, precioMax }
}

export default async function ArriendosPage({ searchParams }: { searchParams: SearchParams }) {
    const sp = await searchParams
    const { pagina, tipo, barrio, habitaciones, precioMin, precioMax } = parseSearchParams(sp)
    const from = (pagina - 1) * PROPERTIES_PER_PAGE
    const to = pagina * PROPERTIES_PER_PAGE

    const filterParams = { tipo, barrio, habitaciones, precioMin, precioMax, from, to }

    const [properties, totalCount, neighborhoods] = await Promise.all([
        sanityFetch<PropertyCard[]>(FILTERED_PROPERTIES, filterParams),
        sanityFetch<number>(PROPERTIES_COUNT, filterParams),
        sanityFetch<Neighborhood[]>(ALL_NEIGHBORHOODS),
    ])

    const neighborhoodList = neighborhoods.map((n) => ({ name: n.name, slug: n.slug.current }))

    return (
        <div className="container-site py-10 page-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
                    Propiedades en Arriendo
                </h1>
                <p className="mt-2 text-neutral-500">
                    {totalCount} {totalCount === 1 ? 'propiedad disponible' : 'propiedades disponibles'} en Montería
                </p>
            </div>

            {/* Filtros */}
            <div className="mb-6 space-y-3">
                <Suspense>
                    <Filters neighborhoods={neighborhoodList} />
                </Suspense>
                <Suspense>
                    <ActiveFilters />
                </Suspense>
            </div>

            {/* Grid */}
            <PropertyGrid
                properties={properties}
                totalCount={totalCount}
                currentPage={pagina}
                perPage={PROPERTIES_PER_PAGE}
            />
        </div>
    )
}
