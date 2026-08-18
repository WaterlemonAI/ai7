import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Orbit } from '@/components/home/orbit'
import { products, statusStyles } from '@/lib/site'

export function Ecosystem() {
  return (
    <section className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Our Ecosystem</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Three products. One shared intelligence layer.
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal className="mt-16 flex justify-center">
          <Orbit />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 80}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/40">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="sr-only">{product.name}</h3>
                  <div className="relative h-12 w-36">
                    <Image
                      src={product.logo}
                      alt={`${product.name} logo`}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs ${statusStyles[product.status]}`}
                  >
                    {product.status}
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-primary">{product.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                {product.external ? (
                  <a
                    href={product.external}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary"
                  >
                    Visit {product.external.replace('https://', '')}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={`/products#${product.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary"
                  >
                    {product.status === 'Coming Soon' ? 'Join waitlist' : 'Learn more'}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
