import type { Metadata } from 'next'
import { canonicalBrandText } from './brand-text'

export const brandName = 'AI7Lab'
export const defaultDescription =
  'AI7Lab creates agentic AI products and works with leading organisations to solve business problems, reduce cost, improve efficiency, and build new operational capability.'

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string
  description: string
  path: `/${string}` | '/'
  keywords?: string[]
}): Metadata {
  title = canonicalBrandText(title)
  description = canonicalBrandText(description)
  keywords = keywords.map(canonicalBrandText)
  const socialTitle = title.startsWith(brandName) ? title : `${title} | ${brandName}`
  const socialImage = { url: '/opengraph-image', width: 1200, height: 630, alt: 'AI7Lab — agentic AI products built for real work' }
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: brandName,
      locale: 'en_AE',
      type: 'website',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: ['/opengraph-image'],
    },
  }
}
