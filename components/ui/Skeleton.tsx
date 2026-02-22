import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
    className?: string
    /** Cuántas líneas mostrar (útil para texto) */
    lines?: number
}

export default function Skeleton({ className, lines = 1 }: SkeletonProps) {
    if (lines > 1) {
        return (
            <div className="space-y-2">
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            'skeleton h-4 rounded',
                            i === lines - 1 && 'w-3/4',
                            className
                        )}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className={cn('skeleton rounded', className)} />
    )
}

/** Skeleton de PropertyCard */
export function PropertyCardSkeleton() {
    return (
        <div className="card-base overflow-hidden">
            <Skeleton className="h-52 w-full rounded-none" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-4 pt-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-8 w-full mt-2" />
            </div>
        </div>
    )
}
