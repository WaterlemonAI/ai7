import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Banknote, MapPin } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { jobs } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Careers',
  description: 'Join AI7Lab in the UAE. Explore open roles across enterprise AI products, research, sales, and partnerships.',
  path: '/careers',
  keywords: ['AI jobs UAE', 'AI careers Dubai', 'enterprise software sales jobs UAE', 'technology partnerships jobs UAE'],
})

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Small team. Serious research. Products built for the real world."
        description="Join a research-led product company where technology research and market research meet—and where the distance from customer signal to shipped product is refreshingly short."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">Why AI7Lab</p>
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Less hierarchy. More signal.</h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                Researchers, engineers, product builders, and commercial operators work as one team. You will help validate the market, shape the product, and take it into enterprise environments—not hand work across a maze of departments.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">Open Roles</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Build the commercial engine with us.</h2>
          </Reveal>
          <div className="mt-12 space-y-4">
            {jobs.map((job, index) => (
              <Reveal key={job.slug} delay={index * 80}>
                <Link href={`/careers/${job.slug}`} className="group grid gap-6 rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40 md:grid-cols-[1fr_auto] md:items-center md:p-8">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-primary">{job.product}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">{job.title}</h3>
                    <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{job.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {job.location}</span>
                      <span className="inline-flex items-center gap-2"><Banknote className="h-4 w-4 text-primary" /> AED {job.salaryMin.toLocaleString()}–{job.salaryMax.toLocaleString()} / month</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:text-primary">View role <ArrowRight className="h-4 w-4" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
