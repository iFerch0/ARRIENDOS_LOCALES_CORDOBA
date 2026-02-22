'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface PaginationProps {
    currentPage: number
    totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    if (totalPages <= 1) return null

    const buildUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        if (page === 1) {
            params.delete('pagina')
        } else {
            params.set('pagina', String(page))
        }
        const query = params.toString()
        return query ? `${pathname}?${query}` : pathname
    }

    // Calcular rango de páginas visibles (máximo 5)
    const delta = 2
    const range: number[] = []
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
        range.push(i)
    }

    return (
        <nav aria-label="Paginación" className="flex items-center justify-center gap-1 py-8">
            {/* Anterior */}
            {currentPage > 1 ? (
                <Link
                    href={buildUrl(currentPage - 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:border-primary-500 hover:text-primary-600 transition-colors"
                    aria-label="Página anterior"
                >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
            ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-100 text-neutral-300 cursor-not-allowed">
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </span>
            )}

            {/* Primera página si no está en el rango */}
            {range[0] > 1 && (
                <>
                    <Link href={buildUrl(1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:border-primary-500 hover:text-primary-600 transition-colors">1</Link>
                    {range[0] > 2 && <span className="px-1 text-neutral-400">…</span>}
                </>
            )}

            {/* Rango central */}
            {range.map((page) => (
                <Link
                    key={page}
                    href={buildUrl(page)}
                    aria-current={page === currentPage ? 'page' : undefined}
                    className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-colors',
                        page === currentPage
                            ? 'border-primary-500 bg-primary-500 text-white font-semibold'
                            : 'border-neutral-200 text-neutral-600 hover:border-primary-500 hover:text-primary-600'
                    )}
                >
                    {page}
                </Link>
            ))}

            {/* Última página si no está en el rango */}
            {range[range.length - 1] < totalPages && (
                <>
                    {range[range.length - 1] < totalPages - 1 && <span className="px-1 text-neutral-400">…</span>}
                    <Link href={buildUrl(totalPages)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:border-primary-500 hover:text-primary-600 transition-colors">{totalPages}</Link>
                </>
            )}

            {/* Siguiente */}
            {currentPage < totalPages ? (
                <Link
                    href={buildUrl(currentPage + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:border-primary-500 hover:text-primary-600 transition-colors"
                    aria-label="Página siguiente"
                >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-100 text-neutral-300 cursor-not-allowed">
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
            )}
        </nav>
    )
}
