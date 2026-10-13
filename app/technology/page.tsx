import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero, SectionHeading } from '@/components/rehaul/page-hero'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Agentic AI Technology',
  description: 'Explore the replaceable, observable, controlled and versioned architecture AI7Lab uses to turn context into reliable action.',
  path: '/technology',
  keywords: ['agentic AI architecture', 'enterprise AI technology', 'AI orchestration', 'AI observability', 'AI7Lab technology'],
})

const flow = [
  ['01', 'Context', 'Bring data, conversations, documents, events and operating rules into a usable view of the work.'],
  ['02', 'Orchestration', 'Choose models and tools, plan the next step, apply policy and route exceptions deliberately.'],
  ['03', 'Action', 'Update systems, answer customers, complete tasks and hand control to people when judgement is required.'],
  ['04', 'Learning', 'Measure quality, cost, latency and outcomes so every release has evidence behind it.'],
]

const principles = [
  ['Replaceable', 'Models and tools can evolve without rebuilding the whole operation.'],
  ['Observable', 'Teams can inspect quality, latency, cost, actions and exceptions.'],
  ['Controlled', 'Policies, permissions and human authority stay explicit.'],
  ['Versioned', 'Prompts, schemas, workflows and evaluations change with traceability.'],
]

export default function TechnologyPage() {
  return (
    <div className="rehaul-page">
      <PageHero eyebrow="Technology" title={<>Future-ready is an architecture,<br /><em className="font-medium text-primary">not a promise.</em></>} description="AI7Lab builds agentic systems as replaceable, observable layers. The result can adopt better models and tools without losing control of the workflow around them." />
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-6"><div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">{flow.map(([number, title, copy], index) => <article key={number} className="relative flex min-h-80 flex-col border-b border-r border-border p-7"><div className="flex items-center justify-between font-mono text-[10px] text-primary"><span>{number}</span><span>{index < flow.length - 1 ? '→' : '↻'}</span></div><h2 className="mt-auto font-serif text-3xl font-medium">{title}</h2><p className="mt-5 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></section>
      <section className="bg-primary text-white"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><SectionHeading eyebrow="Architecture principles" title="Change quickly. Operate deliberately." copy="The technology remains useful because the surrounding system makes change measurable, governable and reversible." /><div className="mt-14 grid border-l border-t border-white/25 sm:grid-cols-2 lg:grid-cols-4">{principles.map(([title, copy], index) => <article key={title} className="min-h-64 border-b border-r border-white/25 p-7"><span className="font-mono text-[9px] text-[var(--ai7-cyan)]">0{index + 1}</span><h3 className="mt-20 font-serif text-2xl font-medium">{title}</h3><p className="mt-4 text-sm leading-6 text-white/70">{copy}</p></article>)}</div></div></section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-28 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:items-center"><div><p className="font-mono text-[11px] uppercase tracking-[.16em] text-primary">A tool in the belt</p><h2 className="mt-6 max-w-3xl font-serif text-5xl font-medium leading-none tracking-[-.05em]">Structured intelligence from unstructured media.</h2><p className="mt-7 max-w-2xl leading-7 text-muted-foreground">Taed turns documents, images, audio and video into schema-controlled outputs. It supports AI7Lab products and enterprise workflows without competing with the principal product portfolio.</p></div><div className="border border-border bg-card p-8"><b className="font-serif text-3xl font-medium">Taed</b><p className="mt-4 text-sm leading-6 text-muted-foreground">Any media → multimodal understanding → validated schema</p><Link href="/technology/taed" className="rehaul-button mt-8">Explore Taed ↗</Link></div></section>
    </div>
  )
}
