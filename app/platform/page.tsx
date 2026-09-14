import { DeliveryCTA } from '@/components/delivery-cta'
import { stages } from '@/components/home/sovereign/stages'
import { formatBrand } from '@/lib/brand-text'
import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { industries } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Platform",
  description:
    "Explore how AI7Lab assembles customer-controlled AI environments across infrastructure, data, models, applications, governance, and operations.",
  path: "/platform",
  keywords: ['enterprise AI platform', 'multimodal AI platform', 'AI governance infrastructure', 'AI APIs UAE'],
})

const layers = [
  { name: "Applications & workflows", detail: "Enterprise applications, integrations, agents, and human review" },
  { name: "Models & intelligence", detail: "Open and private models, RAG, multimodal AI, and model routing" },
  { name: "Data & knowledge", detail: "Controlled ingestion, retrieval, permissions, and data residency" },
  { name: "Compute & infrastructure", detail: "GPUs, storage, networking, model serving, and capacity planning" },
  { name: "Control across every layer", detail: "Identity, policy, evaluations, audit trails, and operational monitoring" },
]

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your AI Environment"
        title="An AI stack designed around your organisation."
        description="We select and integrate the infrastructure, models, data systems, and applications your workloads need. The architecture defines what you own, where workloads run, how access is governed, and who operates each layer."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">Architecture</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Connected layers. Explicit control boundaries.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-3">
            {layers.map((layer, i) => (
              <Reveal key={layer.name} delay={i * 80}>
                <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-primary">L{formatBrand(layers.length - i)}</span>
                    <h3 className="text-lg font-semibold tracking-tight">{formatBrand(layer.name)}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground md:max-w-md md:text-right">{formatBrand(layer.detail)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">Capabilities</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Seven disciplines, from strategy to operations.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 80}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <h3 className="text-base font-semibold tracking-tight">{formatBrand(c.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{formatBrand(c.description)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">Industries</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Use cases across enterprise and government.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={(i % 3) * 60}>
                <div className="h-full bg-card p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{formatBrand(ind.name)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{formatBrand(ind.blurb)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    <DeliveryCTA /></>
  )
}
