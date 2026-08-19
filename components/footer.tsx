import Link from 'next/link'
import { Logo } from './logo'
import { linkedInUrl, products } from '@/lib/site'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'Vision', href: '/vision' },
      { label: 'Platform', href: '/platform' },
      { label: 'Technology', href: '/technology' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Products',
    links: products.slice(0, 4).map((p) => ({ label: p.name, href: `/products#${p.slug}` })),
  },
  {
    title: 'Resources',
    links: [
      { label: 'Insights', href: '/insights' },
      { label: 'Announcements', href: '/announcements' },
      { label: 'Careers', href: '/careers' },
      { label: 'LinkedIn', href: linkedInUrl },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Logo className="h-[50px] w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A research-led AI product company building enterprise intelligence in Dubai, for the world.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <div>
            <p>© {new Date().getFullYear()} AI7Lab. All rights reserved.</p>
            <p className="mt-2 text-xs text-muted-foreground/70">
              AI7LAB Tech Innovation Limited, DIFC, Dubai, UAE
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href={linkedInUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href="mailto:contact@ai7lab.net" className="break-all transition-colors hover:text-foreground">
              contact@ai7lab.net
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
