'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { CalendarDays, Clock3, Globe2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const schedulerEvent = 'ai7lab:open-scheduler'
const times = Array.from({ length: 16 }, (_, index) => {
  const minutes = 9 * 60 + index * 30
  const hour = String(Math.floor(minutes / 60)).padStart(2, '0')
  const minute = String(minutes % 60).padStart(2, '0')
  return `${hour}:${minute}`
})

const interests = ['General business problem', 'Vendoreye', 'RoleField', 'Enterprise AI', 'Partnership']

function dateInDubai(offsetDays = 0) {
  const date = new Date(Date.now() + offsetDays * 86400000)
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date)
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? ''
  return `${part('year')}-${part('month')}-${part('day')}`
}

function isBusinessDay(date: string) {
  if (!date) return false
  const day = new Date(`${date}T12:00:00+04:00`).getUTCDay()
  return day >= 1 && day <= 5
}

export function SchedulerTrigger({ children, interest = 'General business problem', className, onOpen }: { children: ReactNode; interest?: string; className?: string; onOpen?: () => void }) {
  return <button type="button" className={cn('cursor-pointer', className)} onClick={() => { onOpen?.(); window.dispatchEvent(new CustomEvent(schedulerEvent, { detail: { interest } })) }}>{children}</button>
}

export function SchedulerModal() {
  const [open, setOpen] = useState(false)
  const [interest, setInterest] = useState(interests[0])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('09:00')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [message, setMessage] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', [])
  const localTime = useMemo(() => {
    if (!date || !time || !isBusinessDay(date)) return ''
    return new Intl.DateTimeFormat(undefined, { timeZone: timezone, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(new Date(`${date}T${time}:00+04:00`))
  }, [date, time, timezone])

  useEffect(() => {
    function show(event: Event) {
      const requested = (event as CustomEvent<{ interest?: string }>).detail?.interest
      setInterest(interests.includes(requested ?? '') ? requested! : interests[0])
      setStatus('idle'); setMessage(''); setOpen(true)
    }
    window.addEventListener(schedulerEvent, show)
    return () => window.removeEventListener(schedulerEvent, show)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement as HTMLElement | null
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    nameRef.current?.focus()
    function keys(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab' || !dialogRef.current) return
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button,input,select,textarea')).filter((item) => !item.hasAttribute('disabled'))
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus() }
      else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0]?.focus() }
    }
    document.addEventListener('keydown', keys)
    return () => { document.removeEventListener('keydown', keys); document.body.style.overflow = originalOverflow; previousFocus?.focus() }
  }, [open])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isBusinessDay(date)) { setMessage('Choose a Monday–Friday date.'); return }
    setStatus('sending'); setMessage('')
    const values = Object.fromEntries(new FormData(event.currentTarget).entries())
    try {
      const response = await fetch('/api/schedule', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...values, interest, date, time, timezone }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'The meeting could not be booked.')
      setStatus('success')
    } catch (error) {
      setStatus('idle')
      setMessage(error instanceof Error ? error.message : 'The meeting could not be booked.')
    }
  }

  if (!open) return null
  return <div className="scheduler-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}><div ref={dialogRef} className="scheduler-dialog" role="dialog" aria-modal="true" aria-labelledby="scheduler-title">
    <button className="scheduler-close" type="button" onClick={() => setOpen(false)} aria-label="Close scheduler"><X /></button>
    {status === 'success' ? <div className="scheduler-success"><span>✓</span><p className="scheduler-eyebrow">Meeting confirmed</p><h2 id="scheduler-title">Your time is reserved.</h2><p>Check your inbox for two messages: a booking confirmation and a separate calendar invitation. The relevant AI7Lab team will receive the meeting details.</p><button type="button" onClick={() => setOpen(false)}>Close</button></div> : <>
      <p className="scheduler-eyebrow">AI7Lab / Schedule a conversation</p><h2 id="scheduler-title">Pick a time that works.</h2><p className="scheduler-intro">Thirty-minute conversations, Monday to Friday, 9:00 AM–5:00 PM Gulf Standard Time. Your selected time is also shown in your timezone.</p>
      <form onSubmit={submit}>
        <label className="scheduler-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <div className="scheduler-grid"><label>Your name<input ref={nameRef} name="name" autoComplete="name" required /></label><label>Work email<input name="email" type="email" autoComplete="email" required /></label><label>Phone number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+971 50 123 4567" required /></label><label>Organisation<input name="organisation" autoComplete="organization" required /></label></div>
        <label>Conversation<select name="interest" value={interest} onChange={(event) => setInterest(event.target.value)}>{interests.map((item) => <option key={item}>{item}</option>)}</select></label>
        <div className="scheduler-slot"><label><CalendarDays />Date<input name="date" type="date" min={dateInDubai()} max={dateInDubai(90)} value={date} onChange={(event) => { setDate(event.target.value); setMessage('') }} required /></label><label><Clock3 />Time in UAE<select name="time" value={time} onChange={(event) => setTime(event.target.value)}>{times.map((slot) => <option key={slot} value={slot}>{new Date(`2000-01-01T${slot}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</option>)}</select></label></div>
        <div className="scheduler-timezone"><Globe2 /><span><b>Your timezone</b>{timezone}{localTime && <> · <strong>{localTime}</strong></>}</span></div>
        <div className="scheduler-grid"><label>Preferred language<select name="language" defaultValue="English"><option>English</option><option>Arabic</option></select></label><label>Other attendees <small>Optional, comma-separated</small><input name="attendees" type="text" placeholder="colleague@company.com" /></label></div>
        <label>What should work better? <small>Optional</small><textarea name="notes" rows={3} placeholder="Give the team enough context to prepare." /></label>
        {message && <p className="scheduler-error" role="alert">{message}</p>}
        <button className="scheduler-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Reserving…' : 'Confirm meeting'}<span>↗</span></button>
        <small className="scheduler-disclosure">You receive a branded confirmation email and a separate calendar invitation. Optional attendees and the relevant AI7Lab team receive the invitation.</small>
      </form>
    </>}
  </div></div>
}
