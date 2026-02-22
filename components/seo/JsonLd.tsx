interface JsonLdProps {
    data: Record<string, unknown>
}

/** Renderiza un bloque JSON-LD de Schema.org en el <head>. Usar en Server Components. */
export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}
