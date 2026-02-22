'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Home, Search, MapPin, BookOpen, Heart, Phone } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { SITE_NAME } from '@/lib/utils/constants'

const NAV_LINKS = [
    { href: '/arriendos/casas', label: 'Casas', icon: Home },
    { href: '/arriendos/locales', label: 'Locales', icon: MapPin },
    { href: '/mapa', label: 'Mapa', icon: Search },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/favoritos', label: 'Guardados', icon: Heart },
    { href: '/contacto', label: 'Contacto', icon: Phone },
]

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Cerrar menú al cambiar de ruta (blur)
    useEffect(() => {
        if (menuOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200'
                    : 'bg-white/80 backdrop-blur-sm'
            )}
        >
            <div className="container-site">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-display font-bold text-xl text-primary-700 hover:text-primary-600 transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        <span
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white text-sm font-black"
                            aria-hidden="true"
                        >
                            A
                        </span>
                        <span>{SITE_NAME}</span>
                    </Link>

                    {/* Nav desktop */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
                        {NAV_LINKS.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    'px-3 py-2 rounded-lg text-sm font-medium text-neutral-600',
                                    'hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150'
                                )}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/arriendos"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 transition-colors shadow-sm"
                        >
                            <Search className="h-4 w-4" aria-hidden="true" />
                            Buscar propiedades
                        </Link>
                    </div>

                    {/* Botón hamburguesa (mobile) */}
                    <button
                        id="mobile-menu-button"
                        className={cn(
                            'md:hidden flex h-10 w-10 items-center justify-center rounded-lg',
                            'text-neutral-700 hover:bg-neutral-100 transition-colors'
                        )}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        {menuOpen
                            ? <X className="h-5 w-5" aria-hidden="true" />
                            : <Menu className="h-5 w-5" aria-hidden="true" />
                        }
                    </button>
                </div>
            </div>

            {/* Menú mobile */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Menú de navegación"
                className={cn(
                    'md:hidden fixed inset-0 top-16 z-40 bg-white transition-all duration-300 overflow-y-auto',
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
            >
                <nav className="container-site py-4 space-y-1">
                    {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3.5 rounded-xl',
                                'text-neutral-700 font-medium hover:text-primary-600 hover:bg-primary-50',
                                'transition-colors duration-150 border border-transparent hover:border-primary-100'
                            )}
                        >
                            <Icon className="h-5 w-5 text-primary-500" aria-hidden="true" />
                            {label}
                        </Link>
                    ))}

                    <div className="pt-4 pb-2 border-t border-neutral-100 mt-4">
                        <Link
                            href="/arriendos"
                            onClick={() => setMenuOpen(false)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3.5 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
                        >
                            <Search className="h-5 w-5" aria-hidden="true" />
                            Ver todas las propiedades
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
