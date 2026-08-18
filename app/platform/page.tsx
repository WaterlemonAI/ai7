import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { capabilities, industries } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Platform",
  description:
    "The AI7Lab platform: capabilities, architecture, and industry solutions for AI-native enterprises.",
  path: "/platform",
  keywords: ['enterprise AI platform', 'multimodal AI platform', 'AI governance infrastructure', 'AI APIs UAE'],
})

const layers = [
  {
    name: "Applications",
    detail: "Taed, VendorEye, RoleField.ai",
  },
  {
    name: "Intelligence Layer",
    detail: "Visual intelligence LLM, speech-to-speech models, goal-based agents",
  },
  {
    name: "Trust & Compliance",
    detail: "Policy controls, evidence, auditability, secure human handoffs",
  },
  {
    name: "Infrastructure",
    detail: "Versioned APIs, RBAC, encryption, observability, SOC 2 posture",
  },
]

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Platform"
        title="One stack. Every AI capability your enterprise needs."
        description="AI7Lab products share a common foundation — a layered platform that pairs autonomous intelligence with enterprise-grade trust, security, and governance."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">Architecture</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              A layered operating system.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-3">
            {layers.map((layer, i) => (
              <Reveal key={layer.name} delay={i * 80}>
                <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-primary">L{layers.length - i}</span>
                    <h3 className="text-lg font-semibold tracking-tight">{layer.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground md:max-w-md md:text-right">{layer.detail}</p>
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
              What we build with.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 80}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <h3 className="text-base font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
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
              Deployed across regulated sectors.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={(i % 3) * 60}>
                <div className="h-full bg-card p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{ind.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ind.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
