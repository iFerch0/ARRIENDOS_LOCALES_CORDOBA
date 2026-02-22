import type { Rule } from 'sanity'

export default {
    name: 'property',
    title: 'Propiedad',
    type: 'document',
    groups: [
        { name: 'info', title: 'Información Básica', default: true },
        { name: 'details', title: 'Detalles' },
        { name: 'location', title: 'Ubicación' },
        { name: 'media', title: 'Fotos' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        /* ── Info básica ──────────────────────────────────────── */
        {
            name: 'title',
            title: 'Título del anuncio',
            type: 'string',
            group: 'info',
            description: 'Ej: "Casa amplia de 3 habitaciones en La Castellana"',
            validation: (Rule: Rule) => Rule.required().max(120),
        },
        {
            name: 'slug',
            title: 'URL amigable',
            type: 'slug',
            group: 'info',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'propertyType',
            title: 'Tipo de inmueble',
            type: 'string',
            group: 'info',
            options: {
                list: [
                    { title: 'Casa', value: 'casa' },
                    { title: 'Apartamento', value: 'apartamento' },
                    { title: 'Local Comercial', value: 'local' },
                    { title: 'Oficina', value: 'oficina' },
                    { title: 'Bodega', value: 'bodega' },
                    { title: 'Apartaestudio', value: 'apartaestudio' },
                    { title: 'Finca', value: 'finca' },
                ],
                layout: 'radio',
            },
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'price',
            title: 'Canon de arriendo (COP/mes)',
            type: 'number',
            group: 'info',
            description: 'Solo números, sin puntos ni comas. Ej: 1500000',
            validation: (Rule: Rule) => Rule.required().positive(),
        },
        {
            name: 'featured',
            title: '¿Destacada?',
            type: 'boolean',
            group: 'info',
            description: 'Aparecerá en la sección de destacadas del inicio',
            initialValue: false,
        },
        {
            name: 'available',
            title: '¿Disponible?',
            type: 'boolean',
            group: 'info',
            description: 'Desactiva si la propiedad ya fue arrendada',
            initialValue: true,
        },

        /* ── Detalles ─────────────────────────────────────────── */
        {
            name: 'description',
            title: 'Descripción',
            type: 'array',
            group: 'details',
            of: [{ type: 'block' }],
            description: 'Descripción completa. Incluir detalles del barrio y estilo de vida.',
        },
        {
            name: 'bedrooms',
            title: 'Habitaciones',
            type: 'number',
            group: 'details',
            validation: (Rule: Rule) => Rule.min(0).max(20),
        },
        {
            name: 'bathrooms',
            title: 'Baños',
            type: 'number',
            group: 'details',
            validation: (Rule: Rule) => Rule.min(0).max(15),
        },
        {
            name: 'area',
            title: 'Área construida (m²)',
            type: 'number',
            group: 'details',
            validation: (Rule: Rule) => Rule.positive(),
        },
        {
            name: 'stratum',
            title: 'Estrato',
            type: 'number',
            group: 'details',
            options: { list: [1, 2, 3, 4, 5, 6] },
        },
        {
            name: 'parking',
            title: 'Parqueadero',
            type: 'boolean',
            group: 'details',
            initialValue: false,
        },
        {
            name: 'features',
            title: 'Características adicionales',
            type: 'array',
            group: 'details',
            of: [{ type: 'string' }],
            options: {
                list: [
                    'Aire acondicionado', 'Cocina integral', 'Zona de lavandería',
                    'Balcón', 'Patio', 'Jardín', 'Piscina', 'Vigilancia 24h',
                    'Gas natural', 'Closets', 'Amoblado', 'Permite mascotas',
                    'Cerca a transporte', 'Cerca a colegios', 'Cerca a centros comerciales',
                ],
            },
        },

        /* ── Ubicación ────────────────────────────────────────── */
        {
            name: 'neighborhood',
            title: 'Barrio',
            type: 'reference',
            group: 'location',
            to: [{ type: 'neighborhood' }],
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'address',
            title: 'Dirección (opcional)',
            type: 'string',
            group: 'location',
            description: 'No se mostrará completa al público, solo referencia interna',
        },
        {
            name: 'location',
            title: 'Ubicación en mapa',
            type: 'geopoint',
            group: 'location',
            description: 'Haz clic en el mapa para marcar la ubicación exacta',
        },
        {
            name: 'city',
            title: 'Ciudad',
            type: 'string',
            group: 'location',
            initialValue: 'Montería',
        },
        {
            name: 'department',
            title: 'Departamento',
            type: 'string',
            group: 'location',
            initialValue: 'Córdoba',
        },

        /* ── Fotos ────────────────────────────────────────────── */
        {
            name: 'images',
            title: 'Fotos del inmueble',
            type: 'array',
            group: 'media',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [{
                    name: 'alt',
                    title: 'Descripción de la foto (SEO)',
                    type: 'string',
                    description: 'Ej: "Sala amplia con ventanas grandes en La Castellana"',
                }],
            }],
            validation: (Rule: Rule) => Rule.required().min(1).max(20),
        },

        /* ── SEO ──────────────────────────────────────────────── */
        {
            name: 'seoTitle',
            title: 'Título SEO (opcional)',
            type: 'string',
            group: 'seo',
            description: 'Si se deja vacío, se genera automáticamente',
        },
        {
            name: 'seoDescription',
            title: 'Meta descripción SEO (opcional)',
            type: 'text',
            group: 'seo',
            rows: 3,
            description: 'Si se deja vacío, se genera automáticamente. Máximo 160 caracteres.',
            validation: (Rule: Rule) => Rule.max(160),
        },
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'propertyType',
            media: 'images.0',
            price: 'price',
            available: 'available',
        },
        prepare({ title, subtitle, media, price, available }: Record<string, any>) {
            const status = available ? '' : ' 🔴 No disponible'
            return {
                title: `${title}${status}`,
                subtitle: `${subtitle} — $${price?.toLocaleString('es-CO')}/mes`,
                media,
            }
        },
    },

    orderings: [
        { title: 'Más recientes', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
        { title: 'Precio ↑', name: 'priceAsc', by: [{ field: 'price', direction: 'asc' }] },
        { title: 'Precio ↓', name: 'priceDesc', by: [{ field: 'price', direction: 'desc' }] },
    ],
}
