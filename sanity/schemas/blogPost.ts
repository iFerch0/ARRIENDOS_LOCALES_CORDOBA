import type { Rule } from 'sanity'

export default {
    name: 'blogPost',
    title: 'Artículo del Blog',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Título',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'URL amigable',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'excerpt',
            title: 'Resumen corto',
            type: 'text',
            rows: 3,
            description: 'Se muestra en listados y redes sociales. Máximo 200 caracteres.',
            validation: (Rule: Rule) => Rule.max(200),
        },
        {
            name: 'coverImage',
            title: 'Imagen de portada',
            type: 'image',
            options: { hotspot: true },
            fields: [{
                name: 'alt',
                title: 'Alt text (SEO)',
                type: 'string',
            }],
        },
        {
            name: 'body',
            title: 'Contenido del artículo',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', title: 'Alt text', type: 'string' },
                        { name: 'caption', title: 'Pie de foto', type: 'string' },
                    ],
                },
            ],
        },
        {
            name: 'category',
            title: 'Categoría',
            type: 'string',
            options: {
                list: ['Guías', 'Mercado', 'Barrios', 'Consejos', 'Legal'],
                layout: 'radio',
            },
        },
        {
            name: 'tags',
            title: 'Etiquetas',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        },
        {
            name: 'publishedAt',
            title: 'Fecha de publicación',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        },
        {
            name: 'seoTitle',
            title: 'Título SEO (opcional)',
            type: 'string',
            description: 'Si se deja vacío, se usa el título del artículo',
        },
        {
            name: 'seoDescription',
            title: 'Meta descripción SEO (opcional)',
            type: 'text',
            rows: 3,
            description: 'Si se deja vacío, se usa el resumen. Máximo 160 caracteres.',
            validation: (Rule: Rule) => Rule.max(160),
        },
    ],
    preview: {
        select: { title: 'title', subtitle: 'category', media: 'coverImage' },
        prepare({ title, subtitle, media }: Record<string, any>) {
            return { title, subtitle: subtitle ? `📁 ${subtitle}` : '', media }
        },
    },
    orderings: [
        { title: 'Más recientes', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
        { title: 'Más antiguos', name: 'dateAsc', by: [{ field: 'publishedAt', direction: 'asc' }] },
    ],
}
