import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI7Lab',
    short_name: 'AI7Lab',
    description: 'Agentic AI products and enterprise solutions built in Dubai.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#004aad',
    icons: [{ src: '/favicon-ai7lab.png', sizes: 'any', type: 'image/png' }],
  }
}
