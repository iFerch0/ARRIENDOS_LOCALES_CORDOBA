import Skeleton from '@/components/ui/Skeleton'

export default function FavoritosLoading() {
    return (
        <div className="container-site py-10">
            <Skeleton className="h-4 w-48 mb-8" />
            <div className="flex items-center gap-3 mb-8">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-9 w-40" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                        <Skeleton className="h-52 w-full" />
                        <div className="p-4 space-y-2">
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-9 w-full mt-1" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
