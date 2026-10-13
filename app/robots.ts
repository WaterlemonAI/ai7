import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_DEPLOY_ENV === 'staging') {
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: ['OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'ClaudeBot', 'PerplexityBot'], allow: ['/', '/llms.txt', '/llms-full.txt'], disallow: ['/api/'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
