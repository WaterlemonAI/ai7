import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero, SectionHeading } from '@/components/rehaul/page-hero'
import { pageMetadata } from '@/lib/seo'
import { team } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Company | Products Built on Agentic AI',
  description:
    'Meet AI7Lab, the Dubai-based team building agentic AI products and helping leading organisations solve complex operational problems.',
  path: '/vision',
  keywords: ['AI product company Dubai', 'agentic AI company UAE', 'AI7Lab company', 'enterprise AI Dubai'],
})

const operatingModel = [
  ['01', 'Products', 'Build focused products around repeatable, high-value operational problems.'],
  ['02', 'Enterprise work', 'Work alongside organisations to frame, prove, integrate, and operate AI outcomes.'],
  ['03', 'The lab', 'Explore new capabilities and problems before they become obvious categories.'],
]

const principles = [
  'Problem before technology',
  'Evidence before scale',
  'Systems before demos',
  'Progress without lock-in',
]

export default function VisionPage() {
  return (
    <div className="rehaul-page">
      <PageHero
        eyebrow="Company"
        title={
          <>
            We build what the next
            <br />
            <em className="font-medium text-primary">operation needs.</em>
          </>
        }
        description="AI7Lab is a Dubai-based product company building on agentic AI. We create products, work with leading organisations on hard operational problems, and keep looking for the next solution that can add value to the ecosystem."
      />

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-6">
        <div className="grid border-l border-t border-border md:grid-cols-3">
          {operatingModel.map(([number, title, copy]) => (
            <article key={number} className="flex min-h-72 flex-col border-b border-r border-border p-7">
              <span className="font-mono text-[10px] text-primary">{number}</span>
              <h2 className="mt-auto font-serif text-3xl font-medium">{title}</h2>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6">
          <div className="grid gap-7 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ai7-cyan)]">
                What holds it together
              </p>
              <h2 className="mt-5 font-serif text-4xl font-medium leading-none tracking-[-0.045em] sm:text-6xl">
                Curiosity with operational discipline.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-white/75 md:justify-self-end">
              We push the boundary of what is possible, but judge the work by whether it performs reliably inside the organisation that needs it.
            </p>
          </div>
          <div className="mt-14 grid border-l border-t border-white/25 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <div key={principle} className="min-h-48 border-b border-r border-white/25 p-7">
                <span className="font-mono text-[9px] text-[var(--ai7-cyan)]">0{index + 1}</span>
                <b className="mt-20 block font-serif text-2xl font-medium">{principle}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(circle at 82% 10%, color-mix(in srgb, var(--ai7-cyan) 16%, transparent), transparent 29%), linear-gradient(180deg, white, color-mix(in srgb, var(--ai7-cyan) 5%, white))',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-6">
          <SectionHeading
            eyebrow="Leadership"
            title="The people turning ambition into operation."
            copy="A cross-functional leadership team spanning AI research, product, technology, customer operations, sales, and partnerships—aligned around building useful systems that perform in the real world."
          />

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="text-primary">One operating team</span>
            <span aria-hidden="true" className="text-[var(--ai7-sky)]">●</span>
            <span>Dubai · UAE</span>
            <span aria-hidden="true" className="text-[var(--ai7-sky)]">●</span>
            <span>Research to production</span>
          </div>

          <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <article
                key={member.name}
                className="group relative flex min-h-full flex-col overflow-hidden border-b border-r border-border bg-white/85"
              >
                <div className="flex items-center justify-between border-b border-border px-5 py-4 font-mono text-[9px] uppercase tracking-[0.13em]">
                  <span className="text-primary">0{index + 1}</span>
                  <span className="text-right text-muted-foreground">{member.focus}</span>
                </div>

                <div className="relative flex flex-1 flex-col p-6 sm:min-h-[22rem] sm:p-7">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--ai7-deep),var(--ai7-mid),var(--ai7-sky),var(--ai7-cyan))] transition-transform duration-500 group-hover:scale-x-100"
                  />

                  <div className="relative h-20 w-20 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--ai7-deep),var(--ai7-sky),var(--ai7-cyan))] p-[2px] sm:h-24 sm:w-24">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-card ring-4 ring-white">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={`Portrait of ${member.name}`}
                          fill
                          className="object-cover grayscale-[8%] transition duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                          style={{ objectPosition: member.photoPosition ?? 'center' }}
                          sizes="96px"
                        />
                      ) : (
                        <span className="grid h-full place-content-center font-serif text-3xl text-primary">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-8 font-serif text-3xl font-medium tracking-[-0.035em]">{member.name}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-primary">{member.role}</p>
                  <p className="mt-auto pt-7 text-sm leading-6 text-muted-foreground">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
