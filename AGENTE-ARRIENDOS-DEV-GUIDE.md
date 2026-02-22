# 🏠 Plataforma Web de Arriendos — Guía de Desarrollo para Agente IA

> **Proyecto:** Plataforma de publicación de arriendos de casas y locales comerciales
> **Ubicación objetivo:** Montería, Córdoba, Colombia (expandible)
> **Stack:** Next.js 15 · TypeScript · Tailwind CSS 4 · Sanity CMS · Vercel
> **Metodología:** Sprints de 2 semanas con entregables funcionales

---

## 📌 Contexto del Proyecto

La clienta necesita un sitio web donde pueda **publicar y gestionar arriendos de casas y locales comerciales** en Montería y zonas aledañas. Ella **no sabe programar**, así que necesita un panel de administración visual (CMS) donde pueda crear, editar y eliminar propiedades sin tocar código.

El sitio debe:

- Ser extremadamente rápido (< 1.5s de carga)
- Posicionarse en los primeros resultados de Google para búsquedas como "casas en arriendo Montería"
- Tener un diseño original, moderno y profesional
- Ser 100% responsive (mobile-first)
- Permitir contacto directo por WhatsApp

---

## 🧱 Arquitectura General

```
┌─────────────────┐     webhook      ┌──────────────┐
│  Sanity Studio   │ ──────────────► │    Vercel     │
│  (CMS - Panel)   │                 │  (Next.js)   │
│  La clienta edita│                 │  Regenera ISR │
└─────────────────┘                  └──────┬───────┘
                                            │
                                     ┌──────▼───────┐
                                     │   CDN Global  │
                                     │  HTML estático│
                                     │  (ultra rápido)│
                                     └──────┬───────┘
                                            │
                                     ┌──────▼───────┐
                                     │   Visitante   │
                                     │  Ve el sitio  │
                                     └───────────────┘
```

**Flujo de datos:**

1. La clienta entra a Sanity Studio desde cualquier navegador
2. Crea/edita una propiedad: sube fotos, escribe descripción, selecciona barrio, precio, etc.
3. Al publicar, Sanity envía un webhook a Vercel
4. Vercel regenera SOLO la página afectada (ISR - Incremental Static Regeneration)
5. El visitante ve HTML estático servido desde el CDN más cercano

---

## 📁 Estructura del Proyecto

