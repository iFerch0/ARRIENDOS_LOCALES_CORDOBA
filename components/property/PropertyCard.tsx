import Image from 'next/image'
import Link from 'next/link'
import { BedDouble, Bath, Maximize2, MapPin, Car } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import FavoriteButton from '@/components/property/FavoriteButton'
import { formatPrice } from '@/lib/utils/formatPrice'
import { PROPERTY_TYPE_LABELS, PROPERTY_TYPE_PLURAL } from '@/lib/utils/constants'
import type { PropertyCard as PropertyCardType } from '@/lib/sanity/types'

interface PropertyCardProps {
    property: PropertyCardType
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const { title, slug, propertyType, price, bedrooms, bathrooms, area, neighborhoodName, mainImage, parking, featured } = property
    const href = `/arriendos/${PROPERTY_TYPE_PLURAL[propertyType]}/${slug.current}`

    return (
        <article className="card-base overflow-hidden group">
            {/* Imagen */}
            <div className="relative h-52 overflow-hidden">
                {mainImage?.asset?.url ? (
                    <Image
                        src={mainImage.asset.url}
                        alt={mainImage.alt ?? title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        placeholder={mainImage.asset.metadata?.lqip ? 'blur' : 'empty'}
                        blurDataURL={mainImage.asset.metadata?.lqip}
                    />
                ) : (
                    <div className="h-full bg-neutral-100 flex items-center justify-center">
                        <span className="text-5xl" aria-hidden="true">🏠</span>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex gap-1.5 flex-wrap">
                    <Badge variant="primary">{PROPERTY_TYPE_LABELS[propertyType]}</Badge>
                    {featured && <Badge variant="accent">Destacada</Badge>}
                </div>

                {/* Botón favorito */}
                <div className="absolute top-2 right-2 z-10">
                    <FavoriteButton propertyId={property._id} />
                </div>

                {/* Precio */}
                <div className="absolute bottom-3 left-3 z-10">
                    <span className="price-badge">{formatPrice(price)}</span>
                </div>

                {/* Overlay degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
            </div>

            {/* Contenido */}
            <div className="p-4">
                {neighborhoodName && (
                    <div className="flex items-center gap-1 mb-1.5">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary-500" aria-hidden="true" />
                        <span className="text-xs text-neutral-500 truncate">{neighborhoodName}, Montería</span>
                    </div>
                )}

                <h3 className="font-semibold text-neutral-900 leading-snug line-clamp-2 mb-3 min-h-[2.75rem]">
                    {title}
                </h3>

                {/* Specs */}
                <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4 flex-wrap">
                    {bedrooms != null && (
                        <span className="flex items-center gap-1">
                            <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
                            {bedrooms} hab.
                        </span>
                    )}
                    {bathrooms != null && (
                        <span className="flex items-center gap-1">
                            <Bath className="h-3.5 w-3.5" aria-hidden="true" />
                            {bathrooms} baños
                        </span>
                    )}
                    {area != null && (
                        <span className="flex items-center gap-1">
                            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                            {area} m²
                        </span>
                    )}
                    {parking && (
                        <span className="flex items-center gap-1">
                            <Car className="h-3.5 w-3.5" aria-hidden="true" />
                            Parq.
                        </span>
                    )}
                </div>

                <Link
                    href={href}
                    className="block w-full rounded-lg bg-primary-50 py-2.5 text-center text-sm font-semibold text-primary-700 hover:bg-primary-500 hover:text-white transition-colors"
                    aria-label={`Ver detalle de ${title}`}
                >
                    Ver propiedad →
                </Link>
            </div>
        </article>
    )
}
