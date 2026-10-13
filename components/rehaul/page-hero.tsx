import type { ReactNode } from 'react'

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description: string; children?: ReactNode }) {
  return (
    <header className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-6 md:pb-24 md:pt-44">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      <h1 className="mt-6 max-w-5xl font-serif text-5xl font-medium leading-[0.96] tracking-[-0.055em] text-foreground sm:text-7xl lg:text-[6.25rem]">{title}</h1>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
      {children}
    </header>
  )
}

export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) {
  return (
    <div className="grid gap-7 md:grid-cols-2 md:items-end">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
        <h2 className="mt-5 font-serif text-4xl font-medium leading-none tracking-[-0.045em] sm:text-6xl">{title}</h2>
      </div>
      {copy && <p className="max-w-xl leading-7 text-muted-foreground md:justify-self-end">{copy}</p>}
    </div>
  )
}

export function ClaimNote({ children }: { children: ReactNode }) {
  return <small className="mt-auto font-mono text-[9px] uppercase leading-5 tracking-[0.04em] text-muted-foreground">{children}</small>
}
