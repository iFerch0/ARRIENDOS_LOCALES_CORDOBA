'use client'

import dynamic from 'next/dynamic'
import Skeleton from '@/components/ui/Skeleton'
import type { MapProperty } from '@/lib/sanity/types'

const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full rounded-none" />,
})

interface MapWrapperProps {
    properties: MapProperty[]
}

export default function MapWrapper({ properties }: MapWrapperProps) {
    return <InteractiveMap properties={properties} />
}
