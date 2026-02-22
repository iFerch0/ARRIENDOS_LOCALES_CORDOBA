import Skeleton from '@/components/ui/Skeleton'

function BlogCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <Skeleton className="aspect-[16/9] w-full" />
            <div className="flex flex-col gap-3 p-5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-20 mt-2" />
            </div>
        </div>
    )
}

export default function BlogLoading() {
    return (
        <div className="container-site py-10">
            <Skeleton className="h-4 w-48 mb-8" />
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-9 w-64 mb-3" />
            <Skeleton className="h-4 w-96" />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <BlogCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}
