import { Search, MapPin, ChevronRight, Home, Building2, Store, TreePine, TrendingUp, Star, Shield } from 'lucide-react'
import Link from 'next/link'
import { WHATSAPP_PHONE, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/utils/constants'

const PROPERTY_TYPES = [
    { href: '/arriendos/casas', label: 'Casas', icon: Home },
    { href: '/arriendos/apartamentos', label: 'Apartamentos', icon: Building2 },
    { href: '/arriendos/locales', label: 'Locales comerciales', icon: Store },
    { href: '/arriendos/fincas', label: 'Fincas', icon: TreePine },
]

const QUICK_LINKS = [
    { label: 'Casas', href: '/arriendos/casas' },
    { label: 'Apartamentos', href: '/arriendos/apartamentos' },
    { label: 'Locales', href: '/arriendos/locales' },
    { label: 'Fincas', href: '/arriendos/fincas' },
    { label: 'Zona Norte', href: '/arriendos?zona=Norte' },
]

const STATS = [
    { value: '100+', label: 'Propiedades activas', icon: TrendingUp },
    { value: '4.9★', label: 'Calificación', icon: Star },
    { value: '100%', label: 'Atención directa', icon: Shield },
]

export default function Hero() {
    const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`

    return (
        <section
            className="relative min-h-[92vh] flex items-center overflow-hidden bg-hero-gradient"
            aria-label="Buscador de propiedades"
        >
            {/* Patrón de puntos */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
                aria-hidden="true"
            />

            {/* Orbs decorativos */}
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full bg-accent-400/10 blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="container-site relative z-10 py-16 lg:py-24">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* ── Columna izquierda ── */}
                    <div className="lg:col-span-7">

                        {/* Etiqueta de ubicación */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20">
                            <MapPin className="h-4 w-4 text-accent-300" aria-hidden="true" />
                            <span className="text-sm font-medium text-white/90">Montería, Córdoba, Colombia</span>
                        </div>

                        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                            Encuentra tu hogar{' '}
                            <span className="block text-accent-300 mt-1">ideal en Montería</span>
                        </h1>

                        <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl">
                            Casas, apartamentos y locales comerciales en los mejores barrios de Montería.
                            Contáctanos directamente por WhatsApp y te ayudamos hoy.
                        </p>

                        {/* Buscador funcional */}
                        <form
                            action="/arriendos"
                            method="GET"
                            role="search"
                            aria-label="Buscar propiedades"
                            className="mt-10"
                        >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                                <label htmlFor="hero-q" className="sr-only">
                                    Buscar propiedades por barrio o tipo de inmueble
                                </label>
                                <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl focus-within:ring-2 focus-within:ring-primary-300 transition-shadow">
                                    <Search className="h-5 w-5 flex-shrink-0 text-neutral-400" aria-hidden="true" />
                                    <input
                                        id="hero-q"
                                        type="text"
                                        name="q"
                                        placeholder="Busca por barrio, tipo de inmueble..."
                                        className="flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 outline-none"
                                        autoComplete="off"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-accent-600 hover:scale-105 transition-all whitespace-nowrap"
                                >
                                    Buscar propiedades
                                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>
                        </form>

                        {/* Quick links — rutas reales */}
                        <div className="mt-5 flex flex-wrap gap-2 items-center">
                            <span className="text-sm text-white/60 self-center">Popular:</span>
                            {QUICK_LINKS.map(({ label, href }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 transition-colors border border-white/10 hover:border-white/30"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* Stats (solo mobile) */}
                        <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/20 pt-8 lg:hidden">
                            {STATS.map(({ value, label, icon: Icon }) => (
                                <div key={label} className="text-center">
                                    <Icon className="h-4 w-4 text-accent-300 mx-auto mb-1" aria-hidden="true" />
                                    <div className="font-display text-xl font-bold text-white sm:text-2xl">{value}</div>
                                    <div className="text-xs text-white/60 mt-0.5 leading-tight">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Glass card (solo desktop) ── */}
                    <div className="hidden lg:block lg:col-span-5">
                        <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6">

                            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">
                                Disponible ahora en Montería
                            </p>

                            <div className="space-y-2">
                                {PROPERTY_TYPES.map(({ href, label, icon: Icon }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/15 transition-colors border border-white/10 hover:border-white/25 group"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 group-hover:bg-primary-400/30 transition-colors shrink-0">
                                            <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                                        </span>
                                        <span className="flex-1 text-sm font-medium text-white/90">{label}</span>
                                        <ChevronRight className="h-3.5 w-3.5 text-white/40 group-hover:text-accent-300 transition-colors" aria-hidden="true" />
                                    </Link>
                                ))}
                            </div>

                            {/* Stats en card */}
                            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mt-5">
                                {STATS.map(({ value, label }) => (
                                    <div key={label} className="text-center p-2.5 rounded-xl bg-white/5">
                                        <div className="font-display text-xl font-bold text-white">{value}</div>
                                        <div className="text-xs text-white/60 mt-0.5 leading-tight">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp CTA */}
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 flex items-center justify-center gap-2.5 w-full rounded-xl bg-whatsapp hover:bg-whatsapp-dark py-3 text-sm font-semibold text-white transition-colors"
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white shrink-0" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Consultar por WhatsApp
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Wave inferior */}
            <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
                    <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 20C480 40 240 80 0 40L0 80Z" fill="#FAFAFA" />
                </svg>
            </div>
        </section>
    )
}
