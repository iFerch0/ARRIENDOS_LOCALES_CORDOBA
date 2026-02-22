// Re-export para que `npx sanity dev` encuentre la configuración.
// El Studio embebido en Next.js (/studio) importa desde ./sanity/sanity.config directamente.
export { default } from './sanity/sanity.config'
