import type { Metadata } from "next"
import { Mail, MapPin, Building2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { ContactForm } from "@/components/contact-form"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Talk to AI7Lab in Dubai about Vendoreye, RoleField, Taed, or an enterprise problem that agentic AI could solve.",
  path: "/contact",
  keywords: ['AI company Dubai contact', 'enterprise AI UAE'],
})

const details = [
  { icon: MapPin, label: "Headquarters", value: "Dubai, United Arab Emirates" },
  { icon: Mail, label: "Email", value: "contact@ai7lab.net", href: "mailto:contact@ai7lab.net" },
  { icon: Building2, label: "For", value: "Product teams, enterprises & delivery partners" },
]

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ interest?: string }> }) {
  const { interest } = await searchParams
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Bring us the problem worth solving."
        description="Tell us where work is slow, expensive, fragmented or constrained. We’ll help determine whether an AI7Lab product fits—or frame a focused path from problem to operated outcome."
      />

      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_1.4fr] md:py-24">
          <Reveal className="flex flex-col gap-8">
            {details.map((d) => (
              <div key={d.label} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
                  <d.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a href={d.href} className="mt-1 block text-foreground transition-colors hover:text-primary">{d.value}</a>
                  ) : (
                    <p className="mt-1 text-foreground">{d.value}</p>
                  )}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mb-3 text-2xl font-semibold tracking-tight">Start with the operating reality.</h2><p className="mb-7 leading-relaxed text-muted-foreground">Share the workflow, current systems, scale, constraints and outcome that matters. The first conversation will help identify the right product or a focused enterprise AI starting point.</p><ContactForm initialInterest={interest} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
