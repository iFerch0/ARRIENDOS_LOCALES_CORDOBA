import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { ALL_BLOG_POSTS } from '@/lib/sanity/queries'
import { SITE_URL } from '@/lib/utils/constants'
import BlogCard from '@/components/blog/BlogCard'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import type { BlogPost } from '@/lib/sanity/types'

export const metadata: Metadata = {
    title: 'Blog',
    description:
        'Artículos sobre arriendos, barrios de Montería, guías para inquilinos y propietarios, consejos inmobiliarios y más.',
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
        title: 'Blog | Arriendos Montería',
        description: 'Guías, consejos y noticias sobre el mercado inmobiliario en Montería.',
        type: 'website',
        locale: 'es_CO',
    },
}

export default async function BlogPage() {
    let posts: BlogPost[] = []
    try {
        posts = await sanityFetch<BlogPost[]>(ALL_BLOG_POSTS)
    } catch {
        // Sin conexión a Sanity: mostrar estado vacío
    }

    return (
        <main className="container-site py-10 page-fade-in">
            <Breadcrumbs items={[{ label: 'Blog' }]} />

            <div className="mt-8 mb-10">
                <p className="section-label">Recursos</p>
                <h1 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl mt-2">
                    Blog de Arriendos
                </h1>
                <p className="mt-3 text-neutral-600 max-w-2xl">
                    Guías, consejos y todo lo que necesitas saber sobre el mercado de arriendos en Montería.
                </p>
            </div>

            {posts.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-neutral-500 text-lg">Próximamente publicaremos artículos.</p>
                    <p className="text-neutral-400 text-sm mt-1">Vuelve pronto.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <BlogCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </main>
    )
}
