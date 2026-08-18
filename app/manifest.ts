import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI7Lab',
    short_name: 'AI7Lab',
    description: 'Research-led enterprise AI products built in Dubai.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [{ src: '/favicon-ai7lab.png', sizes: 'any', type: 'image/png' }],
  }
}
