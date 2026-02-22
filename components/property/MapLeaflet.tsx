'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { GeoPoint } from '@/lib/sanity/types'

// Icono personalizado con div para evitar el bug de imágenes en Next.js
const markerIcon = L.divIcon({
    html: `<div style="background:#2563EB;width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    className: '',
})

interface MapLeafletProps {
    location: GeoPoint
    title: string
}

export default function MapLeaflet({ location, title }: MapLeafletProps) {
    const position: [number, number] = [location.lat, location.lng]

    return (
        <MapContainer
            center={position}
            zoom={15}
            className="h-full w-full"
            scrollWheelZoom={false}
            aria-label={`Ubicación de ${title} en el mapa`}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
                <Popup>{title}</Popup>
            </Marker>
        </MapContainer>
    )
}
