/* ============================================================
   QUERIES GROQ — Sanity CMS
   Todas las consultas centralizadas aquí.
   ============================================================ */

const IMAGE_FRAGMENT = `{ asset->{ url, metadata { dimensions, lqip } }, alt }`

/* ── Propiedades ───────────────────────────────────────────── */

/** Catálogo completo (disponibles, orden cronológico desc) */
export const ALL_PROPERTIES = `
  *[_type == "property" && available == true] | order(_createdAt desc) {
    _id, title, slug, propertyType, price,
    bedrooms, bathrooms, area, stratum, parking, featured, city,
    "neighborhoodName": neighborhood->name,
    "neighborhoodSlug": neighborhood->slug.current,
    "mainImage": images[0]${IMAGE_FRAGMENT},
    location
  }
`

/** Propiedad individual por slug */
export const PROPERTY_BY_SLUG = `
  *[_type == "property" && slug.current == $slug][0] {
    ...,
    "neighborhoodName": neighborhood->name,
    "neighborhoodSlug": neighborhood->slug.current,
    "neighborhoodDescription": neighborhood->description,
    images[]${IMAGE_FRAGMENT}
  }
`

/** Propiedades destacadas (home – máximo 6) */
export const FEATURED_PROPERTIES = `
  *[_type == "property" && featured == true && available == true]
  | order(_createdAt desc) [0...6] {
    _id, title, slug, propertyType, price,
    bedrooms, bathrooms, area,
    "neighborhoodName": neighborhood->name,
    "mainImage": images[0]${IMAGE_FRAGMENT}
  }
`

/** Propiedades por barrio */
export const PROPERTIES_BY_NEIGHBORHOOD = `
  *[_type == "property" && available == true && neighborhood->slug.current == $neighborhoodSlug]
  | order(_createdAt desc) {
    _id, title, slug, propertyType, price,
    bedrooms, bathrooms, area,
    "neighborhoodName": neighborhood->name,
    "mainImage": images[0]${IMAGE_FRAGMENT}
  }
`

/** Propiedades por tipo */
export const PROPERTIES_BY_TYPE = `
  *[_type == "property" && available == true && propertyType == $type]
  | order(_createdAt desc) {
    _id, title, slug, propertyType, price,
    bedrooms, bathrooms, area,
    "neighborhoodName": neighborhood->name,
    "mainImage": images[0]${IMAGE_FRAGMENT}
  }
`

/** Para el mapa interactivo */
export const MAP_PROPERTIES = `
  *[_type == "property" && available == true && defined(location)] {
    _id, title, slug, price, propertyType, location,
    "mainImage": images[0]${IMAGE_FRAGMENT}
  }
`

/** Propiedades por IDs (para favoritos) */
export const PROPERTIES_BY_IDS = `
  *[_type == "property" && _id in $ids] {
    _id, title, slug, propertyType, price,
    bedrooms, bathrooms, area,
    "neighborhoodName": neighborhood->name,
    "mainImage": images[0]${IMAGE_FRAGMENT}
  }
`

/* ── Barrios ───────────────────────────────────────────────── */

/** Todos los barrios con conteo de propiedades */
export const ALL_NEIGHBORHOODS = `
  *[_type == "neighborhood"] | order(name asc) {
    _id, name, slug, zone, averagePrice, location, highlights,
    "image": image${IMAGE_FRAGMENT},
    "propertyCount": count(*[_type == "property" && references(^._id) && available == true])
  }
`

/** Barrio individual con sus propiedades */
export const NEIGHBORHOOD_BY_SLUG = `
  *[_type == "neighborhood" && slug.current == $slug][0] {
    ...,
    "image": image${IMAGE_FRAGMENT},
    "properties": *[_type == "property" && references(^._id) && available == true]
      | order(_createdAt desc) {
        _id, title, slug, propertyType, price,
        bedrooms, bathrooms, area,
        "mainImage": images[0]${IMAGE_FRAGMENT}
      }
  }
`

/* ── Blog ──────────────────────────────────────────────────── */

/** Todos los artículos */
export const ALL_BLOG_POSTS = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, tags, publishedAt,
    "coverImage": coverImage{ asset->{ url, metadata { dimensions, lqip } } }
  }
`

/** Artículo individual por slug */
export const BLOG_POST_BY_SLUG = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    ...,
    "coverImage": coverImage{ asset->{ url, metadata { dimensions, lqip } } }
  }
`

/* ── Configuración global ──────────────────────────────────── */

/** Singleton de configuración del sitio */
export const SITE_SETTINGS = `*[_type == "siteSettings"][0] { ... }`

/* ── Catálogo filtrado ─────────────────────────────────────── */

/**
 * Propiedades con filtros opcionales + paginación.
 * Parámetros: $tipo, $barrio, $precioMin, $precioMax, $habitaciones (null = ignorar),
 *             $from, $to (índices de slice para paginación).
 */
export const FILTERED_PROPERTIES = `
  *[
    _type == "property" &&
    available == true &&
    (!defined($tipo) || propertyType == $tipo) &&
    (!defined($barrio) || neighborhood->slug.current == $barrio) &&
    (!defined($precioMin) || price >= $precioMin) &&
    (!defined($precioMax) || price <= $precioMax) &&
    (!defined($habitaciones) || bedrooms >= $habitaciones)
  ] | order(_createdAt desc) [$from...$to] {
    _id, title, slug, propertyType, price,
    bedrooms, bathrooms, area, stratum, parking, featured, city,
    "neighborhoodName": neighborhood->name,
    "neighborhoodSlug": neighborhood->slug.current,
    "mainImage": images[0]${IMAGE_FRAGMENT},
    location
  }
`

/** Cuenta total de propiedades con los mismos filtros (para paginación). */
export const PROPERTIES_COUNT = `
  count(*[
    _type == "property" &&
    available == true &&
    (!defined($tipo) || propertyType == $tipo) &&
    (!defined($barrio) || neighborhood->slug.current == $barrio) &&
    (!defined($precioMin) || price >= $precioMin) &&
    (!defined($precioMax) || price <= $precioMax) &&
    (!defined($habitaciones) || bedrooms >= $habitaciones)
  ])
`

/* ── Sitemap ───────────────────────────────────────────────── */

/** Todos los slugs para generar el sitemap dinámico */
export const ALL_SLUGS = `{
  "properties": *[_type == "property"] {
    "slug": slug.current,
    _updatedAt,
    propertyType
  },
  "neighborhoods": *[_type == "neighborhood"] {
    "slug": slug.current,
    _updatedAt
  },
  "blogPosts": *[_type == "blogPost"] {
    "slug": slug.current,
    _updatedAt
  }
}`
