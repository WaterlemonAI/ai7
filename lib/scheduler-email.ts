import type { SendMailOptions } from 'nodemailer'

export type BookingDetails = {
  name: string
  email: string
  phone: string
  organisation: string
  interest: string
  language: string
  notes: string
  attendees: string[]
  startsAt: Date
  endsAt: Date
}

type MailSettings = {
  from: string
  organizerEmail: string
  internalRecipient: string
  uid: string
  createdAt?: Date
}

type MailTransport = { sendMail(options: SendMailOptions): Promise<unknown> }

const siteUrl = 'https://www.ai7lab.net'
const logoUrl = `${siteUrl}/ai7lab-logo.png`

const focusCopy: Record<string, string> = {
  Vendoreye: 'We’ll focus the conversation on supplier discovery, qualification, evidence and opportunity intelligence.',
  RoleField: 'We’ll focus the conversation on support, calling and call-centre operations, including Seer kiosk AI.',
  'Enterprise AI': 'We’ll focus the conversation on the operational problem, its measurable baseline and a responsible route to production.',
  Partnership: 'We’ll use the conversation to understand the partnership opportunity, shared value and the right next step.',
  'General business problem': 'We’ll use the conversation to understand what should work better, the result that matters and the right next step.',
}

function html(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

function icsDate(date: Date) { return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') }
function icsText(value: string) { return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;') }

function dateParts(startsAt: Date) {
  const date = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(startsAt)
  const time = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Dubai', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(startsAt)
  return { date, time }
}

function shell(content: string, preheader: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>AI7Lab</title></head><body style="margin:0;background:#f4f8fc;color:#12305b;font-family:Arial,Helvetica,sans-serif"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${html(preheader)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f8fc"><tr><td align="center" style="padding:28px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #cbdced"><tr><td style="height:5px;background:linear-gradient(90deg,#004aad,#1973bd,#298cc6,#4fc9de)"></td></tr><tr><td style="padding:30px 34px 20px"><img src="${logoUrl}" width="116" alt="AI7Lab" style="display:block;width:116px;height:auto;border:0"></td></tr><tr><td style="padding:0 34px 36px">${content}</td></tr><tr><td style="padding:22px 34px;background:#004aad;color:#ffffff;font-size:12px;line-height:1.6"><strong>AI7Lab</strong><br>Agentic AI products and enterprise solutions, built in Dubai.<br><a href="${siteUrl}" style="color:#ffffff">ai7lab.net</a></td></tr></table></td></tr></table></body></html>`
}

function detailTable(booking: BookingDetails) {
  const { date, time } = dateParts(booking.startsAt)
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:26px 0;border:1px solid #cbdced;background:#f8fbfe"><tr><td style="padding:16px 18px;border-bottom:1px solid #cbdced;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#516983">Date</td><td style="padding:16px 18px;border-bottom:1px solid #cbdced;text-align:right;font-size:14px;font-weight:bold;color:#12305b">${html(date)}</td></tr><tr><td style="padding:16px 18px;border-bottom:1px solid #cbdced;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#516983">Time</td><td style="padding:16px 18px;border-bottom:1px solid #cbdced;text-align:right;font-size:14px;font-weight:bold;color:#12305b">${html(time)} · 30 minutes</td></tr><tr><td style="padding:16px 18px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#516983">Conversation</td><td style="padding:16px 18px;text-align:right;font-size:14px;font-weight:bold;color:#12305b">${html(booking.interest)}</td></tr></table>`
}

function buildIcs(booking: BookingDetails, settings: MailSettings, recipients: string[]) {
  const attendeeLines = recipients.map((address) => `ATTENDEE;CN=${icsText(address)};RSVP=TRUE:mailto:${address}`).join('\r\n')
  const description = [`Organisation: ${booking.organisation}`, `Phone: ${booking.phone}`, `Conversation: ${booking.interest}`, `Language: ${booking.language}`, booking.notes && `Context: ${booking.notes}`].filter(Boolean).join('\n')
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//AI7Lab//Scheduler//EN','CALSCALE:GREGORIAN','METHOD:REQUEST','BEGIN:VEVENT',`UID:${settings.uid}@ai7lab.net`,`DTSTAMP:${icsDate(settings.createdAt ?? new Date())}`,`DTSTART:${icsDate(booking.startsAt)}`,`DTEND:${icsDate(booking.endsAt)}`,`SUMMARY:${icsText(`AI7Lab — ${booking.interest}`)}`,`DESCRIPTION:${icsText(description)}`,`URL:${siteUrl}`,`ORGANIZER;CN=AI7Lab:mailto:${settings.organizerEmail}`,attendeeLines,'STATUS:CONFIRMED','SEQUENCE:0','END:VEVENT','END:VCALENDAR'].join('\r\n')
}

export function recipientFor(interest: string, env: NodeJS.ProcessEnv = process.env) {
  const mapping: Record<string, string | undefined> = {
    Vendoreye: env.SCHEDULER_RECIPIENT_VENDOREYE,
    RoleField: env.SCHEDULER_RECIPIENT_ROLEFIELD,
    'Enterprise AI': env.SCHEDULER_RECIPIENT_ENTERPRISE,
    Partnership: env.SCHEDULER_RECIPIENT_PARTNERSHIP,
  }
  return mapping[interest] || env.SCHEDULER_RECIPIENT_DEFAULT
}

export function buildBookingMessages(booking: BookingDetails, settings: MailSettings): [SendMailOptions, SendMailOptions] {
  const { date, time } = dateParts(booking.startsAt)
  const focus = focusCopy[booking.interest] ?? focusCopy['General business problem']
  const recipients = Array.from(new Set([booking.email, ...booking.attendees, settings.internalRecipient]))
  const thankYouHtml = shell(`<p style="margin:0;color:#1973bd;font-size:11px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase">Conversation confirmed</p><h1 style="margin:16px 0 0;font-size:42px;line-height:1.05;letter-spacing:-.04em;color:#12305b">Thank you, ${html(booking.name)}.</h1><p style="margin:20px 0 0;font-size:16px;line-height:1.7;color:#516983">Your conversation with AI7Lab is booked. ${html(focus)}</p>${detailTable(booking)}<p style="margin:0;font-size:14px;line-height:1.7;color:#516983">A separate calendar invitation is on its way. Reply to that invitation if the attendees or timing need to change.</p>`, `Thank you, ${booking.name}. Your AI7Lab conversation is booked.`)
  const inviteHtml = shell(`<p style="margin:0;color:#1973bd;font-size:11px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase">Calendar invitation</p><h1 style="margin:16px 0 0;font-size:42px;line-height:1.05;letter-spacing:-.04em;color:#12305b">Let’s discuss what should work better.</h1><p style="margin:20px 0 0;font-size:16px;line-height:1.7;color:#516983">This invitation reserves time for <strong>${html(booking.organisation)}</strong> and AI7Lab. ${html(focus)}</p>${detailTable(booking)}<p style="margin:0;font-size:14px;line-height:1.7;color:#516983">Accept the attached invitation to add the meeting to your calendar. The AI7Lab team will use the context provided to prepare.</p>`, `Calendar invitation for ${date} at ${time}.`)
  const summary = `AI7Lab — ${booking.interest}`
  const thankYou: SendMailOptions = {
    from: settings.from,
    to: booking.email,
    replyTo: settings.internalRecipient,
    subject: `Thank you, ${booking.name} — your AI7Lab conversation is booked`,
    text: `Thank you, ${booking.name}.\n\nYour AI7Lab conversation is booked for ${date} at ${time}.\n\n${focus}\n\nA separate calendar invitation is on its way.`,
    html: thankYouHtml,
  }
  const invitation: SendMailOptions = {
    from: settings.from,
    to: recipients,
    replyTo: booking.email,
    subject: `Calendar invite: AI7Lab × ${booking.organisation} — ${booking.interest}`,
    text: `${summary}\n\n${date} at ${time}\nDuration: 30 minutes\nOrganisation: ${booking.organisation}\nPhone: ${booking.phone}\nLanguage: ${booking.language}\n\n${focus}`,
    html: inviteHtml,
    icalEvent: { method: 'REQUEST', filename: 'ai7lab-conversation.ics', content: buildIcs(booking, settings, recipients) },
  }
  return [thankYou, invitation]
}

export async function sendBookingEmails(transporter: MailTransport, messages: [SendMailOptions, SendMailOptions]) {
  const results = []
  for (const message of messages) results.push(await transporter.sendMail(message))
  return results
}
