/**
 * Formatea un número como precio en pesos colombianos (COP).
 *
 * @example
 * formatPrice(1500000) → "$1.500.000/mes"
 * formatPrice(1500000, false) → "$1.500.000"
 */
export function formatPrice(amount: number, showPeriod = true): string {
    const formatted = amount.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
    return showPeriod ? `${formatted}/mes` : formatted
}

/**
 * Formatea precio de forma compacta para badges/cards.
 *
 * @example
 * formatPriceCompact(1500000) → "$1.5M/mes"
 * formatPriceCompact(950000) → "$950K/mes"
 */
export function formatPriceCompact(amount: number, showPeriod = true): string {
    let value: string
    if (amount >= 1_000_000) {
        value = `$${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}M`
    } else if (amount >= 1_000) {
        value = `$${(amount / 1_000).toFixed(0)}K`
    } else {
        value = `$${amount}`
    }
    return showPeriod ? `${value}/mes` : value
}
