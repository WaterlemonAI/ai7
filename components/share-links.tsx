'use client'

import { useState } from 'react'
import { Check, Copy, Mail, MessageCircle, Share2 } from 'lucide-react'

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(`${title} — AI7Lab`)

  async function copyLink() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const itemClass = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary'

  return (
    <div className="flex flex-wrap gap-2" aria-label="Share this job">
      <a className={itemClass} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer">
        <Share2 className="h-4 w-4" /> LinkedIn
      </a>
      <a className={itemClass} href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noreferrer">
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
      <a className={itemClass} href={`mailto:?subject=${encodedText}&body=${encodedUrl}`}>
        <Mail className="h-4 w-4" /> Email
      </a>
      <button type="button" className={itemClass} onClick={copyLink}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}
