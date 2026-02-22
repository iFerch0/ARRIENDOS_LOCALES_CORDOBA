import { Search, MapPin, TrendingUp, Shield, Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'

/* Hero section — maquetación visual completa.
   La funcionalidad del buscador se implementa en Sprint 2. */
export default function Hero() {
    return (
        <section
            className="relative min-h-[90vh] flex items-center overflow-hidden bg-hero-gradient"
            aria-label="Buscador de propiedades"
        >
            {/* Patrón de fondo decorativo */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            {/* Círculos decorativos */}
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent-400/10 blur-3xl" aria-hidden="true" />

            <div className="container-site relative z-10 py-16 lg:py-24">
                <div className="max-w-3xl">

                    {/* Etiqueta superior */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20">
                        <MapPin className="h-4 w-4 text-accent-300" aria-hidden="true" />
                        <span className="text-sm font-medium text-white/90">Montería, Córdoba, Colombia</span>
                    </div>

                    {/* Título principal */}
                    <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                        Encuentra tu hogar{' '}
                        <span className="block text-accent-300 mt-1">ideal en Montería</span>
                    </h1>

                    <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl">
                        Casas, apartamentos y locales comerciales en los mejores barrios de Montería.
                        Contáctanos directamente por WhatsApp y te ayudamos hoy.
                    </p>

                    {/* Buscador visual (sin funcionalidad — Sprint 2) */}
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                        <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl">
                            <Search className="h-5 w-5 flex-shrink-0 text-neutral-400" aria-hidden="true" />
                            <span className="text-sm text-neutral-400 select-none">
                                Busca por barrio, tipo de inmueble...
                            </span>
                        </div>
                        <Link
                            href="/arriendos"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-accent-600 transition-all hover:scale-105 whitespace-nowrap"
                        >
                            Buscar propiedades
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Links rápidos */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="text-sm text-white/60 self-center">Popular:</span>
                        {['Casas', 'Apartamentos', 'Locales comerciales', 'La Castellana', 'Sector Norte'].map((tag) => (
                            <Link
                                key={tag}
                                href={`/arriendos?q=${encodeURIComponent(tag)}`}
                                className="rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-white/80 hover:bg-white/20 transition-colors border border-white/10 hover:border-white/30"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/20 pt-10">
                        {[
                            { value: '100+', label: 'Propiedades activas', icon: TrendingUp },
                            { value: '4.9★', label: 'Calificación promedio', icon: Star },
                            { value: '100%', label: 'Atención personalizada', icon: Shield },
                        ].map(({ value, label, icon: Icon }) => (
                            <div key={label} className="text-center">
                                <div className="flex justify-center mb-1">
                                    <Icon className="h-5 w-5 text-accent-300" aria-hidden="true" />
                                </div>
                                <div className="font-display text-2xl font-bold text-white">{value}</div>
                                <div className="text-xs text-white/60 mt-0.5">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Wave decorativo inferior */}
            <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
                    <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 20C480 40 240 80 0 40L0 80Z" fill="#FAFAFA" />
                </svg>
            </div>
        </section>
    )
}
