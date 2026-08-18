import type { Metadata } from 'next'

export const brandName = 'AI7Lab'
export const defaultDescription =
  'AI7Lab is a research-led AI product company in Dubai building visual intelligence, supplier intelligence, and multilingual voice automation for enterprises.'

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
  const socialTitle = title.startsWith(brandName) ? title : `${title} | ${brandName}`
  const socialImage = { url: '/opengraph-image', width: 1200, height: 630, alt: 'AI7Lab — Enterprise AI research and products from Dubai' }
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
