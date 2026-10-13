import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { buildBookingMessages, recipientFor, sendBookingEmails } from '@/lib/scheduler-email'
import { createBookingRecord, updateBookingDelivery } from '@/lib/aws-data'

export const runtime = 'nodejs'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?[0-9]{7,15}$/
const validTimes = new Set(Array.from({ length: 16 }, (_, index) => { const minutes = 9 * 60 + index * 30; return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}` }))

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (String(body.website || '').trim()) return NextResponse.json({ ok: true })
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim().toLowerCase()
    const phone = String(body.phone || '').trim().slice(0, 30)
    const normalizedPhone = phone.replace(/[\s().-]/g, '')
    const organisation = String(body.organisation || '').trim()
    const interest = String(body.interest || 'General business problem').trim()
    const date = String(body.date || '')
    const time = String(body.time || '')
    const language = String(body.language || 'English').trim()
    const timezone = String(body.timezone || 'UTC').trim().slice(0, 80)
    const notes = String(body.notes || '').trim().slice(0, 2000)
    const attendees = String(body.attendees || '').split(',').map((item) => item.trim().toLowerCase()).filter(Boolean)

    if (!name || !organisation || !emailPattern.test(email) || !phonePattern.test(normalizedPhone)) return NextResponse.json({ error: 'Enter your name, organisation, work email and a valid phone number.' }, { status: 400 })
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !validTimes.has(time)) return NextResponse.json({ error: 'Choose a valid 30-minute UAE business-hours slot.' }, { status: 400 })
    if (attendees.length > 5 || attendees.some((item) => !emailPattern.test(item))) return NextResponse.json({ error: 'Enter up to five valid attendee email addresses.' }, { status: 400 })

    const startsAt = new Date(`${date}T${time}:00+04:00`)
    const day = startsAt.getUTCDay()
    if (!Number.isFinite(startsAt.getTime()) || day === 0 || day === 6 || startsAt.getTime() < Date.now()) return NextResponse.json({ error: 'Choose a future Monday–Friday slot.' }, { status: 400 })
    if (startsAt.getTime() > Date.now() + 91 * 86400000) return NextResponse.json({ error: 'Choose a date within the next 90 days.' }, { status: 400 })

    const internalRecipient = recipientFor(interest)
    const smtpHost = process.env.SCHEDULER_SMTP_HOST
    const smtpUser = process.env.SCHEDULER_SMTP_USER
    const smtpPass = process.env.SCHEDULER_SMTP_PASS
    const from = process.env.SCHEDULER_SMTP_FROM
    const organizerEmail = process.env.SCHEDULER_ORGANIZER_EMAIL || smtpUser
    if (!smtpHost || !smtpUser || !smtpPass || !from || !organizerEmail || !internalRecipient) return NextResponse.json({ error: 'Online booking is ready but SMTP and audience recipients have not been configured yet.' }, { status: 503 })

    const transporter = nodemailer.createTransport({ host: smtpHost, port: Number(process.env.SCHEDULER_SMTP_PORT || 587), secure: process.env.SCHEDULER_SMTP_SECURE === 'true', auth: { user: smtpUser, pass: smtpPass } })
    const bookingId = randomUUID()
    const endsAt = new Date(startsAt.getTime() + 30 * 60000)
    const booking = { name, email, phone, organisation, interest, language, notes, attendees, startsAt, endsAt }
    await createBookingRecord({ bookingId, ...booking, startsAt: startsAt.toISOString(), endsAt: endsAt.toISOString(), timezone })
    const messages = buildBookingMessages(booking, { from, organizerEmail, internalRecipient, uid: bookingId })
    try {
      const results = await sendBookingEmails(transporter, messages)
      const deliveryIds = results.map((result) => String((result as { messageId?: string }).messageId || '')).filter(Boolean)
      await updateBookingDelivery(bookingId, 'CONFIRMED', deliveryIds)
    } catch (error) {
      await updateBookingDelivery(bookingId, 'EMAIL_FAILED').catch(() => undefined)
      throw error
    }
    return NextResponse.json({ ok: true, bookingId })
  } catch {
    return NextResponse.json({ error: 'The meeting could not be booked. Please try again or email contact@ai7lab.net.' }, { status: 500 })
  }
}
