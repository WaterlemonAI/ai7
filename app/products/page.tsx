import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/rehaul/page-hero'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Agentic AI Products',
  description: 'Explore Vendoreye supplier intelligence and RoleField customer operations AI, with Taed visual and document intelligence from the AI7Lab technology lab.',
  path: '/products',
  keywords: ['agentic AI products', 'Vendoreye', 'RoleField', 'supplier intelligence', 'customer operations AI'],
})

export default function ProductsPage() {
  return (
    <div className="rehaul-page">
      <PageHero eyebrow="Portfolio" title={<>Products built around <em className="font-medium text-primary">valuable work.</em></>} description="Focused AI products for supplier intelligence and end-to-end customer operations, supported by tools born inside the lab." />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-28 sm:px-6 lg:grid-cols-2">
        <Link href="/products/vendoreye" className="flex min-h-[610px] flex-col border border-border bg-card p-9 no-underline transition-transform hover:-translate-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[.12em]">01 / Product</span>
          <Image src="/logo-vendoreye.png" alt="Vendoreye" width={1500} height={500} className="mt-16 h-8 w-36 object-contain object-left" />
          <h2 className="mt-10 max-w-lg font-serif text-5xl font-medium leading-none tracking-[-.05em]">Supplier and opportunity intelligence.</h2>
          <p className="mt-6 max-w-lg leading-7 text-muted-foreground">Discover, verify, qualify and monitor vendors in one continuously useful record.</p>
          <div className="mt-auto grid grid-cols-1 border-y border-border sm:grid-cols-3">
            {[['134,000+','registered vendors'],['20+','large scale buyers'],['8,000+','tenders published']].map(([value,label],i)=><span key={label} className={`py-5 sm:py-6 ${i ? 'border-t border-border pt-5 sm:border-l sm:border-t-0 sm:pl-4' : ''}`}><strong className="block font-serif text-4xl font-medium text-primary">{value}</strong><small className="font-mono text-[7px] uppercase text-muted-foreground">{label}</small></span>)}
          </div>
          <b className="mt-7 text-sm">Explore Vendoreye ↗</b>
        </Link>

        <Link href="/products/rolefield" className="flex min-h-[610px] flex-col border border-primary bg-primary p-9 text-white no-underline transition-transform hover:-translate-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[.12em] text-white/75">02 / Product · Customer operations AI</span>
          <Image src="/logo-rolefield.png" alt="RoleField" width={1527} height={341} className="mt-16 h-8 w-40 object-contain object-left brightness-0 invert" />
          <h2 className="mt-10 max-w-lg font-serif text-5xl font-medium leading-none tracking-[-.05em]">Customer operations, from call centre to kiosk.</h2>
          <p className="mt-6 max-w-lg leading-7 text-white/75">Support, calling and call-centre operations, plus in-person AI through Seer.</p>
          <div className="mt-auto grid grid-cols-3 border-y border-white/30">
            {[['60M+','calls'],['~10M','calls / month'],['$1M+','reported savings']].map(([value,label],i)=><span key={label} className={`py-6 ${i ? 'border-l border-white/30 pl-4' : ''}`}><strong className="block font-serif text-4xl font-medium">{value}</strong><small className="font-mono text-[7px] uppercase text-white/70">{label}</small></span>)}
          </div>
          <b className="mt-7 text-sm">Explore RoleField ↗</b>
        </Link>

        <Link href="/technology/taed" className="grid min-h-56 gap-8 border border-border p-8 no-underline md:col-span-2 md:grid-cols-[170px_1fr_280px] md:items-center">
          <div><span className="font-mono text-[9px] uppercase text-muted-foreground">Built by the lab / Tool</span><Image src="/logo-taed.png" alt="Taed" width={100} height={36} className="mt-7 h-8 w-auto object-contain" /></div>
          <h2 className="font-serif text-3xl font-medium tracking-[-.04em]">Structured intelligence from unstructured media.</h2>
          <div><p className="text-sm leading-6 text-muted-foreground">A reusable visual and document intelligence capability.</p><b className="mt-8 block text-sm">Explore Taed ↗</b></div>
        </Link>
      </section>
    </div>
  )
}
