import type { Metadata } from 'next'
import { Heart } from 'lucide-react'
import { SITE_URL } from '@/lib/utils/constants'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import FavoritesContent from './FavoritesContent'

export const metadata: Metadata = {
    title: 'Mis Favoritos',
    description: 'Propiedades en arriendo que has guardado en tu lista de favoritos.',
    alternates: { canonical: `${SITE_URL}/favoritos` },
    robots: { index: false, follow: false },
}

export default function FavoritosPage() {
    return (
        <main className="container-site py-10 page-fade-in">
            <Breadcrumbs items={[{ label: 'Mis Favoritos' }]} />

            <div className="mt-8 mb-8 flex items-center gap-3">
                <Heart className="h-7 w-7 text-red-400" aria-hidden="true" />
                <h1 className="font-display text-3xl font-bold text-neutral-900">
                    Mis Favoritos
                </h1>
            </div>

            <FavoritesContent />
        </main>
    )
}
