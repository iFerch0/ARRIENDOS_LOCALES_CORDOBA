import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import type { ReactNode } from 'react'

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {/* div en lugar de main: cada page define su propio <main> para evitar landmarks anidados */}
            <div id="main-content" className="flex-1 pt-16">
                {children}
            </div>
            <Footer />
            <WhatsAppFloat />
        </>
    )
}
