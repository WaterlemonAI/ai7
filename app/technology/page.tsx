import type { Metadata } from 'next'
import { TechnologyPageContent } from '@/components/technology/technology-page'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Sovereign AI Technology Stack',
  description: 'Explore AI7Lab’s Sovereign AI technology stack spanning GPU infrastructure, model runtimes, enterprise data, multimodal intelligence, AI agents, governance, security and observability.',
  path: '/technology',
  keywords: ['sovereign AI', 'enterprise AI infrastructure', 'private AI', 'self-hosted LLM', 'GPU infrastructure', 'enterprise AI agents', 'AI governance', 'AI security', 'model orchestration', 'AI observability'],
})

export default function TechnologyPage() {
  return <TechnologyPageContent />
}
