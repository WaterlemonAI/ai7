import Image from 'next/image'
import { Fragment, type ReactNode } from 'react'

const brands = {
  vendoreye: { name: 'Vendoreye', logo: '/logo-vendoreye.png' },
  taed: { name: 'taed.dev', logo: '/logo-taed.png' },
  rolefield: { name: 'rolefield.ai', logo: '/logo-rolefield.png' },
} as const

/** Normalize brand casing for metadata, structured data, email, and other plain text. */
export function canonicalBrandText(value: string) {
  return value.replace(/\bvendoreye\b/gi, 'Vendoreye')
}

/** Format visible names without changing URLs, identifiers or metadata. */
export function formatBrand(value: ReactNode, { logo = true }: { logo?: boolean } = {}): ReactNode {
  if (typeof value !== 'string' || !/\b(?:vendoreye|taed(?:\.dev)?|rolefield(?:\.ai)?)\b/i.test(value)) return value
  return value.split(/(\b(?:vendoreye|taed(?:\.dev)?|rolefield(?:\.ai)?)\b)/gi).map((part, index) => {
    const brand = /^vendoreye$/i.test(part) ? brands.vendoreye
      : /^taed(?:\.dev)?$/i.test(part) ? brands.taed
      : /^rolefield(?:\.ai)?$/i.test(part) ? brands.rolefield : null
    if (!brand) return <Fragment key={index}>{part}</Fragment>
    const wordmark = <strong className="brand-wordmark" style={{ fontWeight: 700, textTransform: brand === brands.vendoreye ? 'none' : 'lowercase', fontStyle: 'normal' }}>{brand.name}</strong>
    return <span key={index} className="brand-mention">
      {logo && <Image src={brand.logo} alt="" aria-hidden="true" loading="eager" unoptimized width={64} height={24} className="brand-inline-logo" />}
      {wordmark}
    </span>
  })
}
