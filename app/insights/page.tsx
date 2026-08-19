import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { blogIndustries, blogPosts, blogProducts, getBlogHero } from '@/lib/blogs'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Enterprise AI Insights',
  description: 'Practical guides to visual intelligence, supplier intelligence, and multilingual AI automation across banking, insurance, government, healthcare, real estate, and logistics.',
  path: '/insights',
  keywords: ['enterprise AI insights', 'document intelligence', 'supplier risk intelligence', 'multilingual voice agents'],
})

const industryId = (industry: string) => industry.toLowerCase().replace(/\s+/g, '-')

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Applied intelligence for real operating problems."
        description="Field guides from the teams behind Taed, VendorEye, and RoleField.ai—organized around the workflows that matter in six complex industries."
      />

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
