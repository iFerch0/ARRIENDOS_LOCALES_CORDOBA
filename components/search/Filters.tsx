'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import Select from '@/components/ui/Select'
import { PROPERTY_TYPE_LABELS, PRICE_RANGES } from '@/lib/utils/constants'
import type { PropertyType } from '@/lib/sanity/types'

interface FiltersProps {
    neighborhoods: { name: string; slug: string }[]
    /** Pasar cuando la página ya tiene un tipo fijo (ej: /arriendos/casas) */
    fixedType?: PropertyType
}

const TYPE_OPTIONS = [
    { value: '', label: 'Todos los tipos' },
    ...Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => ({ value, label })),
]

const PRICE_OPTIONS = [
    { value: '', label: 'Cualquier precio' },
    ...PRICE_RANGES.map((r) => ({
        value: r.max === Infinity ? `${r.min}-` : `${r.min}-${r.max}`,
        label: r.label,
    })),
]

const BEDROOM_OPTIONS = [
    { value: '', label: 'Cualquier número' },
    { value: '1', label: '1 habitación' },
    { value: '2', label: '2 habitaciones' },
    { value: '3', label: '3 habitaciones' },
    { value: '4', label: '4+ habitaciones' },
]

const RESIDENTIAL = new Set<PropertyType>(['casa', 'apartamento', 'apartaestudio', 'finca'])

export default function Filters({ neighborhoods, fixedType }: FiltersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const update = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) params.set(key, value)
        else params.delete(key)
        params.delete('pagina')
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, [router, pathname, searchParams])

    const neighborhoodOptions = [
        { value: '', label: 'Todos los barrios' },
        ...neighborhoods.map(({ name, slug }) => ({ value: slug, label: name })),
    ]

    const showBedrooms = !fixedType || RESIDENTIAL.has(fixedType)

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {!fixedType && (
                <Select
                    label="Tipo de inmueble"
                    options={TYPE_OPTIONS}
                    value={searchParams.get('tipo') ?? ''}
                    onChange={(e) => update('tipo', e.target.value)}
                />
            )}

            <Select
                label="Barrio"
                options={neighborhoodOptions}
                value={searchParams.get('barrio') ?? ''}
                onChange={(e) => update('barrio', e.target.value)}
            />

            <Select
                label="Precio"
                options={PRICE_OPTIONS}
                value={searchParams.get('precio') ?? ''}
                onChange={(e) => update('precio', e.target.value)}
            />

            {showBedrooms && (
                <Select
                    label="Habitaciones"
                    options={BEDROOM_OPTIONS}
                    value={searchParams.get('habitaciones') ?? ''}
                    onChange={(e) => update('habitaciones', e.target.value)}
                />
            )}
        </div>
    )
}
