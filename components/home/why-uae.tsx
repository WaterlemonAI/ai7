import { Reveal } from '@/components/reveal'
import { GlobeScene } from '@/components/three/globe-scene'

const initiatives = [
  { title: 'UAE AI Strategy 2031', desc: 'Aligned with the nation’s ambition to lead in artificial intelligence.' },
  { title: 'Dubai Economic Agenda D33', desc: 'Contributing to Dubai’s goal of doubling its economy this decade.' },
  { title: 'DIFC Innovation Hub', desc: 'Headquartered in the region’s premier fintech and tech ecosystem.' },
  { title: 'Global from day one', desc: 'Built to serve enterprises across MENA, Asia, and beyond.' },
]

export function WhyUAE() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Why Dubai</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Built in the UAE. Listening to the region. Ready for the world.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              AI7Lab sits close to ambitious enterprises, multilingual markets, and fast-moving customer
              needs. That makes the UAE an exceptional place to combine research with commercial signal
              and build products for the GCC and beyond.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {initiatives.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 2) * 100}
                className="rounded-2xl border border-border bg-card/50 p-6"
              >
                <h3 className="text-base font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="order-first lg:order-last">
          <GlobeScene />
        </Reveal>
      </div>
    </section>
  )
}