```
arriendos-monteria/
├── src/
│   ├── app/                          # App Router (Next.js 15)
│   │   ├── layout.tsx                # Layout raíz con metadata global
│   │   ├── page.tsx                  # Home page
│   │   ├── arriendos/
│   │   │   ├── page.tsx              # Catálogo general
│   │   │   ├── casas/
│   │   │   │   ├── page.tsx          # Catálogo casas
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Detalle casa
│   │   │   ├── locales/
│   │   │   │   ├── page.tsx          # Catálogo locales
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Detalle local
│   │   │   └── barrio/
│   │   │       └── [nombre]/
│   │   │           └── page.tsx      # Landing SEO por barrio
│   │   ├── blog/
│   │   │   ├── page.tsx              # Listado blog
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Artículo individual
│   │   ├── nosotros/
│   │   │   └── page.tsx              # Sobre nosotros (E-E-A-T)
│   │   ├── contacto/
│   │   │   └── page.tsx              # Contacto + mapa + formulario
│   │   ├── favoritos/
│   │   │   └── page.tsx              # Propiedades guardadas (localStorage)
│   │   ├── mapa/
│   │   │   └── page.tsx              # Vista mapa interactivo
│   │   ├── sitemap.ts                # Sitemap dinámico
│   │   └── robots.ts                 # Robots.txt
│   │
│   ├── components/
│   │   ├── ui/                       # Componentes base reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Modal.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Navbar responsive
│   │   │   ├── Footer.tsx            # Footer con datos contacto + NAP
│   │   │   ├── MobileMenu.tsx        # Menú hamburguesa
│   │   │   └── WhatsAppFloat.tsx     # Botón flotante WhatsApp
│   │   ├── property/
│   │   │   ├── PropertyCard.tsx      # Tarjeta de propiedad
│   │   │   ├── PropertyGrid.tsx      # Grid de tarjetas con paginación
│   │   │   ├── PropertyGallery.tsx   # Galería de fotos con lightbox
│   │   │   ├── PropertyFeatures.tsx  # Lista de características
│   │   │   ├── PropertyMap.tsx       # Mapa individual (Leaflet)
│   │   │   ├── PropertyContact.tsx   # Sección contacto en detalle
│   │   │   ├── PropertySchema.tsx    # JSON-LD schema markup
│   │   │   └── FavoriteButton.tsx    # Botón corazón favoritos
│   │   ├── search/
│   │   │   ├── SearchBar.tsx         # Buscador del hero
│   │   │   ├── Filters.tsx           # Filtros laterales/superiores
│   │   │   └── ActiveFilters.tsx     # Tags de filtros activos
│   │   ├── home/
│   │   │   ├── Hero.tsx              # Hero section con buscador
│   │   │   ├── FeaturedProperties.tsx# Propiedades destacadas
│   │   │   ├── NeighborhoodGrid.tsx  # Grid de barrios populares
│   │   │   ├── Stats.tsx             # Números del sitio
│   │   │   └── CTASection.tsx        # Call to action final
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx          # Tarjeta de artículo
│   │   │   └── TableOfContents.tsx   # Tabla de contenidos artículo
│   │   ├── map/
│   │   │   ├── InteractiveMap.tsx    # Mapa general (Leaflet)
│   │   │   └── MapMarker.tsx         # Marker personalizado
│   │   └── seo/
│   │       ├── JsonLd.tsx            # Componente genérico JSON-LD
│   │       └── Breadcrumbs.tsx       # Migas de pan
│   │
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts             # Cliente Sanity configurado
│   │   │   ├── queries.ts            # Todas las queries GROQ
│   │   │   ├── image.ts              # Helper para URLs de imágenes
│   │   │   └── types.ts              # Tipos TypeScript de Sanity
│   │   ├── utils/
│   │   │   ├── formatPrice.ts        # Formato COP: $1.500.000
│   │   │   ├── slugify.ts            # Generar slugs
│   │   │   ├── cn.ts                 # Utility clsx + twMerge
│   │   │   └── constants.ts          # Constantes globales
│   │   └── hooks/
│   │       ├── useFavorites.ts       # Hook localStorage favoritos
│   │       ├── useFilters.ts         # Hook gestión de filtros URL
│   │       └── useMediaQuery.ts      # Hook responsive
│   │
│   └── styles/
│       └── globals.css               # Tailwind directives + custom
│
├── sanity/                           # Sanity Studio (embebido)
│   ├── schemas/
│   │   ├── property.ts               # Schema: Propiedad
│   │   ├── neighborhood.ts           # Schema: Barrio
│   │   ├── blogPost.ts               # Schema: Artículo de blog
│   │   ├── author.ts                 # Schema: Autor
│   │   ├── siteSettings.ts           # Schema: Config global del sitio
│   │   └── index.ts                  # Export de todos los schemas
│   ├── lib/
│   │   └── desk.ts                   # Estructura del panel admin
│   └── sanity.config.ts              # Configuración Sanity Studio
│
├── public/
│   ├── icons/                        # Favicons y PWA icons
│   └── og-default.jpg                # Open Graph image por defecto
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local                        # Variables de entorno
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```typescript
// tailwind.config.ts — extender el theme con estos colores
const colors = {
  primary: {
    50:  '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#2563EB',  // Principal — Azul confianza
    600: '#1D4ED8',
    700: '#1E40AF',
    800: '#1E3A8A',
    900: '#172554',
  },
  accent: {
    50:  '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#16A34A',  // Acento — Verde Montería/naturaleza
    600: '#15803D',
    700: '#166534',
  },
  neutral: {
    50:  '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  whatsapp: '#25D366',
}
```

### Tipografía

```typescript
// layout.tsx — Google Fonts
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

// Uso:
// font-inter  → Textos, párrafos, botones, UI general
// font-playfair → Títulos principales (h1, h2), nombres de sección para dar elegancia
```

### Breakpoints (Mobile First)

```
sm:  640px   → Teléfonos grandes
md:  768px   → Tablets
lg:  1024px  → Laptops
xl:  1280px  → Desktop
2xl: 1536px  → Desktop grande
```

### Espaciado y Componentes

```
Bordes redondeados: rounded-xl (12px) para cards, rounded-lg (8px) para botones
Sombras: shadow-sm por defecto, shadow-md en hover, shadow-lg para modales
Transiciones: transition-all duration-200 para hovers
Padding cards: p-4 mobile, p-6 desktop
Gap grids: gap-4 mobile, gap-6 desktop
```

---

## 🗂️ Schemas de Sanity (CMS)

### Schema: Propiedad (`property.ts`)

```typescript
export default {
  name: 'property',
  title: 'Propiedad',
  type: 'document',
  groups: [
    { name: 'info', title: 'Información Básica' },
    { name: 'details', title: 'Detalles' },
    { name: 'location', title: 'Ubicación' },
    { name: 'media', title: 'Fotos' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // --- INFO BÁSICA ---
    {
      name: 'title',
      title: 'Título del anuncio',
      type: 'string',
      group: 'info',
      description: 'Ej: "Casa amplia de 3 habitaciones en La Castellana"',
      validation: (Rule) => Rule.required().max(120),
    },
    {
      name: 'slug',
      title: 'URL amigable',
      type: 'slug',
      group: 'info',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
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
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Canon de arriendo (COP/mes)',
      type: 'number',
      group: 'info',
      description: 'Solo números, sin puntos ni comas. Ej: 1500000',
      validation: (Rule) => Rule.required().positive(),
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
      initialValue: true,
    },

    // --- DETALLES ---
    {
      name: 'description',
      title: 'Descripción',
      type: 'array',
      group: 'details',
      of: [{ type: 'block' }],
      description: 'Descripción completa del inmueble. Incluir detalles del barrio y estilo de vida.',
    },
    {
      name: 'bedrooms',
      title: 'Habitaciones',
      type: 'number',
      group: 'details',
      validation: (Rule) => Rule.min(0).max(20),
    },
    {
      name: 'bathrooms',
      title: 'Baños',
      type: 'number',
      group: 'details',
      validation: (Rule) => Rule.min(0).max(15),
    },
    {
      name: 'area',
      title: 'Área construida (m²)',
      type: 'number',
      group: 'details',
      validation: (Rule) => Rule.positive(),
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

    // --- UBICACIÓN ---
    {
      name: 'neighborhood',
      title: 'Barrio',
      type: 'reference',
      group: 'location',
      to: [{ type: 'neighborhood' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Dirección (opcional)',
      type: 'string',
      group: 'location',
      description: 'No se mostrará completa al público, solo referencia',
    },
    {
      name: 'location',
      title: 'Ubicación en mapa',
      type: 'geopoint',
      group: 'location',
      description: 'Haz clic en el mapa para marcar la ubicación',
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

    // --- FOTOS ---
    {
      name: 'images',
      title: 'Fotos del inmueble',
      type: 'array',
      group: 'media',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            title: 'Descripción de la foto (SEO)',
            type: 'string',
            description: 'Ej: "Sala amplia con ventanas grandes en casa de La Castellana"',
          },
        ],
      }],
      validation: (Rule) => Rule.required().min(1).max(20),
    },

    // --- SEO ---
    {
      name: 'seoTitle',
      title: 'Título SEO (opcional)',
      type: 'string',
      group: 'seo',
      description: 'Si se deja vacío, se genera automáticamente desde el título',
    },
    {
      name: 'seoDescription',
      title: 'Meta descripción SEO (opcional)',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Si se deja vacío, se genera automáticamente. Máximo 160 caracteres.',
      validation: (Rule) => Rule.max(160),
    },
  ],

  preview: {
    select: { title: 'title', subtitle: 'propertyType', media: 'images.0', price: 'price' },
    prepare({ title, subtitle, media, price }) {
      return {
        title,
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
```

### Schema: Barrio (`neighborhood.ts`)

```typescript
export default {
  name: 'neighborhood',
  title: 'Barrio',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nombre del barrio', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'URL', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() },
    { name: 'description', title: 'Descripción del barrio', type: 'array', of: [{ type: 'block' }] },
    { name: 'image', title: 'Foto representativa', type: 'image', options: { hotspot: true } },
    { name: 'zone', title: 'Zona de la ciudad', type: 'string',
      options: { list: ['Norte', 'Sur', 'Centro', 'Este', 'Oeste'] } },
    { name: 'averagePrice', title: 'Precio promedio arriendo (COP)', type: 'number' },
    { name: 'highlights', title: 'Puntos destacados', type: 'array', of: [{ type: 'string' }],
      description: 'Ej: "Cerca a centros comerciales", "Zona residencial tranquila"' },
    { name: 'location', title: 'Centro del barrio (mapa)', type: 'geopoint' },
    { name: 'seoDescription', title: 'Meta descripción SEO', type: 'text', rows: 3 },
  ],
  preview: { select: { title: 'name', subtitle: 'zone', media: 'image' } },
}
```

### Schema: Artículo de Blog (`blogPost.ts`)

```typescript
export default {
  name: 'blogPost',
  title: 'Artículo del Blog',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'URL', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() },
    { name: 'excerpt', title: 'Resumen corto', type: 'text', rows: 3, validation: (Rule) => Rule.max(200) },
    { name: 'coverImage', title: 'Imagen de portada', type: 'image', options: { hotspot: true } },
    { name: 'body', title: 'Contenido', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [
          { name: 'alt', title: 'Alt text', type: 'string' },
          { name: 'caption', title: 'Pie de foto', type: 'string' },
        ]},
      ],
    },
    { name: 'category', title: 'Categoría', type: 'string',
      options: { list: ['Guías', 'Mercado', 'Barrios', 'Consejos', 'Legal'] } },
    { name: 'tags', title: 'Etiquetas', type: 'array', of: [{ type: 'string' }] },
    { name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime' },
    { name: 'seoTitle', title: 'Título SEO', type: 'string' },
    { name: 'seoDescription', title: 'Meta descripción', type: 'text', rows: 3 },
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'coverImage' } },
  orderings: [
    { title: 'Más recientes', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
}
```

### Schema: Configuración del Sitio (`siteSettings.ts`)

```typescript
export default {
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    { name: 'siteName', title: 'Nombre del sitio', type: 'string' },
    { name: 'siteDescription', title: 'Descripción general', type: 'text' },
    { name: 'phone', title: 'Teléfono / WhatsApp', type: 'string' },
    { name: 'email', title: 'Correo electrónico', type: 'string' },
    { name: 'address', title: 'Dirección física', type: 'string' },
    { name: 'whatsappMessage', title: 'Mensaje predeterminado WhatsApp', type: 'string',
      description: 'Ej: "Hola, vi una propiedad en su sitio web y me interesa..."' },
    { name: 'socialMedia', title: 'Redes Sociales', type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'tiktok', title: 'TikTok URL', type: 'url' },
      ],
    },
    { name: 'logo', title: 'Logo', type: 'image' },
    { name: 'ogImage', title: 'Imagen Open Graph por defecto', type: 'image' },
  ],
}
```

---

## 🔍 Queries GROQ (Sanity)

```typescript
// lib/sanity/queries.ts

