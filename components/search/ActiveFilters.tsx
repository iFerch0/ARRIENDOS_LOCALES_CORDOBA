'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { PROPERTY_TYPE_LABELS, PRICE_RANGES } from '@/lib/utils/constants'
import type { PropertyType } from '@/lib/sanity/types'

export default function ActiveFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const active: { key: string; label: string }[] = []

    const tipo = searchParams.get('tipo')
    if (tipo && tipo in PROPERTY_TYPE_LABELS) {
        active.push({ key: 'tipo', label: PROPERTY_TYPE_LABELS[tipo as PropertyType] })
    }

    const barrio = searchParams.get('barrio')
    if (barrio) active.push({ key: 'barrio', label: barrio.replace(/-/g, ' ') })

    const precio = searchParams.get('precio')
    if (precio) {
        const [minStr, maxStr] = precio.split('-')
        const min = parseInt(minStr)
        const max = maxStr ? parseInt(maxStr) : Infinity
        const range = PRICE_RANGES.find((r) => r.min === min && r.max === max)
        if (range) active.push({ key: 'precio', label: range.label })
    }

    const habitaciones = searchParams.get('habitaciones')
    if (habitaciones) active.push({ key: 'habitaciones', label: `${habitaciones}+ hab.` })

    if (active.length === 0) return null

    const remove = (key: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(key)
        params.delete('pagina')
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-neutral-500">Filtros activos:</span>
            {active.map(({ key, label }) => (
                <button
                    key={key}
                    onClick={() => remove(key)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                >
                    {label}
                    <X className="h-3 w-3" aria-hidden="true" />
                </button>
            ))}
            {active.length > 1 && (
                <button
                    onClick={() => router.push(pathname)}
                    className="text-xs text-neutral-400 hover:text-neutral-600 underline"
                >
                    Limpiar todo
                </button>
            )}
        </div>
    )
}
