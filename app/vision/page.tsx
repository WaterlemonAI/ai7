import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero, SectionHeading } from '@/components/rehaul/page-hero'
import { pageMetadata } from '@/lib/seo'
import { team } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Company | Products Built on Agentic AI',
  description: 'AI7Lab creates agentic AI products, works with leading organisations on operational AI, and explores problems worth solving next.',
  path: '/vision',
  keywords: ['AI product company Dubai', 'agentic AI company UAE', 'AI7Lab company', 'enterprise AI Dubai'],
})

export default function VisionPage() {
  return <div className="rehaul-page"><PageHero eyebrow="Company" title={<>We build what the next<br /><em className="font-medium text-primary">operation needs.</em></>} description="AI7Lab is a Dubai-based product company building on agentic AI. We create products, work with leading organisations on hard operational problems, and keep looking for the next solution that can add value to the ecosystem." />
  <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-6"><div className="grid border-l border-t border-border md:grid-cols-3">{[
    ['01','Products','Build focused products around repeatable, high-value operational problems.'],
    ['02','Enterprise work','Work alongside organisations to frame, prove, integrate and operate AI outcomes.'],
    ['03','The lab','Explore new capabilities and problems before they become obvious categories.'],
  ].map(([number,title,copy]) => <article key={number} className="flex min-h-72 flex-col border-b border-r border-border p-7"><span className="font-mono text-[10px] text-primary">{number}</span><h2 className="mt-auto font-serif text-3xl font-medium">{title}</h2><p className="mt-5 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></section>
  <section className="bg-primary text-white"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><SectionHeading eyebrow="What holds it together" title="Curiosity with operational discipline." copy="We push the boundary of what is possible, but judge the work by whether it performs reliably inside the organisation that needs it."/><div className="mt-14 grid border-l border-t border-white/25 sm:grid-cols-2 lg:grid-cols-4">{['Problem before technology','Evidence before scale','Systems before demos','Progress without lock-in'].map((x,i)=><div key={x} className="min-h-48 border-b border-r border-white/25 p-7"><span className="font-mono text-[9px] text-[var(--ai7-cyan)]">0{i+1}</span><b className="mt-20 block font-serif text-2xl font-medium">{x}</b></div>)}</div></div></section>
  <section className="mx-auto max-w-7xl px-5 py-28 sm:px-6"><SectionHeading eyebrow="Team" title="Builders across product, research and operations."/><div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">{team.map(member=><article key={member.name} className="border-b border-r border-border">{member.photo?<div className="relative aspect-[4/3] overflow-hidden bg-card"><Image src={member.photo} alt={member.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw"/></div>:<div className="grid aspect-[4/3] place-content-center bg-card font-serif text-5xl text-primary">{member.name.charAt(0)}</div>}<div className="p-6"><h3 className="font-serif text-2xl font-medium">{member.name}</h3><p className="mt-2 font-mono text-[9px] uppercase text-primary">{member.role}</p><p className="mt-5 text-sm leading-6 text-muted-foreground">{member.bio}</p>{member.linkedin&&<a href={member.linkedin} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-primary">LinkedIn ↗</a>}</div></article>)}</div></section>
  </div>
}
