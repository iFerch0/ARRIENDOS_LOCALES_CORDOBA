import { PropertyGridSkeleton } from '@/components/property/PropertyGrid'
import Skeleton from '@/components/ui/Skeleton'

export default function ArriendosLoading() {
    return (
        <div className="container-site py-10">
            <div className="mb-8">
                <Skeleton className="h-10 w-72 mb-2" />
                <Skeleton className="h-5 w-40" />
            </div>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[62px]" />)}
            </div>
            <PropertyGridSkeleton count={9} />
        </div>
    )
}
