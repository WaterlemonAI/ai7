import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Banknote, Check, MapPin } from 'lucide-react'
import { ShareLinks } from '@/components/share-links'
import { getJob, jobs, siteUrl } from '@/lib/site'

type JobPageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }))
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) return {}
  const path = `/careers/${job.slug}`
  const socialImage = { url: '/opengraph-image', width: 1200, height: 630, alt: 'AI7Lab careers in the UAE' }
  return {
    title: `${job.title} | Careers`,
    description: `${job.summary} UAE role with AED ${job.salaryMin.toLocaleString()}–${job.salaryMax.toLocaleString()} monthly salary.`,
    alternates: { canonical: path },
    openGraph: {
      title: `${job.title} — AI7Lab`,
      description: job.summary,
      url: path,
      type: 'website',
      images: [socialImage],
    },
    twitter: { card: 'summary_large_image', title: `${job.title} — AI7Lab`, description: job.summary, images: ['/opengraph-image'] },
    keywords: [job.title, `${job.product} careers`, 'AI jobs UAE', 'technology jobs Dubai'],
  }
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params
  const job = getJob(slug)
  if (!job) notFound()
  const url = `${siteUrl}/careers/${job.slug}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: `${job.summary}\n\nResponsibilities: ${job.responsibilities.join('; ')}.\n\nRequirements: ${job.requirements.join('; ')}.`,
    datePosted: '2026-08-18',
    validThrough: '2026-11-30T23:59:59+04:00',
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'AI7Lab',
      sameAs: siteUrl,
      logo: `${siteUrl}/ai7lab-logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    },
    applicantLocationRequirements: { '@type': 'Country', name: 'United Arab Emirates' },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'AED',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: 'MONTH',
      },
    },
    directApply: true,
    url,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Careers', item: `${siteUrl}/careers` },
      { '@type': 'ListItem', position: 3, name: job.title, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <article>
        <header className="relative overflow-hidden border-b border-border bg-grid">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-32 md:pb-24 md:pt-44">
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> All careers
            </Link>
            <p className="mt-10 font-mono text-sm uppercase tracking-[0.2em] text-primary">{job.product} · UAE</p>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">{job.title}</h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{job.summary}</p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {job.location}</span>
              <span className="inline-flex items-center gap-2"><Banknote className="h-4 w-4 text-primary" /> AED {job.salaryMin.toLocaleString()}–{job.salaryMax.toLocaleString()} per month</span>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_320px] md:py-24">
          <div className="space-y-14">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">What you will own</h2>
              <ul className="mt-6 space-y-4">
                {job.responsibilities.map((item) => <li key={item} className="flex items-start gap-3 leading-relaxed text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /> {item}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">What will help you thrive</h2>
              <ul className="mt-6 space-y-4">
                {job.requirements.map((item) => <li key={item} className="flex items-start gap-3 leading-relaxed text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /> {item}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">About AI7Lab</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">We are a small, research-led product company in Dubai. Technology research tells us what is newly possible. Market research tells us which enterprise problems matter. We combine both, build quickly, and learn directly from customers.</p>
            </section>
          </div>

          <aside className="md:sticky md:top-28 md:self-start">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Interested?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Send your CV or LinkedIn profile and tell us why this role fits.</p>
              <a href={`mailto:contact@ai7lab.net?subject=${encodeURIComponent(`Application: ${job.title}`)}`} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
                Apply by email <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="mt-8 border-t border-border pt-6">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Share this role</p>
                <ShareLinks url={url} title={job.title} />
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  )
}
