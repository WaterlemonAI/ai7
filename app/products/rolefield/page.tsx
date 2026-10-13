import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero, SectionHeading } from '@/components/rehaul/page-hero'
import { pageMetadata } from '@/lib/seo'
import { siteUrl } from '@/lib/site'
import { SchedulerTrigger } from '@/components/scheduler'

export const metadata: Metadata = pageMetadata({
  title: 'RoleField Customer Operations AI',
  description: 'RoleField is an AI operating layer for support, calling, call-centre operations and in-person kiosk experiences through Seer.',
  path: '/products/rolefield',
  keywords: ['customer operations AI', 'AI call centre', 'AI support operations', 'kiosk AI', 'Seer AI', 'RoleField'],
})

const surfaces = [
  ['01','Support operations','Resolve requests, maintain context and escalate with the full interaction record.'],
  ['02','Calling operations','Run outbound and inbound workflows with natural, goal-directed conversations.'],
  ['03','Call-centre operations','Coordinate queues, agents, quality, actions and reporting across the operation.'],
  ['04','Seer kiosk AI','Bring multimodal assistance into physical locations through an in-person AI interface.'],
]

export default function RoleFieldPage() {
  const schema = { '@context':'https://schema.org','@type':'SoftwareApplication',name:'RoleField',applicationCategory:'BusinessApplication',operatingSystem:'Web',url:`${siteUrl}/products/rolefield`,publisher:{'@id':`${siteUrl}/#organization`},description:'Customer operations AI across support, calling, call centres and Seer kiosk experiences.' }
  return (
    <div className="rehaul-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
      <PageHero eyebrow="Product · Customer operations AI" title={<>Run every customer <em className="font-medium text-primary">interaction.</em></>} description="One operating layer for support, calling and call-centre operations, with in-person kiosk AI through Seer.">
        <Image src="/logo-rolefield.png" alt="RoleField" width={1527} height={341} className="mt-10 h-11 w-auto object-contain" />
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6"><div className="grid gap-7 border border-border bg-card p-8 sm:grid-cols-3 lg:items-end lg:gap-12">{[['60M+','calls completed'],['~10M','calls / month'],['$1M+','reported savings']].map(([v,l])=><div key={l}><b className="block font-serif text-5xl font-medium tracking-[-.05em]">{v}</b><span className="font-mono text-[8px] uppercase">{l}</span></div>)}</div></section>
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><SectionHeading eyebrow="One connected operation" title="More than voice AI." copy="RoleField connects conversations to the support, workforce, quality and action systems needed to run the complete customer operation." /><div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">{surfaces.map(([n,title,copy])=><article key={n} className="flex min-h-72 flex-col border-b border-r border-border p-7"><span className="font-mono text-[10px] text-primary">{n}</span><h3 className="mt-auto font-serif text-2xl font-medium">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></section>
      <section className="mx-auto mb-28 grid max-w-7xl bg-primary text-white lg:grid-cols-[.9fr_1.1fr]">
        <div className="p-9 sm:p-14"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--ai7-cyan)]">Seer · Kiosk AI</p><h2 className="mt-6 font-serif text-5xl font-medium leading-none tracking-[-.05em]">Customer operations step into the room.</h2><p className="mt-7 leading-7 text-white/75">Seer extends RoleField into physical service points with multimodal perception, guided assistance, secure handoff and operational visibility.</p><ul className="mt-9 border-t border-white/25 text-sm">{['Multimodal visitor interaction','Guided service and wayfinding','Human escalation with context','Connected operational reporting'].map(x=><li key={x} className="border-b border-white/25 py-4">↗ {x}</li>)}</ul></div>
        <div className="m-0 border border-[var(--ai7-sky)] p-8 lg:m-10" style={{ background: 'color-mix(in srgb, var(--ai7-deep) 88%, #0c1019)' }}><div className="flex justify-between font-mono text-[8px] text-white/70"><span>● SEER / LIVE</span><b className="text-[var(--ai7-cyan)]">MULTIMODAL</b></div><div className="grid min-h-72 place-content-center text-center"><div className="mx-auto h-36 w-28 border border-white/40"><div className="mx-auto mt-7 h-12 w-12 rounded-full border border-white/50"/><div className="mx-auto mt-3 h-10 w-16 rounded-t-full border border-white/50"/></div><strong className="mt-6 font-serif text-2xl font-medium">Visitor recognised</strong><p className="mt-2 text-xs text-white/70">Intent → guidance → action → handoff</p></div></div>
      </section>
      <section className="bg-primary text-white"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><h2 className="max-w-5xl font-serif text-6xl font-medium leading-none tracking-[-.05em]">Run the entire customer operation with one AI layer.</h2><SchedulerTrigger interest="RoleField" className="mt-10 inline-flex bg-white px-6 py-4 text-sm font-semibold text-primary">Discuss RoleField ↗</SchedulerTrigger></div></section>
    </div>
  )
}
