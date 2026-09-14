import { DeliveryCTA } from '@/components/delivery-cta'
import { formatBrand } from '@/lib/brand-text'
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Check } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { products, statusStyles } from "@/lib/site"
import { blogPosts } from "@/lib/blogs"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Explore taed.dev, vendoreye, and rolefield.ai — AI7Lab products for visual intelligence, supplier intelligence, and voice-led automation.",
  path: "/products",
  keywords: ['taed.dev API', 'vendoreye supplier intelligence', 'rolefield.ai AI', 'enterprise AI products'],
})

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Products"
        title="Applied intelligence. Built for real workflows."
        description="taed.dev, vendoreye, and rolefield.ai demonstrate AI7Lab’s applied work in multimodal intelligence, supplier workflows, and voice-led automation. Alongside these products, we design, build, and operate customer-controlled AI environments."
      />

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="space-y-px">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 2) * 80}>
                <article
                  id={product.slug}
                  className="grid scroll-mt-28 gap-8 border-t border-border py-12 md:grid-cols-[1fr_1.2fr] md:py-16"
                >
                  <div>
                    <div className="flex items-start gap-4">
                      {["vendoreye", "taed", "rolefield"].includes(product.slug) ? (<span className="text-3xl">{formatBrand(product.name)}</span>) : product.logo && (
                        <div className="relative h-16 w-40 shrink-0">
                          <Image
                            src={product.logo}
                            alt={`${product.name} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-xs ${statusStyles[product.status]}`}
                          >
                            {formatBrand(product.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-pretty font-medium text-primary">{formatBrand(product.tagline)}</p>
                    {product.external ? (
                      <a
                        href={product.external}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {formatBrand(product.external.replace(/^https?:\/\/(?:www\.)?/, ""))}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href="/contact"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {formatBrand(product.status === "Coming Soon" ? "Request early access" : "Get in touch")}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>

                  <div>
                    <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                      {formatBrand(product.description)}
                    </p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {product.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/90">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {formatBrand(point)}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/insights/${blogPosts.find((post) => post.product === product.slug)?.slug}`} className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground">
                      Read {formatBrand(product.name)} industry guides
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    <DeliveryCTA products /></>
  )
}
