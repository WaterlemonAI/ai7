import Image from 'next/image'
import { Share2 } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { linkedInUrl, team } from '@/lib/site'
import { formatBrand } from '@/lib/brand-text'

export function CoreTeam() {
  return (
      <section id="team" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">The Team</p>
              <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">Built by operators, technologists, and researchers.</h2>
            </div>
            <a href={linkedInUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary">
              Follow AI7Lab <Share2 className="h-4 w-4" />
            </a>
          </Reveal>

          <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground">The core team sets direction, builds the underlying IP, works with customers, and orchestrates a much larger technical and commercial ecosystem.</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={(index % 3) * 70}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                  <div className="flex items-center gap-4">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 shrink-0 rounded-full border border-primary/15 object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary">
                        {member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{formatBrand(member.name)}</h3>
                      <p className="text-sm text-primary">{formatBrand(member.role)}</p>
                    </div>
                  </div>
                  <p className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">{formatBrand(member.bio)}</p>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{formatBrand(member.focus)}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 border-t border-primary/20 pt-7">
            <p className="text-sm font-medium leading-7 text-primary">Core team × access to 130+ qualified AI engineers &amp; developers across the ecosystem × technology partners × GTM partners</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">AI7Lab stays focused at the center while scaling specialist capability around each program.</p>
          </div>
        </div>
      </section>

  )
}
