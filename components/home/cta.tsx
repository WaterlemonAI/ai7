import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function CTA() {
  return (
    <section className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.06] px-8 py-16 text-center md:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready for the AI-native future? Let&apos;s build it together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Talk to our founding team about partnerships, investment, or deploying AI7Lab products in
            your enterprise.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Talk to Founder <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
