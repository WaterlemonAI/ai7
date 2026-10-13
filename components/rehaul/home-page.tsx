import Image from 'next/image'
import Link from 'next/link'
import { EvidenceEngine } from './evidence-engine'
import { SectionHeading } from './page-hero'
import { SchedulerTrigger } from '@/components/scheduler'

const principles = [
  ['01', 'Replaceable', 'Models and components can evolve behind stable interfaces.'],
  ['02', 'Observable', 'Quality, cost, latency and outcomes stay visible in operation.'],
  ['03', 'Controlled', 'Policies, approvals and human escalation are part of the system.'],
  ['04', 'Versioned', 'Prompts, schemas and workflows change with evidence and traceability.'],
]

export function RehaulHomePage() {
  return (
    <div className="rehaul-page">
      <section className="mx-auto grid min-h-[780px] max-w-7xl items-center gap-14 px-5 pb-20 pt-28 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:pt-24">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]"><span className="h-0.5 w-7 bg-primary" /> Agentic AI · built for real work</p>
          <h1 className="mt-7 font-serif text-6xl font-medium leading-[.91] tracking-[-.06em] sm:text-7xl lg:text-[6.5rem]">AI products built to <em className="font-medium text-primary">do the work.</em></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">AI7Lab builds and scales agentic AI products, then applies the same product discipline to help leading organisations reduce cost, improve efficiency, and create new operational capability.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <SchedulerTrigger className="rehaul-button">Discuss a problem <span>↗</span></SchedulerTrigger>
            <Link href="/products" className="rehaul-button rehaul-button--quiet">Explore our products</Link>
          </div>
        </div>
        <EvidenceEngine />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <SectionHeading eyebrow="Operating evidence" title={<>Built in the lab.<br />Proven in operations.</>} />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <article className="rehaul-proof-card">
            <header><Image src="/logo-vendoreye.png" alt="Vendoreye" width={1500} height={500} /><span>Supplier intelligence</span></header>
            <div className="rehaul-proof-grid rehaul-proof-grid--three">
              <div><strong>134,000+</strong><p>registered vendors</p></div>
              <div><strong>20+</strong><p>large scale buyers</p></div>
              <div><strong>8,000+</strong><p>tenders published</p></div>
            </div>
            <Link href="/products/vendoreye">Explore Vendoreye <span>↗</span></Link>
          </article>
          <article className="rehaul-proof-card rehaul-proof-card--dark">
            <header><Image src="/logo-rolefield.png" alt="RoleField" width={1527} height={341} /><span>Customer operations AI</span></header>
            <div className="rehaul-proof-grid rehaul-proof-grid--three">
              <div><strong>60M+</strong><p>calls completed</p></div>
              <div><strong>~10M</strong><p>calls handled each month</p></div>
              <div><strong>$1M+</strong><p>reported customer savings</p></div>
            </div>
            <Link href="/products/rolefield">Explore RoleField <span>↗</span></Link>
          </article>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-28 sm:px-6 md:grid-cols-[.8fr_1.2fr] md:items-end">
        <div><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">Partners</p><h2 className="mt-5 font-serif text-4xl font-medium leading-none tracking-[-.045em] sm:text-5xl">Building alongside teams shaping trusted AI.</h2></div>
        <div className="grid border-l border-t border-border sm:grid-cols-2">
          <a href="https://www.signzy.com" target="_blank" rel="noreferrer" className="flex min-h-40 flex-col justify-between border-b border-r border-border p-7"><Image src="/logo-signzy.svg" alt="Signzy" width={146} height={48} /><span className="font-mono text-[9px] uppercase text-muted-foreground">Identity and compliance</span></a>
          <a href="https://rzolut.com" target="_blank" rel="noreferrer" className="flex min-h-40 flex-col justify-between border-b border-r border-border p-7"><Image src="/logo-rzolut.svg" alt="RZOLUT" width={146} height={48} /><span className="font-mono text-[9px] uppercase text-muted-foreground">Risk and compliance intelligence</span></a>
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-6 md:grid-cols-2 md:py-32">
          <div><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white">Enterprise AI</p><h2 className="mt-5 font-serif text-5xl font-medium leading-none tracking-[-.05em]">Start with the business problem. Build the AI around it.</h2><p className="mt-8 max-w-xl leading-7 text-white/80">We work with leading organisations to find the workflows where AI can create measurable value, then build the system needed to operate reliably.</p><Link href="/enterprise-ai" className="mt-10 inline-flex border-b border-white pb-2 text-sm font-semibold">How we work ↗</Link></div>
          <ol className="border-t border-white/30">
            {['Frame the problem and measurable baseline', 'Prove the valuable workflow with representative data', 'Integrate systems, controls and human authority', 'Operate, measure and improve the product'].map((item, i) => <li key={item} className="grid grid-cols-[44px_1fr] border-b border-white/30 py-6"><span className="font-mono text-[10px]">0{i + 1}</span><b className="font-serif text-2xl font-medium">{item}</b></li>)}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <SectionHeading eyebrow="Designed to evolve" title={<>Future-ready is an architecture,<br />not a promise.</>} />
        <div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(([index, title, copy]) => <article key={index} className="min-h-64 border-b border-r border-border p-7"><span className="font-mono text-[10px] text-primary">{index}</span><h3 className="mt-20 font-serif text-2xl font-medium">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 border-y border-border px-5 py-12 sm:px-6 md:grid-cols-[.55fr_1.5fr_.8fr] md:items-center">
        <div><p className="font-mono text-[10px] uppercase text-muted-foreground">From the lab</p><Image src="/logo-taed.png" alt="Taed" width={90} height={32} className="mt-5 h-7 w-auto object-contain" /></div>
        <div><h2 className="font-serif text-3xl font-medium tracking-[-.04em]">Structured intelligence from unstructured media.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Taed turns documents, images, video, and audio into schema-controlled outputs.</p></div>
        <Link href="/technology/taed" className="justify-self-start border-b border-current pb-2 text-sm font-semibold md:justify-self-end">View the technology note ↗</Link>
      </section>

      <section className="mt-28 bg-primary text-white"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><p className="font-mono text-[11px] uppercase tracking-[.16em] text-[var(--ai7-cyan)]">What should work better?</p><h2 className="mt-6 max-w-5xl font-serif text-6xl font-medium leading-none tracking-[-.055em] sm:text-8xl">Bring us the problem worth solving.</h2><SchedulerTrigger className="mt-10 inline-flex bg-white px-6 py-4 text-sm font-semibold text-primary">Discuss a problem ↗</SchedulerTrigger></div></section>
    </div>
  )
}
