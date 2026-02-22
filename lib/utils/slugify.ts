/**
 * Convierte un texto a slug URL-amigable.
 *
 * @example
 * slugify("La Castellana Norte") → "la-castellana-norte"
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')  // remover acentos
        .replace(/[^a-z0-9\s-]/g, '')     // solo letras, números, espacios y guiones
        .trim()
        .replace(/\s+/g, '-')             // espacios → guiones
        .replace(/-+/g, '-')              // múltiples guiones → uno
}
