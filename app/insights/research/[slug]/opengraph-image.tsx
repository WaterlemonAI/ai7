import { ImageResponse } from 'next/og'
import { getEditorialArticle, getPillar } from '@/lib/editorial'

export const alt = 'AI7Lab UAE and GCC enterprise AI research'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const article = getEditorialArticle((await params).slug)
  const title = article?.title ?? 'Enterprise AI Research for the UAE and GCC'
  const pillar = article ? getPillar(article) : { number: 0, title: 'AI7Lab Research' }
  const number = article ? String(article.number).padStart(3, '0') : 'AI7'
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: '#ffffff', color: '#0b0f1a', padding: '62px 68px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: 'linear-gradient(90deg, #2563eb 0 35%, #f4b5df 35% 68%, #ffd43b 68%)' }} />
      <div style={{ position: 'absolute', width: 430, height: 430, borderRadius: 430, right: -90, top: -120, background: 'radial-gradient(circle at 42% 48%, #ffd43b99, #f4b5df55 42%, transparent 69%)' }} />
      <div style={{ position: 'absolute', width: 310, height: 310, borderRadius: 310, right: 120, bottom: -210, background: '#2563eb18', border: '3px solid #0b0f1a' }} />
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><div style={{ width: 14, height: 14, borderRadius: 14, background: '#2563eb' }} /><span style={{ fontSize: 27, fontWeight: 800 }}>AI7Lab</span></div>
          <span style={{ fontSize: 18, letterSpacing: 3, color: '#566074' }}>UAE · GCC RESEARCH {number}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 940 }}>
          <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: 2.5, color: '#2563eb', textTransform: 'uppercase' }}>Pillar {pillar.number} · {pillar.title}</span>
          <div style={{ marginTop: 22, fontSize: title.length > 74 ? 48 : title.length > 55 ? 54 : 61, lineHeight: 1.06, letterSpacing: -2.2, fontWeight: 750 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}><div style={{ height: 3, width: 76, background: '#0b0f1a' }} /><span style={{ fontSize: 19, color: '#566074' }}>Production-minded enterprise AI from Dubai.</span></div>
      </div>
    </div>,
    size,
  )
}
