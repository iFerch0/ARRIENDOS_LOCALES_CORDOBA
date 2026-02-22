import { Check } from 'lucide-react'

interface PropertyFeaturesProps {
    bedrooms?: number
    bathrooms?: number
    area?: number
    stratum?: number
    parking?: boolean
    features?: string[]
}

export default function PropertyFeatures({ bedrooms, bathrooms, area, stratum, parking, features }: PropertyFeaturesProps) {
    const specs = [
        bedrooms != null && { label: 'Habitaciones', value: String(bedrooms) },
        bathrooms != null && { label: 'Baños', value: String(bathrooms) },
        area != null && { label: 'Área construida', value: `${area} m²` },
        stratum != null && { label: 'Estrato', value: String(stratum) },
        parking != null && { label: 'Parqueadero', value: parking ? 'Sí' : 'No' },
    ].filter(Boolean) as { label: string; value: string }[]

    const hasFeatures = features && features.length > 0

    if (specs.length === 0 && !hasFeatures) return null

    return (
        <div className="space-y-6">
            {specs.length > 0 && (
                <div>
                    <h2 className="font-display text-xl font-semibold text-neutral-900 mb-4">
                        Especificaciones
                    </h2>
                    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {specs.map(({ label, value }) => (
                            <div key={label} className="rounded-xl bg-neutral-50 p-4">
                                <dt className="text-xs text-neutral-500 mb-1">{label}</dt>
                                <dd className="font-bold text-neutral-900 text-lg">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            )}

            {hasFeatures && (
                <div>
                    <h2 className="font-display text-xl font-semibold text-neutral-900 mb-4">
                        Características
                    </h2>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {features!.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-neutral-700">
                                <Check className="h-4 w-4 flex-shrink-0 text-accent-500" aria-hidden="true" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
