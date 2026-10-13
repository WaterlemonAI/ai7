'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { nav } from '@/lib/site'
import { Logo } from './logo'
import { cn } from '@/lib/utils'
import { SchedulerTrigger } from './scheduler'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        pathname === '/'
          ? 'border-b border-border bg-background/95 backdrop-blur-xl'
          : scrolled
          ? 'border-b border-border bg-background/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="AI7Lab home">
          <Logo className="h-[42.55px] w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b-2 border-transparent pb-2 text-[13px] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground aria-[current=page]:border-primary aria-[current=page]:text-foreground"
              aria-current={pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <SchedulerTrigger
            className="inline-flex min-h-11 items-center gap-3 rounded-none bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground"
          >
            Discuss a problem
            <ArrowUpRight className="h-4 w-4" />
          </SchedulerTrigger>
        </div>

        <button
          className="inline-flex h-11 min-w-20 items-center justify-center gap-2 rounded-none text-foreground transition-colors hover:bg-secondary lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <><span className="text-sm">Close</span><X className="h-4 w-4" /></> : <><span className="text-sm">Menu</span><Menu className="h-4 w-4" /></>}
        </button>
      </div>

      <div
        inert={!open}
        className={cn(
          'overflow-hidden border-t border-border/60 bg-background lg:hidden',
          open ? 'max-h-[calc(100dvh-5rem)] overflow-y-auto' : 'max-h-0 border-t-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4 sm:px-6" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-current={pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <SchedulerTrigger
            onOpen={() => setOpen(false)}
            className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-none bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Discuss a problem
            <ArrowUpRight className="h-4 w-4" />
          </SchedulerTrigger>
        </nav>
      </div>
    </header>
  )
}
