import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import { Building2, TrendingUp, Users, MapPin } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Arriendos Montería | Casas y Locales en Arriendo',
    description:
        'Encuentra casas, apartamentos y locales comerciales en arriendo en Montería, Córdoba. Las mejores propiedades con contacto directo por WhatsApp.',
    alternates: {
        canonical: '/',
    },
}

const CATEGORIES = [
    {
        title: 'Casas',
        description: 'Casas familiares en los mejores barrios',
        href: '/arriendos/casas',
        icon: '🏠',
        color: 'from-primary-500 to-primary-700',
    },
    {
        title: 'Apartamentos',
        description: 'Apartamentos modernos y cómodos',
        href: '/arriendos/apartamentos',
        icon: '🏢',
        color: 'from-accent-500 to-accent-700',
    },
    {
        title: 'Locales Comerciales',
        description: 'Espacios ideales para tu negocio',
        href: '/arriendos/locales',
        icon: '🏪',
        color: 'from-primary-600 to-primary-800',
    },
    {
        title: 'Apartaestudios',
        description: 'Perfectos para estudiantes y profesionales',
        href: '/arriendos/apartaestudios',
        icon: '🛏️',
        color: 'from-neutral-600 to-neutral-800',
    },
]

const WHY_US = [
    { icon: Building2, title: 'Amplio catálogo', text: 'Más de 100 propiedades disponibles en todos los sectores de Montería.' },
    { icon: TrendingUp, title: 'Precios justos', text: 'Propiedades verificadas con precios competitivos del mercado local.' },
    { icon: Users, title: 'Atención directa', text: 'Sin intermediarios. Contacto directo con el propietario por WhatsApp.' },
    { icon: MapPin, title: 'Expertos en Montería', text: 'Conocemos cada barrio, zona y sus características específicas.' },
]

export default function HomePage() {
    return (
        <div className="page-fade-in">
            {/* Hero */}
            <Hero />

            {/* Categorías */}
            <section className="py-16 bg-neutral-50" aria-labelledby="categorias-heading">
                <div className="container-site">
                    <div className="text-center mb-10">
                        <span className="section-label">Explora por tipo</span>
                        <h2 id="categorias-heading" className="font-display text-3xl font-bold text-neutral-900 mt-3 sm:text-4xl">
                            ¿Qué tipo de inmueble buscas?
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {CATEGORIES.map(({ title, description, href, icon, color }) => (
                            <Link
                                key={href}
                                href={href}
                                className="group relative overflow-hidden rounded-2xl p-6 text-white transition-transform hover:-translate-y-1 hover:shadow-xl"
                                style={{ background: `linear-gradient(135deg, var(--tw-from-colors, #2563EB), var(--tw-to-colors, #1E40AF))` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90 group-hover:opacity-100 transition-opacity`} aria-hidden="true" />
                                <div className="relative z-10">
                                    <span className="text-4xl mb-3 block" aria-hidden="true">{icon}</span>
                                    <h3 className="font-display font-bold text-lg leading-tight">{title}</h3>
                                    <p className="mt-1 text-xs text-white/80 leading-relaxed">{description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Por qué elegirnos */}
            <section className="py-16 bg-white" aria-labelledby="porque-heading">
                <div className="container-site">
                    <div className="text-center mb-12">
                        <span className="section-label">Nuestra diferencia</span>
                        <h2 id="porque-heading" className="font-display text-3xl font-bold text-neutral-900 mt-3 sm:text-4xl">
                            ¿Por qué elegirnos?
                        </h2>
                        <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
                            Llevamos años ayudando a familias y empresas a encontrar el espacio ideal en Montería.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {WHY_US.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="card-base p-6 text-center group">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                                    <Icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">{title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-16 bg-hero-gradient" aria-labelledby="cta-heading">
                <div className="container-site text-center">
                    <h2 id="cta-heading" className="font-display text-3xl font-bold text-white sm:text-4xl">
                        ¿Listo para encontrar tu próximo hogar?
                    </h2>
                    <p className="mt-4 text-white/80 max-w-xl mx-auto">
                        Explora nuestro catálogo completo o contáctanos directamente por WhatsApp.
                        Te respondemos de inmediato.
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href="/arriendos"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-primary-700 hover:bg-neutral-50 shadow-xl transition-all hover:scale-105"
                        >
                            Ver propiedades disponibles
                        </Link>
                        <a
                            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '573000000000'}?text=${encodeURIComponent('Hola, estoy buscando una propiedad en Montería.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-8 py-4 font-bold text-white hover:bg-whatsapp-dark shadow-xl transition-all hover:scale-105"
                        >
                            Contactar por WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
