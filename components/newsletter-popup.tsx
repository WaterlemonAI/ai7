'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const sessionKey = 'ai7lab-newsletter-shown-v1'
const topics = ['AI News', 'Product Insights', 'Releases']

function wasShownThisSession() {
  try { return window.sessionStorage.getItem(sessionKey) === 'shown' }
  catch { return false }
}

function markShownThisSession() {
  try { window.sessionStorage.setItem(sessionKey, 'shown') }
  catch { /* Continue without persistence when storage is unavailable. */ }
}

export function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const dialogRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (wasShownThisSession()) return
    const timer = window.setTimeout(() => {
      markShownThisSession()
      setOpen(true)
    }, 4000)
    function deferToScheduler() {
      window.clearTimeout(timer)
      markShownThisSession()
      setOpen(false)
    }
    window.addEventListener('ai7lab:open-scheduler', deferToScheduler)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('ai7lab:open-scheduler', deferToScheduler)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement as HTMLElement | null
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    emailRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, input, a[href]')).filter((element) => !element.hasAttribute('disabled'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
      previousFocus?.focus()
    }
  }, [open])

  function close() {
    setOpen(false)
    setError('')
    setStatus('idle')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const selected = topics.filter((topic) => data.getAll('topics').includes(topic))
    if (!selected.length) {
      setError('Select at least one newsletter topic.')
      return
    }
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: String(data.get('email') ?? ''), topics: selected, website: String(data.get('website') ?? '') }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Subscription is temporarily unavailable.')
      setStatus('success')
    } catch (submissionError) {
      setStatus('idle')
      setError(submissionError instanceof Error ? submissionError.message : 'Subscription is temporarily unavailable.')
    }
  }

  if (!open) return null

  return (
    <div className="newsletter-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
      <div ref={dialogRef} className="newsletter-dialog" role="dialog" aria-modal="true" aria-labelledby="newsletter-title" aria-describedby="newsletter-description">
        <button type="button" className="newsletter-close" onClick={close} aria-label="Close newsletter signup"><X aria-hidden="true" /></button>
        <p className="newsletter-eyebrow">AI7Lab / Signal, not noise</p>
        <h2 id="newsletter-title">Choose what reaches your inbox.</h2>
        <p id="newsletter-description">A focused dispatch from the lab. Select only the signals useful to you.</p>
        {status === 'success' ? <div className="newsletter-success" role="status"><span>✓</span><h3>You’re subscribed.</h3><p>Your selected AI7Lab signals will reach this inbox.</p><button type="button" onClick={close}>Close</button></div> : <form onSubmit={submit}>
          <label className="scheduler-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <label className="newsletter-email">Work email<input ref={emailRef} type="email" name="email" autoComplete="email" placeholder="you@company.com" required /></label>
          <fieldset><legend>Topics</legend><div className="newsletter-topics">{topics.map((topic) => <label key={topic}><input type="checkbox" name="topics" value={topic} defaultChecked={topic === 'Product Insights'} /><span>{topic}</span></label>)}</div></fieldset>
          {error && <p className="newsletter-error" role="alert">{error}</p>}
          <button className="newsletter-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Subscribing…' : 'Subscribe to selected topics'} <span>↗</span></button>
          <small>Your preferences are stored securely so you receive only the selected topics.</small>
        </form>}
      </div>
    </div>
  )
}
