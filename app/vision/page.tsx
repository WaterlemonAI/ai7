import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Share2 } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { linkedInUrl, team } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Vision',
  description: 'Meet the AI7Lab team and learn how our research-led product company turns technology and market intelligence into enterprise AI products.',
  path: '/vision',
  keywords: ['AI7Lab team', 'AI research company Dubai', 'enterprise AI research UAE'],
})

const pillars = [
  {
    number: '01',
    title: 'Start with validated pain',
    body: 'We do not search for problems AI might solve. We start with problems businesses already pay to solve, then redesign the workflow AI-first.',
  },
  {
    number: '02',
    title: 'Research in two directions',
    body: 'Technology research tells us what is newly possible. Market research tells us what is commercially meaningful. Neither works alone.',
  },
  {
    number: '03',
    title: 'Ship the system',
    body: 'We turn validated capability into production software—schema-controlled, governed, monitored, and shaped by real customer conversations.',
  },
]

const process = ['Identify', 'Validate', 'Deconstruct', 'Research', 'Build', 'Deploy', 'Learn', 'Scale']

export default function VisionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Vision"
        title="A small, research-led team building enterprise intelligence that works."
        description="AI7Lab brings researchers, technologists, product builders, and operators into one tight loop. We combine technology research with market research, then turn the strongest signals into products."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">The AI7 Model</p>
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                AI does not need more demos. Enterprises need better systems.
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                Legacy software was built around yesterday&apos;s workflows. Too many AI experiments never reach production, and fragmented operations still depend on people stitching tools together. AI7Lab exists to close that gap.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 90} className="rounded-2xl border border-border bg-card p-7">
                <span className="font-mono text-sm text-primary">{pillar.number}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">Research to Product</p>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">Customer interaction shapes every stage.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <Reveal key={step} delay={(index % 4) * 50} className="bg-card p-6">
                <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-8 text-lg font-medium">{step}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href="/technology" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary">Explore our technology research <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      <section id="team" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">The Team</p>
              <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">Built by operators, technologists, and researchers.</h2>
            </div>
            <a href={linkedInUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary">
              Follow AI7Lab <Share2 className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={(index % 3) * 70}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary">
                      {member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{member.focus}</p>
                  {member.linkedin ? (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:text-primary">
                      LinkedIn profile <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <a href={`${linkedInUrl}people/`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:text-primary">
                      AI7Lab team <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="rounded-3xl border border-primary/20 bg-primary/[0.06] p-8 md:p-14">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">The Next Build</p>
            <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">The next category-defining AI product may start with a problem everyone has learned to tolerate.</h2>
            <p className="mt-5 text-lg text-muted-foreground">Let&apos;s rebuild it.</p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">Build with us <ArrowUpRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
