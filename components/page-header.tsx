import { Reveal } from '@/components/reveal'
import { AmbientBackdrop } from '@/components/ambient-backdrop'
import { WordReveal } from '@/components/word-reveal'

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <AmbientBackdrop />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 pt-32 sm:pt-36 pb-12 sm:pb-16 md:pt-44 md:pb-24">
        <Reveal>
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        </Reveal>
        <WordReveal
          as="h1"
          text={title}
          trigger="mount"
          delay={0.12}
          className="mt-4 sm:mt-5 max-w-4xl text-balance text-3xl sm:text-4xl font-semibold tracking-tight md:text-6xl"
        />
        {description ? (
          <Reveal delay={160}>
            <p className="mt-5 sm:mt-6 max-w-2xl text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
