export default {
    name: 'siteSettings',
    title: 'Configuración del Sitio',
    type: 'document',
    // Singleton – solo debe existir 1 documento de este tipo
    __experimental_actions: ['update', 'publish'],
    fields: [
        {
            name: 'siteName',
            title: 'Nombre del sitio',
            type: 'string',
            initialValue: 'Arriendos Montería',
        },
        {
            name: 'siteDescription',
            title: 'Descripción general del sitio',
            type: 'text',
            rows: 3,
        },
        {
            name: 'phone',
            title: 'Teléfono / WhatsApp',
            type: 'string',
            description: 'Con código de país: 573001234567',
        },
        {
            name: 'email',
            title: 'Correo electrónico',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Dirección física de la oficina',
            type: 'string',
        },
        {
            name: 'whatsappMessage',
            title: 'Mensaje predeterminado de WhatsApp',
            type: 'string',
            initialValue: 'Hola, vi una propiedad en su sitio web y me interesa. ¿Podría darme más información?',
        },
        {
            name: 'socialMedia',
            title: 'Redes Sociales',
            type: 'object',
            fields: [
                { name: 'facebook', title: 'Facebook URL', type: 'url' },
                { name: 'instagram', title: 'Instagram URL', type: 'url' },
                { name: 'tiktok', title: 'TikTok URL', type: 'url' },
            ],
        },
        {
            name: 'logo',
            title: 'Logo del sitio',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'ogImage',
            title: 'Imagen Open Graph por defecto',
            type: 'image',
            description: 'Se usa cuando se comparte el sitio en redes sociales. 1200x630px recomendado.',
        },
    ],
    preview: {
        select: { title: 'siteName', media: 'logo' },
    },
}
