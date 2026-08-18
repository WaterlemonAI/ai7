import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, AudioWaveform, Braces, Eye, Workflow } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Technology',
  description: 'Explore AI7Lab visual intelligence, speech-to-speech research, production AI APIs, and agentic task automation.',
  path: '/technology',
  keywords: ['visual intelligence LLM', 'speech to speech AI', 'agentic automation', 'production AI APIs'],
})

const systems = [
  {
    icon: Eye,
    eyebrow: 'Visual Intelligence',
    title: 'One model layer for documents and media.',
    body: 'Our end-to-end visual intelligence LLM works across documents, images, video, and audio. It extracts structure, understands context, and adds a reusable intelligence layer to messy enterprise inputs.',
    product: 'Taed turns this research into schema-controlled, versioned, monitored APIs.',
    href: 'https://taed.dev',
  },
  {
    icon: AudioWaveform,
    eyebrow: 'Speech-to-Speech',
    title: 'Voice that feels natural—and gets work done.',
    body: 'Our in-house speech-to-speech architecture is designed for faster, more natural, context-aware conversations without forcing every interaction through a conventional speech-to-text-to-speech chain.',
    product: 'RoleField.ai applies it to multilingual customer operations across the GCC.',
    href: 'https://www.rolefield.ai',
  },
  {
    icon: Workflow,
    eyebrow: 'Agentic Automation',
    title: 'Conversations are only the beginning.',
    body: 'Goal-based agents can qualify enquiries, schedule appointments, follow up, update CRM records, involve human teams, and complete the workflow that follows an interaction.',
    product: 'RoleField connects natural interaction with end-to-end task execution.',
    href: 'https://www.rolefield.ai',
  },
  {
    icon: Braces,
    eyebrow: 'Production Infrastructure',
    title: 'Research becomes infrastructure, not another demo.',
    body: 'Schema control, validation, versioning, monitoring, and reusable APIs make new intelligence capabilities deployable inside real enterprise systems.',
    product: 'The same foundation compounds across every AI7Lab product.',
    href: '/platform',
  },
]

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="We research the hard parts, then turn them into products."
        description="AI7Lab combines model research, systems engineering, and market research to make enterprise intelligence simpler to build, safer to deploy, and easier to scale."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">The Research Stack</p>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Multimodal understanding. Natural voice. Autonomous action.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-border bg-border">
            {systems.map((system, index) => {
              const Icon = system.icon
              const external = system.href.startsWith('http')
              const body = (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-primary">{system.eyebrow}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">{system.title}</h3>
                  </div>
                  <div>
                    <p className="leading-relaxed text-muted-foreground">{system.body}</p>
                    <p className="mt-4 text-sm font-medium text-foreground">{system.product}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      See it in production <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </>
              )
              return (
                <Reveal key={system.eyebrow} delay={(index % 2) * 70} className="bg-card">
                  {external ? (
                    <a href={system.href} target="_blank" rel="noreferrer" className="grid gap-6 p-7 transition-colors hover:bg-background md:grid-cols-[64px_0.9fr_1.2fr] md:p-9">{body}</a>
                  ) : (
                    <Link href={system.href} className="grid gap-6 p-7 transition-colors hover:bg-background md:grid-cols-[64px_0.9fr_1.2fr] md:p-9">{body}</Link>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">How We Work</p>
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">No technology theatre.</h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                We start with problems businesses already pay to solve. Technology research finds what has become possible; market research finds what matters. Product and engineering bring the two together, then real customer conversations keep shaping every release.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
