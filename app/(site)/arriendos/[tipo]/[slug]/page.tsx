import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/lib/sanity/client'
import { PROPERTY_BY_SLUG, ALL_SLUGS } from '@/lib/sanity/queries'
import { PROPERTY_TYPE_LABELS, PROPERTY_TYPE_PLURAL, PLURAL_TO_TYPE, SITE_URL } from '@/lib/utils/constants'
import { formatPrice } from '@/lib/utils/formatPrice'
import PropertyGallery from '@/components/property/PropertyGallery'
import PropertyFeatures from '@/components/property/PropertyFeatures'
import PropertyContact from '@/components/property/PropertyContact'
import PropertyMap from '@/components/property/PropertyMap'
import PropertySchema from '@/components/seo/PropertySchema'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import Badge from '@/components/ui/Badge'
import type { Property, PropertyType } from '@/lib/sanity/types'
import { MapPin, Calendar } from 'lucide-react'

type Params = Promise<{ tipo: string; slug: string }>

type SlugsData = {
    properties: { slug: string; propertyType: string }[]
}

// Permitir rutas no pre-generadas (ISR on-demand)
export const dynamicParams = true

export async function generateStaticParams() {
    try {
        const data = await sanityFetch<SlugsData>(ALL_SLUGS)
        return data.properties.map((p) => ({
            tipo: PROPERTY_TYPE_PLURAL[p.propertyType as PropertyType] ?? 'casas',
            slug: p.slug,
        }))
    } catch {
        // Sin conexión a Sanity en build: no pre-generar (se renderiza on-demand)
        return []
    }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params
    const property = await sanityFetch<Property>(PROPERTY_BY_SLUG, { slug })
    if (!property) return {}

    const title = property.seoTitle ??
        `${property.title} | Arriendo en ${property.neighborhoodName ?? 'Montería'}`
    const description = property.seoDescription ??
        `${PROPERTY_TYPE_LABELS[property.propertyType]} en arriendo en ${property.neighborhoodName ?? 'Montería'}. ` +
        `${property.bedrooms ? `${property.bedrooms} hab. ` : ''}` +
        `${property.bathrooms ? `${property.bathrooms} baños. ` : ''}` +
        `${property.area ? `${property.area}m². ` : ''}` +
        `Canon: ${formatPrice(property.price)}.`

    const imageUrl = property.images?.[0]?.asset?.url
    const canonical = `${SITE_URL}/arriendos/${PROPERTY_TYPE_PLURAL[property.propertyType]}/${slug}`

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

export default async function PropertyDetailPage({ params }: { params: Params }) {
    const { tipo, slug } = await params
    const propertyType = PLURAL_TO_TYPE[tipo] as PropertyType | undefined
    if (!propertyType) notFound()

    const property = await sanityFetch<Property>(PROPERTY_BY_SLUG, { slug })
    if (!property) notFound()

    const publishedDate = new Date(property._createdAt).toLocaleDateString('es-CO', {
        year: 'numeric', month: 'long', day: 'numeric',
    })

    return (
        <>
            <PropertySchema property={property} />
            <article className="container-site py-10 page-fade-in">
            <div className="mb-6">
                <Breadcrumbs items={[
                    { label: 'Propiedades', href: '/arriendos' },
                    { label: `${PROPERTY_TYPE_LABELS[property.propertyType]}s`, href: `/arriendos/${tipo}` },
                    { label: property.title },
                ]} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Columna principal */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Galería */}
                    <PropertyGallery images={property.images ?? []} title={property.title} />

                    {/* Título y meta */}
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge variant="primary">{PROPERTY_TYPE_LABELS[property.propertyType]}</Badge>
                            {property.featured && <Badge variant="accent">Destacada</Badge>}
                            {!property.available && <Badge variant="warning">No disponible</Badge>}
                        </div>

                        <h1 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
                            {property.title}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                            {property.neighborhoodName && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-primary-500" aria-hidden="true" />
                                    {property.neighborhoodName}, Montería
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" aria-hidden="true" />
                                Publicado el {publishedDate}
                            </span>
                        </div>
                    </div>

                    {/* Especificaciones y características */}
                    <PropertyFeatures
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        area={property.area}
                        stratum={property.stratum}
                        parking={property.parking}
                        features={property.features}
                    />

                    {/* Descripción */}
                    {property.description && property.description.length > 0 && (
                        <div>
                            <h2 className="font-display text-xl font-semibold text-neutral-900 mb-4">
                                Descripción
                            </h2>
                            <div className="prose prose-neutral max-w-none text-neutral-700">
                                <PortableText value={property.description} />
                            </div>
                        </div>
                    )}

                    {/* Mapa */}
                    {property.location && (
                        <PropertyMap location={property.location} title={property.title} />
                    )}
                </div>

                {/* Columna lateral — Contacto */}
                <div>
                    <PropertyContact
                        title={property.title}
                        price={property.price}
                        propertyType={property.propertyType}
                        slug={property.slug}
                        neighborhoodName={property.neighborhoodName}
                    />
                </div>
            </div>
        </article>
        </>
    )
}
