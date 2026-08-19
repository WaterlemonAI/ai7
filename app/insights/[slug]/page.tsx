import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Clock3 } from 'lucide-react'
import { blogPosts, blogProducts, getBlogHero, getBlogPost, getRelatedPosts } from '@/lib/blogs'
import { siteUrl } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  const image = `/insights/${slug}/opengraph-image`
  return {
    title: post.title,
    description: post.description,
    keywords: [post.primaryKeyword, `${post.industry} AI`, blogProducts[post.product].name, 'enterprise AI', 'AI7Lab'],
    authors: [{ name: 'AI7Lab Research & Product Team', url: siteUrl }],
    alternates: { canonical: `/insights/${slug}` },
    openGraph: { title: post.title, description: post.description, url: `/insights/${slug}`, siteName: 'AI7Lab', locale: 'en_AE', type: 'article', publishedTime: post.publishedAt, modifiedTime: post.publishedAt, section: post.industry, tags: [post.primaryKeyword, post.industry, blogProducts[post.product].name], authors: ['AI7Lab'], images: [{ url: image, width: 1200, height: 630, alt: post.title }] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [image] },
  }
}

export default async function InsightArticle({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()
  const product = blogProducts[post.product]
  const hero = getBlogHero(post.slug)
  const related = getRelatedPosts(post)
  const published = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.publishedAt))
  const imageUrl = `${siteUrl}${hero.src}`
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description,
    image: [imageUrl], datePublished: post.publishedAt, dateModified: post.publishedAt,
    author: { '@type': 'Organization', name: 'AI7Lab', url: siteUrl }, publisher: { '@type': 'Organization', name: 'AI7Lab', logo: { '@type': 'ImageObject', url: `${siteUrl}/ai7lab-logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/insights/${post.slug}` }, about: [post.industry, product.name, post.primaryKeyword], inLanguage: 'en',
  }
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: post.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }, { '@type': 'ListItem', position: 2, name: 'Insights', item: `${siteUrl}/insights` }, { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/insights/${post.slug}` }] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <header className="border-b border-border pt-32 sm:pt-36 md:pt-44">
        <div className="mx-auto max-w-5xl px-5 pb-12 sm:px-6 md:pb-16">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"><ArrowLeft className="h-4 w-4" />All insights</Link>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full bg-secondary px-3 py-1 font-medium text-primary">{post.industry}</span><time dateTime={post.publishedAt}>{published}</time><span aria-hidden="true">·</span><span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">{post.title}</h1>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">{post.description}</p>
          <div className="mt-8 flex items-center gap-4 border-t border-border pt-6"><span className="text-xs uppercase tracking-widest text-muted-foreground">A field guide by</span><Image src={product.logo} alt={`${product.name} logo`} width={140} height={40} className="h-8 w-auto max-w-[140px] object-contain object-left" /></div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 md:py-16">
          <figure>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-secondary shadow-2xl shadow-primary/5"><Image src={hero.src} alt={hero.alt} fill priority className="object-cover" sizes="(max-width: 1200px) 100vw, 1152px" /></div>
            <figcaption className="sr-only">{hero.alt}</figcaption>
          </figure>
        </div>

        <article className="mx-auto max-w-3xl px-5 pb-20 sm:px-6 md:pb-28">
          <p className="text-xl leading-8 text-foreground sm:text-2xl sm:leading-9">{post.intro}</p>
          <section className="mt-16"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">The operating problem</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Why {post.industry.toLowerCase()} teams need a better intelligence layer</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">{post.challenge}</p></section>
          <section className="mt-16"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">The product approach</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">How {product.name} changes the workflow</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">{post.approach}</p><a href={product.href} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85">Explore {product.name}{post.product === 'taed' ? ' APIs' : ''}<ArrowUpRight className="h-4 w-4" /></a></section>
          <section className="mt-16"><h2 className="text-3xl font-semibold tracking-tight">A practical four-stage workflow</h2><ol className="mt-8 border-l border-primary/25">{post.workflow.map((step, index) => <li key={step.title} className="relative pb-8 pl-8 last:pb-0"><span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-background font-mono text-xs text-primary">0{index + 1}</span><h3 className="text-lg font-semibold">{step.title}</h3><p className="mt-2 leading-7 text-muted-foreground">{step.description}</p></li>)}</ol></section>
          <section className="mt-16 rounded-2xl border border-border bg-card/60 p-7 sm:p-9"><h2 className="text-2xl font-semibold tracking-tight">Governance should be part of the design</h2><p className="mt-5 leading-7 text-muted-foreground">{post.governance}</p><h3 className="mt-8 text-lg font-semibold">A sensible place to start</h3><p className="mt-3 leading-7 text-muted-foreground">{post.implementation}</p></section>
          <section className="mt-16"><h2 className="text-3xl font-semibold tracking-tight">What a strong implementation should improve</h2><ul className="mt-7 grid gap-4 sm:grid-cols-2">{post.outcomes.map((outcome) => <li key={outcome} className="flex gap-3 rounded-xl border border-border p-4 text-sm leading-6"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{outcome}</li>)}</ul></section>
          <section className="mt-16"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Frequently asked questions</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Questions teams ask before they begin</h2><div className="mt-7 divide-y divide-border border-y border-border">{post.faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none pr-8 text-lg font-medium">{faq.question}</summary><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{faq.answer}</p></details>)}</div></section>
        </article>

        <aside className="border-t border-border bg-card/30"><div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24"><div className="flex items-end justify-between gap-6"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Continue exploring</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Related industry guides</h2></div><Link href="/insights" className="hidden items-center gap-2 text-sm font-medium text-primary sm:inline-flex">View all insights <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-8 grid gap-5 md:grid-cols-2">{related.map((item) => <Link key={item.slug} href={`/insights/${item.slug}`} className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/30"><div className="flex items-center justify-between gap-4"><span className="text-xs font-medium uppercase tracking-widest text-primary">{item.industry} · {blogProducts[item.product].name}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div><h3 className="mt-4 text-xl font-semibold leading-snug">{item.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p></Link>)}</div></div></aside>
      </main>
    </>
  )
}
