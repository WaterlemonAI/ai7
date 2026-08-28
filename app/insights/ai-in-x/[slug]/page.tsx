import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Download, ShieldCheck } from 'lucide-react'
import { aiLibraryArticles, deckSlugByCluster, getAiLibraryArticle, getAiLibraryRelated, productContext, resourceSlugByName } from '@/lib/ai-library'
import { siteUrl } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return aiLibraryArticles.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getAiLibraryArticle((await params).slug)
  if (!article) return {}
  const description = `${article.title}: practical UAE and GCC guidance covering ${article.topics.join(', ')}.`
  const path = `/insights/ai-in-x/${article.slug}`
  return { title: article.title, description, keywords: [article.title, `AI in ${article.cluster}`, 'enterprise AI UAE', ...article.topics], alternates:{ canonical:path }, openGraph:{ type:'article', locale:'en_AE', siteName:'AI7Lab', url:path, title:article.title, description, publishedTime:'2026-08-28', modifiedTime:'2026-08-28' }, twitter:{ card:'summary_large_image', title:article.title, description } }
}

export default async function AiLibraryPage({ params }: Props) {
  const article = getAiLibraryArticle((await params).slug)
  if (!article) notFound()
  const related = getAiLibraryRelated(article)
  const resourceSlug = article.download ? resourceSlugByName[article.download] : undefined
  const deckSlug = article.type === 'Pillar guide' ? deckSlugByCluster[article.cluster] : undefined
  const productKeys = article.product === 'both' ? ['taed','vendoreye'] as const : article.product ? [article.product] as const : []
  const description = `${article.title}: practical UAE and GCC guidance covering ${article.topics.join(', ')}.`
  const url = `${siteUrl}/insights/ai-in-x/${article.slug}`
  const schema = { '@context':'https://schema.org', '@type':'Article', headline:article.title, description, datePublished:'2026-08-28', dateModified:'2026-08-28', author:{'@type':'Organization',name:'AI7Lab'}, publisher:{'@type':'Organization',name:'AI7Lab'}, mainEntityOfPage:url, about:[article.cluster,...article.topics], inLanguage:'en-AE' }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
    <header className="border-b border-border bg-grid pt-32 sm:pt-36 md:pt-44"><div className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 md:pb-20">
      <Link href="/insights#ai-in-x-library" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4"/>AI in X library</Link>
      <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"><span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-primary">{article.cluster}</span><span>Library {String(article.number).padStart(2,'0')}</span><span>·</span><span>{article.type}</span></div>
      <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">{article.title}</h1>
      <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">A production-minded guide for UAE and GCC organizations moving from AI interest to measurable, governed implementation.</p>
    </div></header>
    <main><article className="mx-auto max-w-3xl px-5 py-16 sm:px-6 md:py-24">
      <p className="text-xl leading-9">The useful question is not whether AI can produce an impressive result. It is whether {article.cluster.toLowerCase()} leaders can define a valuable outcome, supply representative evidence, integrate the result into daily work, control consequential decisions, and operate the system reliably after launch.</p>
      <section className="mt-16"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Decision frame</p><h2 className="mt-3 text-3xl font-semibold">What this guide helps you resolve</h2><div className="mt-7 grid gap-4 sm:grid-cols-2">{article.topics.map((topic,i)=><div key={topic} className="rounded-2xl border border-border bg-card p-5"><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="mt-3 font-semibold capitalize">{topic}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Translate this area into explicit owners, evidence, controls, metrics, and exception paths before selecting technology.</p></div>)}</div></section>
      <section className="mt-16"><h2 className="text-3xl font-semibold">Start with the workflow, not the model</h2><p className="mt-5 leading-8 text-muted-foreground">Map the current journey from trigger to completed outcome. Record who acts, which systems and artifacts they use, where time is lost, which errors matter, and which decisions require accountable authority. This baseline prevents a technically capable model from becoming another disconnected interface.</p><p className="mt-5 leading-8 text-muted-foreground">Define the target outcome in operational terms: cycle time, completeness, accuracy, avoided rework, customer experience, risk reduction, or capacity released. Pair each measure with an acceptable failure threshold and a named owner.</p></section>
      <section className="mt-16"><h2 className="text-3xl font-semibold">Build evidence and controls into the design</h2><ul className="mt-7 space-y-4">{['Keep source evidence connected to every material output.','Separate reversible assistance from consequential decisions.','Test normal, difficult, bilingual, incomplete, and adversarial cases.','Preserve human escalation, rollback, monitoring, and incident ownership.'].map(item=><li key={item} className="flex gap-3 leading-7"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary"/>{item}</li>)}</ul></section>
      {productKeys.map(key=>{const p=productContext[key];return <section key={key} className="mt-16 rounded-3xl border border-primary/15 bg-blue-50/60 p-7 sm:p-9"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Relevant AI7Lab product</p><h2 className="mt-3 text-2xl font-semibold">Where {p.name} fits</h2><p className="mt-5 leading-7 text-muted-foreground">{p.copy}</p><a href={p.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-medium text-primary">Explore {p.name}<ArrowUpRight className="h-4 w-4"/></a></section>})}
      <section className="mt-16 rounded-3xl border border-border bg-card p-7 sm:p-9"><div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-primary"/><h2 className="text-2xl font-semibold">A practical 90-day route</h2></div><ol className="mt-7 space-y-6">{[['Days 1–30','Baseline the workflow, classify data, assign owners, and build a representative evaluation set.'],['Days 31–60','Implement the thinnest end-to-end path inside real permissions, integrations, and review controls.'],['Days 61–90','Release to a controlled cohort, measure outcomes and failures, then scale, revise, or stop.']].map(([title,copy])=><li key={title}><h3 className="font-semibold text-primary">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{copy}</p></li>)}</ol></section>
      {(resourceSlug || deckSlug) && <section className="mt-16 border-y border-border py-9"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Companion resources</p><h2 className="mt-3 text-2xl font-semibold">Put this guide to work</h2><p className="mt-4 leading-7 text-muted-foreground">Assign owners, record evidence, score readiness, flag risks, and align decision-makers before a workshop or pilot.</p><div className="mt-6 flex flex-wrap gap-3">{resourceSlug&&<><a href={`/resources/${resourceSlug}.xlsx`} download className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"><Download className="h-4 w-4"/>Download workbook</a><a href={`/resources/${resourceSlug}.pdf`} download className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium">Download PDF</a></>}{deckSlug&&<a href={`/resources/${deckSlug}.pptx`} download className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-3 text-sm font-medium text-primary">Download executive slides</a>}</div></section>}
    </article>
    <aside className="border-t border-border bg-card/50"><div className="mx-auto max-w-6xl px-5 py-16 sm:px-6"><div className="flex items-end justify-between gap-5"><h2 className="text-3xl font-semibold">Continue through the library</h2><Link href="/insights#ai-in-x-library" className="text-sm font-medium text-primary">View all 50 guides</Link></div><div className="mt-8 grid gap-5 md:grid-cols-3">{related.map(item=><Link key={item.slug} href={`/insights/ai-in-x/${item.slug}`} className="group rounded-2xl border border-border bg-background p-6 hover:border-primary/30"><span className="font-mono text-xs text-primary">{item.cluster} · {String(item.number).padStart(2,'0')}</span><h3 className="mt-3 font-semibold leading-snug">{item.title}</h3><span className="mt-5 inline-flex items-center gap-2 text-sm text-primary">Read guide<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></span></Link>)}</div></div></aside>
    </main>
  </>
}
