'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { SanityImage } from '@/lib/sanity/types'

interface PropertyGalleryProps {
    images: SanityImage[]
    title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
    const [current, setCurrent] = useState(0)
    const total = images.length

    if (total === 0) {
        return (
            <div className="h-80 md:h-[480px] rounded-2xl bg-neutral-100 flex items-center justify-center">
                <span className="text-6xl" aria-hidden="true">🏠</span>
            </div>
        )
    }

    const prev = () => setCurrent((i) => (i - 1 + total) % total)
    const next = () => setCurrent((i) => (i + 1) % total)
    const img = images[current]

    return (
        <div className="space-y-3">
            {/* Imagen principal */}
            <div className="relative h-72 md:h-[480px] rounded-2xl overflow-hidden bg-neutral-100">
                <Image
                    src={img.asset.url}
                    alt={img.alt ?? `${title} — foto ${current + 1} de ${total}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 65vw"
                    priority={current === 0}
                    className="object-cover"
                    placeholder={img.asset.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={img.asset.metadata?.lqip}
                />

                {total > 1 && (
                    <>
                        <button onClick={prev} aria-label="Foto anterior"
                            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all">
                            <ChevronLeft className="h-5 w-5 text-neutral-700" aria-hidden="true" />
                        </button>
                        <button onClick={next} aria-label="Foto siguiente"
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all">
                            <ChevronRight className="h-5 w-5 text-neutral-700" aria-hidden="true" />
                        </button>
                        <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                            {current + 1} / {total}
                        </div>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {total > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Ver foto ${i + 1}`}
                            aria-current={i === current}
                            className={cn(
                                'relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all',
                                i === current
                                    ? 'ring-2 ring-primary-500 ring-offset-1'
                                    : 'opacity-60 hover:opacity-100'
                            )}
                        >
                            <Image src={img.asset.url} alt={img.alt ?? `Foto ${i + 1}`}
                                fill sizes="96px" className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
