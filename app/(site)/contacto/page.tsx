import type { Metadata } from 'next'
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ContactForm from './ContactForm'
import { SITE_NAME, SITE_URL, WHATSAPP_PHONE } from '@/lib/utils/constants'

export const metadata: Metadata = {
    title: 'Contacto',
    description:
        'Contáctanos para arrendar casas, apartamentos o locales comerciales en Montería. Atención inmediata por WhatsApp.',
    alternates: { canonical: `${SITE_URL}/contacto` },
}

const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: `+${WHATSAPP_PHONE}`,
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

export default function ContactoPage() {
    const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola, me interesa conocer sus propiedades en arriendo.')}`

    return (
        <>
            <JsonLd data={localBusinessSchema} />

            <main className="container-site py-10 page-fade-in">
                <Breadcrumbs items={[{ label: 'Contacto' }]} />

                <div className="mt-8 max-w-4xl mx-auto">
                    <h1 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl mb-3">
                        Contáctanos
                    </h1>
                    <p className="text-neutral-600 text-lg mb-10">
                        Encuentra tu propiedad ideal en Montería. Respondemos de inmediato por WhatsApp.
                    </p>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Info de contacto */}
                        <div className="space-y-6">
                            <div className="rounded-2xl bg-primary-50 border border-primary-100 p-6">
                                <h2 className="font-display text-xl font-semibold text-neutral-900 mb-5">
                                    Información de contacto
                                </h2>

                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                                        <div>
                                            <p className="font-medium text-neutral-800">Ubicación</p>
                                            <p className="text-neutral-600 text-sm">Montería, Córdoba, Colombia</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                                        <div>
                                            <p className="font-medium text-neutral-800">WhatsApp</p>
                                            <a
                                                href={waLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                                            >
                                                +{WHATSAPP_PHONE.replace(/^57/, '+57 ').replace(/(\d{3})(\d{7})$/, '$1 $2')}
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                                        <div>
                                            <p className="font-medium text-neutral-800">Horario de atención</p>
                                            <p className="text-neutral-600 text-sm">Lun – Vie: 8:00 am – 6:00 pm</p>
                                            <p className="text-neutral-600 text-sm">Sáb: 9:00 am – 1:00 pm</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* CTA WhatsApp directo */}
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] hover:bg-[#20b558] text-white font-semibold py-4 px-6 transition-colors text-base"
                            >
                                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                                Chatear ahora por WhatsApp
                            </a>
                        </div>

                        {/* Formulario */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                            <h2 className="font-display text-xl font-semibold text-neutral-900 mb-5">
                                Envíanos un mensaje
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
