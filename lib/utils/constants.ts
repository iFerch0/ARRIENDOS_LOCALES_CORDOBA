import type { PropertyType } from '@/lib/sanity/types'

/* ── Sitio ────────────────────────────────────────────────── */
export const SITE_NAME = 'Arriendos Montería'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tudominio.com.co'
export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '573000000000'
export const WHATSAPP_DEFAULT_MESSAGE =
    'Hola, vi una propiedad en su sitio web y me interesa. ¿Podría darme más información?'

/* ── Paginación ───────────────────────────────────────────── */
export const PROPERTIES_PER_PAGE = 12

/* ── Etiquetas de tipos de propiedad ─────────────────────── */
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
    casa: 'Casa',
    apartamento: 'Apartamento',
    local: 'Local Comercial',
    oficina: 'Oficina',
    bodega: 'Bodega',
    apartaestudio: 'Apartaestudio',
    finca: 'Finca',
}

/** Plural para URLs: casa → casas, local → locales */
export const PROPERTY_TYPE_PLURAL: Record<PropertyType, string> = {
    casa: 'casas',
    apartamento: 'apartamentos',
    local: 'locales',
    oficina: 'oficinas',
    bodega: 'bodegas',
    apartaestudio: 'apartaestudios',
    finca: 'fincas',
}

/* ── Rangos de precio para filtros (COP) ─────────────────── */
export const PRICE_RANGES = [
    { label: 'Hasta $800K', min: 0, max: 800_000 },
    { label: '$800K – $1.5M', min: 800_000, max: 1_500_000 },
    { label: '$1.5M – $2.5M', min: 1_500_000, max: 2_500_000 },
    { label: '$2.5M – $4M', min: 2_500_000, max: 4_000_000 },
    { label: 'Más de $4M', min: 4_000_000, max: Infinity },
]

/* ── Zonas de la ciudad ───────────────────────────────────── */
export const CITY_ZONES = ['Norte', 'Sur', 'Centro', 'Este', 'Oeste'] as const

/* ── Características de propiedades ──────────────────────── */
export const PROPERTY_FEATURES = [
    'Aire acondicionado',
    'Cocina integral',
    'Zona de lavandería',
    'Balcón',
    'Patio',
    'Jardín',
    'Piscina',
    'Vigilancia 24h',
    'Gas natural',
    'Closets',
    'Amoblado',
    'Permite mascotas',
    'Cerca a transporte',
    'Cerca a colegios',
    'Cerca a centros comerciales',
] as const

/* ── Redes sociales ───────────────────────────────────────── */
export const SOCIAL_LINKS = {
    facebook: '',
    instagram: '',
    tiktok: '',
}