// Todas las propiedades disponibles (catálogo)
export const ALL_PROPERTIES = `*[_type == "property" && available == true] | order(_createdAt desc) {
  _id, title, slug, propertyType, price, bedrooms, bathrooms, area,
  stratum, parking, featured, city,
  "neighborhoodName": neighborhood->name,
  "neighborhoodSlug": neighborhood->slug.current,
  "mainImage": images[0]{ asset->{ url, metadata { dimensions, lqip } }, alt },
  location
}`

// Propiedad individual por slug
export const PROPERTY_BY_SLUG = `*[_type == "property" && slug.current == $slug][0] {
  ...,
  "neighborhoodName": neighborhood->name,
  "neighborhoodSlug": neighborhood->slug.current,
  "neighborhoodDescription": neighborhood->description,
  images[]{ asset->{ url, metadata { dimensions, lqip } }, alt }
}`

// Propiedades destacadas (home)
export const FEATURED_PROPERTIES = `*[_type == "property" && featured == true && available == true] | order(_createdAt desc) [0...6] {
  _id, title, slug, propertyType, price, bedrooms, bathrooms, area,
  "neighborhoodName": neighborhood->name,
  "mainImage": images[0]{ asset->{ url, metadata { dimensions, lqip } }, alt }
}`

// Propiedades por barrio
export const PROPERTIES_BY_NEIGHBORHOOD = `*[_type == "property" && available == true && neighborhood->slug.current == $neighborhoodSlug] | order(_createdAt desc) {
  _id, title, slug, propertyType, price, bedrooms, bathrooms, area,
  "neighborhoodName": neighborhood->name,
  "mainImage": images[0]{ asset->{ url, metadata { dimensions, lqip } }, alt }
}`

