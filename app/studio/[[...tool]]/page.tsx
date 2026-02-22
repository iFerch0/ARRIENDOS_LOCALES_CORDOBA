import Studio from './Studio'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Panel de Administración | Arriendos Montería',
    robots: { index: false, follow: false },
}

export default function StudioPage() {
    return <Studio />
}
