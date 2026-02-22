import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin, Home, TrendingUp, Star } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/lib/sanity/client'
import { NEIGHBORHOOD_BY_SLUG, ALL_SLUGS } from '@/lib/sanity/queries'
import { SITE_URL } from '@/lib/utils/constants'
import { formatPrice } from '@/lib/utils/formatPrice'
import PropertyCard from '@/components/property/PropertyCard'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import type { Neighborhood } from '@/lib/sanity/types'

type Params = Promise<{ nombre: string }>

type SlugsData = { neighborhoods: { slug: string }[] }

export const dynamicParams = true

export async function generateStaticParams() {
    try {
        const data = await sanityFetch<SlugsData>(ALL_SLUGS)
        return data.neighborhoods.map((n) => ({ nombre: n.slug }))
    } catch {
        return []
    }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { nombre } = await params
    const neighborhood = await sanityFetch<Neighborhood>(NEIGHBORHOOD_BY_SLUG, { slug: nombre })
    if (!neighborhood) return {}

    const title = `Arriendos en ${neighborhood.name}, Montería`
    const description =
        neighborhood.seoDescription ??
        `Encuentra casas, apartamentos y locales en arriendo en el barrio ${neighborhood.name}, Montería. ` +
            `${neighborhood.properties?.length ? `${neighborhood.properties.length} propiedades disponibles.` : ''}`
    const imageUrl = neighborhood.image?.asset?.url
    const canonical = `${SITE_URL}/arriendos/barrio/${nombre}`

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            type: 'website',
            locale: 'es_CO',
            url: canonical,
            images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : [],
        },
        twitter: { card: 'summary_large_image' },
    }
}

export default async function NeighborhoodPage({ params }: { params: Params }) {
    const { nombre } = await params
    const neighborhood = await sanityFetch<Neighborhood>(NEIGHBORHOOD_BY_SLUG, { slug: nombre })
    if (!neighborhood) notFound()

    const coverUrl = neighborhood.image?.asset?.url
    const lqip = neighborhood.image?.asset?.metadata?.lqip
    const properties = neighborhood.properties ?? []
    const canonical = `${SITE_URL}/arriendos/barrio/${nombre}`

    const placeSchema = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: `Barrio ${neighborhood.name}, Montería`,
        description: neighborhood.seoDescription,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Montería',
            addressRegion: 'Córdoba',
            addressCountry: 'CO',
        },
        url: canonical,
        ...(neighborhood.location
            ? {
                  geo: {
                      '@type': 'GeoCoordinates',
                      latitude: neighborhood.location.lat,
                      longitude: neighborhood.location.lng,
                  },
              }
            : {}),
    }

    return (
        <>
            <JsonLd data={placeSchema} />
            <main className="page-fade-in">
                {/* Hero del barrio */}
                <div className="relative h-56 sm:h-72 overflow-hidden bg-neutral-800">
                    {coverUrl ? (
                        <Image
                            src={coverUrl}
                            alt={`Barrio ${neighborhood.name}, Montería`}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover opacity-60"
                            placeholder={lqip ? 'blur' : 'empty'}
                            blurDataURL={lqip}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900" />
                    )}
                    <div className="absolute inset-0 flex items-end">
                        <div className="container-site pb-8">
                            <div className="flex items-center gap-2 text-primary-200 text-sm mb-2">
                                <MapPin className="h-4 w-4" aria-hidden="true" />
                                {neighborhood.zone ? `Zona ${neighborhood.zone}, ` : ''}Montería, Córdoba
                            </div>
                            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
                                Barrio {neighborhood.name}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="container-site py-8">
                    <Breadcrumbs items={[
                        { label: 'Propiedades', href: '/arriendos' },
                        { label: `Barrio ${neighborhood.name}` },
                    ]} />

                    <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
                        {/* Columna principal */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Descripción */}
                            {neighborhood.description && neighborhood.description.length > 0 && (
                                <section>
                                    <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4">
                                        Sobre el barrio
                                    </h2>
                                    <div className="prose prose-neutral max-w-none text-neutral-700">
                                        <PortableText value={neighborhood.description} />
                                    </div>
                                </section>
                            )}

                            {/* Propiedades disponibles */}
                            <section>
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="font-display text-2xl font-semibold text-neutral-900">
                                        Propiedades disponibles
                                        {properties.length > 0 && (
                                            <span className="ml-2 text-base font-normal text-neutral-500">
                                                ({properties.length})
                                            </span>
                                        )}
                                    </h2>
                                    <a
                                        href={`/arriendos?barrio=${nombre}`}
                                        className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                                    >
                                        Ver todas →
                                    </a>
                                </div>

                                {properties.length === 0 ? (
                                    <div className="py-12 text-center rounded-xl border border-dashed border-neutral-300">
                                        <Home className="h-10 w-10 text-neutral-300 mx-auto mb-3" aria-hidden="true" />
                                        <p className="text-neutral-500">
                                            No hay propiedades disponibles en este barrio por el momento.
                                        </p>
                                        <a
                                            href="/arriendos"
                                            className="mt-3 inline-block text-sm text-primary-600 hover:underline"
                                        >
                                            Ver todo el catálogo
                                        </a>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        {properties.map((property) => (
                                            <PropertyCard key={property._id} property={property} />
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Columna lateral */}
                        <aside className="space-y-5">
                            {/* Stats del barrio */}
                            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                                <h3 className="font-display text-lg font-semibold text-neutral-900 mb-4">
                                    Datos del barrio
                                </h3>
                                <ul className="space-y-3">
                                    {neighborhood.zone && (
                                        <li className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                            <div>
                                                <p className="text-xs text-neutral-500">Zona</p>
                                                <p className="font-medium text-neutral-800">{neighborhood.zone} de Montería</p>
                                            </div>
                                        </li>
                                    )}
                                    {neighborhood.averagePrice && (
                                        <li className="flex items-start gap-3">
                                            <TrendingUp className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                            <div>
                                                <p className="text-xs text-neutral-500">Precio promedio</p>
                                                <p className="font-medium text-neutral-800">
                                                    {formatPrice(neighborhood.averagePrice)}/mes
                                                </p>
                                            </div>
                                        </li>
                                    )}
                                    <li className="flex items-start gap-3">
                                        <Home className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                        <div>
                                            <p className="text-xs text-neutral-500">Propiedades disponibles</p>
                                            <p className="font-medium text-neutral-800">{properties.length}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Highlights */}
                            {neighborhood.highlights && neighborhood.highlights.length > 0 && (
                                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                                    <h3 className="font-display text-lg font-semibold text-neutral-900 mb-4">
                                        Puntos destacados
                                    </h3>
                                    <ul className="space-y-2">
                                        {neighborhood.highlights.map((h, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                                                <Star className="h-4 w-4 text-accent-500 flex-shrink-0" aria-hidden="true" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA WhatsApp */}
                            <a
                                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? ''}?text=${encodeURIComponent(`Hola, me interesa arrendar en el barrio ${neighborhood.name} en Montería. ¿Tienen propiedades disponibles?`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] hover:bg-[#20b558] text-white font-semibold py-3.5 px-4 transition-colors text-sm"
                            >
                                Consultar por WhatsApp
                            </a>
                        </aside>
                    </div>
                </div>
            </main>
        </>
    )
}
