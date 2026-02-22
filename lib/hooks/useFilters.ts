'use client'

import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { PropertyFilters } from '@/lib/sanity/types'

export function useFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const filters: PropertyFilters = {
        tipo: (searchParams.get('tipo') as PropertyFilters['tipo']) ?? undefined,
        barrio: searchParams.get('barrio') ?? undefined,
        precioMin: searchParams.get('precioMin') ? Number(searchParams.get('precioMin')) : undefined,
        precioMax: searchParams.get('precioMax') ? Number(searchParams.get('precioMax')) : undefined,
        habitaciones: searchParams.get('habitaciones')
            ? Number(searchParams.get('habitaciones'))
            : undefined,
    }

    const setFilter = useCallback(
        (key: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
            params.delete('pagina')
            router.push(`${pathname}?${params.toString()}`, { scroll: false })
        },
        [router, pathname, searchParams]
    )

    const clearFilters = useCallback(() => {
        router.push(pathname, { scroll: false })
    }, [router, pathname])

    const hasFilters = Object.values(filters).some(Boolean)

    return { filters, setFilter, clearFilters, hasFilters }
}