// Propiedades por tipo
export const PROPERTIES_BY_TYPE = `*[_type == "property" && available == true && propertyType == $type] | order(_createdAt desc) {
  _id, title, slug, propertyType, price, bedrooms, bathrooms, area,
  "neighborhoodName": neighborhood->name,
  "mainImage": images[0]{ asset->{ url, metadata { dimensions, lqip } }, alt }
}`

// Todos los barrios
export const ALL_NEIGHBORHOODS = `*[_type == "neighborhood"] | order(name asc) {
  _id, name, slug, zone, averagePrice, image, location, highlights,
  "propertyCount": count(*[_type == "property" && references(^._id) && available == true])
}`

// Barrio individual
export const NEIGHBORHOOD_BY_SLUG = `*[_type == "neighborhood" && slug.current == $slug][0] {
  ...,
  "properties": *[_type == "property" && references(^._id) && available == true] | order(_createdAt desc) {
    _id, title, slug, propertyType, price, bedrooms, bathrooms, area,
    "mainImage": images[0]{ asset->{ url, metadata { dimensions, lqip } }, alt }
  }
}`

// Blog posts
export const ALL_BLOG_POSTS = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, slug, excerpt, category, tags, publishedAt,
  coverImage{ asset->{ url, metadata { dimensions, lqip } } }
}`

// Blog post individual
export const BLOG_POST_BY_SLUG = `*[_type == "blogPost" && slug.current == $slug][0] { ... }`

// Config del sitio (singleton)
export const SITE_SETTINGS = `*[_type == "siteSettings"][0] { ... }`

// Para sitemap dinámico: todos los slugs
export const ALL_SLUGS = `{
  "properties": *[_type == "property"]{ "slug": slug.current, _updatedAt, propertyType },
  "neighborhoods": *[_type == "neighborhood"]{ "slug": slug.current, _updatedAt },
  "blogPosts": *[_type == "blogPost"]{ "slug": slug.current, _updatedAt }
}`
```

