import type { Rule } from 'sanity'

export default {
    name: 'neighborhood',
    title: 'Barrio',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Nombre del barrio',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'URL amigable',
            type: 'slug',
            options: { source: 'name' },
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Descripción del barrio',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Texto descriptivo para la landing page del barrio (SEO)',
        },
        {
            name: 'image',
            title: 'Foto representativa',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'zone',
            title: 'Zona de la ciudad',
            type: 'string',
            options: {
                list: ['Norte', 'Sur', 'Centro', 'Este', 'Oeste'],
                layout: 'radio',
            },
        },
        {
            name: 'averagePrice',
            title: 'Precio promedio de arriendo (COP)',
            type: 'number',
            description: 'Precio promedio mensual en la zona',
        },
        {
            name: 'highlights',
            title: 'Puntos destacados',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Ej: "Cerca a centros comerciales", "Zona residencial tranquila"',
        },
        {
            name: 'location',
            title: 'Centro del barrio (mapa)',
            type: 'geopoint',
        },
        {
            name: 'seoDescription',
            title: 'Meta descripción SEO',
            type: 'text',
            rows: 3,
            validation: (Rule: Rule) => Rule.max(160),
        },
    ],
    preview: {
        select: { title: 'name', subtitle: 'zone', media: 'image' },
    },
}
