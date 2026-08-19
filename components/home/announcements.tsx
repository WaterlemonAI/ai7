import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { announcements } from '@/lib/site'

export function Announcements() {
  return (
    <section className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Latest from AI7Lab</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              New products, fresh research, and the people moving it forward.
            </h2>
          </div>
          <Link href="/announcements" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            All announcements <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-3">
          {announcements.slice(0, 3).map((item, index) => {
            const external = item.href.startsWith('http')
            const content = (
              <>
                <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest">
                  <span className="text-primary">{item.category}</span>
                  <time className="text-muted-foreground" dateTime={item.date}>
                    {new Date(`${item.date}T00:00:00`).toLocaleDateString('en-AE', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-primary">
                  Read update {external ? <ArrowUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </span>
              </>
            )

            return (
              <Reveal key={item.slug} delay={index * 70} className="bg-card/70">
                {external ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="group flex h-full flex-col p-7 transition-colors hover:bg-background">
                    {content}
                  </a>
                ) : (
                  <Link href={item.href} className="group flex h-full flex-col p-7 transition-colors hover:bg-background">
                    {content}
                  </Link>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
