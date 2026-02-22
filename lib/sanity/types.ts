/* ============================================================
   Tipos TypeScript para los schemas de Sanity CMS
   ============================================================ */

/* ── Tipos auxiliares ──────────────────────────────────────── */

export interface SanityImageAsset {
    url: string
    metadata: {
        dimensions: { width: number; height: number; aspectRatio: number }
        lqip: string  // Low Quality Image Placeholder (base64)
    }
}

export interface SanityImage {
    asset: SanityImageAsset
    alt?: string
    hotspot?: { x: number; y: number; width: number; height: number }
    crop?: { top: number; bottom: number; left: number; right: number }
}

export interface SanitySlug {
    current: string
}

export interface GeoPoint {
    lat: number
    lng: number
    alt?: number
}

export type PortableTextBlock = {
    _key: string
    _type: 'block'
    children: Array<{ _key: string; _type: 'span'; text: string; marks?: string[] }>
    style: string
    markDefs?: unknown[]
}

/* ── Tipos de propiedad ────────────────────────────────────── */

export type PropertyType =
    | 'casa'
    | 'apartamento'
    | 'local'
    | 'oficina'
    | 'bodega'
    | 'apartaestudio'
    | 'finca'

export interface PropertyFeature {
    _key: string
    value: string
}

/** Propiedad completa (para página de detalle) */
export interface Property {
    _id: string
    _createdAt: string
    _updatedAt: string
    title: string
    slug: SanitySlug
    propertyType: PropertyType
    price: number
    featured: boolean
    available: boolean
    description?: PortableTextBlock[]
    bedrooms?: number
    bathrooms?: number
    area?: number
    stratum?: 1 | 2 | 3 | 4 | 5 | 6
    parking?: boolean
    features?: string[]
    neighborhood: { _ref: string }
    neighborhoodName?: string
    neighborhoodSlug?: string
    neighborhoodDescription?: PortableTextBlock[]
    address?: string
    location?: GeoPoint
    city: string
    department?: string
    images: SanityImage[]
    mainImage?: SanityImage
    seoTitle?: string
    seoDescription?: string
}

/** Propiedad resumida (para listados/cards) */
export interface PropertyCard {
    _id: string
    title: string
    slug: SanitySlug
    propertyType: PropertyType
    price: number
    bedrooms?: number
    bathrooms?: number
    area?: number
    stratum?: number
    parking?: boolean
    featured?: boolean
    city: string
    neighborhoodName?: string
    neighborhoodSlug?: string
    mainImage?: SanityImage
    location?: GeoPoint
}

/* ── Barrio ────────────────────────────────────────────────── */

export interface Neighborhood {
    _id: string
    name: string
    slug: SanitySlug
    description?: PortableTextBlock[]
    image?: SanityImage
    zone?: 'Norte' | 'Sur' | 'Centro' | 'Este' | 'Oeste'
    averagePrice?: number
    highlights?: string[]
    location?: GeoPoint
    seoDescription?: string
    propertyCount?: number
    properties?: PropertyCard[]
}

/* ── Blog ──────────────────────────────────────────────────── */

export type BlogCategory = 'Guías' | 'Mercado' | 'Barrios' | 'Consejos' | 'Legal'

export interface BlogPost {
    _id: string
    title: string
    slug: SanitySlug
    excerpt?: string
    coverImage?: SanityImage
    body?: PortableTextBlock[]
    category?: BlogCategory
    tags?: string[]
    publishedAt?: string
    seoTitle?: string
    seoDescription?: string
}

/* ── Configuración del sitio ───────────────────────────────── */

export interface SiteSettings {
    siteName: string
    siteDescription?: string
    phone?: string
    email?: string
    address?: string
    whatsappMessage?: string
    socialMedia?: {
        facebook?: string
        instagram?: string
        tiktok?: string
    }
    logo?: SanityImage
    ogImage?: SanityImage
}

/* ── Mapa interactivo ──────────────────────────────────────── */

/** Propiedad para el mapa (solo campos necesarios para marcadores) */
export interface MapProperty {
    _id: string
    title: string
    slug: SanitySlug
    price: number
    propertyType: PropertyType
    location: GeoPoint
    mainImage?: SanityImage
}

/* ── Tipos de filtros ──────────────────────────────────────── */

export interface PropertyFilters {
    tipo?: PropertyType
    barrio?: string
    precioMin?: number
    precioMax?: number
    habitaciones?: number
}
