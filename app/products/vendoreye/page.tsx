import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero, SectionHeading } from '@/components/rehaul/page-hero'
import { pageMetadata } from '@/lib/seo'
import { siteUrl } from '@/lib/site'
import { SchedulerTrigger } from '@/components/scheduler'

export const metadata: Metadata = pageMetadata({
  title: 'Vendoreye Supplier Intelligence',
  description: 'Vendoreye brings supplier discovery, qualification, evidence and opportunity intelligence into one continuously useful vendor record.',
  path: '/products/vendoreye',
  keywords: ['supplier intelligence', 'vendor discovery', 'vendor qualification', 'procurement AI', 'Vendoreye'],
})

const workflow = [
  ['01','Discover','Find relevant suppliers and opportunities across the intelligence network.'],
  ['02','Verify','Bring company, capability and evidence signals into one record.'],
  ['03','Qualify','Apply repeatable criteria to shortlist the right vendors.'],
  ['04','Monitor','Keep supplier and opportunity intelligence continuously useful.'],
]

export default function VendoreyePage() {
  const schema = { '@context':'https://schema.org','@type':'SoftwareApplication',name:'Vendoreye',applicationCategory:'BusinessApplication',operatingSystem:'Web',url:`${siteUrl}/products/vendoreye`,publisher:{'@id':`${siteUrl}/#organization`},description:'Supplier and opportunity intelligence from discovery through continuous monitoring.' }
  return (
    <div className="rehaul-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
      <PageHero eyebrow="Product · Supplier intelligence" title={<>See the vendor.<br /><em className="font-medium text-primary">Find the opportunity.</em></>} description="Bring supplier discovery, qualification, evidence and opportunity intelligence into one continuously useful record.">
        <Image src="/logo-vendoreye.png" alt="Vendoreye" width={1500} height={500} className="mt-10 h-11 w-auto object-contain" />
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6">
        <div className="grid gap-6 border border-border bg-card p-8 md:grid-cols-3 md:items-end md:gap-10">
          <div><b className="block font-serif text-5xl font-medium tracking-[-.05em]">134,000+</b><span className="font-mono text-[8px] uppercase">registered vendors</span></div>
          <div><b className="block font-serif text-5xl font-medium tracking-[-.05em]">20+</b><span className="font-mono text-[8px] uppercase">large scale buyers</span></div>
          <div><b className="block font-serif text-5xl font-medium tracking-[-.05em]">8,000+</b><span className="font-mono text-[8px] uppercase">tenders published</span></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6">
        <SectionHeading eyebrow="How it works" title="From discovery to a living vendor record." copy="Vendoreye reduces fragmented searches, qualification evidence and opportunity tracking into one governed supplier-intelligence workflow." />
        <ol className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map(([n,title,copy])=><li key={n} className="min-h-64 border-b border-r border-border p-7"><span className="font-mono text-[10px] text-primary">{n}</span><b className="mt-20 block font-serif text-2xl font-medium">{title}</b><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></li>)}
        </ol>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-28 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div><p className="font-mono text-[11px] uppercase tracking-[.16em] text-primary">Designed for procurement work</p><h2 className="mt-6 font-serif text-5xl font-medium leading-none tracking-[-.05em]">Evidence before assumption.</h2><p className="mt-7 max-w-xl leading-7 text-muted-foreground">Create a clearer path from a supplier name to a decision-ready record: what the vendor does, where the evidence came from, how it matches the opportunity, and what needs attention next.</p><a href="https://vendoreye.ae" target="_blank" rel="noreferrer" className="rehaul-button mt-9">Visit Vendoreye ↗</a></div>
        <div className="border border-border bg-card p-8"><div className="bg-white p-4 text-sm text-muted-foreground">Search suppliers, capabilities, evidence… <b className="float-right font-mono text-[9px] text-foreground">134K RECORDS</b></div>{['Verified supplier evidence','Opportunity match signals','Continuous vendor monitoring'].map((x,i)=><div key={x} className={`grid grid-cols-[34px_1fr_auto] border-t border-border px-2 py-5 text-sm ${i===1?'bg-primary text-white':''}`}><span className="font-mono text-[9px]">0{i+1}</span><b>{x}</b><em className="font-mono text-[8px] not-italic">READY</em></div>)}</div>
      </section>
      <section className="bg-primary text-white"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-6"><h2 className="max-w-4xl font-serif text-6xl font-medium leading-none tracking-[-.05em]">Make the next supplier decision with better context.</h2><SchedulerTrigger interest="Vendoreye" className="mt-10 inline-flex bg-white px-6 py-4 text-sm font-semibold text-primary">Discuss Vendoreye ↗</SchedulerTrigger></div></section>
    </div>
  )
}