---

## 🔧 SEO — Implementación Técnica

### Metadata Dinámica (cada página)

```typescript
// Ejemplo: app/arriendos/casas/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug)
  const title = property.seoTitle ||
    `${property.title} | Arriendo en ${property.neighborhoodName}, Montería`
  const description = property.seoDescription ||
    `${property.propertyType} en arriendo en ${property.neighborhoodName}, Montería. ` +
    `${property.bedrooms} habitaciones, ${property.bathrooms} baños, ${property.area}m². ` +
    `Canon: $${property.price.toLocaleString('es-CO')}/mes`

  return {
    title,
    description,
    openGraph: {
      title, description,
      images: [property.mainImage?.asset.url],
      type: 'website',
      locale: 'es_CO',
    },
    twitter: { card: 'summary_large_image' },
    alternates: {
      canonical: `https://tudominio.com.co/arriendos/${property.propertyType}s/${property.slug.current}`
    },
  }
}
```

### Schema Markup JSON-LD

```typescript
// components/seo/PropertySchema.tsx
export function PropertySchema({ property }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.seoDescription || property.title,
    url: `https://tudominio.com.co/arriendos/${property.propertyType}s/${property.slug.current}`,
    datePosted: property._createdAt,
    image: property.images?.map(img => img.asset.url),
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
      addressLocality: property.city || 'Montería',
      addressRegion: property.department || 'Córdoba',
      addressCountry: 'CO',
      neighborhood: property.neighborhoodName,
    },
    geo: property.location ? {
      '@type': 'GeoCoordinates',
      latitude: property.location.lat,
      longitude: property.location.lng,
    } : undefined,
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: property.area ? {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitCode: 'MTK',
    } : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

### Sitemap Dinámico

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { ALL_SLUGS } from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://tudominio.com.co'
  const data = await client.fetch(ALL_SLUGS)

  const properties = data.properties.map((p) => ({
    url: `${BASE}/arriendos/${p.propertyType}s/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const neighborhoods = data.neighborhoods.map((n) => ({
    url: `${BASE}/arriendos/barrio/${n.slug}`,
    lastModified: new Date(n._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const blogPosts = data.blogPosts.map((b) => ({
    url: `${BASE}/blog/${b.slug}`,
    lastModified: new Date(b._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/arriendos/casas`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/arriendos/locales`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/contacto`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/nosotros`, changeFrequency: 'monthly', priority: 0.4 },
    ...properties,
    ...neighborhoods,
    ...blogPosts,
  ]
}
```

### robots.ts

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio/', '/api/'] },
    sitemap: 'https://tudominio.com.co/sitemap.xml',
  }
}
```

---

## 💬 WhatsApp Integración

```typescript
// components/layout/WhatsAppFloat.tsx
'use client'

const PHONE = '57XXXXXXXXXX' // Número de la clienta con código de país

export function WhatsAppFloat() {
  const message = encodeURIComponent(
    'Hola, vi una propiedad en su sitio web y me interesa. ¿Podría darme más información?'
  )
  const url = `https://wa.me/${PHONE}?text=${message}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center
                 rounded-full bg-whatsapp shadow-lg transition-transform hover:scale-110
                 md:h-16 md:w-16"
    >
      {/* Icono WhatsApp SVG aquí */}
    </a>
  )
}

// En detalle de propiedad: mensaje prellenado con datos específicos
export function PropertyWhatsApp({ property }) {
  const message = encodeURIComponent(
    `Hola, me interesa la propiedad "${property.title}" ` +
    `en ${property.neighborhoodName} por $${property.price.toLocaleString('es-CO')}/mes. ` +
    `¿Está disponible? Enlace: https://tudominio.com.co/arriendos/${property.propertyType}s/${property.slug.current}`
  )
  const url = `https://wa.me/${PHONE}?text=${message}`
  // ... renderizar botón
}
```

---

## 📦 Dependencias del Proyecto

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-sanity": "^9.0.0",
    "@sanity/image-url": "^1.0.0",
    "@sanity/vision": "^3.0.0",
    "@portabletext/react": "^3.0.0",
    "sanity": "^3.0.0",
    "leaflet": "^1.9.0",
    "react-leaflet": "^4.2.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/react": "^19.0.0",
    "@types/node": "^22.0.0",
    "@types/leaflet": "^1.9.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/typography": "^0.5.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

---

## 🌱 Variables de Entorno

```env
# .env.local

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu_token_de_lectura

# Sitio
NEXT_PUBLIC_SITE_URL=https://tudominio.com.co
NEXT_PUBLIC_WHATSAPP_PHONE=57XXXXXXXXXX

# Revalidación ISR
SANITY_REVALIDATE_SECRET=un_secreto_aleatorio_largo

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev                  # Next.js en localhost:3000
npx sanity dev               # Sanity Studio en localhost:3333

