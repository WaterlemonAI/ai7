import test from 'node:test'
import assert from 'node:assert/strict'
import type { SendMailOptions } from 'nodemailer'
import { buildBookingMessages, recipientFor, sendBookingEmails } from '../lib/scheduler-email.ts'

const booking = {
  name: 'Arbaz <Test>',
  email: 'visitor@example.com',
  phone: '+971 50 123 4567',
  organisation: 'Example & Co',
  interest: 'RoleField',
  language: 'English',
  notes: 'Improve support operations',
  attendees: ['colleague@example.com'],
  startsAt: new Date('2026-10-20T05:00:00.000Z'),
  endsAt: new Date('2026-10-20T05:30:00.000Z'),
}

const settings = {
  from: 'AI7Lab <meetings@ai7lab.net>',
  organizerEmail: 'meetings@ai7lab.net',
  internalRecipient: 'rolefield@ai7lab.net',
  uid: 'test-booking',
  createdAt: new Date('2026-10-13T08:00:00.000Z'),
}

test('builds exactly two branded, escaped messages', () => {
  const messages = buildBookingMessages(booking, settings)
  assert.equal(messages.length, 2)
  assert.match(String(messages[0].subject), /^Thank you, Arbaz/)
  assert.match(String(messages[1].subject), /^Calendar invite:/)
  assert.match(String(messages[0].html), /#004aad/)
  assert.match(String(messages[0].html), /ai7lab-logo\.png/)
  assert.match(String(messages[0].html), /Arbaz &lt;Test&gt;/)
  assert.doesNotMatch(String(messages[0].html), /Arbaz <Test>/)
  assert.match(String(messages[1].html), /support, calling and call-centre operations/)
})

test('thank-you goes only to visitor and invite reaches all relevant participants', () => {
  const [thankYou, invite] = buildBookingMessages(booking, settings)
  assert.equal(thankYou.to, booking.email)
  assert.deepEqual(invite.to, [booking.email, booking.attendees[0], settings.internalRecipient])
  assert.equal(invite.replyTo, booking.email)
})

test('calendar attachment contains valid event fields and captured context', () => {
  const [, invite] = buildBookingMessages(booking, settings)
  const event = invite.icalEvent as { method: string; filename: string; content: string }
  assert.equal(event.method, 'REQUEST')
  assert.equal(event.filename, 'ai7lab-conversation.ics')
  assert.match(event.content, /BEGIN:VCALENDAR/)
  assert.match(event.content, /UID:test-booking@ai7lab\.net/)
  assert.match(event.content, /DTSTART:20261020T050000Z/)
  assert.match(event.content, /Phone: \+971 50 123 4567/)
  assert.match(event.content, /ATTENDEE;CN=rolefield@ai7lab\.net/)
})

test('routes product interests and sends thank-you before invitation', async () => {
  assert.equal(recipientFor('Vendoreye', { SCHEDULER_RECIPIENT_VENDOREYE: 'vendor@ai7lab.net' }), 'vendor@ai7lab.net')
  assert.equal(recipientFor('Unknown', { SCHEDULER_RECIPIENT_DEFAULT: 'general@ai7lab.net' }), 'general@ai7lab.net')
  const sent: SendMailOptions[] = []
  const fakeTransport = { async sendMail(message: SendMailOptions) { sent.push(message); return { messageId: String(sent.length) } } }
  await sendBookingEmails(fakeTransport, buildBookingMessages(booking, settings))
  assert.equal(sent.length, 2)
  assert.match(String(sent[0].subject), /^Thank you/)
  assert.match(String(sent[1].subject), /^Calendar invite/)
})
