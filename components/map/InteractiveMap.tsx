'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { PROPERTY_TYPE_LABELS, PROPERTY_TYPE_PLURAL } from '@/lib/utils/constants'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { MapProperty, PropertyType } from '@/lib/sanity/types'

const MONTERIA: [number, number] = [8.7479, -75.8814]

const TYPE_COLORS: Record<PropertyType, string> = {
    casa: '#2563EB',
    apartamento: '#7C3AED',
    local: '#059669',
    oficina: '#D97706',
    bodega: '#6B7280',
    apartaestudio: '#DB2777',
    finca: '#16A34A',
}

function makeIcon(color: string) {
    return L.divIcon({
        html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -14],
        className: '',
    })
}

interface InteractiveMapProps {
    properties: MapProperty[]
}

export default function InteractiveMap({ properties }: InteractiveMapProps) {
    return (
        <MapContainer
            center={MONTERIA}
            zoom={13}
            className="h-full w-full"
            scrollWheelZoom
            aria-label="Mapa de propiedades en Montería"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {properties.map((p) => (
                <Marker
                    key={p._id}
                    position={[p.location.lat, p.location.lng]}
                    icon={makeIcon(TYPE_COLORS[p.propertyType] ?? '#2563EB')}
                >
                    <Popup minWidth={220} maxWidth={260}>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', padding: '2px' }}>
                            {p.mainImage?.asset?.url && (
                                <img
                                    src={p.mainImage.asset.url}
                                    alt={p.title}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '110px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        marginBottom: '8px',
                                        display: 'block',
                                    }}
                                />
                            )}
                            <span
                                style={{
                                    display: 'inline-block',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    padding: '2px 8px',
                                    borderRadius: '99px',
                                    background: (TYPE_COLORS[p.propertyType] ?? '#2563EB') + '22',
                                    color: TYPE_COLORS[p.propertyType] ?? '#2563EB',
                                    marginBottom: '6px',
                                }}
                            >
                                {PROPERTY_TYPE_LABELS[p.propertyType]}
                            </span>
                            <p style={{ fontWeight: 600, color: '#171717', lineHeight: 1.3, margin: '0 0 4px' }}>
                                {p.title}
                            </p>
                            <p style={{ fontWeight: 700, color: '#1D4ED8', fontSize: '13px', margin: '0 0 10px' }}>
                                {formatPrice(p.price)}/mes
                            </p>
                            <a
                                href={`/arriendos/${PROPERTY_TYPE_PLURAL[p.propertyType]}/${p.slug.current}`}
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    background: '#2563EB',
                                    color: '#fff',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    padding: '7px 0',
                                    borderRadius: '6px',
                                    textDecoration: 'none',
                                }}
                            >
                                Ver propiedad →
                            </a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
