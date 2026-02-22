import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Tag } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import type { BlogPost } from '@/lib/sanity/types'

interface BlogCardProps {
    post: BlogPost
}

const CATEGORY_VARIANT: Record<string, 'primary' | 'accent' | 'warning' | 'neutral'> = {
    Guías: 'primary',
    Mercado: 'accent',
    Barrios: 'accent',
    Consejos: 'primary',
    Legal: 'warning',
}

function formatDate(iso?: string) {
    if (!iso) return null
    return new Date(iso).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default function BlogCard({ post }: BlogCardProps) {
    const href = `/blog/${post.slug.current}`
    const imgUrl = post.coverImage?.asset?.url
    const lqip = post.coverImage?.asset?.metadata?.lqip
    const date = formatDate(post.publishedAt)

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <Link href={href} tabIndex={-1} aria-hidden="true">
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                    {imgUrl ? (
                        <Image
                            src={imgUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            placeholder={lqip ? 'blur' : 'empty'}
                            blurDataURL={lqip}
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                            <Tag className="h-10 w-10 text-primary-400" aria-hidden="true" />
                        </div>
                    )}
                    {post.category && (
                        <div className="absolute top-3 left-3">
                            <Badge variant={CATEGORY_VARIANT[post.category] ?? 'neutral'}>
                                {post.category}
                            </Badge>
                        </div>
                    )}
                </div>
            </Link>

            <div className="flex flex-1 flex-col gap-3 p-5">
                {date && (
                    <p className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <Calendar className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                        {date}
                    </p>
                )}

                <h2 className="font-display text-lg font-semibold text-neutral-900 leading-snug line-clamp-2">
                    <Link href={href} className="hover:text-primary-600 transition-colors">
                        {post.title}
                    </Link>
                </h2>

                {post.excerpt && (
                    <p className="text-sm text-neutral-600 line-clamp-3 flex-1">
                        {post.excerpt}
                    </p>
                )}

                <Link
                    href={href}
                    className="mt-auto text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                    Leer artículo →
                </Link>
            </div>
        </article>
    )
}
