'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'arriendos_favoritos'

export function useFavorites() {
    const [ids, setIds] = useState<string[]>([])
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            setIds(stored ? (JSON.parse(stored) as string[]) : [])
        } catch {
            setIds([])
        }
        setHydrated(true)
    }, [])

    const toggle = useCallback((id: string) => {
        setIds((prev) => {
            const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
            } catch {}
            return next
        })
    }, [])

    const isFavorite = useCallback((id: string) => ids.includes(id), [ids])

    return { favorites: ids, toggle, isFavorite, hydrated }
}
