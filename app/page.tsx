import type { Metadata } from 'next'
import { SovereignHome } from '@/components/home/sovereign/home'
import { pageMetadata } from '@/lib/seo'

const title = 'AI7Lab | Sovereign AI Infrastructure, Engineering & Enterprise AI'
export const metadata: Metadata = {
  ...pageMetadata({
    title,
    description: 'AI7Lab designs, builds and operates Sovereign AI environments for enterprises and governments, spanning strategy, GPUs, models, applications, security, governance and production operations.',
    path: '/',
    keywords: ['Sovereign AI', 'enterprise AI infrastructure', 'private AI deployment', 'GPU infrastructure', 'Forward Deployed Engineers', 'AI governance'],
  }),
  title: { absolute: title },
}

export default function HomePage() {
  return <SovereignHome />
}
