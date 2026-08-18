import type { Metadata } from "next"
import { Mail, MapPin, Building2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { ContactForm } from "@/components/contact-form"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with the AI7Lab team in Dubai, UAE.",
  path: "/contact",
  keywords: ['AI company Dubai contact', 'enterprise AI UAE'],
})

const details = [
  { icon: MapPin, label: "Headquarters", value: "Dubai, United Arab Emirates" },
  { icon: Mail, label: "Email", value: "contact@ai7lab.net", href: "mailto:contact@ai7lab.net" },
  { icon: Building2, label: "For", value: "Enterprises, partners & investors" },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build the AI-native future together."
        description="Whether you're an enterprise ready to deploy, a partner exploring collaboration, or an investor tracking the region's AI landscape — we'd love to hear from you."
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
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
