import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { blogIndustries, blogPosts, blogProducts, getBlogHero } from '@/lib/blogs'
import { editorialArticles, editorialPillars, getPillarImage } from '@/lib/editorial'
import { pageMetadata } from '@/lib/seo'
import { aiLibraryArticles, aiLibraryClusters } from '@/lib/ai-library'

export const metadata: Metadata = pageMetadata({
  title: 'Enterprise AI Insights',
  description: '155 research-backed enterprise AI guides for UAE and GCC leaders, spanning strategy, data, voice AI, proprietary IP, document intelligence, procurement, evaluation, security, and governance.',
  path: '/insights',
  keywords: ['enterprise AI UAE', 'AI solutions UAE', 'artificial intelligence GCC', 'Dubai AI company', 'AI governance UAE', 'Arabic AI'],
})

const industryId = (industry: string) => industry.toLowerCase().replace(/\s+/g, '-')

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="The production AI field guide for the UAE and GCC."
        description="155 strategic, technical, and research-backed guides for leaders turning AI ambition into governed enterprise systems—plus applied field notes from the teams behind Taed, VendorEye, and RoleField.ai."
      />

      <section id="ai-in-x-library" className="scroll-mt-24 border-b border-border bg-background"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">New · AI in X implementation library</p><h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Fifty connected guides for sector leaders moving AI into production.</h2><p className="mt-5 max-w-3xl leading-7 text-muted-foreground">Explore applied use cases, readiness audits, operating fundamentals, governance decisions, and implementation checklists designed around UAE and GCC realities.</p></div><div className="rounded-2xl border border-primary/15 bg-blue-50 px-5 py-4 text-right"><strong className="block text-3xl text-primary">50</strong><span className="text-sm text-muted-foreground">interconnected guides</span></div></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">{aiLibraryClusters.map(cluster=>{const items=aiLibraryArticles.filter(item=>item.cluster===cluster);return <article key={cluster} className="rounded-3xl border border-border bg-card/40 p-6 sm:p-7"><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{items.length} guides</p><h3 className="mt-3 text-2xl font-semibold">{cluster}</h3><ol className="mt-6 space-y-3">{items.map(item=><li key={item.slug}><Link href={`/insights/ai-in-x/${item.slug}`} className="group flex items-start gap-3 text-sm leading-6 text-muted-foreground hover:text-primary"><span className="mt-0.5 font-mono text-xs text-primary">{String(item.number).padStart(2,'0')}</span><span>{item.title}</span><ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"/></Link></li>)}</ol></article>})}</div>
      </div></section>

      <section className="border-b border-border bg-card/40"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">AI7Lab research · 2026 editorial programme</p><h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Fourteen pillars. One hundred fifty-five production-minded perspectives.</h2></div><div className="rounded-2xl border border-primary/15 bg-background px-5 py-4 text-right"><strong className="block text-3xl text-primary">{editorialArticles.length}</strong><span className="text-sm text-muted-foreground">UAE & GCC research notes</span></div></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">{editorialPillars.map((pillar) => { const posts = editorialArticles.filter((item) => item.pillar === pillar.number); return <article key={pillar.number} id={`pillar-${pillar.number}`} className="overflow-hidden rounded-3xl border border-border bg-background"><div className="relative aspect-[3/1] overflow-hidden"><Image src={getPillarImage(pillar.number)} alt="AI7Lab enterprise AI editorial illustration" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div><div className="p-6 sm:p-7"><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Pillar {String(pillar.number).padStart(2,'0')} · {posts.length} articles</p><h3 className="mt-3 text-2xl font-semibold">{pillar.title}</h3><ol className="mt-6 space-y-3">{posts.map((post) => <li key={post.slug}><Link href={`/insights/research/${post.slug}`} className="group flex items-start gap-3 text-sm leading-6 text-muted-foreground hover:text-primary"><span className="mt-0.5 font-mono text-xs text-primary">{String(post.number).padStart(3,'0')}</span><span>{post.title}</span><ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" /></Link></li>)}</ol></div></article> })}</div>
      </div></section>

      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-6"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Applied product field notes</p><h2 className="mt-3 text-3xl font-semibold">Explore by industry</h2></div>
      <nav aria-label="Browse insights by industry" className="border-b border-border bg-background/90">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-5 sm:px-6">
          {blogIndustries.map((industry) => (
            <a key={industry} href={`#${industryId(industry)}`} className="whitespace-nowrap rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
              {industry}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-24">
        <div className="space-y-24">
          {blogIndustries.map((industry) => {
            const posts = blogPosts.filter((post) => post.industry === industry)
            return (
              <section key={industry} id={industryId(industry)} className="scroll-mt-28">
                <Reveal>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Industry intelligence</p>
                  <div className="mt-3 flex items-end justify-between gap-6 border-b border-border pb-6">
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{industry}</h2>
                    <p className="hidden max-w-md text-right text-sm leading-relaxed text-muted-foreground md:block">Three perspectives: understand the evidence, know the supplier, and automate the conversation.</p>
                  </div>
                </Reveal>
                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                  {posts.map((post, index) => {
                    const product = blogProducts[post.product]
                    const hero = getBlogHero(post.slug)
                    return (
                      <Reveal key={post.slug} delay={index * 80}>
                        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                          <Link href={`/insights/${post.slug}`} className="relative block aspect-[1200/630] overflow-hidden border-b border-border bg-secondary">
                            <Image src={hero.src} alt={hero.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width: 1024px) 100vw, 33vw" />
                          </Link>
                          <div className="flex flex-1 flex-col p-6">
                            <div className="flex items-center justify-between gap-3">
                              <Image src={product.logo} alt={`${product.name} logo`} width={116} height={34} className="h-7 w-auto max-w-[116px] object-contain object-left" />
                              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />{post.readingMinutes} min</span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight"><Link href={`/insights/${post.slug}`} className="transition-colors group-hover:text-primary">{post.title}</Link></h3>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                            <Link href={`/insights/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                          </div>
                        </article>
                      </Reveal>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </>
  )
}
