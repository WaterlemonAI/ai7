import { NextResponse } from 'next/server'
import { upsertSubscriber } from '@/lib/aws-data'

export const runtime = 'nodejs'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedTopics = new Set(['AI News', 'Product Insights', 'Releases'])

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (String(body.website || '').trim()) return NextResponse.json({ ok: true })
    const email = String(body.email || '').trim().toLowerCase()
    const suppliedTopics: unknown[] = Array.isArray(body.topics) ? body.topics : []
    const topics = Array.from(new Set(suppliedTopics.map(String).filter((topic) => allowedTopics.has(topic))))
    if (!emailPattern.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    if (!topics.length) return NextResponse.json({ error: 'Select at least one newsletter topic.' }, { status: 400 })
    await upsertSubscriber(email, topics)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Subscription is temporarily unavailable. Please try again.' }, { status: 500 })
  }
}
