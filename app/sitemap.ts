import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { ALL_SLUGS } from '@/lib/sanity/queries'
import { SITE_URL, PROPERTY_TYPE_PLURAL } from '@/lib/utils/constants'
import type { PropertyType } from '@/lib/sanity/types'

type SlugsData = {
    properties: { slug: string; _updatedAt: string; propertyType: string }[]
    neighborhoods: { slug: string; _updatedAt: string }[]
    blogPosts: { slug: string; _updatedAt: string }[]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const BASE = SITE_URL

    let data: SlugsData | null = null
    try {
        data = await sanityFetch<SlugsData>(ALL_SLUGS)
    } catch {
        // Sin conexión a Sanity: retornar solo páginas estáticas
    }

    const properties: MetadataRoute.Sitemap = (data?.properties ?? []).map((p) => ({
        url: `${BASE}/arriendos/${PROPERTY_TYPE_PLURAL[p.propertyType as PropertyType] ?? 'casas'}/${p.slug}`,
        lastModified: new Date(p._updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    const neighborhoods: MetadataRoute.Sitemap = (data?.neighborhoods ?? []).map((n) => ({
        url: `${BASE}/arriendos/barrio/${n.slug}`,
        lastModified: new Date(n._updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    const blogPosts: MetadataRoute.Sitemap = (data?.blogPosts ?? []).map((b) => ({
        url: `${BASE}/blog/${b.slug}`,
        lastModified: new Date(b._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    const catalogTypes: MetadataRoute.Sitemap = Object.values(PROPERTY_TYPE_PLURAL).map((tipo) => ({
        url: `${BASE}/arriendos/${tipo}`,
        changeFrequency: 'daily',
        priority: 0.85,
    }))

    return [
        { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${BASE}/arriendos`, changeFrequency: 'daily', priority: 0.9 },
        ...catalogTypes,
        { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${BASE}/contacto`, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE}/nosotros`, changeFrequency: 'monthly', priority: 0.4 },
        ...properties,
        ...neighborhoods,
        ...blogPosts,
    ]
}
