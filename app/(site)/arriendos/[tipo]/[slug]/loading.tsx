import Skeleton from '@/components/ui/Skeleton'

export default function PropertyDetailLoading() {
    return (
        <div className="container-site py-10">
            {/* Breadcrumb */}
            <Skeleton className="h-5 w-64 mb-6" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Columna principal */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Galería */}
                    <Skeleton className="h-72 md:h-[480px] w-full rounded-2xl" />

                    {/* Título */}
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-24 rounded-md" />
                            <Skeleton className="h-6 w-20 rounded-md" />
                        </div>
                        <Skeleton className="h-9 w-3/4" />
                        <Skeleton className="h-5 w-48" />
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-20 rounded-xl" />
                        ))}
                    </div>

                    {/* Descripción */}
                    <Skeleton lines={4} />
                </div>

                {/* Sidebar */}
                <Skeleton className="h-72 rounded-2xl" />
            </div>
        </div>
    )
}
