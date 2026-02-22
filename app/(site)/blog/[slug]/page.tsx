import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Calendar, Tag } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity/client'
import { BLOG_POST_BY_SLUG, ALL_SLUGS } from '@/lib/sanity/queries'
import { SITE_NAME, SITE_URL } from '@/lib/utils/constants'
import { getImageUrl } from '@/lib/sanity/image'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import Badge from '@/components/ui/Badge'
import type { BlogPost, SanityImage } from '@/lib/sanity/types'

type Params = Promise<{ slug: string }>

type SlugsData = { blogPosts: { slug: string }[] }

const CATEGORY_VARIANT: Record<string, 'primary' | 'accent' | 'warning' | 'neutral'> = {
    Guías: 'primary',
    Mercado: 'accent',
    Barrios: 'accent',
    Consejos: 'primary',
    Legal: 'warning',
}

export const dynamicParams = true

export async function generateStaticParams() {
    try {
        const data = await sanityFetch<SlugsData>(ALL_SLUGS)
        return data.blogPosts.map((b) => ({ slug: b.slug }))
    } catch {
        return []
    }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params
    const post = await sanityFetch<BlogPost>(BLOG_POST_BY_SLUG, { slug })
    if (!post) return {}

    const title = post.seoTitle ?? post.title
    const description = post.seoDescription ?? post.excerpt ?? post.title
    const imageUrl = post.coverImage?.asset?.url
    const canonical = `${SITE_URL}/blog/${slug}`

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            type: 'article',
            locale: 'es_CO',
            url: canonical,
            publishedTime: post.publishedAt,
            images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : [],
        },
        twitter: { card: 'summary_large_image' },
    }
}

// ── PortableText renderers ──────────────────────────────────────

interface PTImageValue extends SanityImage {
    caption?: string
}

const ptComponents = {
    types: {
        image: ({ value }: { value: PTImageValue }) => {
            const url = getImageUrl(value, 900)
            if (!url) return null
            const lqip = value.asset?.metadata?.lqip
            return (
                <figure className="my-8">
                    <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
                        <Image
                            src={url}
                            alt={value.alt ?? ''}
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover"
                            placeholder={lqip ? 'blur' : 'empty'}
                            blurDataURL={lqip}
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="mt-2 text-center text-sm text-neutral-500">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        },
    },
}

// ── Page ────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: { params: Params }) {
    const { slug } = await params
    const post = await sanityFetch<BlogPost>(BLOG_POST_BY_SLUG, { slug })
    if (!post) notFound()

    const publishedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null

    const coverUrl = post.coverImage?.asset?.url
    const lqip = post.coverImage?.asset?.metadata?.lqip
    const canonical = `${SITE_URL}/blog/${slug}`

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.seoDescription ?? post.excerpt,
        datePublished: post.publishedAt,
        image: coverUrl,
        url: canonical,
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
        },
        ...(post.category ? { articleSection: post.category } : {}),
    }

    return (
        <>
            <JsonLd data={articleSchema} />
            <main className="container-site py-10 page-fade-in">
                <Breadcrumbs items={[
                    { label: 'Blog', href: '/blog' },
                    { label: post.title },
                ]} />

                <article className="mt-8 mx-auto max-w-3xl">
                    {/* Meta superior */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {post.category && (
                            <Badge variant={CATEGORY_VARIANT[post.category] ?? 'neutral'}>
                                {post.category}
                            </Badge>
                        )}
                        {publishedDate && (
                            <span className="flex items-center gap-1.5 text-sm text-neutral-500">
                                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                                {publishedDate}
                            </span>
                        )}
                    </div>

                    {/* Título */}
                    <h1 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl leading-tight mb-6">
                        {post.title}
                    </h1>

                    {/* Imagen de portada */}
                    {coverUrl && (
                        <div className="relative mb-8 overflow-hidden rounded-2xl" style={{ aspectRatio: '16/9' }}>
                            <Image
                                src={coverUrl}
                                alt={post.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 800px"
                                className="object-cover"
                                placeholder={lqip ? 'blur' : 'empty'}
                                blurDataURL={lqip}
                            />
                        </div>
                    )}

                    {/* Extracto */}
                    {post.excerpt && (
                        <p className="text-lg text-neutral-600 leading-relaxed mb-8 border-l-4 border-primary-200 pl-4">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Contenido */}
                    {post.body && post.body.length > 0 && (
                        <div className="prose prose-neutral max-w-none prose-headings:font-display prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                            <PortableText value={post.body} components={ptComponents} />
                        </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-10 pt-6 border-t border-neutral-200">
                            <div className="flex flex-wrap items-center gap-2">
                                <Tag className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>

                {/* CTA al final */}
                <div className="mt-12 mx-auto max-w-3xl rounded-2xl bg-primary-50 border border-primary-100 p-6 text-center">
                    <h2 className="font-display text-xl font-semibold text-neutral-900 mb-2">
                        ¿Buscas una propiedad en arriendo?
                    </h2>
                    <p className="text-neutral-600 text-sm mb-4">
                        Explora nuestro catálogo de casas, apartamentos y locales en Montería.
                    </p>
                    <a
                        href="/arriendos"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 text-sm transition-colors"
                    >
                        Ver propiedades disponibles
                    </a>
                </div>
            </main>
        </>
    )
}
