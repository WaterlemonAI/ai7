import { ImageResponse } from 'next/og'

export const alt = 'AI7Lab — Enterprise AI research and products from Dubai'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: '#f8fafc', color: '#0b1020', padding: '70px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ position: 'absolute', width: 760, height: 760, borderRadius: 760, right: -230, top: -300, background: 'radial-gradient(circle at 40% 45%, #2563eb55, #22d3ee18 48%, transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#2563eb12 1px, transparent 1px), linear-gradient(90deg, #2563eb12 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ position: 'relative', display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>AI7Lab</span><span style={{ fontSize: 18, letterSpacing: 4, color: '#64748b' }}>DUBAI · UAE</span></div>
        <div style={{ display: 'flex', maxWidth: 900, flexDirection: 'column' }}><span style={{ fontSize: 21, fontWeight: 700, letterSpacing: 3, color: '#2563eb' }}>RESEARCH-LED AI PRODUCTS</span><div style={{ marginTop: 24, fontSize: 63, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>Enterprise intelligence, built to work.</div><div style={{ marginTop: 28, maxWidth: 800, fontSize: 25, lineHeight: 1.4, color: '#526077' }}>Visual intelligence, supplier intelligence, and multilingual AI automation.</div></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}><div style={{ width: 80, height: 4, background: '#2563eb' }} /><span style={{ fontSize: 19, color: '#64748b' }}>Taed · VendorEye · RoleField.ai</span></div>
      </div>
    </div>,
    size,
  )
}
