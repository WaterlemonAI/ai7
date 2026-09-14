'use client'

import { formatBrand } from '@/lib/brand-text'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { stages } from './stages'
import s from './sovereign.module.css'

export function MotionBoundary({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      ref.current?.setAttribute('data-visible', String(entry.isIntersecting))
    }, { rootMargin: '60px' })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`${s.motion} ${className}`} data-visible="false">{formatBrand(children)}</div>
}

export function LoopDiagram({ active = -1, onSelect }: { active?: number; onSelect?: (index: number) => void }) {
  return <div className={s.orbit} data-complete={active === 6} aria-label="Seven connected disciplines around your sovereign AI environment">
    <svg viewBox="0 0 600 600" aria-hidden="true" className={s.orbitLines}>
      <circle cx="300" cy="300" r="213" className={s.orbitTrack} />
      <circle cx="300" cy="300" r="164" className={s.innerTrack} />
      {active >= 0 && (() => {
        const start = active * 2 * Math.PI / 7 - Math.PI / 2
        const end = (active + 1) * 2 * Math.PI / 7 - Math.PI / 2
        return <path key={active} d={`M${300 + Math.cos(start) * 213} ${300 + Math.sin(start) * 213} A213 213 0 0 1 ${300 + Math.cos(end) * 213} ${300 + Math.sin(end) * 213}`} className={s.activeArc} />
      })()}
      {stages.map((stage, i) => {
        const angle = (i * 2 * Math.PI / 7) - Math.PI / 2
        return <path key={stage.slug} d={`M300 300 L${300 + Math.cos(angle) * 213} ${300 + Math.sin(angle) * 213}`} className={i === active ? s.activeSpoke : s.spoke} />
      })}
      <circle cx="300" cy="300" r="213" className={s.signal} />
    </svg>
    <div className={s.nucleus}><span className={s.micro}>CUSTOMER CONTROLLED</span><strong>Sovereign<br />AI</strong><span>Data · Compute · Models<br />Applications · Policies</span></div>
    {stages.map((stage, i) => {
      const angle = (i * 2 * Math.PI / 7) - Math.PI / 2
      const style = { '--node-x': `${50 + Math.cos(angle) * 35.5}%`, '--node-y': `${50 + Math.sin(angle) * 35.5}%`, '--delay': `${i * 100}ms` } as CSSProperties
      const content = <><span>{formatBrand(String(i + 1).padStart(2, '0'))}</span>{formatBrand(stage.short)}<i aria-hidden="true" /></>
      return onSelect ? <button type="button" key={stage.slug} style={style} className={`${s.orbitNode} ${active === i ? s.activeNode : ''}`} aria-pressed={active === i} aria-label={`Stage ${i + 1}: ${stage.title}`} onClick={() => onSelect(i)}>{formatBrand(content)}</button> : <div key={stage.slug} style={style} className={s.orbitNode}>{formatBrand(content)}</div>
    })}
    <span className={s.loopBack}>07 → 01 / CONTINUOUS IMPROVEMENT</span>
  </div>
}

function StageDetail({ index }: { index: number }) {
  const stage = stages[index]
  return <div className={s.stageDetail}>
    <div className={s.micro}>DISCIPLINE {formatBrand(String(index + 1).padStart(2, '0'))} / 07</div>
    <h3>{formatBrand(stage.title)}</h3><p>{formatBrand(stage.description)}</p>
    <ul className={s.capabilities}>{stage.capabilities.map(capability => <li key={capability}>{formatBrand(capability)}</li>)}</ul>
    <div className={s.signalToken}><span aria-hidden="true">◈</span> {formatBrand(stage.signal)}</div>
    <p className={s.transition}>{formatBrand(stage.transition)} <span aria-hidden="true">↗</span></p>
  </div>
}

export function AI7Loop() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    const update = () => {
      frame = 0
      if (!media.matches || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const progress = Math.max(0, Math.min(1, (80 - rect.top) / (rect.height - window.innerHeight)))
      setActive(Math.min(6, Math.floor(progress * 7)))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    media.addEventListener('change', onScroll)
    update()
    return () => { window.removeEventListener('scroll', onScroll); media.removeEventListener('change', onScroll); cancelAnimationFrame(frame) }
  }, [])
  const select = (index: number) => {
    setActive(index)
    // Native scroll positions keep the selected stage and subsequent scrolling in sync.
    if (ref.current && window.matchMedia('(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)').matches) {
      const top = window.scrollY + ref.current.getBoundingClientRect().top - 80
      window.scrollTo({ top: top + ((index + .2) / 7) * (ref.current.offsetHeight - window.innerHeight), behavior: 'instant' })
    }
  }
  return <section ref={ref} className={s.loopSection} id="ai7-loop" aria-labelledby="loop-heading">
    <div className={s.loopSticky}><div className={s.wrap}>
      <div className={s.sectionHeading}><div><span className={s.eyebrow}>02 / WHY AI7</span><h2 id="loop-heading">Seven disciplines.<br />One continuously improving AI system.</h2></div><p>AI fails to scale when its layers become separate projects. We connect them into one delivery loop.</p></div>
      <div className={s.desktopLoop}><MotionBoundary><LoopDiagram active={active} onSelect={select} /></MotionBoundary><div><StageDetail key={active} index={active} /><div className={s.stepControls}>{stages.map((stage, i) => <button key={stage.slug} onClick={() => select(i)} aria-label={`Show ${stage.title}`} aria-pressed={active === i}>{formatBrand(String(i + 1).padStart(2, '0'))}</button>)}</div></div></div>
      <div className={s.mobileLoop}>{stages.map((stage, i) => <article key={stage.slug}><StageDetail index={i} /></article>)}<div className={s.returnLine}>↳ 07 → 01 · Production evidence returns to strategy</div></div>
      <div className={s.loopConclusion}><p>Control has to survive the entire loop.</p><a href="/contact">Talk to AI7Lab ↗</a></div>
    </div></div>
  </section>
}

