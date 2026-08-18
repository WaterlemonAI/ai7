import { Reveal } from '@/components/reveal'
import { industries } from '@/lib/site'
import { Landmark, ShieldCheck, Building2, HeartPulse, Home, Truck } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

const icons = [Landmark, ShieldCheck, Building2, HeartPulse, Home, Truck]

export function Industries() {
  return (
    <section className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Industry Solutions</p>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Domain intelligence, built in.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal
                key={ind.name}
                delay={(i % 3) * 80}
                className="group rounded-2xl border border-border bg-card/50 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <a href={`/insights#${ind.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex h-full items-start gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><Icon className="h-5 w-5" /></div>
                  <div className="flex h-full flex-col"><h3 className="text-base font-medium">{ind.name}</h3><p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{ind.blurb}</p><span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary">Read 3 industry guides <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></div>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
