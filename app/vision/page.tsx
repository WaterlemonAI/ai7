import type { Metadata } from 'next'
import { VisionPageContent } from '@/components/vision/vision-page'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Our Vision | Sovereign AI Ecosystem',
  description: 'AI7Lab is building a Sovereign AI ecosystem that combines AI research, infrastructure, Forward Deployed Engineers, technology partners, GTM partners, and access to 130+ qualified AI engineers and developers.',
  path: '/vision',
  keywords: ['Sovereign AI', 'enterprise AI', 'AI ecosystem', 'Forward Deployed Engineers', 'AI engineering', 'AI governance', 'UAE AI ecosystem'],
})

export default function VisionPage() {
  return <VisionPageContent />
}
