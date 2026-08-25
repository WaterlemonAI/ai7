import type { MetadataRoute } from 'next'
import { jobs, siteUrl } from '@/lib/site'
import { blogPosts, getBlogHero } from '@/lib/blogs'
import { editorialArticles, getPillarImage } from '@/lib/editorial'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/vision', '/products', '/platform', '/technology', '/insights', '/announcements', '/careers', '/contact']
  return [
    ...routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date('2026-08-18'), changeFrequency: route === '/announcements' || route === '/insights' ? 'weekly' as const : 'monthly' as const, priority: route === '' ? 1 : 0.8, ...(route === '' ? { images: [`${siteUrl}/opengraph-image`] } : {}) })),
    ...jobs.map((job) => ({ url: `${siteUrl}/careers/${job.slug}`, lastModified: new Date('2026-08-18'), changeFrequency: 'weekly' as const, priority: 0.9 })),
    ...blogPosts.map((post) => ({ url: `${siteUrl}/insights/${post.slug}`, lastModified: new Date(post.publishedAt), changeFrequency: 'monthly' as const, priority: 0.8, images: [`${siteUrl}${getBlogHero(post.slug).src}`, `${siteUrl}/insights/${post.slug}/opengraph-image`] })),
    ...editorialArticles.map((post) => ({ url: `${siteUrl}/insights/research/${post.slug}`, lastModified: new Date('2026-08-26'), changeFrequency: 'monthly' as const, priority: 0.85, images: [`${siteUrl}/insights/research/${post.slug}/opengraph-image`, `${siteUrl}${getPillarImage(post.pillar)}`] })),
  ]
}
