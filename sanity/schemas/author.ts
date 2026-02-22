export default {
    name: 'author',
    title: 'Autor',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'URL',
            type: 'slug',
            options: { source: 'name' },
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: 'bio',
            title: 'Biografía',
            type: 'text',
            rows: 4,
        },
        {
            name: 'avatar',
            title: 'Foto',
            type: 'image',
            options: { hotspot: true },
        },
    ],
    preview: {
        select: { title: 'name', media: 'avatar' },
    },
}
