import type { Metadata } from 'next'
import { PageHero, SectionHeading } from '@/components/rehaul/page-hero'
import { pageMetadata } from '@/lib/seo'
import { siteUrl } from '@/lib/site'
import { SchedulerTrigger } from '@/components/scheduler'

export const metadata: Metadata = pageMetadata({ title:'Enterprise AI Solutions',description:'AI7Lab works with leading organisations to frame, prove, integrate and operate AI systems that reduce cost and improve efficiency.',path:'/enterprise-ai',keywords:['enterprise AI Dubai','AI automation UAE','agentic AI consulting','AI implementation'] })

const stages = [
  ['01','Frame','Define the operational problem, accountable owner, constraints and measurable baseline.'],
  ['02','Prove','Validate the valuable workflow with representative data and a clear decision gate.'],
  ['03','Integrate','Connect systems, policies, actions, approvals and human authority.'],
  ['04','Operate + improve','Measure quality, cost, latency and business outcomes as the product evolves.'],
]

export default function EnterpriseAIPage(){
  const schema={'@context':'https://schema.org','@type':'Service',name:'AI7Lab Enterprise AI',provider:{'@id':`${siteUrl}/#organization`},areaServed:['AE','GCC'],description:'Problem-to-production agentic AI delivery for leading organisations.'}
  return <div className="rehaul-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><PageHero eyebrow="Enterprise AI" title={<>Start with the problem.<br/><em className="font-medium text-primary">Build for the outcome.</em></>} description="We work with leading organisations to adopt AI where it can solve a real business problem, reduce cost, improve efficiency, or create new operational capability."/>
  <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-6"><ol className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">{stages.map(([n,t,c])=><li key={n} className="min-h-80 border-b border-r border-border p-7"><span className="font-mono text-[10px] text-primary">{n}</span><h2 className="mt-24 font-serif text-3xl font-medium">{t}</h2><p className="mt-5 text-sm leading-6 text-muted-foreground">{c}</p></li>)}</ol></section>
  <section className="bg-primary text-white"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><SectionHeading eyebrow="Built to operate" title="AI is valuable when the workflow gets better." copy="The engagement stays anchored to an operational baseline and an accountable owner—not a disconnected demonstration."/><div className="mt-14 grid border-l border-t border-white/25 sm:grid-cols-2 lg:grid-cols-4">{['Measurable baseline','Representative data','Human authority','Production observability'].map((x,i)=><div key={x} className="min-h-48 border-b border-r border-white/25 p-7"><span className="font-mono text-[9px]">0{i+1}</span><b className="mt-20 block font-serif text-2xl font-medium">{x}</b></div>)}</div></div></section>
  <section className="mx-auto grid max-w-7xl gap-12 px-5 py-28 sm:px-6 lg:grid-cols-2"><div><p className="font-mono text-[11px] uppercase tracking-[.16em] text-primary">A fit when</p><h2 className="mt-6 font-serif text-5xl font-medium leading-none tracking-[-.05em]">The problem matters enough to operate properly.</h2></div><ul className="border-t border-border">{['A workflow has measurable cost, delay, quality or capacity pressure','Existing tools cannot connect context to reliable action','The organisation needs controls, integration and human escalation','There is an owner ready to evaluate and operate the outcome'].map(x=><li key={x} className="border-b border-border py-5">↗ <span className="ml-3">{x}</span></li>)}</ul></section>
  <section className="bg-primary text-white"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><h2 className="max-w-5xl font-serif text-6xl font-medium leading-none tracking-[-.05em]">Bring us the business problem worth solving.</h2><SchedulerTrigger interest="Enterprise AI" className="mt-10 inline-flex bg-white px-6 py-4 text-sm font-semibold text-primary">Discuss the problem ↗</SchedulerTrigger></div></section></div>
}
