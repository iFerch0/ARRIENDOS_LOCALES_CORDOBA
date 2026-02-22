import Skeleton from '@/components/ui/Skeleton'

function PropertyCardSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-3 w-full" />
            </div>
        </div>
    )
}

export default function NeighborhoodLoading() {
    return (
        <div>
            {/* Hero skeleton */}
            <Skeleton className="h-56 w-full sm:h-72" />

            <div className="container-site py-8">
                <Skeleton className="h-4 w-64 mb-8" />

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-3">
                            <Skeleton className="h-7 w-48" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-7 w-56" />
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <PropertyCardSkeleton key={i} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="h-40 w-full rounded-2xl" />
                        <Skeleton className="h-32 w-full rounded-2xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}
