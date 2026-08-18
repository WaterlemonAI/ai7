import { Reveal } from '@/components/reveal'
import { ArrowRight } from 'lucide-react'

const traditional = ['People', 'Processes', 'Software']
const autonomous = ['People', 'AI Agents', 'Intelligent Workflows']

export function Thesis() {
  return (
    <section className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">The AI-Native Thesis</p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            The next generation of enterprise won&apos;t use AI. It will be built on it.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Traditional organizations rely on people, processes, and software to reach outcomes. The
            autonomous enterprise combines human expertise with AI agents and intelligent workflows —
            delivering AI-augmented decisions and seamless, self-driving operations.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <Reveal className="rounded-2xl border border-border bg-card/50 p-8">
            <h3 className="text-sm font-medium text-muted-foreground">Traditional Enterprise</h3>
            <ul className="mt-6 space-y-4">
              {traditional.map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">→ Outcomes via manual effort</p>
          </Reveal>

          <Reveal delay={120} className="flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
              <ArrowRight className="h-5 w-5" />
            </div>
          </Reveal>

          <Reveal delay={200} className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-8">
            <h3 className="text-sm font-medium text-primary">Autonomous Enterprise</h3>
            <ul className="mt-6 space-y-4">
              {autonomous.map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">→ Autonomous outcomes, AI-assisted decisions</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
