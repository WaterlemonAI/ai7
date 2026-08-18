import { Hero } from '@/components/home/hero'
import { Thesis } from '@/components/home/thesis'
import { Ecosystem } from '@/components/home/ecosystem'
import { Capabilities } from '@/components/home/capabilities'
import { WhyUAE } from '@/components/home/why-uae'
import { Industries } from '@/components/home/industries'
import { CTA } from '@/components/home/cta'
import { Announcements } from '@/components/home/announcements'
import { defaultDescription, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'AI7Lab — Enterprise AI Research & Products from Dubai',
  description: defaultDescription,
  path: '/',
  keywords: ['enterprise AI Dubai', 'visual intelligence API', 'supplier intelligence', 'multilingual voice AI', 'AI research lab UAE'],
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <Thesis />
      <Ecosystem />
      <Capabilities />
      <WhyUAE />
      <Industries />
      <Announcements />
      <CTA />
    </>
  )
}
import type { Metadata } from 'next'
