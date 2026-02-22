'use client'

import { Heart } from 'lucide-react'
import { useFavorites } from '@/lib/hooks/useFavorites'
import { cn } from '@/lib/utils/cn'

interface FavoriteButtonProps {
    propertyId: string
    className?: string
}

export default function FavoriteButton({ propertyId, className }: FavoriteButtonProps) {
    const { isFavorite, toggle, hydrated } = useFavorites()
    const active = hydrated && isFavorite(propertyId)

    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggle(propertyId)
            }}
            aria-label={active ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            aria-pressed={active}
            className={cn(
                'flex items-center justify-center rounded-full p-2 transition-all duration-200',
                active
                    ? 'bg-red-50 text-red-500 hover:bg-red-100'
                    : 'bg-white/80 backdrop-blur-sm text-neutral-400 hover:text-red-400 hover:bg-red-50',
                className
            )}
        >
            <Heart
                className={cn('h-4 w-4 transition-transform duration-200', active && 'fill-current scale-110')}
                aria-hidden="true"
            />
        </button>
    )
}
