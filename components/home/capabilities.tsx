import Link from 'next/link'
import { ArrowRight, Bot, Database, ShieldCheck, Network, Lock, LayoutGrid } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { capabilities } from '@/lib/site'

const icons = [Bot, Database, ShieldCheck, Network, Lock, LayoutGrid]

export function Capabilities() {
  return (
    <section className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Core Capabilities</p>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            One modular platform beneath every venture.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            API gateway, schema engine, model runtime, governance, data infrastructure, and agent
            orchestration — the digital plumbing for any AI-native enterprise.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={cap.title} delay={(i % 3) * 80} className="bg-card/60 p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-tight">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/platform"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Explore the platform <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
