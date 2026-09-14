'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import s from './vision.module.css'

export function LivingDiagram({children, className = ''}: {children: ReactNode; className?: string}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => ref.current?.setAttribute('data-visible', String(entry.isIntersecting)))
    if(ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`${s.living} ${className}`} data-visible="false">{children}</div>
}

const ecosystemNodes = ['AI Research', 'Compute', 'Software', 'FDEs', 'Security', 'AI Engineers', 'GTM', 'Enterprises', 'Products', 'Partners']
export function HeroEcosystem() {
  const [active, setActive] = useState(false)
  return <LivingDiagram className={s.heroDiagram}>
    <div className={s.diagramLabel}><span>AI7 / CONNECTED CAPABILITY</span><span>ONE ECOSYSTEM</span></div>
    <div className={s.network} data-active={active}>
      <svg viewBox="0 0 600 600" aria-hidden="true"><circle cx="300" cy="300" r="215" />{ecosystemNodes.map((name,i)=>{
        const angle = i * Math.PI * 2 / 10 - Math.PI / 2
        return <line key={name} x1="300" y1="300" x2={300+Math.cos(angle)*215} y2={300+Math.sin(angle)*215} data-selected={active && [0,1,3,4,6].includes(i)} />
      })}<circle className={s.networkPulse} cx="300" cy="300" r="215" /></svg>
      <div className={s.core}><span>FOCUSED AT THE CENTER</span><strong>AI7Lab</strong><p>{active ? 'A team around\nyour enterprise problem' : 'Research. Build.\nDeploy. Scale.'}</p></div>
      {ecosystemNodes.map((name,i)=>{const angle=i*Math.PI*2/10-Math.PI/2;return <span className={s.ecosystemNode} key={name} data-selected={active && [0,1,3,4,6].includes(i)} style={{'--x':`${50+Math.cos(angle)*35.8}%`,'--y':`${50+Math.sin(angle)*35.8}%`} as CSSProperties}>{name}</span>})}
    </div>
    <div className={s.mobileNetwork}><div className={s.mobileCore}>AI7Lab core</div><p>Research + architecture + strategy</p><span>↓</span><div>Technology + delivery partners</div><p>Compute · software · FDEs · security · AI engineers</p><span>↓</span><div>GTM partners + enterprises + products</div></div>
    <button className={s.assembleButton} type="button" aria-pressed={active} onClick={()=>setActive(!active)}>{active ? 'Return to the ecosystem' : 'Assemble around an enterprise problem'} <span>↗</span></button>
    <p className={s.assemblyResult} aria-live="polite">{active ? 'Research + FDEs + compute + security + domain expertise → solution → production → evidence ↺' : 'The core connects specialist capability around each enterprise outcome.'}</p>
  </LivingDiagram>
}

export function PartnerRings() {
  return <div className={s.partnerRings}>
    <div className={s.customerRing}><span className={s.ringLabel}>CUSTOMERS & ENTERPRISE PROGRAMS</span>
      <div className={s.marketRing}><span className={s.ringLabel}>GTM & MARKET PARTNERS</span><p>Enterprise access · industry expertise · regional relationships</p>
        <div className={s.deliveryRing}><span className={s.ringLabel}>TECHNOLOGY & DELIVERY PARTNERS</span><p>AI · ML · data · backend · frontend · cloud · security · DevOps / MLOps</p>
          <div className={s.coreRing}><span className={s.ringLabel}>AI7LAB CORE</span><p>Product · AI Research · architecture<br />strategy · enterprise GTM · governance</p></div>
          <strong>Access to 130+ qualified AI engineers & developers across the ecosystem</strong>
        </div>
      </div>
    </div>
  </div>
}

const skills = ['AI Research', 'Machine Learning', 'LLMs', 'Computer Vision', 'Speech', 'Data Engineering', 'MLOps', 'DevOps', 'Cloud', 'Backend', 'Frontend', 'Cybersecurity', 'Enterprise Integration', 'Solution Architecture']
const programs = [
  { name:'Private knowledge assistant', skills:['AI Research','LLMs','Data Engineering','MLOps','Cloud','Cybersecurity','Enterprise Integration','Solution Architecture'], outcome:'Permissions-aware enterprise knowledge, deployed within an approved private environment.' },
  { name:'Document intelligence', skills:['Machine Learning','Computer Vision','Data Engineering','Backend','MLOps','Cybersecurity','Enterprise Integration'], outcome:'Documents become validated structured data, connected to the enterprise workflow.' },
  { name:'Conversational operations', skills:['AI Research','LLMs','Speech','Backend','Frontend','DevOps','Cybersecurity','Enterprise Integration'], outcome:'Natural customer interactions connect to governed actions and human handoffs.' },
]
export function EngineeringEcosystem() {
  const [active,setActive]=useState(0)
  return <div className={s.engineering}>
    <div className={s.capacity}><span className={s.eyebrow}>PARTNER ECOSYSTEM CAPACITY</span><strong>130<span>+</span></strong><h3>Qualified AI engineers<br />& developers</h3><p>Accessible through our technology and delivery partnerships. Specialist teams form around each program’s requirements.</p></div>
    <div className={s.programBuilder}><span className={s.eyebrow}>TEAMS FORM AROUND THE PROBLEM</span><div className={s.programChoices} aria-label="Example enterprise programs">{programs.map((program,i)=><button key={program.name} aria-pressed={active===i} onClick={()=>setActive(i)}>{program.name}</button>)}</div><div className={s.skills}>{skills.map(skill=><span key={skill} data-selected={programs[active].skills.includes(skill)}>{programs[active].skills.includes(skill)?'✓':'○'} {skill}</span>)}</div><p className={s.programOutcome} aria-live="polite">{programs[active].outcome}</p><span className={s.note}>Illustrative skill combinations; team composition follows the engagement.</span></div>
  </div>
}

export function ConnectionGap() {
  const [connected,setConnected]=useState(true)
  return <div className={s.gapDiagram} data-connected={connected}>
    <div className={s.islands}>{['Business','Research','Engineering','Infrastructure','Governance'].map(name=><span key={name}>{name}</span>)}</div>
    <div className={s.connectionBus} aria-hidden="true" />
    <div className={s.orchestration}><strong>{connected ? 'AI7Lab / shared orchestration' : 'Separate priorities. Separate projects.'}</strong><p>{connected ? 'A coordinated architecture around the enterprise outcome.' : 'Useful expertise, without a shared route into production.'}</p></div>
    <button onClick={()=>setConnected(!connected)} aria-pressed={connected}>{connected?'View the disconnected model':'Connect the disciplines'} ↗</button>
  </div>
}
