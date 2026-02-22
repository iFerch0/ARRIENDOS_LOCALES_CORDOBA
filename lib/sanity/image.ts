import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

/**
 * Genera una URL optimizada de imagen desde Sanity CDN.
 *
 * @example
 * urlFor(property.mainImage).width(800).height(600).format('webp').url()
 */
export function urlFor(source: SanityImageSource) {
    return builder.image(source)
}

/**
 * URL directa para uso con next/image.
 * Devuelve undefined si no hay imagen para evitar errores.
 */
export function getImageUrl(
    source: SanityImageSource | undefined | null,
    width = 800,
    height?: number
): string | undefined {
    if (!source) return undefined

    let img = builder.image(source).width(width).format('webp').quality(85)
    if (height) img = img.height(height)

    return img.url()
}
