import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { linkedInUrl, siteUrl } from '@/lib/site'
import { defaultDescription } from '@/lib/seo'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI7Lab — The Operating System for AI-Native Enterprises',
    template: '%s | AI7Lab',
  },
  description: defaultDescription,
  keywords: [
    'AI7Lab',
    'AI research lab',
    'enterprise AI',
    'AI platform',
    'Dubai AI',
    'UAE AI',
    'AI venture studio',
    'AI compliance',
    'KYC automation',
    'visual intelligence LLM',
    'speech to speech AI',
    'RoleField',
  ],
  generator: 'v0.app',
  applicationName: 'AI7Lab',
  creator: 'AI7Lab',
  publisher: 'AI7Lab',
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: {
    title: 'AI7Lab — The Operating System for AI-Native Enterprises',
    description:
      'A research-led AI product company building visual intelligence, supplier intelligence, and voice-led automation. Born in Dubai, designed for the world.',
    url: siteUrl,
    siteName: 'AI7Lab',
    locale: 'en_AE',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/favicon-ai7lab.png', type: 'image/png' }],
    shortcut: '/favicon-ai7lab.png',
    apple: '/favicon-ai7lab.png',
  },
  manifest: '/manifest.webmanifest',
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'AI7Lab',
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/ai7lab-logo.png`, width: 600, height: 315 },
    sameAs: [linkedInUrl],
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    contactPoint: { '@type': 'ContactPoint', email: 'contact@ai7lab.net', contactType: 'business inquiries', areaServed: 'AE', availableLanguage: ['English', 'Arabic'] },
  }
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'AI7Lab', description: defaultDescription, publisher: { '@id': `${siteUrl}/#organization` }, inLanguage: 'en' }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI7Lab LLM index" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="AI7Lab full LLM context" />
      </head>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, '\\u003c') }} />
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
