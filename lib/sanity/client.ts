import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
    stega: {
        enabled: false,
    },
})

/**
 * Fetcher genérico con soporte de revalidación ISR.
 * Usar en Server Components:
 *   const data = await sanityFetch(FEATURED_PROPERTIES, {}, 3600)
 */
export async function sanityFetch<T>(
    query: string,
    params: Record<string, unknown> = {},
    revalidate: number | false = 3600
): Promise<T> {
    return client.fetch<T>(query, params, {
        next: revalidate === false
            ? { revalidate: false }
            : { revalidate },
    })
}
