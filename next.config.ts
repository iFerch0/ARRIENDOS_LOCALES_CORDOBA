import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      // Seguridad — todas las rutas
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Sanity Studio — permite iframe embebido
      {
        source: '/studio/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      // Assets estáticos de Next.js — caché inmutable (nombre incluye hash)
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
