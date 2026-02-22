import Skeleton from '@/components/ui/Skeleton'

export default function BlogPostLoading() {
    return (
        <div className="container-site py-10">
            <Skeleton className="h-4 w-56 mb-8" />

            <div className="mx-auto max-w-3xl space-y-4">
                <div className="flex gap-3">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-4/5" />
                <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-48 mt-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    )
}