# Build y preview
npm run build
npm run start

# Lint
npm run lint

# Desplegar (automático en Vercel al hacer push a main)
git push origin main
```

---

## 📋 Orden de Ejecución por Sprints

> **Nota:** Cada sprint está dividido en **🔧 Backend** (Sanity CMS, schemas, queries, configuraciones del servidor, API routes, ISR) y **🎨 Frontend** (componentes visuales, páginas, diseño, interactividad del cliente). Esto permite trabajar cada área de forma independiente o en paralelo.

---

### 🟢 Sprint 1 (Semanas 1-2): Infraestructura + Diseño Base

**🔧 BACKEND (Sanity CMS + Configuración del servidor)**

1. **Inicializar proyecto Next.js 15** con TypeScript y Tailwind CSS 4 (`npx create-next-app@latest`)
2. **Configurar Sanity Studio embebido** dentro del proyecto Next.js
3. **Crear todos los schemas de Sanity:** `property.ts`, `neighborhood.ts`, `blogPost.ts`, `author.ts`, `siteSettings.ts`
4. **Configurar el cliente de Sanity** (`lib/sanity/client.ts`) con las variables de entorno
5. **Crear el archivo de tipos TypeScript** (`lib/sanity/types.ts`) con las interfaces de cada schema
6. **Configurar variables de entorno** (`.env.local`) con los IDs de Sanity, URL del sitio, etc.
7. **Deploy inicial en Vercel** + configurar dominio personalizado

**🎨 FRONTEND (Componentes visuales + Diseño)**

1. **Crear sistema de diseño en Tailwind:** paleta de colores, tipografía (Inter + Playfair Display), breakpoints
2. **Crear componentes UI base:** `Button.tsx`, `Card.tsx`, `Input.tsx`, `Select.tsx`, `Badge.tsx`, `Skeleton.tsx`, `Modal.tsx`
3. **Maquetar `layout.tsx`** con metadata global, fuentes de Google, y estructura HTML semántica (`<main>`, `<nav>`, `<footer>`)
4. **Crear `Header.tsx`** con navbar responsive y `MobileMenu.tsx` (menú hamburguesa)
5. **Crear `Footer.tsx`** con datos de contacto, NAP (Name, Address, Phone) para SEO local
6. **Crear Home page (`page.tsx`)** con `Hero.tsx` incluyendo buscador visual (sin funcionalidad aún, solo maquetación)

---

### 🟢 Sprint 2 (Semanas 3-4): Catálogo + Detalle

**🔧 BACKEND (Queries + Datos + ISR)**

1. **Crear queries GROQ** en `lib/sanity/queries.ts`: `ALL_PROPERTIES`, `PROPERTY_BY_SLUG`, `FEATURED_PROPERTIES`, `PROPERTIES_BY_TYPE`
2. **Crear helper de imágenes** (`lib/sanity/image.ts`) para generar URLs optimizadas de las fotos con Sanity CDN
3. **Crear función `formatPrice.ts`** para formato colombiano COP: `$1.500.000/mes`
4. **Configurar ISR (Incremental Static Regeneration):** crear API route `/api/revalidate` que reciba el webhook de Sanity y regenere las páginas afectadas
5. **Publicar las primeras propiedades reales** junto con la clienta directamente desde Sanity Studio
6. **Crear query de filtrado** que acepte parámetros dinámicos (tipo, barrio, precio mínimo/máximo, habitaciones)

**🎨 FRONTEND (Páginas de catálogo + Detalle)**

1. **Crear página de catálogo** `/arriendos/casas/page.tsx` y `/arriendos/locales/page.tsx` con Server Components que traen datos de Sanity
2. **Crear `PropertyCard.tsx`:** tarjeta con imagen, precio, barrio, habitaciones, baños, área — diseño mobile-first
3. **Crear `PropertyGrid.tsx`:** grid responsivo de tarjetas con paginación (grid de 1 columna en mobile, 2 en tablet, 3 en desktop)
4. **Crear filtros funcionales** (`Filters.tsx` + `ActiveFilters.tsx`): tipo de inmueble, barrio, rango de precio, número de habitaciones — usando URL search params
5. **Crear página de detalle** `/arriendos/casas/[slug]/page.tsx` con: `PropertyGallery.tsx` (galería de fotos con lightbox), `PropertyFeatures.tsx` (características), `PropertyMap.tsx` (mapa Leaflet de la ubicación)
6. **Integrar botón WhatsApp** (`WhatsAppFloat.tsx`) flotante global + `PropertyContact.tsx` con mensaje prellenado por propiedad
7. **Crear `loading.tsx`** con skeletons para las rutas dinámicas del catálogo y detalle

---

### 🟢 Sprint 3 (Semanas 5-6): SEO Técnico + Contacto

**🔧 BACKEND (SEO del servidor + Analytics)**

1. **Crear `sitemap.ts`** dinámico que genere URLs de todas las propiedades, barrios y artículos del blog desde Sanity
2. **Crear `robots.ts`** con reglas de rastreo (allow `/`, disallow `/studio/` y `/api/`)
3. **Registrar el sitio en Google Search Console** y enviar el sitemap
4. **Configurar Google Analytics 4** con el tag `NEXT_PUBLIC_GA_ID` en el layout
5. **Crear query GROQ `ALL_SLUGS`** para generar el sitemap con todos los slugs y fechas de actualización
6. **Implementar `generateStaticParams()`** en las páginas dinámicas para pre-renderizar las rutas más importantes

**🎨 FRONTEND (SEO visual + Página de contacto)**

1. **Implementar JSON-LD `RealEstateListing`** en cada página de detalle con `PropertySchema.tsx`
2. **Agregar `generateMetadata()`** en cada `page.tsx` con title, description, openGraph, canonical dinámicos
3. **Optimizar imágenes** con `next/image` en todos los componentes: WebP automático, lazy loading, LQIP (Low Quality Image Placeholder) desde Sanity
4. **Crear `Breadcrumbs.tsx`** con migas de pan semánticas en todas las páginas interiores
5. **Crear página de Contacto** (`/contacto/page.tsx`) con formulario de contacto, mapa de ubicación de la oficina, botón de WhatsApp prominente, y datos NAP
6. **Agregar schema JSON-LD `LocalBusiness`** en la página de contacto para SEO local

---

### 🟢 Sprint 4 (Semanas 7-8): Landing Pages + Blog

**🔧 BACKEND (Blog + Barrios en Sanity)**

1. **Verificar y ajustar schema de blog** (`blogPost.ts`) si es necesario agregar campos nuevos
2. **Crear queries GROQ del blog:** `ALL_BLOG_POSTS`, `BLOG_POST_BY_SLUG`
3. **Crear queries GROQ de barrios:** `ALL_NEIGHBORHOODS`, `NEIGHBORHOOD_BY_SLUG`, `PROPERTIES_BY_NEIGHBORHOOD`
4. **Escribir los primeros 3 artículos SEO** optimizados directamente en Sanity (contenido sobre arriendos en Montería)
5. **Crear al menos 6 barrios** con contenido descriptivo (nombre, zona, precio promedio, puntos destacados, foto)
6. **Configurar `generateStaticParams()`** para pre-renderizar barrios y artículos del blog

**🎨 FRONTEND (Vistas de blog + Landing por barrio)**

1. **Crear listado de blog** (`/blog/page.tsx`) con `BlogCard.tsx` (tarjeta con imagen, título, extracto, categoría, fecha)
2. **Crear página individual de artículo** (`/blog/[slug]/page.tsx`) con renderizado de Portable Text, `TableOfContents.tsx`, y metadata SEO
3. **Crear landing pages dinámicas por barrio** (`/arriendos/barrio/[nombre]/page.tsx`) que muestre: descripción del barrio, propiedades disponibles, mapa centrado en el barrio, datos de precio promedio
4. **Implementar `generateMetadata()`** en páginas de blog y barrios con título, descripción y OG image dinámicos
5. **Crear enlaces internos estratégicos** entre páginas: del detalle al barrio, del barrio al catálogo, del blog a propiedades relacionadas
6. **Aplicar estilos de tipografía** al contenido del blog con `@tailwindcss/typography` (clase `prose`)

---

### 🟢 Sprint 5 (Semanas 9-10): Mapa + Favoritos

**🔧 BACKEND (Queries de mapa + Hooks de datos)**

1. **Crear query GROQ para el mapa** que devuelva todas las propiedades con coordenadas: `_id`, `title`, `slug`, `price`, `propertyType`, `location`, `mainImage`
2. **Crear hook `useFavorites.ts`** con lógica de localStorage: guardar IDs, verificar si es favorito, agregar/remover
3. **Crear hook `useFilters.ts`** para manejar filtros mediante URL search params (sincronizar estado con la URL)
4. **Crear hook `useMediaQuery.ts`** para manejar breakpoints responsive de forma programática

**🎨 FRONTEND (Mapa interactivo + Sistema de favoritos)**

1. **Integrar Leaflet + OpenStreetMap** con mapa de todas las propiedades en `/mapa/page.tsx` (importar dinámicamente con `dynamic(() => import(...), { ssr: false })`)
2. **Crear `InteractiveMap.tsx`** con marcadores personalizados (`MapMarker.tsx`), popups con preview de propiedad, y clustering para muchos puntos
3. **Crear `FavoriteButton.tsx`** (botón corazón) en cada `PropertyCard.tsx` y en la página de detalle
4. **Crear página `/favoritos/page.tsx`** que muestre las propiedades guardadas recuperándolas por ID desde Sanity
5. **Agregar botones de compartir** en la página de detalle: WhatsApp, Facebook, copiar enlace al portapapeles
6. **Crear `loading.tsx`** con skeleton del mapa y skeleton de la página de favoritos

---

### 🟢 Sprint 6 (Semanas 11-12): Optimización Final

**🔧 BACKEND (Rendimiento + Email + Infraestructura)**

1. **Auditoría completa con Lighthouse** (meta: 90+ en Performance, Accessibility, Best Practices, SEO)
2. **Configurar Google Business Profile** completo con datos de la clienta (dirección, horarios, fotos, categoría)
3. **Implementar suscripción email** para nuevas propiedades usando Resend: crear API route `/api/subscribe` y `/api/notify`
4. **Revisar y optimizar las queries GROQ** — eliminar campos innecesarios, agregar proyecciones específicas
5. **Configurar headers de caché** en `next.config.ts` para assets estáticos (imágenes, fuentes, CSS)
6. **Test de carga** básico para verificar que el sitio aguanta tráfico moderado

**🎨 FRONTEND (Pulido visual + Accesibilidad + Testing)**

1. **Corregir issues de accesibilidad:** contraste WCAG AA, labels en formularios, alt en imágenes, landmarks semánticos, focus visible en elementos interactivos
2. **Crear página `/nosotros/page.tsx`** con historia de la clienta, fotos del equipo, trayectoria, y schema `LocalBusiness`
3. **Crear `not-found.tsx` global** con diseño amigable y enlaces a las secciones principales
4. **Crear `error.tsx` global** para manejar errores inesperados con opción de reintentar
5. **Test final en múltiples dispositivos:** iPhone, Android, tablets, laptops — y navegadores: Chrome, Safari, Firefox
6. **Revisar y pulir animaciones/transiciones:** hover en cards, apertura de galería, menú mobile, scroll suave entre secciones

---

## ⚠️ Reglas Estrictas para el Agente IA

1. **Mobile first siempre.** Todo se diseña primero para celular, luego se adapta a desktop con breakpoints `md:` y `lg:`.
2. **No instalar dependencias innecesarias.** Usar lo que ya está en el stack. No agregar UI libraries extra (nada de Material UI, Chakra, shadcn, etc). Solo Tailwind CSS puro.
3. **TypeScript estricto.** Tipar todo. No usar `any`. Crear interfaces/types para los datos de Sanity en `lib/sanity/types.ts`.
4. **Server Components por defecto.** Solo usar `'use client'` cuando haya interactividad real (formularios, mapas, favoritos, filtros dinámicos). Nunca poner `'use client'` en pages si no es necesario.
5. **SEO en cada página.** Cada `page.tsx` debe exportar `generateMetadata()` con title, description, openGraph, canonical.
6. **Imágenes siempre con `next/image`.** Nunca usar `<img>` directo. Configurar width, height, alt, y priority para imágenes above-the-fold.
7. **No hardcodear contenido.** Todo el contenido visible viene de Sanity. La clienta debe poder cambiar cualquier texto.
8. **Accesibilidad.** Labels en formularios, alt en imágenes, contraste WCAG AA, landmarks semánticos (`<main>`, `<nav>`, `<footer>`).
9. **Rendimiento.** No cargar librerías pesadas en el bundle principal. Lazy import para Leaflet, galería, etc. con `dynamic(() => import(...), { ssr: false })`.
10. **URLs limpias y semánticas.** Nunca IDs en URLs, siempre slugs descriptivos.
11. **Componentes pequeños.** Máximo 150 líneas por componente. Si crece más, dividir.
12. **Formato de precios colombiano.** Siempre en COP con separador de miles: `$1.500.000/mes`. Usar la función `formatPrice()` de utils.
13. **Idioma español.** Toda la interfaz en español colombiano. Sin anglicismos innecesarios en la UI.
14. **Colores del sistema de diseño.** No inventar colores nuevos. Usar solo los definidos en la paleta de `tailwind.config.ts`.
15. **Commits descriptivos en español.** Ej: `feat: agregar catálogo de casas con filtros`, `fix: corregir paginación en móvil`.
16. **No usar `useEffect` para fetching.** Los datos se traen en Server Components con `async/await`. Solo `useEffect` para localStorage y event listeners del browser.
17. **Separar lógica de presentación.** Los queries a Sanity van en `lib/sanity/queries.ts`, no dentro de los componentes.
18. **Error handling.** Todas las páginas dinámicas deben tener `notFound()` cuando el slug no existe. Crear `not-found.tsx` global.
19. **Loading states.** Crear `loading.tsx` para cada ruta dinámica con skeletons, no spinners genéricos.
20. **No duplicar código.** Si algo se usa en más de 2 lugares, extraerlo a un componente o función reutilizable.
