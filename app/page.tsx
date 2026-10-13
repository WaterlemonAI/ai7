import type { Metadata } from 'next'
import { RehaulHomePage } from '@/components/rehaul/home-page'
import { pageMetadata } from '@/lib/seo'

const title = 'AI7Lab | Agentic AI Products Built for Real Work'
export const metadata: Metadata = {
  ...pageMetadata({
    title,
    description: 'AI7Lab creates agentic AI products and works with leading organisations to reduce cost, improve efficiency, and build new operational capability.',
    path: '/',
    keywords: ['agentic AI products', 'enterprise AI Dubai', 'supplier intelligence', 'customer operations AI', 'AI automation UAE'],
  }),
  title: { absolute: title },
}

export default function HomePage() {
  return <RehaulHomePage />
}
