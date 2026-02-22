import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

/* ── Fuentes ──────────────────────────────────────────────── */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

/* ── Metadata global ──────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tudominio.com.co'),
  title: {
    default: 'Arriendos Montería | Casas y Locales en Arriendo',
    template: '%s | Arriendos Montería',
  },
  description:
    'Encuentra casas, apartamentos y locales comerciales en arriendo en Montería, Córdoba. Las mejores propiedades al mejor precio. Contáctanos por WhatsApp.',
  keywords: [
    'arriendos montería',
    'casas en arriendo montería',
    'apartamentos en arriendo montería',
    'locales comerciales montería',
    'inmuebles córdoba colombia',
    'arriendo córdoba',
  ],
  authors: [{ name: 'Arriendos Montería' }],
  creator: 'Arriendos Montería',
  publisher: 'Arriendos Montería',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tudominio.com.co',
    siteName: 'Arriendos Montería',
    title: 'Arriendos Montería | Casas y Locales en Arriendo',
    description:
      'Encuentra casas, apartamentos y locales en arriendo en Montería. Contacto directo por WhatsApp.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Arriendos Montería – Casas y Locales en Arriendo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arriendos Montería | Casas y Locales en Arriendo',
    description:
      'Encuentra casas, apartamentos y locales en arriendo en Montería, Córdoba.',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tudominio.com.co',
  },
}

export const viewport: Viewport = {
  themeColor: '#2563EB',
  width: 'device-width',
  initialScale: 1,
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/* ── Layout raíz ──────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
