import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { announcements } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Announcements',
  description: 'Product releases, AI research updates, leadership news, and company announcements from AI7Lab.',
  path: '/announcements',
  keywords: ['AI7Lab announcements', 'enterprise AI product releases', 'AI research news Dubai'],
})

export default function AnnouncementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Announcements"
        title="What we are shipping, learning, and building next."
        description="Follow product releases, research milestones, leadership updates, and the latest from our team in Dubai."
      />
      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="space-y-px border-b border-border">
            {announcements.map((item, index) => {
              const external = item.href.startsWith('http')
              const body = (
                <>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest">
                    <span className="text-primary">{item.category}</span>
                    <span className="text-border">/</span>
                    <time dateTime={item.date} className="text-muted-foreground">
                      {new Date(`${item.date}T00:00:00`).toLocaleDateString('en-AE', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                  <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1.25fr]">
                    <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{item.title}</h2>
                    <div>
                      <p className="text-pretty leading-relaxed text-muted-foreground">{item.summary}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-primary">
                        Explore announcement {external ? <ArrowUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                      </span>
                    </div>
                  </div>
                </>
              )
              return (
                <Reveal key={item.slug} delay={index * 70}>
                  {external ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="group block border-t border-border py-10 md:py-12">{body}</a>
                  ) : (
                    <Link href={item.href} className="group block border-t border-border py-10 md:py-12">{body}</Link>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
