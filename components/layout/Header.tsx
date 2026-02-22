'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
    Menu, X, Home, Map, BookOpen, Heart, Phone,
    ChevronDown, Building2, Store, Building, Search, Warehouse, TreePine,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { SITE_NAME } from '@/lib/utils/constants'

const PROPERTY_TYPES = [
    { href: '/arriendos/casas', label: 'Casas', icon: Home },
    { href: '/arriendos/apartamentos', label: 'Apartamentos', icon: Building2 },
    { href: '/arriendos/locales', label: 'Locales comerciales', icon: Store },
    { href: '/arriendos/apartaestudios', label: 'Apartaestudios', icon: Building },
    { href: '/arriendos/fincas', label: 'Fincas', icon: TreePine },
    { href: '/arriendos/bodegas', label: 'Bodegas', icon: Warehouse },
]

const NAV_LINKS = [
    { href: '/mapa', label: 'Mapa', icon: Map },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/favoritos', label: 'Guardados', icon: Heart },
    { href: '/contacto', label: 'Contacto', icon: Phone },
]

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    // Cierra todo al cambiar de ruta
    useEffect(() => {
        setMenuOpen(false)
        setDropdownOpen(false)
    }, [pathname])

    // Escape cierra menús
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setMenuOpen(false); setDropdownOpen(false) }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [])

    // Click fuera cierra dropdown
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', onClick)
        return () => document.removeEventListener('mousedown', onClick)
    }, [])

    const isPropertyRoute = pathname.startsWith('/arriendos')
    const close = () => setMenuOpen(false)

    return (
        <header className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
            scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200'
                : 'bg-white/80 backdrop-blur-sm'
        )}>
            <div className="container-site">
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 font-display font-bold text-lg text-primary-700 hover:text-primary-600 transition-colors shrink-0"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white shrink-0" aria-hidden="true">
                            <Home className="h-4 w-4" />
                        </span>
                        <span className="hidden sm:block">{SITE_NAME}</span>
                    </Link>

                    {/* Nav desktop */}
                    <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center" aria-label="Navegación principal">

                        {/* Dropdown Propiedades */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(v => !v)}
                                aria-expanded={dropdownOpen}
                                aria-haspopup="true"
                                className={cn(
                                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                                    isPropertyRoute
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                                )}
                            >
                                Propiedades
                                <ChevronDown
                                    className={cn('h-3.5 w-3.5 transition-transform duration-200', dropdownOpen && 'rotate-180')}
                                    aria-hidden="true"
                                />
                            </button>

                            {/* Panel dropdown */}
                            <div className={cn(
                                'absolute top-full left-0 mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-neutral-200 overflow-hidden',
                                'transition-all duration-200 origin-top-left',
                                dropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                            )}>
                                {PROPERTY_TYPES.map(({ href, label, icon: Icon }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        tabIndex={dropdownOpen ? 0 : -1}
                                        className={cn(
                                            'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                                            pathname === href
                                                ? 'text-primary-600 bg-primary-50 font-medium'
                                                : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                                        )}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        {label}
                                    </Link>
                                ))}
                                <div className="border-t border-neutral-100">
                                    <Link
                                        href="/arriendos"
                                        tabIndex={dropdownOpen ? 0 : -1}
                                        className={cn(
                                            'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                                            pathname === '/arriendos'
                                                ? 'text-primary-600 bg-primary-50 font-medium'
                                                : 'text-neutral-500 hover:text-primary-600 hover:bg-neutral-50'
                                        )}
                                    >
                                        Ver todo el catálogo →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {NAV_LINKS.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                                    pathname === href
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                                )}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA desktop */}
                    <div className="hidden md:flex shrink-0">
                        <Link
                            href="/arriendos"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 transition-colors shadow-sm"
                        >
                            <Search className="h-4 w-4" aria-hidden="true" />
                            Buscar
                        </Link>
                    </div>

                    {/* Hamburguesa (mobile) */}
                    <button
                        id="mobile-menu-button"
                        className="md:hidden relative flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
                        onClick={() => setMenuOpen(v => !v)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        <X className={cn(
                            'absolute h-5 w-5 transition-all duration-200',
                            menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                        )} aria-hidden="true" />
                        <Menu className={cn(
                            'absolute h-5 w-5 transition-all duration-200',
                            menuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
                        )} aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* Backdrop mobile */}
            <div
                className={cn(
                    'md:hidden fixed inset-0 top-16 bg-black/30 backdrop-blur-sm z-30 transition-opacity duration-300',
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
                onClick={close}
                aria-hidden="true"
            />

            {/* Panel mobile */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Menú de navegación"
                className={cn(
                    'md:hidden fixed left-0 right-0 top-16 z-40 bg-white shadow-xl border-b border-neutral-100',
                    'transition-all duration-300 ease-out',
                    menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                )}
            >
                <nav className="container-site py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">

                    <p className="px-4 pb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Propiedades</p>
                    <div className="space-y-0.5">
                        {PROPERTY_TYPES.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={close}
                                tabIndex={menuOpen ? 0 : -1}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                                    pathname === href
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                                )}
                            >
                                <Icon className="h-4 w-4 text-primary-400 shrink-0" aria-hidden="true" />
                                {label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-100 space-y-0.5">
                        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={close}
                                tabIndex={menuOpen ? 0 : -1}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                                    pathname === href
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                                )}
                            >
                                <Icon className="h-4 w-4 text-neutral-400 shrink-0" aria-hidden="true" />
                                {label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-100">
                        <Link
                            href="/arriendos"
                            onClick={close}
                            tabIndex={menuOpen ? 0 : -1}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3.5 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
                        >
                            <Search className="h-4 w-4" aria-hidden="true" />
                            Ver todas las propiedades
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
