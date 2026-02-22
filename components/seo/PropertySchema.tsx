import JsonLd from './JsonLd'
import { SITE_URL, PROPERTY_TYPE_PLURAL } from '@/lib/utils/constants'
import type { Property } from '@/lib/sanity/types'

interface PropertySchemaProps {
    property: Property
}

/** JSON-LD RealEstateListing para páginas de detalle de propiedad. */
export default function PropertySchema({ property }: PropertySchemaProps) {
    const url = `${SITE_URL}/arriendos/${PROPERTY_TYPE_PLURAL[property.propertyType]}/${property.slug.current}`

    const data: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: property.title,
        description: property.seoDescription ?? property.title,
        url,
        datePosted: property._createdAt,
        image: property.images?.map((img) => img.asset.url),
        offers: {
            '@type': 'Offer',
            price: property.price,
            priceCurrency: 'COP',
            availability: property.available
                ? 'https://schema.org/InStock'
                : 'https://schema.org/SoldOut',
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: property.city ?? 'Montería',
            addressRegion: property.department ?? 'Córdoba',
            addressCountry: 'CO',
            ...(property.neighborhoodName ? { neighborhood: property.neighborhoodName } : {}),
        },
    }

    if (property.location) {
        data.geo = {
            '@type': 'GeoCoordinates',
            latitude: property.location.lat,
            longitude: property.location.lng,
        }
    }
    if (property.bedrooms != null) data.numberOfRooms = property.bedrooms
    if (property.bathrooms != null) data.numberOfBathroomsTotal = property.bathrooms
    if (property.area != null) {
        data.floorSize = {
            '@type': 'QuantitativeValue',
            value: property.area,
            unitCode: 'MTK',
        }
    }

    return <JsonLd data={data} />
}
