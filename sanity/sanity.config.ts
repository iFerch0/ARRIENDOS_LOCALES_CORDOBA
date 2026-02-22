import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Soporta tanto Next.js (NEXT_PUBLIC_*) como npx sanity dev (sin prefijo)
const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
    process.env.SANITY_PROJECT_ID ??
    ''
const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    process.env.SANITY_DATASET ??
    'production'

export default defineConfig({
    name: 'arriendos-monteria',
    title: 'Arriendos Montería — Panel de Administración',

    projectId,
    dataset,

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Panel de Administración')
                    .items([
                        // Singleton de configuración
                        S.listItem()
                            .title('⚙️ Configuración del Sitio')
                            .child(
                                S.document()
                                    .schemaType('siteSettings')
                                    .documentId('siteSettings')
                            ),

                        S.divider(),

                        // Propiedades
                        S.listItem()
                            .title('🏠 Propiedades')
                            .schemaType('property')
                            .child(
                                S.documentTypeList('property')
                                    .title('Todas las propiedades')
                                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                            ),

                        // Barrios
                        S.listItem()
                            .title('📍 Barrios')
                            .schemaType('neighborhood')
                            .child(S.documentTypeList('neighborhood').title('Barrios')),

                        S.divider(),

                        // Blog
                        S.listItem()
                            .title('✍️ Blog')
                            .schemaType('blogPost')
                            .child(
                                S.documentTypeList('blogPost')
                                    .title('Artículos del Blog')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                            ),

                        // Autores
                        S.listItem()
                            .title('👤 Autores')
                            .schemaType('author')
                            .child(S.documentTypeList('author').title('Autores')),
                    ]),
        }),
        visionTool({ defaultApiVersion: '2024-01-01' }),
    ],

    schema: { types: schemaTypes },
})
