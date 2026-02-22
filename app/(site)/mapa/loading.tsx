import Skeleton from '@/components/ui/Skeleton'

export default function MapaLoading() {
    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
            <div className="flex-none px-4 py-3 bg-white border-b border-neutral-200 sm:px-6">
                <Skeleton className="h-5 w-48 mb-1" />
                <Skeleton className="h-3 w-32" />
            </div>
            <div className="flex-none px-4 py-2 bg-neutral-50 border-b border-neutral-100">
                <Skeleton className="h-3 w-80" />
            </div>
            <Skeleton className="flex-1 w-full rounded-none" />
        </div>
    )
}
