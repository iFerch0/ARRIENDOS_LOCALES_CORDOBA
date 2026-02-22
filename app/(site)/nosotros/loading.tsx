import Skeleton from '@/components/ui/Skeleton'

export default function NosotrosLoading() {
    return (
        <div>
            {/* Hero skeleton */}
            <div className="bg-neutral-800 py-16 sm:py-24">
                <div className="container-site text-center space-y-4">
                    <Skeleton className="h-10 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-2/3 mx-auto" />
                </div>
            </div>

            <div className="container-site py-6">
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Stats */}
            <div className="bg-white py-12">
                <div className="container-site grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="text-center space-y-2">
                            <Skeleton className="h-12 w-12 rounded-2xl mx-auto" />
                            <Skeleton className="h-8 w-16 mx-auto" />
                            <Skeleton className="h-3 w-24 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Historia */}
            <div className="bg-neutral-50 py-14">
                <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-2">
                    <div className="space-y-3">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-32 rounded-2xl" />
                        <Skeleton className="h-32 rounded-2xl" />
                        <Skeleton className="h-28 rounded-2xl col-span-2" />
                    </div>
                </div>
            </div>

            {/* Valores */}
            <div className="bg-white py-14">
                <div className="container-site">
                    <div className="text-center mb-10 space-y-2">
                        <Skeleton className="h-3 w-24 mx-auto" />
                        <Skeleton className="h-8 w-48 mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="rounded-2xl border border-neutral-200 p-5 space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-4/5" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
