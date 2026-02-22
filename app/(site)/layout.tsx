import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import type { ReactNode } from 'react'

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <main id="main-content" className="flex-1 pt-16">
                {children}
            </main>
            <Footer />
            <WhatsAppFloat />
        </>
    )
}