const modes = [
  { name: 'On-Premise', description: 'AI runs inside infrastructure controlled within your environment.', location: 'CUSTOMER ENVIRONMENT', outside: 'No external workload required' },
  { name: 'Dedicated Private Environment', description: 'Dedicated compute, networking, storage and model serving isolated for your organisation.', location: 'DEDICATED PRIVATE INFRASTRUCTURE', outside: 'Isolated resources for your organisation' },
  { name: 'Controlled Hybrid', description: 'Keep sensitive workloads and data inside the sovereign boundary. Route selected workloads to approved external capabilities.', location: 'CUSTOMER-CONTROLLED BOUNDARY', outside: 'Approved external capability' },
]
export function DeploymentModes() {
  const [mode, setMode] = useState(0)
  return <div className={s.deployment}>
    <div className={s.modeSelector} aria-label="Deployment modes">{modes.map((item, i) => <button key={item.name} type="button" aria-pressed={mode === i} aria-controls="deployment-detail" onClick={() => setMode(i)}><span>0{formatBrand(i + 1)}</span>{formatBrand(item.name)}<span aria-hidden="true">↗</span></button>)}</div>
    <div id="deployment-detail" className={s.modeDetail} aria-live="polite"><p>{formatBrand(modes[mode].description)}</p><div key={mode} className={s.perimeter}><span className={s.micro}>{formatBrand(modes[mode].location)}</span><div className={s.workloads}><span>Enterprise data</span><span>GPU / compute</span><span>Models & RAG</span><span>Applications</span></div><div className={s.policyBar}>IDENTITY + POLICY + AUDIT · PERSISTENT CONTROL</div></div><div className={`${s.external} ${mode === 2 ? s.hybrid : ''}`}>{mode === 2 && <span>↕ Policy-approved workload</span>}{formatBrand(modes[mode].outside)}</div></div>
  </div>
}

const requests = [
  { input: 'Invoice image', route: ['Vision', 'Domain model'], output: 'Structured JSON / API' },
  { input: 'Employee question', route: ['RAG', 'LLM'], output: 'Grounded answer' },
  { input: 'Inbound phone call', route: ['Speech', 'Agent'], output: 'Enterprise workflow' },
]
export function IntelligenceRouter() {
  const [request, setRequest] = useState(0)
  return <div className={s.router}><div className={s.requestChoices}><span className={s.micro}>SELECT A WORKLOAD</span>{requests.map((item, i) => <button key={item.input} aria-pressed={request === i} onClick={() => setRequest(i)}>{formatBrand(item.input)}<span>→</span></button>)}</div><div className={s.routerCore}><span className={s.micro}>AI7 INTELLIGENCE ROUTER</span><div className={s.modelGrid}>{['Vision', 'LLM', 'Speech', 'RAG', 'Agent', 'Domain model'].map(model => <span key={model} data-active={requests[request].route.includes(model)}>{formatBrand(requests[request].route.includes(model) ? '● ' : '○ ')}{formatBrand(model)}</span>)}</div></div><div className={s.routerOutput} aria-live="polite"><span className={s.micro}>APPLICATION OUTPUT</span><strong>{formatBrand(requests[request].output)}</strong><span>Connected through APIs + FDE engineering</span></div></div>
}

export function GovernanceFlow() {
  const [blocked, setBlocked] = useState(false)
  return <div className={s.governance}><div className={s.governanceTop}><span className={s.micro}>ILLUSTRATIVE POLICY FLOW</span><button type="button" aria-pressed={blocked} onClick={() => setBlocked(!blocked)}>{formatBrand(blocked ? 'Use an authorised request' : 'Try a restricted action')} ↗</button></div><div className={s.gates}>{['Identity', 'Permission', 'Data policy', 'Model policy', 'Output evaluation', 'Audit logging'].map((gate, i) => <span key={gate} data-blocked={blocked && i === 2} data-waiting={blocked && i > 2}>{formatBrand(blocked && i === 2 ? '⊘' : blocked && i > 2 ? '○' : '✓')} {formatBrand(gate)}</span>)}</div><p aria-live="polite">{formatBrand(blocked ? 'Data policy requires review → action paused → human approval → decision recorded.' : 'Authorised request → evaluated output → governed execution → decision recorded.')}</p></div>
}
