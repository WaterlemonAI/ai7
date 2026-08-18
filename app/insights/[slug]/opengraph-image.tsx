import { ImageResponse } from 'next/og'
import { blogProducts, getBlogPost } from '@/lib/blogs'

export const alt = 'AI7Lab industry insight'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  const product = post ? blogProducts[post.product] : blogProducts.taed
  const title = post?.title ?? 'Enterprise AI Insights'
  const industry = post?.industry ?? 'AI7Lab'
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: '#f8fafc', color: '#0b1020', padding: '64px 70px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ position: 'absolute', width: 620, height: 620, borderRadius: 620, right: -165, top: -210, background: `radial-gradient(circle at 40% 45%, ${product.color}55, ${product.color}10 52%, transparent 68%)` }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${product.color}13 1px, transparent 1px), linear-gradient(90deg, ${product.color}13 1px, transparent 1px)`, backgroundSize: '38px 38px' }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><div style={{ width: 13, height: 13, borderRadius: 13, background: product.color }} /><span style={{ fontSize: 24, fontWeight: 700 }}>{product.name}</span></div><span style={{ fontSize: 19, letterSpacing: 3, textTransform: 'uppercase', color: '#586174' }}>AI7LAB INSIGHTS</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', width: 930 }}><span style={{ color: product.color, fontSize: 22, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3 }}>{industry}</span><div style={{ marginTop: 22, fontSize: title.length > 70 ? 49 : 57, lineHeight: 1.08, letterSpacing: -2, fontWeight: 700 }}>{title}</div></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}><div style={{ height: 4, width: 72, background: product.color }} /><span style={{ color: '#586174', fontSize: 20 }}>Research translated into products that work.</span></div>
      </div>
    </div>,
    size,
  )
}
