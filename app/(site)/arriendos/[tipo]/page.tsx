import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { FILTERED_PROPERTIES, PROPERTIES_COUNT, ALL_NEIGHBORHOODS } from '@/lib/sanity/queries'
import { PROPERTIES_PER_PAGE, PLURAL_TO_TYPE, PROPERTY_TYPE_LABELS, PROPERTY_TYPE_PLURAL } from '@/lib/utils/constants'
import PropertyGrid from '@/components/property/PropertyGrid'
import Filters from '@/components/search/Filters'
import ActiveFilters from '@/components/search/ActiveFilters'
import type { PropertyCard, Neighborhood, PropertyType } from '@/lib/sanity/types'

type Params = Promise<{ tipo: string }>
type SearchParams = Promise<Record<string, string | string[] | undefined>>

function parseSearchParams(sp: Record<string, string | string[] | undefined>) {
    const s = (key: string) => (Array.isArray(sp[key]) ? sp[key][0] : sp[key]) as string | undefined
    const pagina = Math.max(1, parseInt(s('pagina') ?? '1') || 1)
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
    return { pagina, barrio, habitaciones, precioMin, precioMax }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { tipo } = await params
    const propertyType = PLURAL_TO_TYPE[tipo]
    if (!propertyType) return {}
    const label = PROPERTY_TYPE_LABELS[propertyType]
    const plural = PROPERTY_TYPE_PLURAL[propertyType]
    return {
        title: `${label}s en Arriendo en Montería`,
        description: `Encuentra ${label.toLowerCase()}s en arriendo en los mejores barrios de Montería, Córdoba. Filtra por precio, barrio y características.`,
        alternates: { canonical: `/arriendos/${plural}` },
    }
}

export async function generateStaticParams() {
    return Object.values(PROPERTY_TYPE_PLURAL).map((tipo) => ({ tipo }))
}

export default async function TipoCatalogPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
    const { tipo } = await params
    const propertyType = PLURAL_TO_TYPE[tipo] as PropertyType | undefined
    if (!propertyType) notFound()

    const sp = await searchParams
    const { pagina, barrio, habitaciones, precioMin, precioMax } = parseSearchParams(sp)
    const from = (pagina - 1) * PROPERTIES_PER_PAGE
    const to = pagina * PROPERTIES_PER_PAGE

    const filterParams = { tipo: propertyType, barrio, habitaciones, precioMin, precioMax, from, to }

    const [properties, totalCount, neighborhoods] = await Promise.all([
        sanityFetch<PropertyCard[]>(FILTERED_PROPERTIES, filterParams),
        sanityFetch<number>(PROPERTIES_COUNT, filterParams),
        sanityFetch<Neighborhood[]>(ALL_NEIGHBORHOODS),
    ])

    const neighborhoodList = neighborhoods.map((n) => ({ name: n.name, slug: n.slug.current }))
    const label = PROPERTY_TYPE_LABELS[propertyType]

    return (
        <div className="container-site py-10 page-fade-in">
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
                    {label}s en Arriendo en Montería
                </h1>
                <p className="mt-2 text-neutral-500">
                    {totalCount} {totalCount === 1 ? `${label.toLowerCase()} disponible` : `${label.toLowerCase()}s disponibles`}
                </p>
            </div>

            <div className="mb-6 space-y-3">
                <Suspense>
                    <Filters neighborhoods={neighborhoodList} fixedType={propertyType} />
                </Suspense>
                <Suspense>
                    <ActiveFilters />
                </Suspense>
            </div>

            <PropertyGrid
                properties={properties}
                totalCount={totalCount}
                currentPage={pagina}
                perPage={PROPERTIES_PER_PAGE}
            />
        </div>
    )
}
