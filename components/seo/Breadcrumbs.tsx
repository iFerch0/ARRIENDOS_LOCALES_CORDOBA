import Link from 'next/link'
import JsonLd from './JsonLd'
import { SITE_URL } from '@/lib/utils/constants'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

/**
 * Migas de pan accesibles con JSON-LD BreadcrumbList para SEO.
 * El primer ítem es siempre el Inicio y el último es la página actual (sin enlace).
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const allItems = [{ label: 'Inicio', href: '/' }, ...items]

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: allItems.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
        })),
    }

    return (
        <>
            <nav aria-label="Ruta de navegación" className="flex items-center gap-1 text-sm text-neutral-500 flex-wrap">
                {allItems.map((item, index) => {
                    const isLast = index === allItems.length - 1
                    const isFirst = index === 0
                    return (
                        <span key={index} className="flex items-center gap-1">
                            {index > 0 && (
                                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-neutral-300" aria-hidden="true" />
                            )}
                            {isFirst && <Home className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />}
                            {!isLast && item.href ? (
                                <Link
                                    href={item.href}
                                    className="hover:text-primary-600 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className={isLast ? 'text-neutral-700 font-medium truncate max-w-[200px]' : ''}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                        </span>
                    )
                })}
            </nav>
            <JsonLd data={jsonLd} />
        </>
    )
}
