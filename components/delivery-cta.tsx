import Link from 'next/link'

export function DeliveryCTA({ products = false }: { products?: boolean }) {
  return <section className="border-t border-border bg-blue-50/50"><div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
    <p className="font-mono text-xs uppercase tracking-widest text-primary">From requirements to production</p>
    <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">Start with your workload. Design for your control requirements.</h2>
    <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{products ? 'Explore a product for a specific workflow, or work with AI7Lab on a broader private AI environment. Product features, hosting options, integrations, and control boundaries are scoped for each engagement.' : 'Define the use case, choose an on-premise, dedicated private, or controlled hybrid architecture, and connect engineering, governance, and operations around it.'}</p>
    <div className="mt-8 flex flex-wrap gap-5"><Link href="/contact?interest=Sovereign%20AI%20strategy" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">Design your AI stack ↗</Link><Link href="/technology" className="px-1 py-3 text-sm font-medium text-primary">Explore the technology ↗</Link></div>
  </div></section>
}
