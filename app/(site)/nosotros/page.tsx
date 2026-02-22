import type { Metadata } from 'next'
import { Building2, Users, MapPin, Star, Phone, TrendingUp } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { SITE_NAME, SITE_URL, WHATSAPP_PHONE } from '@/lib/utils/constants'

export const metadata: Metadata = {
    title: 'Sobre Nosotros',
    description:
        'Conoce a Arriendos Montería: más de 8 años conectando familias y empresas con los mejores inmuebles en arriendo de Montería, Córdoba. Atención directa, precios justos.',
    alternates: { canonical: `${SITE_URL}/nosotros` },
    openGraph: {
        title: `Sobre Nosotros | ${SITE_NAME}`,
        description:
            'Tu aliado de confianza en arriendos residenciales y comerciales en Montería, Córdoba.',
        type: 'website',
        locale: 'es_CO',
    },
}

const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: `+${WHATSAPP_PHONE}`,
    description:
        'Empresa especializada en arriendos de inmuebles residenciales y comerciales en Montería, Córdoba, Colombia.',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Montería',
        addressRegion: 'Córdoba',
        addressCountry: 'CO',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 8.7479,
        longitude: -75.8814,
    },
    areaServed: { '@type': 'City', name: 'Montería' },
    priceRange: '$$',
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
        },
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '09:00',
            closes: '13:00',
        },
    ],
    sameAs: [`https://wa.me/${WHATSAPP_PHONE}`],
}

const STATS = [
    { icon: Building2, value: '200+', label: 'Propiedades publicadas' },
    { icon: Users, value: '500+', label: 'Familias ayudadas' },
    { icon: Star, value: '4.9', label: 'Calificación promedio' },
    { icon: TrendingUp, value: '8+', label: 'Años de experiencia' },
]

const VALUES = [
    {
        title: 'Transparencia',
        description:
            'Mostramos la información real de cada inmueble: precios, condiciones y ubicación aproximada.',
    },
    {
        title: 'Agilidad',
        description:
            'Respondemos de inmediato por WhatsApp. Sin formularios lentos ni esperas innecesarias.',
    },
    {
        title: 'Conocimiento local',
        description:
            'Conocemos Montería barrio por barrio. Te asesoramos según tu presupuesto y necesidades.',
    },
    {
        title: 'Compromiso',
        description:
            'Acompañamos el proceso hasta que encuentres el inmueble que buscas.',
    },
]

export default function NosotrosPage() {
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
        'Hola, quisiera más información sobre sus servicios de arriendo.'
    )}`

    return (
        <>
            <JsonLd data={localBusinessSchema} />
            <main className="page-fade-in">
                {/* Hero */}
                <section className="bg-hero-gradient py-16 sm:py-24">
                    <div className="container-site text-center">
                        <h1 className="font-display text-3xl font-bold text-white sm:text-5xl mb-4 leading-tight">
                            Tu aliado de confianza
                            <br className="hidden sm:block" />
                            en arriendos de Montería
                        </h1>
                        <p className="text-primary-200 text-lg max-w-2xl mx-auto">
                            Conectamos a familias y empresas con los mejores inmuebles en arriendo de
                            Montería, Córdoba. Atención directa, precios justos y conocimiento local.
                        </p>
                    </div>
                </section>

                <div className="container-site py-6">
                    <Breadcrumbs items={[{ label: 'Sobre nosotros' }]} />
                </div>

                {/* Estadísticas */}
                <section className="bg-white py-12" aria-label="Estadísticas del negocio">
                    <div className="container-site">
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                            {STATS.map(({ icon: Icon, value, label }) => (
                                <div key={label} className="text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50 mb-3">
                                        <Icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                                    </div>
                                    <p className="font-display text-3xl font-bold text-neutral-900">{value}</p>
                                    <p className="text-sm text-neutral-500 mt-1">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Historia / Misión */}
                <section className="bg-neutral-50 py-14" aria-labelledby="mision-heading">
                    <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="section-label">Nuestra historia</p>
                            <h2
                                id="mision-heading"
                                className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl mt-2 mb-5"
                            >
                                Más de 8 años facilitando
                                <br /> arriendos en Montería
                            </h2>
                            <div className="space-y-4 text-neutral-600 text-sm sm:text-base">
                                <p>
                                    Nacimos con una misión clara: simplificar el proceso de arrendar un inmueble
                                    en Montería. Sabemos que buscar casa o local puede ser estresante, por eso
                                    eliminamos intermediarios y conectamos directamente a propietarios con
                                    inquilinos.
                                </p>
                                <p>
                                    A lo largo de los años hemos construido un catálogo cuidadosamente
                                    seleccionado de propiedades en los mejores barrios de la ciudad, con
                                    información verificada y precios acordes al mercado.
                                </p>
                                <p>
                                    Hoy atendemos a cientos de familias y empresas cada año, siempre con el
                                    mismo compromiso: encontrar el inmueble ideal para cada persona.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-2xl bg-primary-600 p-6 text-white">
                                <Building2 className="h-8 w-8 mb-3 opacity-80" aria-hidden="true" />
                                <p className="font-display text-xl font-bold">Residencial</p>
                                <p className="text-primary-200 text-sm mt-1">
                                    Casas, apartamentos, apartaestudios
                                </p>
                            </div>
                            <div className="rounded-2xl bg-accent-600 p-6 text-white">
                                <TrendingUp className="h-8 w-8 mb-3 opacity-80" aria-hidden="true" />
                                <p className="font-display text-xl font-bold">Comercial</p>
                                <p className="text-green-100 text-sm mt-1">
                                    Locales, oficinas, bodegas
                                </p>
                            </div>
                            <div className="rounded-2xl bg-neutral-800 p-6 text-white col-span-2">
                                <MapPin className="h-8 w-8 mb-3 opacity-80" aria-hidden="true" />
                                <p className="font-display text-xl font-bold">Montería y área metropolitana</p>
                                <p className="text-neutral-400 text-sm mt-1">
                                    Norte, Sur, Centro, Este y Oeste de la ciudad
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Valores */}
                <section className="bg-white py-14" aria-labelledby="valores-heading">
                    <div className="container-site">
                        <div className="text-center mb-10">
                            <p className="section-label">Nuestros valores</p>
                            <h2
                                id="valores-heading"
                                className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl mt-2"
                            >
                                Cómo trabajamos
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {VALUES.map(({ title, description }) => (
                                <div key={title} className="card-base p-5">
                                    <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-neutral-600">{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section
                    className="bg-hero-gradient py-14"
                    aria-labelledby="cta-nosotros-heading"
                >
                    <div className="container-site text-center">
                        <Phone className="h-10 w-10 text-primary-200 mx-auto mb-4" aria-hidden="true" />
                        <h2
                            id="cta-nosotros-heading"
                            className="font-display text-2xl font-bold text-white sm:text-3xl mb-3"
                        >
                            ¿Buscas una propiedad en arriendo?
                        </h2>
                        <p className="text-primary-200 max-w-lg mx-auto mb-6">
                            Escríbenos por WhatsApp y te ayudamos de inmediato a encontrar el inmueble
                            ideal para ti o tu empresa.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20b558] text-white font-semibold px-6 py-3 transition-colors"
                            >
                                Contactar por WhatsApp
                            </a>
                            <a
                                href="/arriendos"
                                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 transition-colors"
                            >
                                Ver propiedades
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
